<script lang="ts">
    export let data: any;
    console.log(data);
</script>

<h1>Receipts</h1>

{#each data.orders as order}
    <div>
        <p>Order Id: {order.id}</p>
        <p>Order Total: {order.total}</p>
        <p>Order Status: {order.status}</p>
        <p>Order Date: {order.date}</p>
    </div>
{/each}

<!-- TODO: create an order again button that resets cart, sets with previous order contents, then goes to cart page-->