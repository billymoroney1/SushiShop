<script lang="ts">
  import type { PageData } from './$types'
  export let data: PageData;

  import { cart } from './stores'

  import './global.css'

  let cartCount: number = 0;
  cart.subscribe(value => {
    cartCount = cart.getTotalItemCount();
  })
</script>

<nav>
  {#if data.username === undefined}
  <a href='/login'>Login</a>
  {:else}
  <a href='/logout' data-sveltekit-preload-data data-sveltekit-reload>Logout</a>
  {/if}
  <div class="cart">
    <a href="/checkout">
      <img src='cart.png' alt='cart' />
    </a>
    <span class="cart-count">{cartCount}</span>
  </div>
</nav>

<slot />

<nav class='footer'>
  <a href='/'>Home</a>
  <a href='/menu'>Menu</a>
  <a href='/receipts'>Receipts</a>
  <a href='/account'>Account</a>
</nav>
