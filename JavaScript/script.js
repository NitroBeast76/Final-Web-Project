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

function detailsBoxOpen(element) {
  // climb up to the <figure> that wraps this <img>…
  const fig = element.closest("figure");
  if (!fig) return;
  // …then find & show its details-box
  fig.querySelector(".details-box").style.display = "block";
}

function detailsBoxClose(element, event) {
  event.stopPropagation(); // prevents parent clicks from firing
  element.closest(".details-box").style.display = "none";
}


