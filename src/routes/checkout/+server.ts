import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const order = await prisma.order.create({
        data: {
            items: {
                create: request.body.items
            }
        }
    })
    return json({ message: 'Order placed' });
}