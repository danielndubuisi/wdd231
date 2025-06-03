// displays membership details on the page
const displayMembershipDetails = async () => {
    const detailsContainer = document.querySelector(".membership-details");

    // check if detailsContainer exists
    if (!detailsContainer) return;

    // fetch membership info
    const levels = await getMembershipInfo();

    // update the details container with membership levels
    detailsContainer.innerHTML = `
        <h2>Membership Levels</h2>`;
    detailsContainer.innerHTML += levels
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
                <div class="modal-content">
                    <h3>${level.name}</h3>
                    <p><b>Description</b>: ${level.description}</p>
                    <p><b>Benefits </b>: ${level.benefits.join(", ")}</p>
                    <p><b>Price</b>: $${level.price}</p>
                </div>
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
