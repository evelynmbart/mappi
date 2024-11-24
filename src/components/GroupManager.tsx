import { useContext } from "react";
import { GroupContext } from "../contexts/GroupContext";

const GroupManager = () => {
  const { groups, setGroups } = useContext(GroupContext);

  const removePlaceFromGroup = (groupId: string, placeId: string) => {
    setGroups(
      groups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              places: group.places.filter((place) => place.place_id !== placeId)
            }
          : group
      )
    );
  };

  return (
    <div>
      <h3>Existing Groups</h3>
      <ul>
        {groups.map((group) => (
          <li key={group.id}>
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
              {group.places.map((place) => (
                <li key={place.place_id}>
                  {place.name}
                  <button
                    onClick={() =>
                      removePlaceFromGroup(group.id, place.place_id)
                    }
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupManager;
