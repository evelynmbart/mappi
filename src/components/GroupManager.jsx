// src/components/GroupManager.jsx
import React, { useContext, useState } from "react";
import { GroupContext } from "../contexts/GroupContext";
import { v4 as uuidv4 } from "uuid";
import { HexColorPicker } from "react-colorful";

const GroupManager = () => {
  const { groups, setGroups } = useContext(GroupContext);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupColor, setNewGroupColor] = useState("#aabbcc");

  const createGroup = () => {
    if (newGroupName.trim() === "") return;
    const newGroup = {
      id: uuidv4(),
      name: newGroupName,
      color: newGroupColor,
      places: [],
      visible: true
    };
    setGroups([...groups, newGroup]);
    setNewGroupName("");
  };

  const toggleGroupVisibility = groupId => {
    setGroups(
      groups.map(
        group =>
          group.id === groupId ? { ...group, visible: !group.visible } : group
      )
    );
  };

  const removePlaceFromGroup = (groupId, placeId) => {
    setGroups(
      groups.map(
        group =>
          group.id === groupId
            ? {
                ...group,
                places: group.places.filter(place => place.place_id !== placeId)
              }
            : group
      )
    );
  };

  return (
    <div>
      <h3>Create New Group</h3>
      <input
        type="text"
        placeholder="Group Name"
        value={newGroupName}
        onChange={e => setNewGroupName(e.target.value)}
      />
      <HexColorPicker color={newGroupColor} onChange={setNewGroupColor} />
      <button onClick={createGroup}>Create Group</button>

      <h3>Existing Groups</h3>
      <ul>
        {groups.map(group =>
          <li key={group.id}>
            <input
              type="checkbox"
              checked={group.visible}
              onChange={() => toggleGroupVisibility(group.id)}
            />
            <span
              style={{
                color: group.color,
                fontWeight: "bold",
                marginLeft: "5px"
              }}
            >
              {group.name}
            </span>

            {/* List places in the group */}
            <ul>
              {group.places.map(place =>
                <li key={place.place_id}>
                  {place.name}
                  <button
                    onClick={() =>
                      removePlaceFromGroup(group.id, place.place_id)}
                  >
                    Remove
                  </button>
                </li>
              )}
            </ul>
          </li>
        )}
      </ul>
    </div>
  );
};

export default GroupManager;
