// src/components/PlaceDetails.jsx
import React from "react";
import { InfoWindow } from "@react-google-maps/api";

const PlaceDetails = ({ place, position, onClose }) => {
  return (
    <InfoWindow position={position} onCloseClick={onClose}>
      <div>
        <h4>
          {place.name}
        </h4>
        <p>
          {place.formatted_address}
        </p>
        {/* Include more details as needed */}
      </div>
    </InfoWindow>
  );
};

export default PlaceDetails;
