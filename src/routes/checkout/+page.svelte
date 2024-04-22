<script lang="ts">
    import { cart } from "../stores";
    export let data: any;

    import type { Item } from '$lib/types.d.ts'


    function handlePlaceOrder(){
        location.href = "/payment";
    }

    $: extras = data.extras;

    function addExtraItemToCart(item: Item){
        console.log("Adding extra item to cart: " + item.name);
        cart.addExtraItem(item)
    }
</script>

    <!-- Should i look up items to get their data or just pass around object -->

    <div class='checkout-process-bar'>
        <div class='checkout-process-bar-item'>
            <div class='checkout-process-bar-item-circle checkout-process-active'></div>
            <div class='checkout-process-bar-item-text'>Cart</div>
        </div>
        <div class='checkout-process-bar-item'>
            <div class='checkout-process-bar-item-circle'></div>
            <div class='checkout-process-bar-item-text'>Payment</div>
        </div>
        <div class='checkout-process-bar-item'>
            <div class='checkout-process-bar-item-circle'></div>
            <div class='checkout-process-bar-item-text'>Confirmation</div>
        </div>
    </div>
    
    {#each $cart as item}
        <div class='checkout-item-container'>
            <div class='checkout-item-img'>
                <img src='https://placehold.co/100x100' alt={item.name} />
            </div>
            <div class='checkout-item-details-container'>
                <div>{item.name}</div>
                <div>{item.ingredients}</div>
                <div class='checkout-quantity-control-container'>
                    <button on:click={(e) => {cart.decrementItem(item)}}>-</button>
                    <div>{item.count}</div>
                    <button on:click={(e) => {cart.incrementItem(item)}}>+</button>
                </div>
            </div>
        </div>
    {/each}

    <h3>Add Extra Items</h3>
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
                    <!-- <button on:click={(e) => {handleAddToCart(item)}}>+</button>
                    <button disabled={!checkIfItemInCart(item.name)} on:click={(e) => {handleRemoveFromCart(item)}}>-</button>
                    <div class='menu-item-count'>Amount: {item.count}</div> -->
                </div>
            {/each}
        </div>
    </div>
    
    <!-- <button on:click={(e) => {handlePlaceOrder()}}>Place Order</button> -->
    
    <!-- <button on:click="{handlePlaceOrder}" id="orderButton">Place Order</button> -->
    
    <!-- just use anchor for now? does that not wipe session data ?-->
    <a href="/payment">
        <button id="orderButton">Place Order</button>
    </a>