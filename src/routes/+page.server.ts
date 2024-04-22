export function load({ cookies }) {
    const username = cookies.get('username')
    const userId = cookies.get('userId')
    return { username: username, userId: userId }
}