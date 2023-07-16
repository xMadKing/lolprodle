<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { createCombobox } from "svelte-headlessui";
    import Transition from "svelte-transition";
    import { correctGuess, currentGuessedNames, selectedRegion, toasts } from "./stores";
    import { makeGuess } from "./guess/guess";
    import { getCurrentDaystampMillis, guessApi } from "./api";
    import { DataFetchState, Duration, Toast, ToastStatus } from "./types";
    import { saveGuessedNamesCookie } from "./cookies";
    import HowToButton from "./HowToButton.svelte";

    let dataState = DataFetchState.Loading;
    let playerNames: Array<string> = [];

    // interval related variables
    let requester: NodeJS.Timer;

    onMount(() => {
        // request time from api (every 5 mins)
        updatePlayerNames(); // initial value
        requester = setInterval(updatePlayerNames, 1000 * 60 * 5);
    });
    onDestroy(() => clearInterval(requester));

    function updatePlayerNames() {
        dataState = DataFetchState.Loading;
        guessApi
            .players({ region: $selectedRegion.toString() })
            .then((res) => {
                if (res.length === 0) {
                    dataState = DataFetchState.Error;
                    console.log("[INPUT] Player list data is empty");
                    return;
                }

                playerNames = res;
                dataState = DataFetchState.Fetched;
            })
            .catch((err) => {
                console.log(err);
                dataState = DataFetchState.Error;
            });
    }

    const combobox = createCombobox({ label: "Actions", selected: playerNames[0] });

    async function onSelect(e: Event) {
        let detail = (e as CustomEvent).detail;

        if (detail !== undefined && detail.selected !== undefined) {
            let selectedName = detail.selected; // player id
            // The combobox *should* prevent names already chosen from being picked again, but there
            // is a bug where if the user presses <enter> again, they can guess the same name one
            // more time. Hence, we add this check.
            //
            // This check should exist anyways as a just-in-case measure, even if the above bug
            // was not a thing.
            if ($currentGuessedNames.includes(selectedName)) {
                return;
            }

            // temp
            try {
                await makeGuess($selectedRegion, selectedName);

                $currentGuessedNames.push(selectedName);
                let daystamp = getCurrentDaystampMillis();
                saveGuessedNamesCookie($selectedRegion, daystamp, $currentGuessedNames);
            } catch (e) {
                $toasts.push(
                    new Toast(
                        ToastStatus.Error,
                        "Error occurred while guessing :(",
                        Duration.secs(3)
                    )
                );
            }
        }
    }

    $: filtered = playerNames.filter((person) => {
        // only keep names that haven't been guessed yet
        if ($currentGuessedNames.find((name) => person === name) !== undefined) {
            return false;
        }

        return person
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes($combobox.filter.toLowerCase().replace(/\s+/g, ""));
    });
</script>

<div class="flex flex-col justify-center items-center">
    {#if dataState === DataFetchState.Loading}
        <div class="flex bg-base-100 justify-center p-3 border-base-100 rounded-full">
            <span class="loading loading-spinner loading-lg" />
        </div>
    {:else if dataState === DataFetchState.Fetched}
        <div
            class="form-control flex flex-row items-center justify-center bg-base-100
            border-base-100 rounded-lg"
        >
            <div>
                <input
                    type="text"
                    placeholder={$correctGuess !== undefined ? "You guessed it!" : "Enter name..."}
                    use:combobox.input
                    on:select={onSelect}
                    class="input input-lg input-bordered text-lg text-white"
                    value={$combobox.selected !== undefined ? $combobox.selected : ""}
                    disabled={$correctGuess !== undefined}
                />

                <HowToButton />

                <Transition
                    show={$combobox.expanded}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    on:after-leave={() => combobox.reset()}
                >
                    <ul
                        id="input-select-list"
                        use:combobox.items
                        class="absolute z-10 mt-1 max-h-60 w-80 overflow-y-scroll rounded-md
                        bg-base-200 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5
                        focus:outline-none sm:text-sm"
                    >
                        {#each filtered as value}
                            {@const active = $combobox.active === value}
                            {@const selected = $combobox.selected === value}
                            <li
                                class="cursor-default select-none py-2 pl-10 pr-4 {active
                                    ? 'bg-primary text-white'
                                    : 'text-white'}"
                                use:combobox.item={{ value }}
                            >
                                <span
                                    class="block truncate {selected ? 'font-large' : 'font-normal'}"
                                    >{value}</span
                                >
                            </li>
                        {:else}
                            <li class="cursor-default select-none py-2 pl-10 pr-4 text-white">
                                <span class="block truncate font-normal">Nothing found</span>
                            </li>
                        {/each}
                    </ul>
                </Transition>
            </div>
        </div>
    {:else}
        <p class="text-error">Error while loading players :(</p>
    {/if}

    {#if $correctGuess !== undefined}
        <p
            class="text-success font-bold text-center bg-base-100 p-2 m-3 border-neutral rounded-lg w-3/5"
        >
            NICE! You correctly You guessed the player of the day! Why not try out a new region
            above?
        </p>
    {/if}
</div>

<style lang="postcss">
    /* vars: --b2 is base-200 color, --n is neutral color */

    #input-select-list {
        /* Firefox */
        scrollbar-width: thin;

        /* Edge */
        -ms-overflow-style: none;
    }

    /* Chrome, Edge, Safari, Opera */
    #input-select-list::-webkit-scrollbar {
        width: 10px;
    }

    #input-select-list::-webkit-scrollbar-track {
        background: hsl(var(--b2));
    }

    /* the handle  */
    #input-select-list::-webkit-scrollbar-thumb {
        background: hsl(var(--n));
    }
</style>
