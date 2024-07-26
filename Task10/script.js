document.addEventListener('DOMContentLoaded', () => {
    // Initialize the map
    const map = L.map('map').setView([51.505, -0.09], 13);

    // Set up the OSM layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Function to handle map click and add marker
    function onMapClick(e) {
        const marker = L.marker(e.latlng).addTo(map);

        // Popup form for user input
        const popupContent = `
            <form id="markerForm">
                <label for="markerInfo">Information:</label>
                <input type="text" id="markerInfo" name="markerInfo">
                <button type="button" id="saveButton">Save</button>
            </form>
        `;

        marker.bindPopup(popupContent).openPopup();

        // Save button click event
        document.getElementById('saveButton').addEventListener('click', () => {
            const markerInfo = document.getElementById('markerInfo').value;
            marker.setPopupContent(markerInfo);
        });
    }

    map.on('click', onMapClick);
});
