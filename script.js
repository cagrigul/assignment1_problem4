// Initialize the Leaflet map 
var map = L.map('map').setView([37.7, -122.4], 12);

// Add a tile layer from ArcGIS
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Esri, HERE, Garmin, © OpenStreetMap',
    maxZoom: 16
}).addTo(map);

// Load GeoJSON data for San Francisco crimes
$.getJSON("https://raw.githubusercontent.com/orhuna/WebGIS_SLU_M1/main/Module%201/Assignment%201/data/sf_crime.geojson", function(data) {
    var crimeIcon = L.icon({
        iconUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKf4F5TlIU1XZXZDGGqGpRe49SezXeobLQEN-_E7NaHDHzgU2cRfT0VYmEsiGuYtoTXbc&usqp=CAU',
        iconSize: [60, 60]
    });

    // Create GeoJSON layer with custom markers
    var crime = L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            var marker = L.marker(latlng, {icon: crimeIcon});

            // Bind a popup to the marker 
            if (feature.properties && feature.properties.description) {
                marker.bindPopup(feature.properties.description);
            }
            return marker;
        }
    });

    // Create a marker cluster group
    var clusters = L.markerClusterGroup();
    clusters.addLayer(crime);
    map.addLayer(clusters);
});
