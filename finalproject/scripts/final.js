// import modules
import handleNavigation from "./nav.mjs";
import showFeaturedData from "./featured.mjs";
import displayFormInfo from "./thanks.mjs";
import displayLastVisitMessage from "./storage.mjs";

const currYear = document.querySelector("#currYear");
currYear.textContent = new Date().getFullYear();

// handle all page navigation
handleNavigation();

// if on the home page, display featured members
if (document.querySelector(".cards")) {
    showFeaturedData(true);
}

// if on the thank you page, display form info
if (document.querySelector(".thank") && displayFormInfo) {
    displayFormInfo();
}

// if on the playlist page, display playlists
if (document.querySelector(".playlist-grid")) {
    import("./playlist.mjs").then((module) => {
        module.default(); // Call the default export function to display playlists
    }).catch((error) => {
        console.error("Error loading playlist module:", error);
    });
}

if (document.querySelector('.visit')) {
    displayLastVisitMessage();
}
