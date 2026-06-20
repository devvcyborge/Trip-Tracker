Trip Tracker

A simple map-based app where you pick a start point and destination on a map, generate a real road route, and simulate a moving driver along the path.
Built with Leaflet and OpenStreetMap.

What it does

You open the app, click to set a pickup point and a destination, and it draws a real driving route between both points. A small car icon moves along the route to simulate a trip.

It also shows distance, estimated travel time, and saves your trips in the browser so they don’t disappear on refresh.

How it was built -

This project was built using:
Leaflet.js for the interactive map.
OpenStreetMap for map data.
OSRM API for real road routing.
Vanilla JavaScript for logic and interactions.
localStorage for saving trip history.
The idea was to understand how apps like Uber or Bolt handle maps, routes, and movement on a basic level.

Challenges faced:-

One of the main challenges was figuring out how real routes work on maps. At first, I was just drawing straight lines between two points, but that didn’t feel realistic.

Learning how to use the OSRM API to get actual road routes was a big step.

Another challenge was handling map interactions properly — making sure pickup and destination don’t conflict, and managing app state cleanly in JavaScript.

Animating the driver smoothly along the route was also tricky at first, especially syncing movement with route coordinates.

Features
Pick locations directly on the map
Real road routing (not straight lines)
Distance and ETA calculation
Moving driver animation
Trip history saved in browser
Clear saved data anytime
Fully frontend (no backend needed)
How it works
Click “Set Pickup”
Click on the map to choose starting point
Click “Set Destination”
Click on the map again for destination
App fetches real route from OSRM
Route is drawn on the map
Driver icon moves along the route
Trip details are shown and saved
Where it can be used

This kind of system is the base for:

Ride-hailing apps (Uber, Bolt style systems)
Delivery tracking systems
Logistics dashboards
Navigation and route planning tools
Learning projects for geolocation and APIs
Tech used
HTML
CSS
JavaScript
Leaflet.js
OpenStreetMap
OSRM API
localStorage
