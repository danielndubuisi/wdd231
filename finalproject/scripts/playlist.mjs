import { getPlaylistData } from "./featured.mjs";

// Function to open modal and populate with playlist details
function openModal(playlist) {
    const modal = document.querySelector("#playlist-modal");
    if (!modal) return;
    modal.innerHTML = `
        <div class="modal-content">
            <button class="close-modal" aria-label="Close">&times;</button>
            <img src="images/${playlist.image}" alt="${playlist.title}" style="width:100%;height:180px;object-fit:cover;">
            <h2>${playlist.title}</h2>
            <p>${playlist.description}</p>
            <p><strong>Artist:</strong> ${playlist.artist}</p>
            <p><strong>Year:</strong> ${playlist.year}</p>
            <p><strong>Genre:</strong> ${playlist.genre}</p>
            <p><strong>Duration:</strong> ${playlist.duration}</p>
            <p><strong>Popularity:</strong> ${playlist.popularity}M streams</p>
        </div>
    `;
    if (typeof modal.showModal === "function") {
        modal.showModal();
    } 

    // Close modal on button click
    modal.querySelector(".close-modal").onclick = () => {
        if (typeof modal.close === "function") {
            modal.close();
        } else {
            modal.removeAttribute("open");
        }
    };
    // Close modal on outside click
    modal.onclick = (e) => {
        if (e.target === modal) {
            if (typeof modal.close === "function") {
                modal.close();
            } 
        }
    };
}

// Function to display playlist data on the page
const displayPlaylists = async () => {
    try {
        const playlists = await getPlaylistData();
        if (!playlists || playlists.length === 0) {
            console.error("No playlists found.");
            return;
        }

        const playGrid = document.querySelector(".playlist-grid");
        const cardTemplate = playlists
            .map(
                (
                    playlist
                ) => `<div class="playlist-card" data-id="${playlist.id}">
                        <img src="images/${playlist.image}" loading="lazy" alt="play-card"/>
                        <div class="card-info">
                            <h3>${playlist.title}</h3>
                            <p>Genre: ${playlist.genre}</p>
                            <p>Popularity: ${playlist.popularity}M streams</p>
                        </div>
                    </div>`
            )
            .join("");
        playGrid.innerHTML = cardTemplate;

        // Add event delegation for opening modal
        playGrid.addEventListener("click", (e) => {
            const card = e.target.closest(".playlist-card");
            if (!card) return;
            const id = card.getAttribute("data-id");
            const playlist = playlists.find((p) => String(p.id) === String(id));
            if (playlist) openModal(playlist);
        });
    } catch (error) {
        console.error("Error displaying playlists:", error);
    }
};

export default displayPlaylists;
