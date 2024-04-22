<script lang="ts">

    import { browser } from '$app/environment';
    import { cart } from './stores'

    export let data;

    if (data.userId !== undefined){
        if (browser) {
            localStorage.setItem("userId", data.userId)
        };
    }
    else{
        console.log("No user id");
    }

    let cartCount: number = 0;
    cart.subscribe(value => {
    cartCount = cart.getTotalItemCount();
    })

</script>

<div class='custom-roll-banner'>
    <img src='https://placehold.co/600x90' alt='home page banner' />
</div>

<div class='points-container'>
    <div class='points-box'>
        <div class='points-label'>
            <h3>Points</h3>
        </div>
        <div class='points-value'>
            <img src='https://placehold.co/10x10' alt='star' />
            <p>  x/1000</p>
        </div>
    </div>
    <div class='points-bar'></div>
    <span>Get a free roll with 1000 points! $1 = 10 points</span>
</div>

<div class='build-your-own-banner'>
    <img src='https://placehold.co/600x200' alt='home page banner' />
    <button class='build-your-own-button'>Build Your Own Roll</button>
</div>

<div class='repeat-order-banner'>
    <div class='repeat-order-row'>
        <h4>Order Again</h4>
        <a href='/menu'>View All</a>
    </div>
    <div class='repeat-order-carousel'>
        <img src='https://placehold.co/100x100' alt='roll' />
        <img src='https://placehold.co/100x100' alt='roll' />
        <img src='https://placehold.co/100x100' alt='roll' />
    </div>
</div>

<div class='bottom-button-row'>
    <button class='bottom-button'>View Menu</button>
    <div class="cart">
        <a href="/checkout">
            <img src='cart.png' alt='cart' />
        </a>
        <span class="cart-count">{cartCount}</span>
    </div>
</div>

<!-- <h2>hello {data.username}</h2> -->

<!--check cookies when page loads maybe?-->