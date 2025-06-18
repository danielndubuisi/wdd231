const year = document.querySelector("#currentyear");
const today = new Date();
if(year){
    year.innerHTML = `${today.getFullYear()}`;
}

const modified = document.querySelector("#lastModified");
let lastModified = document.lastModified;
if (modified) {
    modified.innerHTML = `Last Modification: ${lastModified}`;
}

console.log(year);

