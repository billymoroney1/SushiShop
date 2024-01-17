<script lang="ts">
    import type { PageData } from './$types'
    export let data: PageData

    import { cart } from '../stores'

    function getCartItemCount(name: string): number{
        let ct: number = 0
        console.log("cart: ", $cart)
        for (const item of $cart){
            if (item.name === name){
                ct = item.count
            }
        }
        return ct
    }

    type Item = {
        name: string,
        price: number,
        count: number
    };

    /**
     * Build menu items from data
     * Combines the raw menu data with the cart data to determine quantity of items in cart
     * @param data
     */

    function buildMenuItems(data: PageData){
        const menuItems: Item[] = []
        for (const item of data.items){
            let ct: number = getCartItemCount(item.name)
            console.log("item count: ", ct);
            let a = {name: item.name, price: item.price, count: ct}
            menuItems.push(a)
        }
        console.log("Menu items: ", menuItems);
        return menuItems
    }

    $: menuItems = buildMenuItems(data);

        // click events for adding and removing items from cart
        function handleAddToCart(item: Item){
        console.log("Add item to cart: ", item.name)
        const updatedItems = cart.addItem(item);
        // menuItems = updatedItems;
        menuItems = buildMenuItems(data);
    }

    function handleRemoveFromCart(item: Item){
        console.log("Remove item from cart: ", item.name);
        const updatedItems = cart.removeItem(item);
        // menuItems = updatedItems;
        menuItems = buildMenuItems(data);
    }
    
    function checkIfItemInCart(name: string){
        let inCart: boolean = false;
        for (const item of $cart){
            if (item.name === name){
                inCart = true;
            }
        }
        return inCart
    }
</script>

<h1>Menu</h1>

<!-- {#each menuItems as item}
    <div>{item.name}</div>
    <button on:click={(e) => {handleAddToCart(item.name)}}>+</button>
    {#key item.count}
        <button disabled={!checkIfItemInCart(item.name)} on:click={(e) => {handleRemoveFromCart(item.name)}}>-</button>
    {/key}
    {#key item.count}
        <div>Amount: {item.count}</div>
    {/key}
{/each} -->

{#each menuItems as item}
    <div>{item.name}</div>
    <div>{item.price}</div>
    <button on:click={(e) => {handleAddToCart(item)}}>+</button>
{/each}