// src/components/Map.jsx
import React, { useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import MarkerGroup from "./MarkerGroup";

const Map = () => {
  // State to manage visibility
  const [showGyms, setShowGyms] = useState(true);
  const [showGroceries, setShowGroceries] = useState(true);

  const center = {
    lat: 40.7128, // Latitude of NYC
    lng: -74.006 // Longitude of NYC
  };

  const options = {
    disableDefaultUI: true,
    zoomControl: true
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} libraries={["places"]}>
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: "1",
          background: "white",
          padding: "10px",
          borderRadius: "5px"
        }}
      >
        {/* Controls */}
        <div
          style={{
            position: "absolute",
            zIndex: 1,
            background: "white",
            color: "black",
            padding: "10px"
          }}
        >
          <label>
            <input
              type="checkbox"
              checked={showGyms}
              onChange={() => setShowGyms(!showGyms)}
            />
            Show Gyms
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              checked={showGroceries}
              onChange={() => setShowGroceries(!showGroceries)}
            />
            Show Groceries
          </label>
        </div>

        {/* Map */}
        <GoogleMap
          mapContainerStyle={{ width: "100vw", height: "100vh" }}
          center={center}
          zoom={12}
          options={options}
        >
          {showGyms && <MarkerGroup type="gym" visible={showGyms} />}
          {showGroceries &&
            <MarkerGroup
              type="grocery_or_supermarket"
              visible={showGroceries}
            />}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default Map;
