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
        let subHeading = document.createElement("small")
        let line = document.createElement("hr")
        let email = document.createElement("p");
        let phone = document.createElement("p");
        let url = document.createElement("p");
        
        // provide values
        heading.textContent = `${member.name}`;
        subHeading.textContent = `${member.tagLine}`;
        email.innerHTML = `<b>EMAIL</b>: <span>${member.email}</span>`;
        phone.innerHTML = `<b>PHONE</b>: <span>${member.phone}</span>`;
        url.innerHTML = `<b>URL</b>: <span>${member.website}</span>`;

        // append to card
        card.append(heading);
        card.append(subHeading);
        card.append(line);
        card.append(email);
        card.append(phone);
        card.append(url);

        // append card to cards div
        cards.append(card);
    });
};

// fetch and display members
getMembersData();
