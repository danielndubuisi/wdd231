const url =
    "https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json";
const cards = document.querySelector("#cards");

const getProphetData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    // console.table(data)
    displayProphets(data.prophets);
};

const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        // create elements
        let card = document.createElement("section");
        let fullName = document.createElement("h2");
        let details = document.createElement("div");
        let portrait = document.createElement("img");

        // populate values
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        details.innerHTML = `<p>Date of Birth: ${prophet.birthdate}</p><p>Place of Birth: ${prophet.birthplace}</p>`;
        portrait.setAttribute("src", prophet.imageurl);
        portrait.setAttribute(
            "alt",
            `Portrait of ${prophet.name} ${prophet.lastname}`
        );
        portrait.setAttribute("loading", "lazy");
        portrait.setAttribute("width", "200");
        portrait.setAttribute("height", "250");

        // append to card
        card.appendChild(fullName);
        card.appendChild(details);
        card.appendChild(portrait);

        // add card to cards div
        cards.appendChild(card);
    });
};

getProphetData();
