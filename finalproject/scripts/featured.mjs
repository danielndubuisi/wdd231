// get all the featured members from the JSON file
export const getPlaylistData = async () => {
    try {
        const response = await fetch("data/playlists.json");
        if (!response.ok) {
            throw new Error("Error fetching data");
        }
        const data = await response.json();
        return data.playlists;
    } catch (error) {
        console.error("Error fetching playlist data:", error);
    }
};

// shows featured data on the home page
const showFeaturedData = async (featured) => {
    try {
    // get the featured members data
        const featuredData = await getPlaylistData();
        if (!featuredData || featuredData.length === 0) {
            console.error("No featured members found.");
            return;
        }
        // if featured is true, only show if on home page
        if (featured) {
            // if featured show 3 random ones on home screen
            const featuredMembers = featuredData.filter(
                (member) => member.featured === true
            );

            // randomize and limit the spotlight members
            featuredMembers.sort(() => Math.random() - 0.5);
            featuredMembers.length = Math.min(featuredMembers.length, 3); // limit to 3 members

            displayMembers(featuredMembers);
        } else {
            // show all members - on featured page
            displayMembers(featuredData.playlists);
        }
    } catch (error) {
        console.error("Error loading featured data:", error);
    }
};

const displayMembers = (members) => {
    // get the cards container
    const cards = document.querySelector(".cards");
    const cardTemplate = members
        .map(
            (member) => `<div class="card">
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
