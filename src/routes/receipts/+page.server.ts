import * as db from '$lib/server/database';

export async function load({ cookies }) {
    const userId = cookies.get('userId');
    // TODO: is there a better way to validate if a user is logged in? should probably forward if the url is hit
    if(!userId){
        return { orders: null };
    }
    const orders = await db.getUserOrders(parseInt(userId));

    // TODO: get the order items
    const allOrderItems = [];
    for (const order of orders) {
        const orderItems = await db.getOrderItems(order.id);
        allOrderItems.push(orderItems);
    }
    console.log("allOrderItems: " + JSON.stringify(allOrderItems));
    // iterate through 'orders', get order items for each order id, return as a separate prop to the page
    // actually, maybe i need to refine the query and just make one function that cleanly combines the data into a single object
    return { orders: orders, orderItems: allOrderItems};
}