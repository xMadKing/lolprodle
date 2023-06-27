import { REGION_DATA } from "$lib/types";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoadEvent } from "./$types";

export function load(event: PageServerLoadEvent) {
    REGION_DATA.forEach((value, _) => {
        if (value.slugs.indexOf(event.params.slug) !== -1) {
            throw redirect(308, "/#/" + event.params.slug);
        }
    });
}
