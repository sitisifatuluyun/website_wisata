import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';

document.addEventListener('DOMContentLoaded', () => {
    const restaurantList = document.getElementById('restaurant-list');
    const restaurantDetail = document.getElementById('restaurant-detail');
    const menuIcon = document.getElementById('menu-icon');
    const drawer = document.getElementById('drawer');

    function showRestaurantList() {
        restaurantList.classList.remove('hidden');
        restaurantDetail.classList.add('hidden');
    }

    function showRestaurantDetail(restaurant) {
        restaurantList.classList.add('hidden');
        restaurantDetail.classList.remove('hidden');
        restaurantDetail.innerHTML = `
            <button id="back-button">Back to list</button>
            <img src="${restaurant.pictureId}" alt="${restaurant.name}" width="300">
            <div class="restaurant-info">
                <h2>${restaurant.name}</h2>
                <p>${restaurant.description}</p>
                <p>City: ${restaurant.city}</p>
                <p>Rating: ${restaurant.rating}</p>
            </div>
        `;

        document.getElementById('back-button').addEventListener('click', showRestaurantList);
    }

    fetch('../data/data2.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            data.restaurants.forEach(restaurant => {
                const restaurantItem = document.createElement('div');
                restaurantItem.classList.add('restaurant-item');
                restaurantItem.innerHTML = `
                    <img src="${restaurant.pictureId}" alt="${restaurant.name}" width="200">
                    <div class="restaurant-info">
                        <h2><a href="#" class="restaurant-link" data-id="${restaurant.id}">${restaurant.name}</a></h2>
                        <p>${restaurant.description}</p>
                        <p>City: ${restaurant.city}</p>
                        <p>Rating: ${restaurant.rating}</p>
                    </div>
                `;
                restaurantList.appendChild(restaurantItem);

                restaurantItem.querySelector('.restaurant-link').addEventListener('click', (event) => {
                    event.preventDefault();
                    showRestaurantDetail(restaurant);
                });
            });
        })
        .catch(error => console.error('Error fetching restaurant data:', error));

    menuIcon.addEventListener('click', () => {
        const isOpen = drawer.classList.contains('open');
        drawer.setAttribute('aria-hidden', isOpen);
        drawer.classList.toggle('open');
    });

    // Close the drawer if clicked outside
    document.addEventListener('click', (event) => {
        if (!drawer.contains(event.target) && event.target !== menuIcon) {
            drawer.setAttribute('aria-hidden', true);
            drawer.classList.remove('open');
        }
    });
});
