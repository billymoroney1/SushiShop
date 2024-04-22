import * as db from '$lib/server/database';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export function load({ cookies }){
    const username = cookies.get('username');
    const userId = cookies.get('userId');
    console.log('userId = ' + userId);
    cookies.set('userId', `${userId}`, { path: '/'})
    if(username){
        throw redirect(303, '/');
    }
}

export const actions = {
    register: async ({request}) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');

        if (!email || !password){
            return fail(400, {email, password, missing: true})
        }

        if (typeof email != "string" || typeof password != "string"){
            return fail(400, { incorrect: true })
        }
        
        db.register(email, password)
        
        return { success: true }
    },
    login: async({request, cookies}) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');

        if (!email || !password){
            return fail(400, {email, password, missing: true})
        }

        if (typeof email != "string" || typeof password != "string"){
            return fail(400, { incorrect: true })
        }   
        const user = await db.login(email, password)
        // what if user not found in db?
        console.log('result = ' + user)

        if (!user){
            return fail(400, { incorrect: true })
        } 

        if(user){
            cookies.set('username', user.username, { path: '/'})
            cookies.set('userId', `${user.id}`, { path: '/'})
        } else {
            return { success: false }
        }
    }
} satisfies Actions;