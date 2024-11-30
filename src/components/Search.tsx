import { useContext, useRef, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import styled from "styled-components";
import { DEFAULT_LOCATION, DEFAULT_RADIUS_METERS } from "../constants/defaults";
import { GroupContext } from "../contexts/GroupContext";
import { Place } from "../types";
import { SearchResult } from "./SearchResult";

interface Props {
  circle: google.maps.Circle;
}

export function Search({ circle }: Props) {
  const { groups, setGroups, searchResults, setSearchResults } =
    useContext(GroupContext);
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
          ? { ...group, places: [...group.places, ...searchResults] }
          : group
      )
    );
  };

  const handleScroll = () => {
    if (!resultsRef.current) return;
    setIsScrolled(resultsRef.current.scrollTop > 0);
  };

  const clearSearch = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      setSearchResults([]);
    }
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchResults([]);
    try {
      const service = new window.google.maps.places.PlacesService(
        document.createElement("div")
      );

      const request: google.maps.places.TextSearchRequest = {
        location: circle?.getCenter() ?? DEFAULT_LOCATION,
        radius: circle?.getRadius() ?? DEFAULT_RADIUS_METERS,
        query: inputRef.current?.value
      };

      service.textSearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setSearchResults(results as unknown as Place[]);
        } else {
          console.error("PlacesServiceStatus:", status);
        }
      });
    } catch (error) {
      console.error("Geocoding failed:", error);
    }
  };

  return (
    <Container>
      <TopSection hasBoxShadow={isScrolled}>
        <InputWrapper onSubmit={handleSearch}>
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search keyword (optional)..."
          />

          <SearchButton type="submit">
            <FiSearch size={18} />
          </SearchButton>
          <ClearButton onClick={clearSearch}>
            <FiX size={18} />
          </ClearButton>
        </InputWrapper>

        {searchResults.length > 0 && (
          <Controls>
            <SelectWrapper>
              <Select
                value={selectedGroupId}
                onChange={(e) => setSelectedGroupId(e.target.value)}
              >
                <option value="">Select Group</option>
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </Select>
            </SelectWrapper>
            <AddButton onClick={handleAddAllPlaces}>Add All to Group</AddButton>
          </Controls>
        )}
      </TopSection>

      {searchResults.length > 0 && (
        <SearchResults ref={resultsRef} onScroll={handleScroll}>
          {searchResults.map((place) => (
            <SearchResult
              key={place.place_id}
              place={place}
              onAdd={handleAddPlace}
            />
          ))}
        </SearchResults>
      )}
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
  ${(props) =>
    props.hasBoxShadow &&
    `
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  `}
`;

const Controls = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

const InputWrapper = styled.form`
  position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  box-sizing: border-box;
  border: 1px solid lightgray;
  width: 100%;
  padding: 12px 18px;
  padding-right: 72px;
  border-radius: 32px;
  font-size: 14px;
`;

const IconButton = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  color: gray;
  padding: 8px;

  &:hover {
    color: black;
  }
`;

const SearchButton = styled(IconButton)`
  right: 32px;
`;

const ClearButton = styled(IconButton)`
  right: 8px;
`;

const SearchResults = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const SelectWrapper = styled.div`
  position: relative;
  min-width: 200px;
  flex-grow: 1;

  &:after {
    content: "";
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #666;
    pointer-events: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 8px 32px 8px 16px;
  font-size: 14px;
  border: 1px solid lightgray;
  border-radius: 4px;
  background: white;
  appearance: none;
  cursor: pointer;
  outline: none;

  &:hover {
    border-color: #999;
  }

  &:focus {
    border-color: #1a73e8;
    box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.2);
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
