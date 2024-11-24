// src/components/SearchBar.jsx
import React, { useState, useContext } from "react";
import { StandaloneSearchBox } from "@react-google-maps/api";
import { GroupContext } from "../contexts/GroupContext";

const SearchBar = () => {
  const [searchBox, setSearchBox] = useState(null);
  const [places, setPlaces] = useState([]);
  const { groups, setGroups } = useContext(GroupContext);
  const [selectedGroupId, setSelectedGroupId] = useState("");

  const onLoad = ref => {
    setSearchBox(ref);
  };

  const handlePlacesChanged = () => {
    const placesResult = searchBox.getPlaces();
    setPlaces(placesResult);
  };

  const handleAddPlace = place => {
    if (!selectedGroupId) return;
    setGroups(
      groups.map(
        group =>
          group.id === selectedGroupId
            ? { ...group, places: [...group.places, place] }
            : group
      )
    );
  };

  const handleAddAllPlaces = () => {
    if (!selectedGroupId) return;
    setGroups(
      groups.map(
        group =>
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

      {places.length > 0 &&
        <div>
          <select
            value={selectedGroupId}
            onChange={e => setSelectedGroupId(e.target.value)}
          >
            <option value="">Select Group</option>
            {groups.map(group =>
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            )}
          </select>
          <button onClick={handleAddAllPlaces}>Add All to Group</button>
          <ul>
            {places.map(place =>
              <li key={place.place_id}>
                {place.name}
                <button onClick={() => handleAddPlace(place)}>
                  Add to Group
                </button>
              </li>
            )}
          </ul>
        </div>}
    </div>
  );
};

export default SearchBar;
