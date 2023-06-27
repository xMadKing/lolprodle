<script lang="ts">
    import { createCombobox } from "svelte-headlessui";
    import Transition from "svelte-transition";

    // dummy data, change to players later
    const people = [
        { name: "Faker" },
        { name: "Perkz" },
        { name: "Caps" },
        { name: "TheShy" },
        { name: "Upset" },
        { name: "BrokenBlade" },
    ];

    const combobox = createCombobox({ label: "Actions", selected: people[2] });

    function onSelect(e: Event) {
        console.log("select", (e as CustomEvent).detail);
    }

    $: filtered = people.filter((person) =>
        person.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes($combobox.filter.toLowerCase().replace(/\s+/g, ""))
    );
</script>

<div class="flex w-full flex-col w-80">
    <label class="label pr-48">
        <span class="label-text">Enter player name</span>
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
                    value={$combobox.selected.name}
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
                    class="mt-1 max-h-60 w-full overflow-auto rounded-md bg-primary py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                    {#each filtered as value}
                        {@const active = $combobox.active === value}
                        {@const selected = $combobox.selected === value}
                        <li
                            class="relative cursor-default select-none py-2 pl-10 pr-4 {active
                                ? 'bg-teal-600 text-white'
                                : 'text-white'}"
                            use:combobox.item={{ value }}
                        >
                            <span class="block truncate {selected ? 'font-large' : 'font-normal'}"
                                >{value.name}</span
                            >
                        </li>
                    {:else}
                        <li
                            class="cursor-default select-none py-2 pl-10 pr-4 text-white"
                        >
                            <span class="block truncate font-normal">Nothing found</span>
                        </li>
                    {/each}
                </ul>
            </Transition>
        </div>
    </div>
</div>
