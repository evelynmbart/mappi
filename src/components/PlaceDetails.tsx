import { InfoWindow } from "@react-google-maps/api";
import { Place } from "../types";

interface Props {
  place: Place;
  position: google.maps.LatLngLiteral;
  onClose: () => void;
}

const PlaceDetails = ({ place, position, onClose }: Props) => {
  return (
    <InfoWindow position={position} onCloseClick={onClose}>
      <div>
        <h4>{place.name}</h4>
        <p>{place.formatted_address}</p>
      </div>
    </InfoWindow>
  );
};

export default PlaceDetails;
