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

const noProductsMessage =
    document.getElementById("noProductsMessage");

function applyCategory(category) {

    categoryButtons.forEach(button =>
        button.classList.toggle("active", button.dataset.category === category)
    );

    let visibleProducts = 0;

    products.forEach(product => {

        const isVisible =
            category === "all" ||
            product.dataset.category === category;

        product.style.display = isVisible ? "" : "none";

        if (isVisible) visibleProducts++;

    });

    noProductsMessage.hidden = visibleProducts > 0;
}


categoryButtons.forEach(button => {

    button.addEventListener("click", () => {
        applyCategory(button.dataset.category);

    });

});

document.querySelectorAll(".collection-filter").forEach(link => {

    link.addEventListener("click", () => {
        applyCategory(link.dataset.category);
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

const emailjsConfig = {
    publicKey: "C1_XC4UY6s1El_dre",
    serviceId: "service_szurq5t",
    confirmationTemplateId: "template_7m0kd3i"
};

emailjs.init({
    publicKey: emailjsConfig.publicKey
});

const checkoutBtn =
    document.getElementById("checkoutBtn");

const bankDetails = {
    bankName: "Nickel",
    accountName: "Ms. Eniola Adelayo Kolawole",
    accountNumber: "40001325120",
    iban: "FR7616598000014000132512058"
};

checkoutBtn.addEventListener("click", async () => {

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

    const orderReference = `BAL-${Date.now()}`;

    const customerEmail = prompt("Enter your email to receive your order confirmation:");

    if (!customerEmail || !customerEmail.includes("@")) {
        alert("Please enter a valid email address to continue.");
        return;
    }

    const orderItems = cart
        .map(item => `${item.name} x ${item.quantity}`)
        .join(", ");

    try {
        await emailjs.send(
            emailjsConfig.serviceId,
            emailjsConfig.confirmationTemplateId,
            {
                to_email: customerEmail,
                customer_email: customerEmail,
                customer_name: "Customer",
                order_reference: orderReference,
                order_total: `€${total.toLocaleString()}`,
                order_items: orderItems
            }
        );

        alert(`Your order has been received. A confirmation email has been sent to ${customerEmail}.\n\nOrder reference: ${orderReference}`);
    } catch (error) {
        console.error("Order confirmation email failed:", error);
        alert("Your order details were prepared, but the confirmation email could not be sent. Please contact us.");
    }

    alert(`Order reference: ${orderReference}

Your order total is €${total.toLocaleString()}.

Bank transfer details:
Bank: ${bankDetails.bankName}
Account name: ${bankDetails.accountName}
Account number: ${bankDetails.accountNumber}
IBAN / Sort code: ${bankDetails.iban}
Payment reference: ${orderReference}

Your order will be processed after payment is confirmed.`);

});