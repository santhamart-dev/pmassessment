let map;
//Fetch earthquake data from the USGS API
async function fetchEarthquakeData() {
    const response = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson');
    const data = await response.json();
    return data.features;
}
//Initialize the Google Map
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 13.7563, lng: 100.5018 },  // Centered near Bangkok
        zoom: 2,
    });
    // Fetch the earthquake data
    fetchEarthquakeData().then((earthquakes) => {
        earthquakes.forEach((earthquake) => {
            const coords = earthquake.geometry.coordinates;
            const magnitude = earthquake.properties.mag;
            const place = earthquake.properties.place;
            const time = new Date(earthquake.properties.time).toLocaleString();
            // Create markers
            const marker = new google.maps.Marker({
                position: { lat: coords[1], lng: coords[0] },
                map: map,
                title: `Magnitude: ${magnitude}`,
            });
            // Create markers place name and time 
            const infoWindow = new google.maps.InfoWindow({
                content: `<h5>${place}</h5><p>${time}</p>`,
            });
            // Open markers infowindow
            marker.addListener('click', () => {
                infoWindow.open(map, marker);
            });
        });
    });
}