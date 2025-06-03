// display form info on page
const displayFormInfo = () => {
    // grab from URL search
    const params = new URLSearchParams(window.location.search);

    // get all required form fields
    const firstName = params.get("firstname");
    const lasttName = params.get("lastname");
    const email = params.get("email");
    const phone = params.get("phone");
    const businessName = params.get("organization-name");
    const timestamp = params.get("timestamp");

    // convert timestamp to date and time
    const day = new Date(timestamp).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    const time = new Date(timestamp).toLocaleTimeString();

    // display details
    const infoContainer = document.querySelector(".thank");

    if (infoContainer) {
        infoContainer.classList.add("card");
        infoContainer.innerHTML = `<h3>Your Info</h3>
        <p>Full name: ${firstName} ${lasttName}</p>
        <p>Email: ${email}</p>
        <p>Mobile: ${phone}</p>
        <p>Business name: ${businessName}</p>
        <p>Date: ${day} ${time}</p>
        `;
    }
};

export default displayFormInfo();
