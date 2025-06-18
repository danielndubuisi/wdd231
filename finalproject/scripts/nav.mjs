// navigattion script for soundsphere

const handleNavigation = () => {
    // select elements
    const navLinks = document.querySelectorAll(".nav-link");
    const nav = document.querySelector("nav");
    const ul = document.querySelector("ul");
    const menuBtn = document.querySelector("#menu");
    const wayfinder = document.querySelector(".heading");

    // set wayfinder and activelink based on current page
    const setActiveLink = () => {
        let currentPage = window.location.pathname.split("/").pop();
        if (currentPage === "" || currentPage === "index.html") {
            currentPage = "index.html";
            if (typeof getMembersData === "function") {
                getMembersData(true);
            }
        }

        const activeLink = currentPage === "index.html" ? "Home" : currentPage;

        navLinks.forEach((link) => {
            const linkPage = link.getAttribute("href");
            if (activeLink === linkPage) {
                link.classList.add("active");
                if (typeof getMembersData === "function") {
                    getMembersData(false);
                }
                if (wayfinder) wayfinder.textContent = link.textContent;
            } else if (activeLink === "Home") {
                if (wayfinder) wayfinder.textContent = "Home";
            } else {
                link.classList.remove("active");
            }
        });
    };

    // initialize active link and wayfinder on page load
    setActiveLink();

    // toggle menu on small screens (only if menuBtn exists)
    if (menuBtn && nav && ul) {
        menuBtn.addEventListener("click", () => {
            nav.classList.toggle("show");
            ul.classList.toggle("show");
            menuBtn.classList.toggle("show");
        });
    }

    // update wayfinder on link click (only if wayfinder exists)
    [...navLinks].forEach((link) => {
        link.addEventListener("click", () => {
            if (wayfinder) wayfinder.textContent = link.textContent;

            // close menu on small screens once link selected
            if (window.innerWidth < 659 && nav && ul && menuBtn) {
                nav.classList.toggle("show");
                ul.classList.toggle("show");
                menuBtn.classList.toggle("show");
            }
        });
    });
};


export default handleNavigation;