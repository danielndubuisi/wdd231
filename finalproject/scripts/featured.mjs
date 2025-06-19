// shows featured data on the home page
const showFeaturedData = async (featured) => {
    const response = await fetch("data/playlists.json");
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const data = await response.json();

    // get only gold and silver members if on home page
    if (featured) {
        // if featured show 3 random ones on home screen
        const featuredMembers = data.playlists.filter(
            (member) => member.featured === true
        );
        // randomize and limit the spotlight members
        featuredMembers.sort(() => Math.random() - 0.5);
        featuredMembers.length = Math.min(featuredMembers.length, 3); // limit to 3 members

        displayMembers(featuredMembers);
    } else {
        // show all members - on featured page
        displayMembers(data.playlists);
    }
};

const displayMembers = (members) => {
    // get the cards container
    const cards = document.querySelector(".cards");
    const cardTemplate = members
        .map(
            (member) => `  <div class="card">
                            <div class="card-content">
                                <img src="images/${member.image}" alt="featured-img" loading="lazy">
                                <p><span>${member.title}</span> - ${member.description}</p>
                            </div>
                            <button type="button" class="listen-btn"><a href="playlist.html">Listen</a></button>
                        </div>
                    `
        )
        .join("");
    cards.innerHTML = cardTemplate;
};

export default showFeaturedData;
