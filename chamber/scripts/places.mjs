const displayPlaces = async () => {
    const places = await getPlaces();
    const placesContainer = document.querySelector(".places-container");

    if (!placesContainer) {
        console.error("Places container not found");
        return;
    }

    if (places.length === 0) {
        placesContainer.innerHTML = "<p>No places available.</p>";
        return;
    }

    const placesHTML = places
        .map(
            (place) => `
        <div class="place-card">
            <h2>${place.name}</h2>
            <figure>
                <img src="images/${place.photo_url}" alt="${place.name}" class="place-image">
                <figcaption>${place.name}</figcaption>
            </figure>
            <p>${place.description}</p>
            <address>${place.address}</address>
            <button>Learn More</button>
        </div>
    `
        )
        .join("");

    placesContainer.innerHTML = placesHTML;
};

const getPlaces = async () => {
    try {
        const response = await fetch("data/places.json");
        if (!response.ok) {
            throw new Error("Failed to fetch places");
        }
        const data = await response.json();
        return data.places;
    } catch (error) {
        console.error("Error fetching places:", error);
        return [];
    }
};

export default displayPlaces;
