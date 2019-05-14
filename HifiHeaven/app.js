
let total = 0;
var cart = [];
let output = '';
let container = document.querySelector('.container');
let cartView = document.querySelector('#cart-view'); // cart window
let cartList = document.querySelector('#cartList'); 
let cartValue = document.querySelector('#cartValue'); // total cart value
let viewCartBtn = document.querySelector('#viewCartBtn');
let cartContainer = document.querySelector('#cart-container');
let closeCart = document.querySelector('#closeModal').addEventListener('click', closeModal);
let addedModal = document.querySelector('#addedModal');


window.addEventListener('load', () => {
    viewCartBtn.style.display = 'none';
    if(localStorage.getItem('hifi_cart').length > 0) {
        cart = JSON.parse(localStorage.getItem('hifi_cart'));
        viewCartBtn.style.display = 'block';
    } 
})

// shows or hides view cart button depending on contents of cart
/*
if (cart.length < 1) {
    viewCartBtn.style.display = 'none';
} else {
    viewCartBtn.style.display = 'block';
    localStorage.setItem("hifi_cart", JSON.stringify(cart));
}
*/

// Add item to cart
function addToCart(name, price) {
    var cart_item = {
        name: name,
        price: price
    };
    cart.push(cart_item);
    localStorage.setItem("hifi_cart", JSON.stringify(cart));
    if (cart.length > 0) {
        viewCartBtn.style.display = 'block';
    } else {
        viewCartBtn.style.display = 'none'
    }
    addedModal.style.display = 'block'
    setTimeout(function() {
        addedModal.style.display = 'none'
    }, 1500)
}

// View cart, only if cart has items in it
function viewcart() {
    if(!localStorage.getItem("hifi_cart")) {
        return;
    } else {
        cartList.innerHTML = '';
        cart = JSON.parse(localStorage.getItem("hifi_cart"));
        total = 0;
        let output = '';
        if(cart.length > 0) {
            cart.forEach(populateCart);
        }
        viewCartBtn.style.display = 'none';
    }
}

// Create cart list to be displayed
function populateCart(item) {
    output = `<li data-name='${item.name}' data-price=${item.price}>${item.name} :   £${item.price}<i class="deleteBtn fas fa-trash-alt justify-self-end"></i></li>`;
    cartList.innerHTML += output;
    total += parseFloat(item.price);
    cartValue.innerHTML = `<h4>Total Order Price £${total}</h4>`;
}

// Place order - disabled in demo version
function placeOrder() {
    alert('Order placement disabled in profile version');
}

// close cart modal
function closeModal() {
    if(cart.length > 0) {
        viewCartBtn.style.display = 'block';
    }
    
}

// set up event listener on cart delete buttons
cartList.addEventListener('click', function(e) {
    if(e.target.classList.contains('deleteBtn')) {
        /* get and remove Li element from UL */
        const li = e.target.parentElement;
        cartList.removeChild(li);

        /* remove deleted item from cart */
        let updatedCart = cart.filter(item => {
            return item.name != li.getAttribute('data-name')
        })
        // Update cart and localStorage
        cart = updatedCart;
        localStorage.setItem("hifi_cart", JSON.stringify(cart))

        /* update cart total price on removal of item */
        total -= parseFloat(li.getAttribute('data-price'));
        cartValue.innerHTML = `<h4>Total Order Price £${total}</h4>`;

    }
})

window.addEventListener('unload', () => {  
    if(cart.length > 0) {
        localStorage.setItem('hifi_cart', JSON.stringify(cart));
    } else {
        localStorage.removeItem('hifi_cart');
    }
})

