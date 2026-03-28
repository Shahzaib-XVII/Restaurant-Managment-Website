document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    localStorage.setItem('user', document.getElementById('username').value);
    window.location.href = 'dashboard.html';
});

function logout() {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

function submitReview() {
    const reviewText = document.getElementById('reviewText').value;
    if (reviewText) {
        const reviewList = document.getElementById('reviewsList');
        const li = document.createElement('li');
        li.textContent = reviewText;
        reviewList.appendChild(li);
        document.getElementById('reviewText').value = '';
    }
}
document.addEventListener("DOMContentLoaded", function() {
    console.log("Welcome to the Restaurant Review System!");
});

document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    localStorage.setItem('user', document.getElementById('username').value);
    window.location.href = 'dashboard.html';
});


function openModal(id) {
    document.getElementById(id).style.display = 'flex';
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    let modals = document.querySelectorAll('.modal');
    modals.forEach((modal) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
};


// Select Restaurant
function selectRestaurant(name) {
    document.getElementById("selected-restaurant").textContent = name;
}

// Star Rating System
const stars = document.querySelectorAll('.star');
let selectedRating = 0;

stars.forEach(star => {
    star.addEventListener('mouseover', function () {
        let value = this.getAttribute('data-value');
        highlightStars(value);
    });

    star.addEventListener('click', function () {
        selectedRating = this.getAttribute('data-value');
        highlightStars(selectedRating);
    });

    star.addEventListener('mouseleave', function () {
        highlightStars(selectedRating);
    });
});

function highlightStars(value) {
    stars.forEach(star => {
        star.classList.remove('active');
        if (star.getAttribute('data-value') <= value) {
            star.classList.add('active');
        }
    });
}

// Search Bar Filter
function filterRestaurants() {
    let searchValue = document.getElementById("search-box").value.toLowerCase();
    let restaurants = document.querySelectorAll(".restaurant");

    restaurants.forEach(restaurant => {
        let name = restaurant.querySelector("h3").textContent.toLowerCase();
        if (name.includes(searchValue)) {
            restaurant.style.display = "block";
        } else {
            restaurant.style.display = "none";
        }
    });
}

// Submit Review
function submitReview() {
    let restaurant = document.getElementById("selected-restaurant").textContent;
    let reviewText = document.getElementById("review-text").value;

    if (!selectedRating || reviewText.trim() === "[Select a restaurant]") {
        alert("Please select a restaurant, give a rating, and write a review!");
        return;
    }

    alert(`Review Submitted!\n\nRestaurant: ${restaurant}\nRating: ${selectedRating} stars\nReview: ${reviewText}`);
}

// dynamic username
