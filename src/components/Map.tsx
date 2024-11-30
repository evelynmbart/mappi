import {
  Circle,
  GoogleMap,
  Libraries,
  LoadScript,
  Marker
} from "@react-google-maps/api";
import { useContext, useRef } from "react";
import { DEFAULT_LOCATION, DEFAULT_RADIUS_METERS } from "../constants/defaults";
import { GroupContext } from "../contexts/GroupContext";
import Controls from "./Controls";
import MarkerGroup from "./MarkerGroup";

const LIBRARIES: Libraries = ["places"];

const Map = () => {
  const { groups, searchResults } = useContext(GroupContext);

  const circleRef = useRef<google.maps.Circle>(null);
  const handleCircleLoad = (circle: google.maps.Circle) => {
    (circleRef.current as google.maps.Circle | null) = circle;
  };

  const options = {
    disableDefaultUI: true,
    zoomControl: true
  };

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={LIBRARIES}
    >
      <div
        style={{
          position: "relative"
        }}
      >
        <Controls circle={circleRef.current!} />

        <GoogleMap
          mapContainerStyle={{ width: "100vw", height: "100vh" }}
          center={DEFAULT_LOCATION}
          zoom={14}
          options={options}
        >
          <Circle
            editable
            center={DEFAULT_LOCATION}
            radius={DEFAULT_RADIUS_METERS}
            options={{
              fillColor: "#AA0000",
              fillOpacity: 0.1,
              strokeColor: "#AA0000",
              strokeOpacity: 0.3,
              strokeWeight: 1
            }}
            onLoad={handleCircleLoad}
          />
          {groups.map(
            (group) =>
              group.visible && <MarkerGroup key={group.id} group={group} />
          )}
          {searchResults.map((place) => (
            <Marker
              key={place.place_id}
              position={place.geometry.location}
              title={place.name}
            />
          ))}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default Map;
