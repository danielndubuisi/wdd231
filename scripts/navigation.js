// This file contains the navigation functionality for the website.
const navLinks = document.querySelectorAll(".nav-link");
const nav = document.querySelector("nav");
const ul = document.querySelector("ul");
const menuBtn = document.querySelector("#menu");
const wayfinder = document.querySelector(".heading");

// toggle menu on small screens
menuBtn.addEventListener("click", () => {
    nav.classList.toggle("show");
    ul.classList.toggle("show");
    menuBtn.classList.toggle("show");
});

[...navLinks].map((link) => {
    // default wayfinder value
    wayfinder.textContent = "Home";

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
