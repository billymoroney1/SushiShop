import { json } from '@sveltejs/kit';
import * as db from '$lib/server/database'

/** @type {import('./$types').RequestHandler} */
// export async function POST({ request }) {	
//     const reqJson = await request.json();	
//     console.log("Cart: " + JSON.stringify(reqJson.cart));
//     const order = await db.createOrder(parseInt(reqJson.userId), reqJson.cart)
//     console.log("Order after db: " + JSON.stringify(order));
//     return json({ order: order})
// }