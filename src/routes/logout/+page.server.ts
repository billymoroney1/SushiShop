import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export function load({cookies}){
    const username = cookies.get('username');
    if(username){
        cookies.delete('username');
    }
    throw redirect(303, '/');
}