const container = document.querySelector(".container");
const allSeats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.querySelector("#count");
const totalPrice = document.querySelector("#total-price");
const movieSelector = document.querySelector("#movie");
let ticketPrice = +movieSelector.value;
selectedSeats = new Set();

populateUi();

container.addEventListener("click", (e) => {
  const classList = e.target.classList;
  if (classList.contains("seat") && !classList.contains("occupied")) {
    classList.toggle("selected");
  }
  classList.contains("seat") && countSelectedSeats(e.target);
});

movieSelector.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  saveMovie2LocalStorage(e.target.selectedIndex, e.target.value);
  updateCountAndPriceValues();
});

function countSelectedSeats(target) {
  if (target.classList.contains("selected")) {
    selectedSeats.add(target);
    saveSeats2LocalStorage();
  } else {
    selectedSeats.delete(target);
    removeSeatsFromLocalStorage();
  }
  updateCountAndPriceValues();
}

function updateCountAndPriceValues() {
  count.innerText = selectedSeats.size;
  totalPrice.innerText = selectedSeats.size * ticketPrice;
}

function saveSeats2LocalStorage() {
  selectedSeatsIndices = [];

  allSeats.forEach((seat, index) => {
    if (selectedSeats.has(seat)) selectedSeatsIndices.push(index);
  });
  localStorage.setItem("selectedSeats", JSON.stringify(selectedSeatsIndices));
}

function removeSeatsFromLocalStorage() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
}

function saveMovie2LocalStorage(index, value) {
  localStorage.setItem("selectedMovieIndex", index);
  localStorage.setItem("selectedMoviePrice", value);
}

function populateUi() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    allSeats.forEach((seat, index) => {
      if (selectedSeats.includes(index)) seat.classList.add("selected");
    });
  }
}
