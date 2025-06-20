const visitInfo = document.querySelector(".visit");

// get user last visit time and store in local storage
let lastVisit = window.localStorage.getItem("lastVisit");
// Store the last visit timestamp in local storage
if (!lastVisit) {
    lastVisit = new Date().getTime();
    window.localStorage.setItem("lastVisit", lastVisit);
}

// give user message on last visit
const displayLastVisitMessage = () => {
    const currentDate = Date.now();
    let message = "";
    // check if first visit
    if (currentDate === lastVisit || currentDate - lastVisit < 3) {
        // output message
        message = "Welcome! Let us know if you have any questions.";
    } else if (lastVisit) {
        const lastVisitDate = new Date(parseInt(lastVisit));
        const timeDiff = currentDate - lastVisitDate;
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

        // output message
        if (daysDiff < 1) {
            message = "Back so soon? Awesome!";
        } else {
            message = `You last visited ${
                daysDiff > 1 ? daysDiff + " days" : daysDiff + " day"
            } ago`;
        }
    }
    // display message
    visitInfo.innerHTML = `<div class='visit-card'>
        <p><em>${message}</em></p>
    </div>`;
};

export default displayLastVisitMessage;
