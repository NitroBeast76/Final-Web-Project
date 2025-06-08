function toggleHeartIcon(x){
    x.classList.toggle('far');
    x.classList.toggle('fas');
}


// Gather all buttons that have a data-filter attribute
const filterButtons = document.querySelectorAll(
    '#whole-filter-button-holder .filter-button[data-filter]'
);

// Gather all product figures
const products = document.querySelectorAll('.product-grid > figure');

function filter(category) {
    products.forEach(product => {
        product.style.display =
            category === 'all' || product.classList.contains(category)
                ? 'flex' // ← must be "flex" to match your CSS
                : 'none';
    });
}

// Attach click listeners to each filter button
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove "active" from all buttons, then add to the clicked one
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Apply filter
        filter(btn.getAttribute('data-filter'));
    });
});

// On page load, show all products
filter('all');


function detailsBoxOpen(element) {
    element.querySelector(".details-box").style.display = "block";
}

function detailsBoxClose(element, event) {
    event.stopPropagation(); // prevents parent clicks from firing
    element.closest(".details-box").style.display = "none";
}

