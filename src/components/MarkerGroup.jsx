// src/components/MarkerGroup.jsx
import React, { useEffect, useState } from 'react';
import { Marker } from '@react-google-maps/api';

const MarkerGroup = ({ type, visible }) => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if (!visible) return;

    const service = new window.google.maps.places.PlacesService(document.createElement('div'));

    const request = {
      location: { lat: 40.7128, lng: -74.0060 },
      radius: 5000,
      type: type,
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setPlaces(results);
      }
    });
  }, [visible, type]);

  return (
    <>
      {places.map(place => (
        <Marker
          key={place.place_id}
          position={place.geometry.location}
        />
      ))}
    </>
  );
};

export default MarkerGroup;
