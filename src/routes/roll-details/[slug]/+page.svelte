<script lang="ts">
    import type { Item } from "$lib/types.d.ts";
    import { goto } from "$app/navigation";

    export let data;

    import { cart } from '../../stores'
    let cartCount: number = 0;
        cart.subscribe(value => {
        cartCount = cart.getTotalItemCount();
        //should price change based on additions?
    })

    // this isn't really used right now but will be if calculations come into play with additions
    let price = data.props.roll?.price;

    let selectedAdditions: string[] = [];

    let commentsPlaceholder = 'Anything we should know about your order?'

    let ingredients = data.props.roll?.ingredients;
    let ingredientsCommaSeparated = "";
    for (const ingredient of ingredients || []){
        ingredientsCommaSeparated += ingredient + ", ";
    }
    // remove last comma from ingredientsCommaSeparated
    ingredientsCommaSeparated = ingredientsCommaSeparated.slice(0, -2);

    // function to add an addition to the roll
    // Mouse event annotation

    function addOrRemoveAdditionToRoll(addition: string){
        const selector = addition.toLowerCase().replace(" ", "");
        const additionButton = document.querySelector('#' + selector + '-icon');
        if (selectedAdditions.includes(addition)){
            selectedAdditions = selectedAdditions.filter(item => item !== addition);
            additionButton?.classList.remove('selected');
        } else {
            if (selectedAdditions.length < 3){
                selectedAdditions.push(addition);
            }
            additionButton?.classList.add('selected');
        }
        console.log("Selected additions: ", selectedAdditions);
    }

    function addToCart(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement; }){
        console.log("Add to cart")

        let comments: string = (document.querySelector('.comments-section textarea') as HTMLTextAreaElement).value;
        if (comments == commentsPlaceholder){
            comments = "";
        }
        const item: Item = {
            id: parseInt(data.props.roll?.slug!),
            name: data.props.roll?.name!,
            image: data.props.roll?.image!,
            ingredients: ingredientsCommaSeparated,
            price: price!,
            additions: selectedAdditions,
            comments: comments,
            count: 1
        }
        cart.addItem(item)
        goto('/checkout')
    }   
</script>

<div class='roll-img-banner'>
    <img src={data.props.roll?.image} alt='roll banner' />
</div>

<h1>{data.props.roll?.name}</h1>
<p>{data.props.roll?.description}</p>

<div class='roll-additions-row'>
    <div class='roll-additions-header'>
        <h4>Additions</h4>
        <p>Choose up to three</p>
    </div>
    <div class='additions-items-box'>
        {#each data.props.roll?.additions || [] as addition}
            <div on:click={(e) => addOrRemoveAdditionToRoll(addition.name)} on:keydown={(e) => e.key === 'Enter' && addOrRemoveAdditionToRoll(addition.name)} class='roll-addition-icon' id='{addition.name.toLowerCase().replace(" ", "")}-icon'>
                <img src={addition.image} alt={addition.name} />
                <p>{addition.name}</p>
            </div>
        {/each}
    </div>
</div>

<div class='comments-section'>
    <h4>Comments</h4>
    <textarea rows='4' cols='50' placeholder='Anything we should know about your order?'></textarea>
</div>

<div class='add-to-cart-row'>
    <button on:click={(e) => addToCart(e)} class='add-to-cart-button'>Add to Cart</button>
</div>

<div class='ingredient-list'>
    <h4>Ingredients</h4>
    <p>{ingredientsCommaSeparated}</p>
</div>

<div class='bottom-button-row'>
    <div class="cart">
        <a href="/checkout">
            <img src='../cart.png' alt='cart' />
        </a>
        <span class="cart-count">{cartCount}</span>
    </div>
</div>