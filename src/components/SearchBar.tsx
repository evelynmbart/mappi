import { StandaloneSearchBox } from "@react-google-maps/api";
import { useContext, useState } from "react";
import { GroupContext } from "../contexts/GroupContext";
import { Place } from "../types";

const SearchBar = () => {
  const [searchBox, setSearchBox] =
    useState<google.maps.places.SearchBox | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const { groups, setGroups } = useContext(GroupContext);
  const [selectedGroupId, setSelectedGroupId] = useState("");

  const onLoad = (ref: google.maps.places.SearchBox) => {
    setSearchBox(ref);
  };

  const handlePlacesChanged = () => {
    if (!searchBox) return;
    const placesResult = searchBox.getPlaces();
    console.log(placesResult);
    /**
     * - formatted_address
     * - geometry
     * - icon
     * - icon_background_color
     * - name
     * - place_id
     * - rating
     * - user_ratings_total
     */
    setPlaces(placesResult as unknown as Place[]);
  };

  const handleAddPlace = (place: Place) => {
    if (!selectedGroupId) return;
    setGroups(
      groups.map((group) =>
        group.id === selectedGroupId
          ? { ...group, places: [...group.places, place] }
          : group
      )
    );
  };

  const handleAddAllPlaces = () => {
    if (!selectedGroupId) return;
    setGroups(
      groups.map((group) =>
        group.id === selectedGroupId
          ? { ...group, places: [...group.places, ...places] }
          : group
      )
    );
  };

  return (
    <div>
      <StandaloneSearchBox
        onLoad={onLoad}
        onPlacesChanged={handlePlacesChanged}
      >
        <input
          type="text"
          placeholder="Search for places..."
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            fontSize: `14px`,
            marginTop: `10px`,
            marginBottom: `10px`
          }}
        />
      </StandaloneSearchBox>

      {places.length > 0 && (
        <div>
          <select
            value={selectedGroupId}
            onChange={(e) => setSelectedGroupId(e.target.value)}
          >
            <option value="">Select Group</option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
          <button onClick={handleAddAllPlaces}>Add All to Group</button>
          <ul>
            {places.map((place) => (
              <li key={place.place_id}>
                {place.name}
                <button onClick={() => handleAddPlace(place)}>
                  Add to Group
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
