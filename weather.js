var map = L.map('map').setView([12, 80], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

// ✅ NOAA Sea Surface Temperature WMS
var noaaLayer = L.tileLayer.wms('https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi', {
    layers: 'MODIS_Aqua_L3_SST_MidIR_4km_Night',
    format: 'image/png',
    transparent: true,
    opacity: 0.5,
    attribution: 'NASA MODIS SST'
}).addTo(map);

// ✅ OpenWeatherMap Wind Layer
var windLayer = L.tileLayer('https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=ee7ab26f7a7f327a2d7a060bf4fb0a4c', {
    opacity: 0.5,
    attribution: 'OpenWeatherMap Wind'
}).addTo(map);

// ✅ Fetch & Display Weather Alerts (using OpenWeatherMap OneCall Alert API)
fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=12&lon=80&appid=ee7ab26f7a7f327a2d7a060bf4fb0a4c&units=metric`)
.then(res => res.json())
.then(data => {
    var alertPanel = document.getElementById('weatherAlerts');
    if (data.alerts && data.alerts.length > 0) {
        alertPanel.innerHTML = '<h6>Active Weather Alerts:</h6>';
        data.alerts.forEach(alert => {
            alertPanel.innerHTML += `
                <div class="alert alert-warning p-2 mb-2">
                    <strong>${alert.event}</strong><br>
                    ${alert.description}
                </div>
            `;
        });
    } else {
        alertPanel.innerHTML = '<p>No active weather alerts for this region.</p>';
    }
}).catch(() => {
    document.getElementById('weatherAlerts').innerHTML = '<p>Failed to load alerts.</p>';
});
