<script lang="ts">
    import type { PageData } from './$types'
    import type { Item } from '$lib/types.d.ts'
    export let data: PageData

    import { cart } from '../stores'
    import { goto } from '$app/navigation';
    import { extraItems } from '../roll-details/data';

    let cartCount: number = 0;
        cart.subscribe(value => {
        cartCount = cart.getTotalItemCount();
    })

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

    /**
     * Build menu items from data
     * Combines the raw menu data with the cart data to determine quantity of items in cart
     * @param data
     */

    // function buildMenuItems(data: PageData){
    //     const menuItems: { id: number; name: string; price: number; count: number; }[] = [];
    //     // for (const item of data.items){
    //     //     let ct: number = getCartItemCount(item.name)
    //     //     let a = {id: item.id, name: item.name, price: item.price, count: ct}
    //     //     menuItems.push(a)
    //     // }
    //     return menuItems
    // }

    $: mainRolls = data.mainRolls;
    $: extras = data.extras;

        // click events for adding and removing items from cart
    //     function handleAddToCart(item: Item){
    //     console.log("Add item to cart: ", item.name)
    //     const updatedItems = cart.addItem(item);
    //     // menuItems = updatedItems;
    //     menuItems = buildMenuItems(data);
    // }

    function addExtraItemToCart(item: Item){
        const extraItem: Item = {
            id: item.id,
            name: item.name!,
            image: item.image!,
            ingredients: item.ingredients,
            price: item.price!,
            additions: [],
            comments: item.comments!,
            count: 1
        }
    }
    
    // function checkIfItemInCart(name: string){
    //     let inCart: boolean = false;
    //     for (const item of $cart){
    //         if (item.name === name){
    //             inCart = true;
    //         }
    //     }
    //     return inCart
    // }

    function goToRollDetails(id: number){
        console.log("Go to roll details")
        goto(`/roll-details/${id}`)
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

<div class='menu-row'>
    <h4>Most Popular</h4>
    <div class='item-row'>
        {#each mainRolls as item}
            <div class='menu-item'>
                <div class='menu-item-img'>
                    <img src='https://placehold.co/100x100' alt='roll' />
                    <button on:click={() => goToRollDetails(item.id)}>+</button>
                </div>
                <div class='menu-item-name'>{item.name}</div>
                <div class='menu-item-description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus.</div>
                <!-- <button on:click={(e) => {handleAddToCart(item)}}>+</button>
                <button disabled={!checkIfItemInCart(item.name)} on:click={(e) => {handleRemoveFromCart(item)}}>-</button>
                <div class='menu-item-count'>Amount: {item.count}</div> -->
            </div>
        {/each}
    </div>
</div>

<div class='menu-row'>
    <h4>Signature Rolls</h4>
    <div class='item-row'>
        {#each mainRolls as item}
            <div class='menu-item'>
                <div class='menu-item-img'>
                    <img src='https://placehold.co/100x100' alt='roll' />
                    <button on:click={() => goToRollDetails(item.id)}>+</button>
                </div>
                <div class='menu-item-name'>{item.name}</div>
                <div class='menu-item-description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus.</div>
                <!-- <button on:click={(e) => {handleAddToCart(item)}}>+</button>
                <button disabled={!checkIfItemInCart(item.name)} on:click={(e) => {handleRemoveFromCart(item)}}>-</button>
                <div class='menu-item-count'>Amount: {item.count}</div> -->
            </div>
        {/each}
    </div>
</div>

<div class='menu-row'>
    <h4>Extras</h4>
    <div class='item-row'>
        {#each extras as item}
            <div class='menu-item'>
                <div class='menu-item-img'>
                    <img src='https://placehold.co/100x100' alt='roll' />
                    <button on:click={() => addExtraItemToCart(item)}>+</button>
                </div>
                <div class='menu-item-name'>{item.name}</div>
                <div class='menu-item-description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus.</div>
                <!-- <button on:click={(e) => {handleAddToCart(item)}}>+</button>
                <button disabled={!checkIfItemInCart(item.name)} on:click={(e) => {handleRemoveFromCart(item)}}>-</button>
                <div class='menu-item-count'>Amount: {item.count}</div> -->
            </div>
        {/each}
    </div>
</div>

<!-- {#each menuItems as item}
    <div>{item.name}</div>
    <div>{item.price}</div>
    <button on:click={(e) => {handleAddToCart(item)}}>+</button>
{/each} -->

<div class='bottom-button-row'>
    <a class='bottom-left-button' href="/custom-roll">Custom Roll</a>
    <div class='bottom-right-button cart'>
        <a href="/checkout">
            <img src='cart.png' alt='cart' />
        </a>
        <span class="cart-count">{cartCount}</span>
    </div>
</div>