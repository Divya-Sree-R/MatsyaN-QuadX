var map = L.map('map').setView([10.5, 80.5], 6);
var markerMap = {};
var userLatLng = null;
var routeLine = null;
var activeMarker = null;

// Tile Layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

// Marker Icons
var defaultIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/252/252025.png',
    iconSize: [25, 25],
    iconAnchor: [12, 12]
});

var activeIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/64/64113.png',
    iconSize: [25, 25],
    iconAnchor: [12, 12]
});

// Get User Location
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        userLatLng = [position.coords.latitude, position.coords.longitude];
        L.marker(userLatLng).addTo(map)
            .bindPopup('Your Location').openPopup();
        map.setView(userLatLng, 7);
        document.getElementById('infoPanel').innerHTML = `<strong>Your Location:</strong> ${userLatLng[0].toFixed(4)}, ${userLatLng[1].toFixed(4)}`;
    }, function () {
        document.getElementById('infoPanel').innerHTML = 'Location access denied.';
    });
}

// Fetch & Add Sea Zones Markers
fetch('seazones.geojson')
.then(res => res.json())
.then(data => {
    L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
            var marker = L.marker(latlng, { icon: defaultIcon }).bindPopup(`
                <strong>${feature.properties.name}</strong><br>
                Zone ID: ${feature.properties.zone_id}<br>
                <button class="btn btn-sm btn-primary mt-1" onclick="drawMarineRoute([${latlng.lat}, ${latlng.lng}], '${feature.properties.name}', '${feature.properties.zone_id}')">Plot Marine Route</button>
            `);

            marker.on('click', function () {
                if (activeMarker) activeMarker.setIcon(defaultIcon);
                marker.setIcon(activeIcon);
                activeMarker = marker;
            });

            markerMap[feature.properties.zone_id] = marker;
            return marker;
        }
    }).addTo(map);
});

// Draw Route and Show Info
function drawMarineRoute(destination, zoneName, zoneID) {
    if (!userLatLng) return alert('User location not available!');
    if (routeLine) map.removeLayer(routeLine);

    routeLine = L.polyline([userLatLng, destination], { color: 'blue', weight: 4, dashArray: '5, 10' }).addTo(map);
    map.fitBounds(routeLine.getBounds(), { padding: [50, 50] });

    const distance = haversineDistance(userLatLng, destination).toFixed(2);
    showInfoCard(zoneName, zoneID, destination, distance);
    fetchWeather(destination[0], destination[1]);
}

// Haversine Formula
function haversineDistance(coords1, coords2) {
    function toRad(x) { return x * Math.PI / 180; }
    var R = 6371;
    var dLat = toRad(coords2[0] - coords1[0]);
    var dLon = toRad(coords2[1] - coords1[1]);
    var a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(coords1[0])) * Math.cos(toRad(coords2[0])) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Info Panel Display
function showInfoCard(name, id, dest, distance) {
    document.getElementById('infoPanel').innerHTML = `
        <h6>${name}</h6>
        <p><strong>Zone ID:</strong> ${id}</p>
        <p><strong>Destination:</strong> ${dest[0].toFixed(4)}, ${dest[1].toFixed(4)}</p>
        <p><strong>Distance:</strong> ${distance} km</p>
        <hr>
        <h6>Fish Species</h6>
        <p>Tuna, Mackerel, Sardine</p>
        <p><strong>Estimated Catch:</strong> ~200kg</p>
        <hr>
        <div id="weatherInfo">Fetching weather...</div>
    `;
}

// OpenWeatherMap Integration
function fetchWeather(lat, lon) {
    const apiKey = 'ee7ab26f7a7f327a2d7a060bf4fb0a4c';
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => {
        document.getElementById('weatherInfo').innerHTML = `
            <h6>Climate</h6>
            <p><strong>Weather:</strong> ${data.weather[0].description}</p>
            <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
            <p><strong>Wind:</strong> ${data.wind.speed} m/s</p>
        `;
    }).catch(() => {
        document.getElementById('weatherInfo').innerHTML = 'Weather data not available.';
    });
}

// Zone Suggestion Logic
document.getElementById('suggestBtn').addEventListener('click', showZoneCategories);

function showZoneCategories() {
    fetch('seazones.geojson')
    .then(res => res.json())
    .then(data => {
        let safeZones = [], richZones = [], dangerZones = [];
        data.features.forEach(zone => {
            if (zone.properties.zone_id.includes('1') || zone.properties.zone_id.includes('2')) safeZones.push(zone);
            else if (zone.properties.zone_id.includes('3') || zone.properties.zone_id.includes('4')) richZones.push(zone);
            else dangerZones.push(zone);
        });

        document.getElementById('zoneAccordion').innerHTML = `
            ${createZoneAccordion('Safe Zones', 'safeZones', safeZones, 'success')}
            ${createZoneAccordion('Fish Rich Zones', 'richZones', richZones, 'primary')}
            ${createZoneAccordion('Danger Zones', 'dangerZones', dangerZones, 'danger')}
        `;
    });
}

function createZoneAccordion(title, id, zones, color) {
    let zoneList = zones.map(zone => `
        <li class="list-group-item">
            ${zone.properties.name}  
            <button class="btn btn-sm btn-outline-${color} float-end" onclick="zoomToZone([${zone.geometry.coordinates[1]}, ${zone.geometry.coordinates[0]}], '${zone.properties.name}', '${zone.properties.zone_id}')">View</button>
        </li>
    `).join('');

    return `
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed bg-${color} text-white" type="button" data-bs-toggle="collapse" data-bs-target="#${id}">
                    ${title}
                </button>
            </h2>
            <div id="${id}" class="accordion-collapse collapse">
                <div class="accordion-body p-0">
                    <ul class="list-group list-group-flush">${zoneList || '<li class="list-group-item">No zones available</li>'}</ul>
                </div>
            </div>
        </div>
    `;
}

function zoomToZone(latlng, name, id) {
    map.setView(latlng, 8);
    showInfoCard(name, id, latlng, '-');
    fetchWeather(latlng[0], latlng[1]);
    if (activeMarker) activeMarker.setIcon(defaultIcon);
    if (markerMap[id]) {
        markerMap[id].setIcon(activeIcon);
        activeMarker = markerMap[id];
    }
}
