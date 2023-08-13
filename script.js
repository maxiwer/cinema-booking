const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.querySelector('#count');
const totalPrice = document.querySelector('#total-price');
const movieSelector = document.querySelector('#movie');
let ticketPrice = + movieSelector.value;
let selectedSeatsCount = 0;

container.addEventListener('click', (e) => {
    const classList = e.target.classList;
    if (classList.contains('seat') && !classList.contains('occupied')) {
        classList.toggle('selected');
    }
    ;
    classList.contains('seat') && countSelectedSeats(classList);
});

movieSelector.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;
    updateCountAndPriceValues();
});

function countSelectedSeats(classList) {
    if (classList.contains('selected')) { selectedSeatsCount++ }
    else selectedSeatsCount--;
    updateCountAndPriceValues();
}

function updateCountAndPriceValues() {
    count.innerText = selectedSeatsCount;
    totalPrice.innerText = selectedSeatsCount * ticketPrice;
}