<script lang="ts">

    import { cart } from "../stores";
    
    function handlePlaceOrder(){
        // hit api endpoint to save order to db
        console.log("Place order");
        
        location.href = "/summary";
    }
    function expandAddressForm(){
        console.log("Expand address form");
        
    }
</script>

<h2>Payment</h2>
<form method="POST">
    <div id="location">
        <h2>Delivery Location</h2>
        <!-- Check for addresses in account, iterate and show here with radial checks-->
        <button on:click={(e) => {expandAddressForm()}}>
            Add Address
        </button>
    </div>

    <div id="paymentOptions">
        <h2>Payment Options</h2>
    </div>

    <div id="tip">
        <h2>Tip</h2>
        <!-- Calculate tip dollar values above the buttons, spans are placeholders-->
        <input type="radio" id="tip10" name="tip" value="10%" checked>
        <label for="tip10">10%</label>
        <input type="radio" id="tip15" name="tip" value="15%">
        <label for="tip15">15%</label>
        <input type="radio" id="tip20" name="tip" value="20%">
        <label for="tip20">20%</label>
        <!-- TODO make this custom tip button do something-->
        <input type="radio" id="tipCustom" name="tip" value="Custom">
        <label for="tipCustom">Custom</label>
    </div>

    <div id="orderReview">
        <h2>Order Review</h2>
        <!-- iterate over cart items and display here -->
        {#each $cart as item}
            <div>{item.name}</div>
            <div>{item.price}</div>
            <button on:click={(e) => {cart.addItem(item)}}>+</button>
            <button on:click={(e) => {cart.removeItem(item.name)}}>-</button>
            <div>Amount: {item.count}</div>
        {/each}
    </div>

    <div id="costDisplay">
        <!-- these values must be reactive-->
        <p>Subtotal: $0.00</p>
        <p>Fees & Estimated Tax: $0.00</p>
        <p>Tip: $0.00</p>
        <p id="totalCost">Total: $0.00</p>
    </div>

    <button on:click={(e) => handlePlaceOrder()}>
        Place Order
    </button>
</form>
    