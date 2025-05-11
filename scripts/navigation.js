// This file contains the navigation functionality for the website.
const navLinks = document.querySelectorAll(".nav-link");
const nav = document.querySelector("nav");
const ul = document.querySelector("ul");
const menuBtn = document.querySelector("#menu");
const wayfinder = document.querySelector(".heading");

// set wayfinder and activelink based on current page
const setActiveLink = () => {
    const currentPage = window.location.pathname.split("/").pop();
    // if currentPage is empty or index, set it to index.html
    const activeLink =
        currentPage === "" || currentPage === "index" ? "Home" : currentPage;

    navLinks.forEach((link) => {
        const linkPage = link.getAttribute("href");
        if (activeLink === linkPage) {
            link.classList.add("active");
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
