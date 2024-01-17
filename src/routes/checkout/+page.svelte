<script lang="ts">
import { cart } from "../stores";
console.log("$cart: ", $cart);

function handlePlaceOrder(){
    console.log("Place order");
    location.href = "/payment";
}
</script>

{#each $cart as item}
    <div>{item.name}</div>
    <div>{item.price}</div>
    <button on:click={(e) => {cart.addItem(item)}}>+</button>
    <button on:click={(e) => {cart.removeItem(item)}}>-</button>
    <div>Amount: {item.count}</div>
{/each}

<!-- <button on:click={(e) => {handlePlaceOrder()}}>Place Order</button> -->

<!-- <button on:click="{handlePlaceOrder}" id="orderButton">Place Order</button> -->

<!-- just use anchor for now? does that not wipe session data ?-->
<a href="/payment">
    <button id="orderButton">Place Order</button>
</a>
