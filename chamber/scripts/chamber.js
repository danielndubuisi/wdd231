const navLinks = document.querySelectorAll(".nav-link");
const nav = document.querySelector("nav");
const ul = document.querySelector("ul");
const menuBtn = document.querySelector("#menu");
const wayfinder = document.querySelector(".heading");
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const cards = document.querySelector(".cards");

const getMembersData = async () => {
    const response = await fetch("data/members.json");
    const data = await response.json();
    displayMembers(data.companies);
};

const displayMembers = (members) => {
    members.forEach((member) => {
        // create card elements
        let card = document.createElement("div");
        let heading = document.createElement("h3");
        let subHeading = document.createElement("small");
        let line = document.createElement("hr");
        let details = document.createElement("div");
        let content = document.createElement("div");
        let memberImg = document.createElement("img");
        let email = document.createElement("p");
        let phone = document.createElement("p");
        let url = document.createElement("p");

        // add classes to card
        card.classList.add("card");
        details.classList.add("details");
        content.classList.add("contact");

        // provide values
        heading.textContent = `${member.name}`;
        subHeading.textContent = `${member.tagLine}`;
        memberImg.setAttribute("src", "images/company.webp");
        memberImg.setAttribute("alt", "company-img");
        memberImg.setAttribute("loading", "lazy");
        email.innerHTML = `<b>EMAIL</b>: <span>${member.email}</span>`;
        phone.innerHTML = `<b>PHONE</b>: <span>${member.phone}</span>`;
        url.innerHTML = `<b>URL</b>: <span>${member.website}</span>`;

        // append content to card contact
        content.append(email);
        content.append(phone);
        content.append(url);

        // append details to card details div
        details.append(memberImg);
        details.append(content);

        // append to card
        card.append(heading);
        card.append(subHeading);
        card.append(line);
        card.append(details);

        // append card to cards div
        cards.append(card);
    });
};

// fetch and display members
getMembersData();

// set wayfinder and activelink based on current page
const setActiveLink = () => {
    const currentPage = window.location.pathname.split("/").pop();
    // if currentPage is directory, set it to index.html
    const activeLink = currentPage === "directory.html" ? "Home" : currentPage;

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
