// Redirects the browser to the shopping cart page when invoked
// - Called when the user clicks a "View Cart" button
function cartTravel() {
    // Changes the current URL to 'cart.html', loading that page
    location.href = 'cart.html';
}

// Toggles the heart icon between empty and filled states
// - x is the <i> element representing the heart icon
function toggleHeartIcon(x) {
    // Font Awesome "regular" style (outline) uses class 'far'
    // Remove it if present, or add if missing
    x.classList.toggle('far');
    // Font Awesome "solid" style (filled) uses class 'fas'
    // Remove it if present, or add if missing
    x.classList.toggle('fas');
}

// 1. FIND ALL FILTER BUTTONS
// - These buttons allow users to filter products by category
// - Each button has a data-filter attribute, e.g. data-filter="vantaFlare"
const filterButtons = document.querySelectorAll(
    '#whole-filter-button-holder .filter-button[data-filter]'
);

// 2. FIND ALL PRODUCT CONTAINERS
// - Each product is wrapped in a <figure> inside the .product-grid container
const products = document.querySelectorAll('.product-grid > figure');

// 3. CREATE THE FILTER FUNCTION
// - Shows only the products matching the selected category
// - Passing 'all' displays every product
function filter(category) {
    products.forEach(product => {
        // If "all" is selected OR the product element has the matching class
        if (category === 'all' || product.classList.contains(category)) {
            // Use CSS flex to make the product visible in the grid
            product.style.display = 'flex';
        } else {
            // Hide non-matching products so they no longer occupy space
            product.style.display = 'none';
        }
    });
}

// 4. SET UP CLICK LISTENERS FOR FILTER BUTTONS
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove the 'active' class from every button to reset highlights
        filterButtons.forEach(b => b.classList.remove('active'));
        // Add 'active' to the clicked button to indicate selection
        btn.classList.add('active');
        
        // Call the filter function with the button's data-filter value
        const category = btn.getAttribute('data-filter');
        filter(category);
    });
});

// 5. INITIAL SETUP WHEN PAGE LOADS
// - Automatically display all products before any filter is chosen
filter('all');

// Opens the product details overlay when a product image is clicked
function detailsBoxOpen(img) {
    // The image is inside a <figure>; get that parent element
    let figure = img.parentElement;
    // Within the figure, find the child element with class 'details-box'
    let box = figure.querySelector(".details-box");
    // Make the hidden overlay visible by setting its display to block
    box.style.display = "block";
}

// Closes the product details overlay when the close button is clicked
function detailsBoxClose(button, event) {
    // Prevent this click from triggering parent click handlers
    event.stopPropagation();
    // Starting from the close button, find the nearest ancestor with class 'details-box'
    let box = button.closest(".details-box");
    // Hide the overlay again
    box.style.display = "none";
}

// Get key elements on the cart page for further interactions
const closeBtn = document.querySelector('.exit');     // "Close" button to hide the cart
const buyBtn   = document.querySelector('.buy');      // "Checkout" button to proceed
const cartList = document.querySelector('.cart-list'); // Container that holds cart items

// Handle clicks inside the cart list for quantity adjustments
cartList.addEventListener('click', e => {
    // Check if the clicked element is the plus or minus button
    const isInc = e.target.classList.contains('increase');
    const isDec = e.target.classList.contains('decrease');
    if (isInc || isDec) {
        // Find the <span> showing the quantity (it's the 2nd child of the button's parent)
        const qtySpan = e.target.parentElement.querySelector('span:nth-child(2)');
        // Convert its text (e.g. "3") into a number
        let qty = parseInt(qtySpan.textContent);
        // If increasing, add 1; if decreasing, subtract 1 but never go below 1
        qtySpan.textContent = isInc ? qty + 1 : Math.max(1, qty - 1);
    }
});

// Hide the entire cart page overlay when the user clicks "CLOSE"
closeBtn.addEventListener('click', () => {
    document.querySelector('.cart-page').style.display = 'none';
});

// Handle the "CHECK OUT" action
buyBtn.addEventListener('click', () => {
    // Temporary alert; in production, this would redirect to a payment gateway
    alert('Proceeding to checkout...');
});

// Adds a product to the user's cart when they click the heart icon
function addToCartFromHeart(icon) {
    // Read product details stored in HTML data-attributes on the icon
    const name  = icon.getAttribute('data-name');   // Product name
    const price = parseFloat(icon.getAttribute('data-price')); // Price as a number
    const image = icon.getAttribute('data-img');    // URL or path to the product image

    // Create a JS object representing the cart entry
    const newItem = {
        // Generate a simple ID: lowercase name with spaces turned into hyphens
        id: name.replace(/\s+/g, '-').toLowerCase(),
        name: name,
        price: price,
        image: image,
        quantity: 1
    };

    // Load any existing cart from localStorage, or start fresh if none exists
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if this product is already in the cart array
    const index = cart.findIndex(item => item.id === newItem.id);

    if (index >= 0) {
        // If found, simply increment its quantity
        cart[index].quantity += 1;
    } else {
        // Otherwise, add this new product object into the cart
        cart.push(newItem);
    }

    // Save the updated cart array back to localStorage for persistence
    localStorage.setItem('cart', JSON.stringify(cart));

    // Visually fill in the heart icon to show it's been added
    icon.classList.remove('far');
    icon.classList.add('fas');

    // Quick confirmation to the user
    alert(`${name} added to cart!`);
}
