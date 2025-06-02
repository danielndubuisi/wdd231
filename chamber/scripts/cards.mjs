const getMembersData = async (spotlight) => {
    const response = await fetch("data/members.json");
    const data = await response.json();

    // get only gold and silver members if on home page
    if (spotlight) {
        // filter members where 1 = gold, 2 = silver
        const spotlightMembers = data.companies.filter(
            (member) =>
                member.membershipLevel === 1 || member.membershipLevel === 2
        );
        // randomize and limit the spotlight members
        spotlightMembers.sort(() => Math.random() - 0.5);
        spotlightMembers.length = Math.min(spotlightMembers.length, 3); // limit to 3 members

        displayMembers(spotlightMembers);
    } else {
        // show all members
        displayMembers(data.companies);
    }
};

const displayMembers = (members) => {
    // get the cards container
    const cards = document.querySelector(".cards");
    members.forEach((member) => {
        // create card elements
        let card = document.createElement("div");
        let heading = document.createElement("h3");
        let subHeading = document.createElement("small");
        let line = document.createElement("hr");
        let details = document.createElement("div");
        let content = document.createElement("div");
        let memberImg = document.createElement("img");
        let phone = document.createElement("p");
        let url = document.createElement("p");
        let address = document.createElement("p");
        let level = document.createElement("p");

        // add classes to card
        card.classList.add("card");
        details.classList.add("details");
        content.classList.add("contact");

        // provide values
        heading.textContent = `${member.name}`;
        subHeading.textContent = `${member.tagLine}`;
        memberImg.setAttribute("src", `images/${member.icon}`);
        memberImg.setAttribute("alt", "company-img");
        memberImg.setAttribute("loading", "lazy");
        address.innerHTML = `<b>ADDRESS:</b> <span>${member.address}</span>`;
        phone.innerHTML = `<b>PHONE:</b> <span>${member.phone}</span>`;
        url.innerHTML = `<b>WEBSITE:</b> <span>${member.website}</span>`;
        level.innerHTML = `<b>MEMBERSHIP LEVEL:</b> <span>${
            member.membershipLevel === 1
                ? "Gold"
                : member.membershipLevel === 2
                ? "Silver"
                : "Bronze"
        }</span>`;

        // append content to card contact
        content.append(phone);
        content.append(address);
        content.append(url);
        content.append(level);

        // append details to card details div
        details.append(memberImg);
        details.append(content);

        // append to card
        card.append(heading);
        card.append(subHeading);
        card.append(line);
        card.append(details);

        // append card to cards div
        if (cards) {
            cards.append(card);
        }
    });
};

export default getMembersData;
