// This file contains the navigation functionality for the website.
const navLinks = document.querySelectorAll(".nav-links");
const nav = document.querySelector("nav");
const ul = document.querySelector("ul");
const menuBtn = document.querySelector("#menu");

// toggle menu on small screens
menuBtn.addEventListener("click", () => {
    nav.classList.toggle("show");
    ul.classList.toggle("show");
    menuBtn.classList.toggle("show");
});

[...navLinks].map((link) => {
    link.addEventListener("click", () => {
        // close menu on small screens once link selected
        if (window.innerWidth < 659) {
            nav.classList.toggle("show");
            ul.classList.toggle("show");
            menuBtn.classList.toggle("show");
        }
    });
});
