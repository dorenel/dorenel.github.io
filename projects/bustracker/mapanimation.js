mapboxgl.accessToken = "pk.eyJ1IjoiZG9yZW5lbCIsImEiOiJja3k2aTl5djAwdnVxMnZtbnh0YnkwdTMxIn0.WhZD8pcjoD39nIoUZgrc7g";

var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: [-71.104081, 42.365554],
    zoom: 12
});

var markers = [];

async function getBusLocations() {
    const url = "https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip";
    const response = await fetch(url);
    const json = await response.json();
    return json.data;
}

async function run() {
    const locations = await getBusLocations();
    // remove all old markers since number of markers changes and
    // we can't be sure the bus data order is the same everytime.
    while (markers.length > 0) {
        // remove from map.
        markers[0].remove();
        // remove from array.
        markers.shift();
    }
    console.log(new Date());
    console.log(locations);
    for (let location of locations) {
        let label = location.attributes.label;
        let lng = location.attributes.longitude;
        let lat = location.attributes.latitude;
        let direction = location.attributes.direction_id;
        let occupancy = location.attributes.occupancy_status;
        let markerColor = "#117EE8"
        if (direction === 0) {
            markerColor = "#E84611"
        }
        let marker = new mapboxgl.Marker({ color: markerColor })
            .setLngLat([lng, lat])
            .setPopup(new mapboxgl.Popup().setHTML("<p style='font-size:10px;'>" + "Bus ID: " + label + "<br>" + "Occupancy: " + occupancy + "</p>"))
            .addTo(map);
        markers.push(marker);
    }
    console.log(markers.length);
    setTimeout(run, 15000);
}

function track() {
    run();
}

// setup the initial markers.
/*
(async function() { 
    const locations = await getBusLocations();
    //console.log(locations.length);
    for (let i = 0; i < locations.length; i++) {
        let lng = locations[i].attributes.longitude;
        let lat = locations[i].attributes.latitude;
        let marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
        markers.push(marker);
    }
})();
*/





