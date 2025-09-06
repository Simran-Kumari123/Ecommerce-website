// Select elements from the DOM
const cartItemsContainer = document.getElementById("cart-items");
const totalItemsSpan = document.getElementById("total-items");
const totalPriceSpan = document.getElementById("total-price");

// Load cart items from local storage
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

// Function to update the cart display
function updateCartDisplay() {
    cartItemsContainer.innerHTML = ""; // Clear the current cart items

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>"; // Show empty cart message
    } else {
        cartItems.forEach(item => {
            // Create a new div for each cart item
            const cartItemDiv = document.createElement("div");
            cartItemDiv.className = "cart-item";
            cartItemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <span class="item-name">${item.name}</span>
                <span class="item-price">$${item.price}</span>
                <span class="item-quantity">Quantity: <input type="number" value="${item.quantity}" min="1" class="item-quantity-input" data-name="${item.name}"></span>
                <button class="remove-item" data-name="${item.name}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItemDiv); // Append the new item to the cart
        });

        // Update total items and price
        const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        totalItemsSpan.textContent = totalQuantity;
        totalPriceSpan.textContent = `$${totalPrice}`;
    }
}

// Function to save cart items to local storage
function saveCartItems() {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

// Function to add item to cart
function addToCart(name, price, image) {
    const existingItem = cartItems.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++; // Increase quantity if item exists
    } else {
        // Assuming your images are stored in the "images" folder
        const imageUrl = `images/${image}`;
        cartItems.push({ name, price: parseFloat(price), image: imageUrl, quantity: 1 }); // Add new item with full image path
    }
    saveCartItems(); // Save cart items to local storage
    updateCartDisplay(); // Update cart display
}

// Event delegation for adding items to cart
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", (event) => {
        const name = event.target.getAttribute("data-name");
        const price = event.target.getAttribute("data-price");
        const image = event.target.getAttribute("data-image");
        addToCart(name, price, image); // Call the addToCart function
    });
});

// Function to remove item from cart
function removeItem(name) {
    cartItems = cartItems.filter(item => item.name !== name); // Remove item from cart
    saveCartItems(); // Save updated cart items to local storage
    updateCartDisplay(); // Update cart display
}

// Event delegation for removing items from cart
cartItemsContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-item")) {
        const name = event.target.getAttribute("data-name");
        removeItem(name); // Remove item from cart
    }
});

// Event delegation for quantity changes
cartItemsContainer.addEventListener("input", (event) => {
    if (event.target.classList.contains("item-quantity-input")) {
        const name = event.target.getAttribute("data-name");
        const newQuantity = parseInt(event.target.value);
        const item = cartItems.find(item => item.name === name);
        if (item) {
            item.quantity = newQuantity; // Update quantity
            saveCartItems(); // Save updated cart items to local storage
            updateCartDisplay(); // Update cart display
        }
    }
});

// Initialize the cart display on page load
updateCartDisplay();
