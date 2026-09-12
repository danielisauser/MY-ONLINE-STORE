// ===============================================================
// BALENIÉ LUXURY JEWELS
// ===============================================================


//  CART

let cart = [];

const cartBtn = document.getElementById("cartBtn");
const cartPanel = document.getElementById("cart");
const closeCart = document.getElementById("closeCart");
const cartOverlay = document.getElementById("cartOverlay");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");


function openCart() {

    cartPanel.classList.add("active");

    cartOverlay.classList.add("active");
}


function closeCartPanel() {

    cartPanel.classList.remove("active");

    cartOverlay.classList.remove("active");
}


cartBtn.addEventListener("click", openCart);

closeCart.addEventListener("click", closeCartPanel);

cartOverlay.addEventListener("click", closeCartPanel);


// ADD TO CART

const addbuttons = document.querySelectorAll(".add-btn");

addbuttons.forEach(button => {

    button.addEventListener("click", () => {

        const product = button.closest(".product-card");

        const name = product.dataset.name;
        const price = Number(product.dataset.price);

        const existingProduct = cart.find(item => item.name == name);

        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({
                name: name,

                price: price,

                quantity: 1

            });

        }

        updateCart();

        openCart();

    });

});


// UPDATE CART

function updateCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

    } else {

        cart.forEach((item, index) => {

            const cartItem = document.createElement("div");

            cartItem.classList.add("cart-item");

            cartItem.innerHTML = `
                <div>
                    <h4>${item.name}</h4>

                    <p>
                        €${item.price.toLocaleString()}
                        x ${item.quantity}
                    </p>

                </div>

                <button
                    class="remove-item"
                    onclick="removeFromCart(${index})"
                >
                    Remove
                </button>

            `;

            cartItems.appendChild(cartItem);

        });

    }


    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const totalPrice = cart.reduce(
        (total, item) => total + (item.price * item.quantity),
        0
    );


    cartCount.textContent = totalItems;

    cartTotal.textContent =
        `€${totalPrice.toLocaleString()}`;

}


// REMOVE FROM CART

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


// ======================================================
// CATEGORY FILTER
// ======================================================

const categoryButtons =
    document.querySelectorAll(".category");

const products =
    document.querySelectorAll(".product-card");


categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const category =
            button.dataset.category;


        products.forEach(product => {

            if (
                category === "all" ||
                product.dataset.category === category
            ) {

                product.style.display = "";

            } else {

                product.style.display = "none";

            }

        });

    });

});


// ====================================================
// SEARCH
// ====================================================

const searchBtn =
    document.getElementById("searchBtn");

const searchBox =
    document.getElementById("searchbox");

const searchInput =
    document.getElementById("searchinput");


searchBtn.addEventListener("click", () => {

    searchBox.classList.toggle("active");

    if (searchBox.classList.contains("active")) {

        searchInput.focus();

    }
});


searchInput.addEventListener("input", () => {

    const search =
        searchInput.value.toLowerCase().trim();


    products.forEach(product => {

        const name =
            product.dataset.name.toLowerCase();

        if (name.includes(search)) {

            product.style.display = "";

        } else {

            product.style.display = "none";

        }

    });

});


// =================================================
// MOBILE MENU
// =================================================

const menuBtn =
    document.getElementById("menuBtn");

const nav =
    document.querySelector(".navbar nav");


menuBtn.addEventListener("click", () => {
    nav.classList.toggle("active");

});


// ==================================================
// NEWSLETTER
// ==================================================

const newsletterForm =
    document.getElementById("newsletterForm");

newsletterForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const email =
        newsletterForm.querySelector("input").value;

    alert(
        `Thanks for subscribing! We'll send updates to ${email}.`
    );

    newsletterForm.reset();

});

// ==================================================
// CHECKOUT
// ==================================================

const checkoutBtn =
    document.getElementById("checkoutBtn");

checkoutBtn.addEventListener("click", () => {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }


    const total =
        cart.reduce(
            (sum, item) =>
                sum + (item.price * item.quantity),
            0
        );

    alert(
        `Your order total is €${total.toLocaleString()}.\n\nCheckout/payment integration can be connected next.`
    );

});