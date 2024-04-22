<script lang="ts">
    import { cart } from "../stores";

    // TODO: we should not even be on the payment screen if the cart is empty. this can be checked at page load?

    /** @type {import('./$types').ActionData} */
	export let form: any;

    /** @type {import('./$types').PageData} */
	export let data: any;

    let subtotal: number = calcSubtotal();
    let fees: number = calcFees();
    let tip: number = 0;
    let hideAddressForm = true;
    let hidePaymentMethodForm = true;
    $: total = subtotal + fees + tip;
    $: calcedTip = subtotal * tip;

    function expandAddressForm(){
        hideAddressForm = false;     
    }
    function expandPaymentMethodForm(){
        hidePaymentMethodForm = false;     
    }
    function updateTip(tipValue: number){
        tip = tipValue;
    }
    function calcSubtotal(){
        let subtotal: number = 0;
        for (const item of $cart){
            subtotal += item.price * item.count;
        }
        return round(subtotal);
    }
    function calcFees(){
        let fees: number = 0;
        fees = subtotal * 0.1;
        return round(fees);
    }
    function calcTip(){
        return round(subtotal * tip);
    }
    function round(num: number){
        num = Math.round((num + Number.EPSILON) * 100) / 100
        return parseFloat(num.toFixed(2));
    }
</script>

{#if form?.success}
    <h1>Order Placed!</h1>
    <p>Order number: {form.order.id}</p>
    <p>Order Total: {form.order.total}</p>
    <p>Order Status: {form.order.status}</p>
    <p>Order Date: {form.order.date}</p>
    <h3>Delivery Address</h3>
    <p>{form.address.address}</p>
    <p>{form.address.city}, {form.address.state} {form.address.zip}</p>
    <p>Order Items:</p>
    {#each JSON.parse(form.cart) as item}
        <div>{item.name}</div>
        <div>Price: {item.price}</div>
        <div>Quantity: {item.count}</div>
    {/each}
{:else}
    <h2>Payment</h2>
    <form method="POST" action="?/order">
        {#if form?.missing}<p class='error'>A valid address is required.</p>{/if}
        <div id="location">
            <h2>Delivery Location</h2>
            <!-- Check for addresses in account, iterate and show here with radial checks-->
            {#each data.addresses as address}
                <div>
                    <input type="radio" id="{address.id}" name="addressId" value="{address.id}">
                    <p>{address.address}</p>
                    <p>{address.city, address.state, address.zip}</p>
                </div>
            {/each}
            {#if !hideAddressForm}
                <div id="addressForm">
                    <label for="address">Address</label>
                    <input type="text" name="address" id="address" required>
                    <label for="city">City</label>
                    <input type="text" name="city" id="city" required>
                    <label for="state">State</label>
                    <input type="text" name="state" id="state" required>
                    <label for="zip">Zip</label>
                    <input type="text" name="zip" id="zip" required>
                    <input type="hidden" name="newAddress" value="true">
                </div>
            {:else}
                <button type="button" on:click={(e) => {expandAddressForm()}}>
                    Add Address
                </button>
            {/if}
        </div>

        <div id="paymentMethods">
            <h2>Payment Options</h2>
            {#each data.paymentMethods as paymentMethod}
                <div>
                    <input type="radio" id="{paymentMethod.id}" name="paymentMethod" value="{paymentMethod.id}">
                    <p>{paymentMethod.cardNum}</p>
                </div>
            {/each}
            {#if !hidePaymentMethodForm}
                <div id="paymentMethodForm">
                    <label for="cardNum">Card Number</label>
                    <input type="text" name="cardNum" id="cardNum" required>
                    <label for="expDate">Expiration Date</label>
                    <input type="text" name="expDate" id="expDate" required>
                    <label for="cvv">CVV</label>
                    <input type="text" name="cvv" id="cvv" required>
                    <label for="zip">Zip</label>
                    <input type="text" name="zip" id="zip" required>
                    <input type="hidden" name="newPaymentMethod" value="true">
                </div>
            {:else}
                <button type="button" on:click={(e) => {expandPaymentMethodForm()}}>
                    Add Payment Method
                </button>
            {/if}
        </div>

        <button type="button" on:click={(e) => updateTip(0.1)}>10%</button>
        <button type="button" on:click={(e) => updateTip(0.15)}>15%</button>
        <button type="button" on:click={(e) => updateTip(0.2)}>20%</button>

        <div id="orderReview">
            <h2>Order Review</h2>
            <!-- iterate over cart items and display here -->
            {#each $cart as item}
                <div>{item.name}</div>
                <div>{item.price}</div>
                <button type="button" on:click={(e) => {cart.incrementItem(item)}}>+</button>
                <button type="button" on:click={(e) => {cart.decrementItem(item)}}>-</button>
                <div>Amount: {item.count}</div>
            {/each}
        </div>

        <div id="costDisplay">
            <!-- these values must be reactive-->
            <p>Subtotal: ${subtotal}</p>
            <p>Fees & Estimated Tax: ${fees}</p>
            <p>Tip: ${round(calcedTip)}</p>
            <p id="totalCost">Total: ${total}</p>
        </div>

        <input type="hidden" name="total" value="{total}">
        <input type="hidden" name="subtotal" value="{subtotal}">
        <input type="hidden" name="fees" value="{fees}">
        <input type="hidden" name="tip" value="{tip}">
        <input type="hidden" name="calcedTip" value="{calcedTip}">
        <input type="hidden" name="cart" value="{JSON.stringify($cart)}">

        <button>Place Order</button>
    </form>
{/if}
    