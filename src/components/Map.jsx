// src/components/Map.jsx
import React, { useState, useContext } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import MarkerGroup from "./MarkerGroup";
import { GroupContext } from "../contexts/GroupContext";
import GroupManager from "./GroupManager";
import SearchBar from "./SearchBar";

const Map = () => {
  const { groups } = useContext(GroupContext);

  const [searchResults, setSearchResults] = useState([]);

  const handlePlacesChanged = places => {
    setSearchResults(places);
  };

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
          <GroupManager />
          <SearchBar onPlacesChanged={handlePlacesChanged} />
        </div>

        {/* Map */}
        <GoogleMap
          mapContainerStyle={{ width: "100vw", height: "100vh" }}
          center={center}
          zoom={12}
          options={options}
        >
          {searchResults.map(result => (
            <Marker key={result.place_id} position={result.geometry.location} />
          ))}
          {groups.map(group => group.visible && (
            <MarkerGroup key={group.id} group={group} />
          ))}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default Map;
