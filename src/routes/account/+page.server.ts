import * as db from '$lib/server/database'

export async function load({ cookies }) {
    const username = cookies.get('username')
    const userId = cookies.get('userId')

    if (!userId) {
        return {
            status: 302,
            redirect: '/login'
        }
    }

    const user = db.getUser(parseInt(userId));

    return { user: user }
}

