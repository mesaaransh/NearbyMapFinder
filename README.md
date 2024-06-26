## Nearby Pilot Finder

This project, Nearby Pilot Finder, is a web application designed to help users locate drone pilots in their vicinity for various projects.

### Description

Nearby Pilot Finder utilizes users' geolocation and a custom distance calculation formula to identify nearby drone pilots registered on the platform. It leverages the power of React and Leaflet, a popular JavaScript library for interactive maps, to provide a user-friendly interface for searching and visualizing available pilots.

### Features

* **Geolocation Integration:** Utilizes user's location to find nearby pilots.
* **Wide Data Range:** This project has over **500** Data Points (Data.js).
* **Interactive Map:** Visualizes pilot locations on a map using Leaflet.

### Technologies Used

* React: JavaScript library for building user interfaces.
* Leaflet: JavaScript library for interactive maps.
* Vite: For faster development in production

### Installation

1. **Prerequisites:**
   - Node.js and npm (or yarn) installed on your system.
2. **Clone the Repository:**
   ```bash
   git clone https://github.com/mesaaransh/NearbyMapFinder.git
   ```
3. **Install Dependencies:**
   ```bash
   npm install  # or yarn install
   ```

### Usage

1. **Start the Development Server:**
   ```bash
   npm run dev  # or yarn start
   ```
   This will typically launch the application at http://127.0.0.1:5173/ in your web browser.

2. **User Interaction:**
   - Allow users to grant geolocation access (if applicable).
   - The map should display the user's location and potentially nearby pilots.
