# MatsyaN-QuadX

# 🐟 TrawlSmart: BlueRoute AI - Smart Fishing Route Optimizer

## 🌊 Empowering Fishermen with Smart Marine Navigation

---

## 📌 Overview

**TrawlSmart: BlueRoute AI** is a **Smart Fishing Route Optimizer** designed for the Indian coastline.  
It combines **real-time weather data**, **past catch history**, and **marine zone mapping** to help fishermen:

- Identify **best fishing spots**
- Save **fuel and time**
- Increase **catch efficiency**
- Stay safe with **live weather alerts**

---

## 🧭 Problem Statement

Fishermen traditionally rely on guesswork and experience to choose fishing locations.  
This causes:

- Wasted fuel and time
- Inconsistent catch volumes
- Financial risk due to bad weather or low catch

---

## 💡 Our Solution

**TrawlSmart AI** addresses these problems by providing:

| **Feature** | **Description** |
|-------------|-----------------|
| 🗺️ **Interactive Marine Map** | Visual display of safe zones, rich fish areas, and danger zones |
| 🚤 **Smart Route Planning** | Plots best route from user’s location to optimal fishing zones |
| 📊 **Catch Logging** | Allows users to log species, weight, and time |
| 🌦️ **Real-Time Weather & Alerts** | IMD alerts, OpenWeather warnings, sea temperature & wind overlays |
| ⚙️ **Offline Support** | Works in remote areas using local storage |

---

## 🎯 Key Features

### 1️⃣ **Marine Zone Mapping**

- Built using **Leaflet.js**
- Shows markers and polygons for:
  - Safe Zones
  - Fish Rich Zones
  - Danger Zones
- Uses **GeoJSON files** for marine data

---

### 2️⃣ **Smart Route Suggestion**

- Plots **dashed marine route** from user’s location to selected fishing zone
- Calculates distance using the **Haversine formula**
- Displays:
  - Zone Name
  - Zone ID
  - Fish Species in the area
  - Estimated Catch (~200kg)

---

### 3️⃣ **Catch Log System**

- Fishermen can **record catches** (species, weight, date/time)
- **Catch history** stored in **LocalStorage** (offline support)

---

### 4️⃣ **Weather Integration**

- **IMD Weather Alerts** via RSS
- **OpenWeatherMap OneCall API** for live weather
- **NOAA Sea Surface Temperature Layer (SST)**
- **OpenWeather Wind Layer**

---

### 5️⃣ **Dashboard with Toggles**

- Toggle layers for:
  - **Sea Surface Temperature (NOAA)**
  - **Wind Patterns (OpenWeather)**
- View **active weather alerts** in real time

---

## 🛠️ Technologies Used

| **Component** | **Tech Stack** |
|---------------|----------------|
| Frontend | HTML, CSS, JavaScript |
| Map Engine | Leaflet.js |
| Data Handling | JSON, GeoJSON |
| APIs | OpenWeatherMap, IMD RSS, NOAA WMS |
| Hosting | GitHub Pages / Firebase Hosting |
| Offline Support | LocalStorage |

---

## ⚙️ Installation & Setup Instructions


# 1. Clone the repository
git clone https://github.com/Divya-Sree-R/MatsyaN-QuadX
cd trawlsmart-ai

# 2. Open the project in VS Code or any IDE

# 3. Run the project using Live Server (recommended)
# OR
# Open index.html directly in your browser

# ✅ No backend setup needed for basic version.
# ✅ All data is stored locally (LocalStorage & JSON files).
# ✅ APIs are fetched directly from frontend (weather, SST).

## 📽️ Project Demo Video

[![Watch the video](https://img.youtube.com/vi/3sLfHyApGxU/0.jpg)](https://youtu.be/3sLfHyApGxU)

👉 [Click here to watch the demo video](https://youtu.be/3sLfHyApGxU)


<img width="1344" height="615" alt="image" src="https://github.com/user-attachments/assets/d4b92184-dbad-45b8-937a-8c3aad4ba42f" />

<img width="1365" height="631" alt="image" src="https://github.com/user-attachments/assets/b09da161-132e-42b8-a1c5-8902f6eb4f10" />

<img width="1365" height="639" alt="image" src="https://github.com/user-attachments/assets/4e7f08e4-6b32-477f-8a19-3434a34104d2" />

## 👥 Team Members

| Name               | Role                     | GitHub Profile                           |
|--------------------|--------------------------|------------------------------------------|
|   Divya Sree R     | Frontend Developer       | [GitHub](https://github.com/Divya-Sree-R)  |
|   Ayesha Siddiqa K | Backend Developer        | [GitHub](https://github.com/AyeshaSiddiqaK) |
|   Ani M            | Data Scientist           | [GitHub](https://github.com/hello28-28) |
|   Arul Moli R      | UI/UX Designer           | [GitHub](https://github.com/ARULMOLI-20) |



