import { writable, get } from "svelte/store";


//maybe add more fields to this item type and handle accordingly below? first just get it to work

const cartItems = writable<Item[]>([]);

type Item = {
    name: string;
    price: number;
    count: number;
}

function createCart(){
    const { set, update, subscribe } = cartItems;

    /**
     * iterate through items and check if name already exists
     * if so increment count
     * else add new item
     * @param name 
     * @returns 
     */
    function addItem(item: Item): Item[] {
        let cart = get(cartItems);
        console.log("addItem()");
        for (const cartItem of cart){
            console.log(item.name);
            if (cartItem.name === item.name){
                cartItem.count++;
                cartItems.set(cart);
                return cart;
            }
        }
        let a = {name: item.name, price: item.price, count: 1};
        update(items => [...items, a]);
        cart = get(cartItems)
        return cart;
    }

    function getTotalItemCount(): number{
        let items = get(cartItems);
        let total = 0;
        for (const item of items){
            total += item.count;
        }
        return total;
    }

    /**
     *  iterate through items and check if name already exists
        if so decrement count
        if count is 0 remove item entirely from cart
     * @param item 
     * @returns 
     */

    function removeItem(item: Item): Item[]{
        console.log("removeItem()");
        const cart = get(cartItems);
        for (let i = 0; i < cart.length; i++){
            if (cart[i].name === item.name){
                console.log("items before splice: ", cart);
                console.log("items[i].count: ", cart[i].count);
                if (cart[i].count === 1){
                    cart.splice(i, 1);
                    console.log("items after splice: ", cart);
                    set(cart)
                    return cart;
                }
                cart[i].count--;
                set(cart)
                return cart;
            }
        }
        set(cart);
        return cart;
    }

    function reset(){
        set([]);
    }

    return {
        subscribe,
        addItem,
        getTotalItemCount,
        removeItem,
        reset
    }
}

export const cart = createCart();