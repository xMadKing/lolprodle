<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { createCombobox } from "svelte-headlessui";
    import Transition from "svelte-transition";
    import { selectedRegion, toasts } from "./stores";
    import { makeGuess } from "./guess/guess";
    import { ErrorType, getPlayerNames } from "./api";
    import { DataFetchState, Duration, Toast, ToastStatus } from "./types";

    let dataState = DataFetchState.Loading;
    let playerNames: Array<string> = ["Player Name"];
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

    function onSelect(e: Event) {
        let detail = (e as CustomEvent).detail;
        console.log("select", detail);
        if (detail !== undefined && detail.selected !== undefined) {
            let selected = detail.selected; // player id
            // temp
            let err = makeGuess($selectedRegion, selected);
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
            }
        }
    }

    $: filtered = playerNames.filter((person) =>
        person
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes($combobox.filter.toLowerCase().replace(/\s+/g, ""))
    );
</script>

<div class="flex w-80 flex-col">
    {#if dataState === DataFetchState.Loading}
        <div class="flex bg-base-100 justify-center p-3">
        <span class="loading loading-spinner loading-lg" />
        </div>
    {:else if dataState === DataFetchState.Fetched}
        <label class="label">
            <span class="label-text uppercase font-bold bg-base-100 p-2 rounded-lg">
                Enter player name
            </span>
        </label>
        <div class="form-control w-full max-w-xs">
            <div>
                <div>
                    <input
                        type="text"
                        placeholder="Player name..."
                        use:combobox.input
                        on:select={onSelect}
                        class="input w-full input-bordered input-primary input-lg text-lg text-white max-w-xs"
                        value={$combobox.selected}
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
