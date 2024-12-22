import { useContext, useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
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

const GroupManager = ({ searchCircle }: Props) => {
  const { groups, setGroups, toggleGroupVisibility, goToGroup } =
    useContext(GroupContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleRemoveGroup = (groupId: string) => {
    if (groups.length <= 1) {
      alert("You must have at least one group");
      return;
    }
    setGroups(groups.filter((group) => group.id !== groupId));
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
        <GroupList>
          {groups.map((group) => (
            <GroupItem
              key={group.id}
              onClick={() => goToGroup(group.id)}
              color={group.color}
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  toggleGroupVisibility(group.id);
                }}
              >
                {group.visible ? (
                  <MdCheckBox size={24} />
                ) : (
                  <MdCheckBoxOutlineBlank size={24} />
                )}
              </div>
              <GroupText>
                <GroupName>{group.name}</GroupName>
                <PlacesCount>{group.places.length} places</PlacesCount>
              </GroupText>
              <GroupActions>
                <ActionButton>
                  <FiEdit2 size={18} />
                </ActionButton>
                <ActionButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveGroup(group.id);
                  }}
                >
                  <FiTrash2 size={18} />
                </ActionButton>
              </GroupActions>
            </GroupItem>
          ))}
        </GroupList>

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
  padding: 16px 0;
`;

const Header = styled.div`
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding: 0 16px;
`;

const GroupList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const GroupItem = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 16px;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  color: ${(props) => props.color};

  &:hover {
    background-color: #f8f9fa;
  }
`;

const GroupText = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const GroupName = styled.span`
  font-weight: 500;
`;

const PlacesCount = styled.span`
  font-size: 0.8em;
  font-weight: 500;
  color: #666;
`;

const GroupActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: #666;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #f0f0f0;
    color: #333;
  }
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
