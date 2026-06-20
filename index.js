let map = L.map("map").setView([6.5244, 3.3792], 12);

// OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap",
}).addTo(map);

// STATE
let mode = null;
let startPoint = null;
let endPoint = null;
let routeLine = null;
let driverMarker = null;
let interval = null;

// Enable pick mode
function enablePick(type) {
  mode = type;
  document.getElementById("status").innerText =
    `Click map to set ${type.toUpperCase()}`;
}

// Map click handler
map.on("click", (e) => {
  if (!mode) return;

  if (mode === "start") {
    startPoint = e.latlng;
    L.marker(startPoint).addTo(map).bindPopup("Pickup").openPopup();
  }

  if (mode === "end") {
    endPoint = e.latlng;
    L.marker(endPoint).addTo(map).bindPopup("Destination").openPopup();
    drawRoute();
  }

  mode = null;
});

// REAL ROUTE (OSRM)
async function drawRoute() {
  const url = `https://router.project-osrm.org/route/v1/driving/${startPoint.lng},${startPoint.lat};${endPoint.lng},${endPoint.lat}?overview=full&geometries=geojson`;

  const res = await fetch(url);
  const data = await res.json();

  const route = data.routes[0];

  const coords = route.geometry.coordinates;
  const path = coords.map((c) => [c[1], c[0]]);

  if (routeLine) map.removeLayer(routeLine);

  routeLine = L.polyline(path, {
    color: "blue",
    weight: 5,
  }).addTo(map);

  map.fitBounds(routeLine.getBounds());

  const distance = (route.distance / 1000).toFixed(2);
  const time = Math.round(route.duration / 60);

  document.getElementById("info").innerHTML = `
    <b>Distance:</b> ${distance} km <br/>
    <b>ETA:</b> ${time} mins
  `;

  startDriverAnimation(path);
}

// DRIVER ANIMATION
function startDriverAnimation(path) {
  if (driverMarker) map.removeLayer(driverMarker);
  if (interval) clearInterval(interval);

  let i = 0;

  driverMarker = L.marker(path[0], {
    icon: L.icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/744/744465.png",
      iconSize: [30, 30],
    }),
  }).addTo(map);

  interval = setInterval(() => {
    if (i >= path.length) {
      clearInterval(interval);
      document.getElementById("status").innerText = "Trip Completed ✔";
      return;
    }

    driverMarker.setLatLng(path[i]);
    i++;
  }, 100);
}

// SAVE TRIP
function saveTrip() {
  if (!startPoint || !endPoint) return;

  const trip = {
    start: startPoint,
    end: endPoint,
    time: new Date().toLocaleString(),
  };

  let trips = JSON.parse(localStorage.getItem("trips")) || [];
  trips.push(trip);

  localStorage.setItem("trips", JSON.stringify(trips));

  loadHistory();
}

// HISTORY
function loadHistory() {
  let trips = JSON.parse(localStorage.getItem("trips")) || [];

  document.getElementById("history").innerHTML = trips
    .map(
      (t, i) => `
      <div style="border:1px solid #444; margin:5px; padding:5px;">
        Trip ${i + 1} <br/>
        ${t.time}
      </div>
    `,
    )
    .join("");
}

// CLEAR
function clearAll() {
  localStorage.removeItem("trips");
  location.reload();
}
