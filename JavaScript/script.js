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



