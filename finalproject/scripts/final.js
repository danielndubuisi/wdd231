// import modules
import handleNavigation from "./nav.mjs";
import showFeaturedData from "./featured.mjs";

const currYear = document.querySelector("#currYear");
currYear.textContent = new Date().getFullYear();

handleNavigation();

if (document.querySelector(".cards")) {
    // show featured members on the home page
    showFeaturedData(true);
} else if (document.querySelector(".playlist-cards")) {
    // show all featured members on the featured page
    showFeaturedData(false);
}


