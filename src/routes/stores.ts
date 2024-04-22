import { writable, get } from "svelte/store";
import type { Item } from "$lib/types.d.ts";


//maybe add more fields to this item type and handle accordingly below? first just get it to work

const cartItems = writable<Item[]>([]);

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
        // for (const cartItem of cart){
        //     console.log(item.id);
        //     if (cartItem.id === item.id){
        //         cartItem.count++;
        //         cartItems.set(cart);
        //         return cart;
        //     }
        // }
        let a = {id: item.id, name: item.name, image: item.image, ingredients: item.ingredients, price: item.price, additions: item.additions, comments: item.comments, count: 1};
        update(items => [...items, a]);
        cart = get(cartItems)
        return cart;
    }

    // need logic for if im adding extra items from menu or cart, should be able to increment count, and do those items need more fields to match the function above
    function addExtraItem(item: Item): Item[]{
        let cart = get(cartItems);
        let a = {id: item.id, name: item.name, image: item.image, ingredients: item.ingredients, price: item.price, additions: item.additions, comments: item.comments, count: 1};

        console.log(item.name + ' added to cart')
        // see if extra item exists already, otherwise add new entry to cart
        for (const cartItem of cart){
            if (cartItem.id === item.id){
                cartItem.count++;
                cartItems.set(cart);
                return cart;
            }
        }

        update(items => [...items, a]);
        cart = get(cartItems)
        return cart;
    }
    // these increment/decrement functions are not reactive in the #each loop on checkout page, but addItem and removeItem work

    function incrementItem(item: Item): Item[]{
        let cart = get(cartItems);
        console.log("increment item: ", item.name)
        item.count += 1;
        console.log(item.count + ' ' + item.name)
        cart = get(cartItems)
        update(items => [...items]);
        cart = get(cartItems)
        return cart;
    }

    // these functions seem clunky, is there a better way to do this?
    function decrementItem(item: Item){
        let cart = get(cartItems);
        console.log("decrement item: ", item.name)
        item.count -= 1;
        console.log(item.count + ' ' + item.name)
        if(item.count === 0){
            let index = cart.indexOf(item);
            cart.splice(index, 1);
        }
        cart = get(cartItems)
        set(cart);
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
        const cart = get(cartItems);
        for (let i = 0; i < cart.length; i++){
            if (cart[i].name === item.name){
                if (cart[i].count === 1){
                    cart.splice(i, 1);
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

    // this might need to be tweaked?

    return {
        subscribe,
        addItem,
        addExtraItem,
        incrementItem,
        decrementItem,
        getTotalItemCount,
        removeItem,
        reset
    }
}

export const cart = createCart();