import { GoogleMap, Libraries, LoadScript } from "@react-google-maps/api";
import { useContext } from "react";
import { GroupContext } from "../contexts/GroupContext";
import Controls from "./Controls";
import MarkerGroup from "./MarkerGroup";

const LIBRARIES: Libraries = ["places"];
const NYC = {
  lat: 40.7128, // Latitude of NYC
  lng: -74.006 // Longitude of NYC
};

const Map = () => {
  const { groups } = useContext(GroupContext);

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
        <Controls />

        {/* Map */}
        <GoogleMap
          mapContainerStyle={{ width: "100vw", height: "100vh" }}
          center={NYC}
          zoom={14}
          options={options}
        >
          {groups.map(
            (group) =>
              group.visible && <MarkerGroup key={group.id} group={group} />
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default Map;
