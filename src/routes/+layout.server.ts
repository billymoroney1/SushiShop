// import { redirect } from '@sveltejs/kit'

export function load({ cookies }) {
    const username = cookies.get('username')
    // if (username === undefined || username === null) {
    //     // is 301 the right status code here?
    //     redirect(301, '/login')
    // }
    return { username: username }
}