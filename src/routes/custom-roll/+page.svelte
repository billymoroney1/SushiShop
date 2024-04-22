<script lang="ts">
  import { cart } from '../stores'
  let cartCount: number = 0;
  cart.subscribe(value => {
  cartCount = cart.getTotalItemCount();
})
</script>

<div class='custom-roll-banner'>
    <img src='https://placehold.co/600x90' alt='custom roll banner' />
</div>


<h1>Your Roll</h1>
<p>Pick the ingredients for your handmade roll.</p>

<div class='custom-roll-ingredient-row'>
    <div class='ingredient-box-half'>
        <div class='ingredient-header'>
            <h4>Rice*</h4>
            <p>Choose one</p>
        </div>
        <div class='ingredient-icons-container'>
            <div class='ingredient-icon'>
                <img src='https://placehold.co/30x30' alt='white rice' />
                <p>White</p>
            </div>
            <div class='ingredient-icon'>
                <img src='https://placehold.co/30x30' alt='brown rice' />
                <p>Brown</p>
            </div>
        </div>
    </div>
    
    <div class='ingredient-box-half'>
        <div class='ingredient-header'>
            <h4>Fish*</h4>
            <p>Choose one</p>
        </div>
        <div class='ingredient-icons-container'>
            <div class='ingredient-icon'>
                <img src='https://placehold.co/30x30' alt='salmon' />
                <p>Salmon</p>
            </div>
            <div class='ingredient-icon'>
                <img src='https://placehold.co/30x30' alt='tuna' />
                <p>Tuna</p>
            </div>
        </div>
    </div>
</div>

<div class='custom-roll-ingredient-row'>
    <div class='ingredient-box-full'>
        <div class='ingredient-header'>
            <h4>Fillings*</h4>
            <p>Choose up to three</p>
        </div>
        <div class='ingredient-icons-container'>
            <div class='ingredient-icon'>
                <img src='https://placehold.co/30x30' alt='avocado' />
                <p>Avocado</p>
            </div>
            <div class='ingredient-icon'>
                <img src='https://placehold.co/30x30' alt='cucumber' />
                <p>Cucumber</p>
            </div>
            <div class='ingredient-icon'>
                <img src='https://placehold.co/30x30' alt='carrot' />
                <p>Carrot</p>
            </div>
            <div class='ingredient-icon'>
                <img src='https://placehold.co/30x30' alt='cream cheese' />
                <p>Cream Cheese</p>
            </div>
        </div>
    </div>
</div>

<div class='custom-roll-ingredient-row'>
    <div class='ingredient-box-full'>
        <div class='ingredient-header'>
            <h4>Toppings*</h4>
            <p>Choose up to three</p>
        </div>
        <div class='ingredient-icons-container'>
            <div class='ingredient-icon'>
                <img src='https://placehold.co/30x30' alt='tempura flakes' />
                <p>Tempura Flakes</p>
            </div>
            <div class='ingredient-icon'>
                <img src='https://placehold.co/30x30' alt='sesame seeds' />
                <p>Sesame Seeds</p>
            </div>
            <div class='ingredient-icon'>
                <img src='https://placehold.co/30x30' alt='spicy mayo' />
                <p>Spicy Mayo</p>
            </div>
            <div class='ingredient-icon'>
                <img src='https://placehold.co/30x30' alt='fish slices' />
                <p>Fish Slices</p>
            </div>
        </div>
    </div>
</div>


<h4>Comments</h4>
<div class='custom-roll-comments'>
    <textarea >Anything we need to know about your order?</textarea>
</div>

<h4>Order Details</h4>

<div class='cart-buttons'>
    <button>Add To Cart</button>
    <div class='cart-container'>
        <div class='quantity-buttons'>
            <button> - </button>
            <span>1</span>
            <button> + </button>
        </div>
        <div class="cart">
            <a href="/checkout">
                <img src='cart.png' alt='cart' />
            </a>
            <span class="cart-count">{cartCount}</span>
        </div>
    </div>
</div>


