// display form info on page
const displayFormInfo = () => {
    // grab from URL search
    const params = new URLSearchParams(window.location.search);

    // get all required form fields
    const fullName = params.get("fullname");
    const email = params.get("email");
    const phone = params.get("phone");
    let timestamp = Date.now();

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
        <p>Full name: ${fullName}</p>
        <p>Email: ${email}</p>
        <p>Mobile: ${phone}</p>
        <p>Date: ${day} ${time}</p>
        `;
    }
};

export default displayFormInfo();
