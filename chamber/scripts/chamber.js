// import modules
import displayWeather from "./weather.mjs";
import getMembersData from "./cards.mjs";

// select elements
const navLinks = document.querySelectorAll(".nav-link");
const nav = document.querySelector("nav");
const ul = document.querySelector("ul");
const menuBtn = document.querySelector("#menu");
const wayfinder = document.querySelector(".heading");
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const cards = document.querySelector(".cards");

// get current weather
displayWeather();

// toggle grid and list view
gridbutton.addEventListener("click", () => {
    // display grid view
    cards.classList.add("cards");
    cards.classList.remove("list");
});

listbutton.addEventListener("click", () => {
    cards.classList.add("list");
    cards.classList.remove("grid");
});

// set wayfinder and activelink based on current page
const setActiveLink = () => {
    let currentPage = window.location.pathname.split("/").pop();
    // if currentPage is empty, set it to index.html
    if (currentPage === "" || currentPage === "index.html") {
        currentPage = "index.html";
        // fetch and display gold and silver members only
        getMembersData(true);
    }

    const activeLink = currentPage === "index.html" ? "Home" : currentPage;

    navLinks.forEach((link) => {
        const linkPage = link.getAttribute("href");
        if (activeLink === linkPage) {
            link.classList.add("active");
            getMembersData(false); // fetch and display all members
            wayfinder.textContent = link.textContent;
        } else if (activeLink === "Home") {
            wayfinder.textContent = "Home";
        } else {
            link.classList.remove("active");
        }
    });
};

// initialize active link and wayfinder on page load
setActiveLink();

// toggle menu on small screens
menuBtn.addEventListener("click", () => {
    nav.classList.toggle("show");
    ul.classList.toggle("show");
    menuBtn.classList.toggle("show");
});

// update wayfinder on link click
[...navLinks].map((link) => {
    link.addEventListener("click", () => {
        wayfinder.textContent = link.textContent;

        // close menu on small screens once link selected
        if (window.innerWidth < 659) {
            nav.classList.toggle("show");
            ul.classList.toggle("show");
            menuBtn.classList.toggle("show");
        }
    });
});
