// import modules
import handleNavigation from "./nav.mjs";

const currYear = document.querySelector("#currYear");
currYear.textContent = new Date().getFullYear();


handleNavigation();

