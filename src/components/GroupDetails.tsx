import { useContext, useRef, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import Modal from "react-modal";
import styled from "styled-components";
import { GroupContext } from "../contexts/GroupContext";
import { Place } from "../types";
import CreateGroup from "./CreateGroup";
import { SearchInput } from "./SearchInput";
import { SearchResult } from "./SearchResult";

interface Props {
  searchCircle: google.maps.Circle;
}

Modal.setAppElement("#root");
const AnyModal = Modal as any;

export function GroupDetails({ searchCircle }: Props) {
  const { groups, selectedGroupID, setGroups } = useContext(GroupContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!resultsRef.current) return;
    setIsScrolled(resultsRef.current.scrollTop > 0);
  };

  const group = groups.find((group) => group.id === selectedGroupID);

  const handleEdit = (name: string, color: string) => {
    if (!group || !name.trim()) return;

    setGroups(
      groups.map((g) =>
        g.id === group.id ? { ...g, name: name.trim(), color } : g
      )
    );
    setIsModalOpen(false);
  };

  const handleRemovePlace = (place: Place) => {
    if (!group) return;
    setGroups(
      groups.map((g) =>
        g.id === group.id
          ? {
              ...g,
              places: g.places.filter((p) => p.place_id !== place.place_id)
            }
          : g
      )
    );
  };

  const openEditModal = () => {
    if (!group) return;
    setIsModalOpen(true);
  };

  return (
    <Container>
      <TopSection hasBoxShadow={isScrolled}>
        <SearchInput searchCircle={searchCircle} />
        {!!group && (
          <Header>
            <GroupNameWrapper>
              <GroupName>{group.name}</GroupName>
              <EditButton onClick={openEditModal}>
                <FiEdit2 size={16} />
              </EditButton>
            </GroupNameWrapper>
            <PlacesCount>{group.places.length} places</PlacesCount>
          </Header>
        )}
      </TopSection>

      {!!group && (
        <>
          {group.places.length > 0 && (
            <SearchResults ref={resultsRef} onScroll={handleScroll}>
              {group.places.map((place) => (
                <SearchResult
                  key={place.place_id}
                  place={place}
                  onRemove={() => handleRemovePlace(place)}
                />
              ))}
            </SearchResults>
          )}
        </>
      )}

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
          onSubmit={handleEdit}
          editingGroupID={group?.id}
        />
      </AnyModal>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const TopSection = styled.div<{ hasBoxShadow: boolean }>`
  padding: 16px;
  position: relative;
  background: white;
  z-index: 1;
  transition: box-shadow 0.2s ease;
  box-shadow: 0 2px 3px -1px rgba(0, 0, 0, 0.1),
    0 1px 2px -1px rgba(0, 0, 0, 0.06);
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 8px;
  padding: 8px;
`;

const GroupNameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const GroupName = styled.span`
  font-size: 1.2em;
  font-weight: 500;
`;

const EditButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;

  &:hover {
    background: #f0f0f0;
    color: #333;
  }
`;

const PlacesCount = styled.span`
  font-size: 0.9em;
  font-weight: 500;
  color: #666;
`;

const SearchResults = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ModalTitle = styled.h2`
  margin: 0 0 16px 0;
  font-size: 20px;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
`;

const Button = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
`;

const CancelButton = styled(Button)`
  color: #666;
  background: white;
  border: 1px solid #ddd;

  &:hover {
    background: #f5f5f5;
  }
`;

const CreateButton = styled(Button)`
  color: white;
  background: #1a73e8;
  border: 1px solid #1a73e8;

  &:hover {
    background: #1557b0;
  }
`;
