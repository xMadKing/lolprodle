<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { createCombobox } from "svelte-headlessui";
    import Transition from "svelte-transition";
    import { currentGuessedNames, selectedRegion, toasts } from "./stores";
    import { makeGuess } from "./guess/guess";
    import { ErrorType, getCurrentDaystampMillis, getPlayerNames } from "./api";
    import { DataFetchState, Duration, Toast, ToastStatus } from "./types";
    import { saveGuessedNamesCookie } from "./cookies";

    let dataState = DataFetchState.Loading;
    let playerNames: Array<string> = [];
    let inputDisabled = false;

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
        getPlayerNames($selectedRegion)
            .then((res) => {
                if (!res.success) {
                    dataState = DataFetchState.Error;
                    console.log("[INPUT] Request failed");
                    return;
                }
                if (res.data === null) {
                    dataState = DataFetchState.Error;
                    console.log("[INPUT] Player list data is null");
                }

                // need to cast to unknown first so TypeScript doesn't complain that the intended
                // cast is a mistake/error
                playerNames = res.data as unknown as string[];
                dataState = DataFetchState.Fetched;
            })
            .catch((err) => console.log(err));
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
            let err = await makeGuess($selectedRegion, selectedName);
            if (err !== undefined) {
                $toasts.push(
                    new Toast(
                        ToastStatus.Error,
                        err[0] === ErrorType.InvalidPlayerId
                            ? "Could not find submitted player"
                            : "Error occurred while guessing :(",
                        Duration.secs(3)
                    )
                );
                return;
            }

            $currentGuessedNames.push(selectedName);
            let daystamp = getCurrentDaystampMillis();
            saveGuessedNamesCookie($selectedRegion, daystamp, $currentGuessedNames);
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

<div class="flex w-80 flex-row items-center justify-center">
    {#if dataState === DataFetchState.Loading}
        <div class="flex bg-base-100 justify-center p-3 border-base-100 rounded-full">
            <span class="loading loading-spinner loading-lg" />
        </div>
    {:else if dataState === DataFetchState.Fetched}
        <div class="form-control w-full max-w-xs">
            <div>
                <div>
                    <input
                        type="text"
                        placeholder="Enter name..."
                        use:combobox.input
                        on:select={onSelect}
                        class="input w-full input-lg text-lg text-white max-w-xs"
                        value={$combobox.selected !== undefined ? $combobox.selected : ""}
                        disabled={inputDisabled}
                    />
                </div>
                <Transition
                    show={$combobox.expanded}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    on:after-leave={() => combobox.reset()}
                >
                    <ul
                        use:combobox.items
                        class="absolute z-10 mt-1 max-h-60 w-80 overflow-auto rounded-md bg-base-200 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
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
</div>
