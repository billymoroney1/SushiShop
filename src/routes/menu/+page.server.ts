import * as db from '$lib/server/database'

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {
        items: await db.getMenuItems()
    };
}