function cartTravel(){
    location.href='cart.html'
}



function toggleHeartIcon(x){
    x.classList.toggle('far');
    x.classList.toggle('fas');
}


// 1. FIND ALL FILTER BUTTONS
const filterButtons = document.querySelectorAll(
    '#whole-filter-button-holder .filter-button[data-filter]'
);

// 2. FIND ALL PRODUCT CONTAINERS
const products = document.querySelectorAll('.product-grid > figure');

// 3. CREATE THE FILTER FUNCTION
function filter(category) {
    products.forEach(product => {
        if (category === 'all' || product.classList.contains(category)) {
            product.style.display = 'flex';
        } else {
            product.style.display = 'none';
        }
    });
}

// 4. SET UP CLICK LISTENERS FOR FILTER BUTTONS
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update button active states
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Apply filter
        filter(btn.getAttribute('data-filter'));
    });
});

// 5. INITIAL SETUP WHEN PAGE LOADS
filter('all');

function detailsBoxOpen(img) {
  let figure = img.parentElement;
  let box = figure.querySelector(".details-box");
  box.style.display = "block";
}

function detailsBoxClose(button, event) {
    event.stopPropagation();
  // Go up from the close button to the nearest .details-box
    let box = button.closest(".details-box");
    box.style.display = "none";
}


// Get key elements
const closeBtn = document.querySelector('.exit');
const buyBtn = document.querySelector('.buy');
const cartList = document.querySelector('.cart-list');

// Handle quantity change (increase/decrease)
cartList.addEventListener('click', e => {
    const isInc = e.target.classList.contains('increase');
    const isDec = e.target.classList.contains('decrease');
    if (isInc || isDec) {
        const qtySpan = e.target.parentElement.querySelector('span:nth-child(2)');
        let qty = parseInt(qtySpan.textContent);
        qtySpan.textContent = isInc ? qty + 1 : Math.max(1, qty - 1);
    }
});

// Hide cart on "CLOSE"
closeBtn.addEventListener('click', () => {
    document.querySelector('.cart-page').style.display = 'none';
});

// Handle "CHECK OUT"
buyBtn.addEventListener('click', () => {
    alert('Proceeding to checkout...');
});


function addToCartFromHeart(icon) {
    // Extract product info from data attributes
    const name = icon.getAttribute('data-name');
    const price = parseFloat(icon.getAttribute('data-price'));
    const image = icon.getAttribute('data-img');

    // Build a cart item object
    const newItem = {
        id: name.replace(/\s+/g, '-').toLowerCase(), // Use name as a unique ID (simplified)
        name: name,
        price: price,
        image: image,
        quantity: 1
    };

    // Load existing cart from localStorage or initialize
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if item already exists
    const index = cart.findIndex(item => item.id === newItem.id);

    if (index >= 0) {
        // If item exists, increase quantity
        cart[index].quantity += 1;
    } else {
        // Else, add new item
        cart.push(newItem);
    }

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Optional: change heart icon to filled
    icon.classList.remove('far');
    icon.classList.add('fas');

    // Optional: confirmation
    alert(`${name} added to cart!`);
}
