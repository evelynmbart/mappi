import { useContext, useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { GroupContext } from "../contexts/GroupContext";
import CreateGroup from "./CreateGroup";
import { SearchInput } from "./SearchInput";

interface Props {
  searchCircle: google.maps.Circle;
}

Modal.setAppElement("#root");
const AnyModal = Modal as any;

const DEFAULT_GROUP_COLOR = "#5aa1e8";

const GroupManager = ({ searchCircle }: Props) => {
  const { groups, setGroups } = useContext(GroupContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleCreateGroup = (name: string, color: string) => {
    if (name.trim() === "") return;
    const newGroup = {
      id: uuidv4(),
      name,
      color,
      places: [],
      visible: true
    };
    setGroups([...groups, newGroup]);
    setIsModalOpen(false);
  };

  return (
    <Container>
      <TopSection>
        <SearchInput searchCircle={searchCircle} />
      </TopSection>
      <BottomSection>
        <Header>
          Your Groups
          <AddButton onClick={() => setIsModalOpen(true)}>+ Group</AddButton>
        </Header>
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

        <AnyModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              width: "300px",
              padding: "24px"
            },
            overlay: {
              zIndex: 2,
              backgroundColor: "rgba(0, 0, 0, 0.4)"
            }
          }}
        >
          <CreateGroup
            onCancel={() => setIsModalOpen(false)}
            onSubmit={handleCreateGroup}
          />
        </AnyModal>
      </BottomSection>
    </Container>
  );
};

export default GroupManager;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const TopSection = styled.div`
  padding: 16px;
  position: relative;
  background: white;
  z-index: 1;
  transition: box-shadow 0.2s ease;
  box-shadow: 0 2px 3px -1px rgba(0, 0, 0, 0.1),
    0 1px 2px -1px rgba(0, 0, 0, 0.06);
`;

const BottomSection = styled.div`
  padding: 16px;
`;

const Header = styled.div`
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AddButton = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  color: #1a73e8;
  background: white;
  border: 1px solid #1a73e8;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f6fafe;
  }

  &:active {
    background: #e8f1fc;
  }
`;
