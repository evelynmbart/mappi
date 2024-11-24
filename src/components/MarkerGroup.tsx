import { Marker } from "@react-google-maps/api";
import { useState } from "react";
import { Group } from "../types";
import PlaceDetails from "./PlaceDetails";

interface Props {
  group: Group;
}

const MarkerGroup = ({ group }: Props) => {
  const [activePlaceId, setActivePlaceId] = useState<string | null>(null);

  return (
    <>
      {group.places.map((place) => (
        <Marker
          key={place.place_id}
          position={place.geometry.location}
          icon={{
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: group.color,
            fillOpacity: 1,
            strokeWeight: 1
          }}
          title={place.name}
          onMouseOver={() => setActivePlaceId(place.place_id)}
          onMouseOut={() => setActivePlaceId(null)}
        >
          {activePlaceId === place.place_id && (
            <PlaceDetails
              place={place}
              position={place.geometry.location}
              onClose={() => setActivePlaceId(null)}
            />
          )}
        </Marker>
      ))}
    </>
  );
};

export default MarkerGroup;
