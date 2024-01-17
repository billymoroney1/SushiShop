export function load({ cookies }) {
    const username = cookies.get('username')
    console.log('user = ' + username);
    return { username: username }
}