// displays membership details on the page
const displayMembershipDetails = async () => {
    const detailsContainer = document.querySelector(".membership-details");

    // check if detailsContainer exists
    if (!detailsContainer) return;

    // fetch membership info
    const levels = await getMembershipInfo();

    // update the details container with membership levels
    detailsContainer.innerHTML = levels
        .map(
            (level, idx) => `
                    <div class="card">
                        <h3>${level.name}</h3>
                        <a href="#" class="info-link" data-index="${idx}">
                            <span>Learn More</span>
                        </a>
                        <dialog id="modal"></dialog>
                    </div>
    `
        )
        .join("");

    // select the modal and info link
    const modal = document.querySelector("#modal");
    const infoLinks = document.querySelectorAll(".info-link");

    // add event listener to each "Learn More" link
    infoLinks.forEach((link, idx) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const level = levels[idx];
            modal.innerHTML = `
                <button class="close">❌</button>
                <h3>${level.name}</h3>
                <p>${level.description}</p>
                <p>Benefits: ${level.benefits.join(", ")}</p>
                <p>Price: $${level.price}</p>
            `;
            // handle close button
            document.querySelector(".close").addEventListener("click", () => {
                modal.close();
            });
            modal.showModal();
        });
    });
};

const getMembershipInfo = async () => {
    const response = await fetch("data/membershipInfo.json");
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.levels;
};

export default displayMembershipDetails;
