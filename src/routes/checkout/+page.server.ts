import * as db from '$lib/server/database'

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    let items = await db.getMenuItems();
    // iterate through items and log category
    items.forEach(item => {
        console.log(item.category);
    });

    // filter items based on category
    let extras = items.filter(item => item.category === 'extras');
    return {
        extras: extras
    };
}