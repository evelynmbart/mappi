import { useContext, useEffect, useRef } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import styled from "styled-components";
import { GroupContext } from "../contexts/GroupContext";

interface Props {
  searchCircle: google.maps.Circle;
}

export const SearchInput = ({ searchCircle }: Props) => {
  const { search, searchQuery, setSearchQuery, setSearchResults } =
    useContext(GroupContext);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!searchQuery || !inputRef.current) return;
    inputRef.current.value = searchQuery;
    setSearchQuery("");
  }, []);

  const clearSearch = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      setSearchResults([]);
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputRef.current?.value) return;
    search(inputRef.current.value, searchCircle);
  };

  return (
    <InputWrapper onSubmit={handleSearch}>
      <Input ref={inputRef} type="text" placeholder="Search Google Maps" />

      <SearchButton type="submit">
        <FiSearch size={18} />
      </SearchButton>
      <ClearButton onClick={clearSearch}>
        <FiX size={18} />
      </ClearButton>
    </InputWrapper>
  );
};

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
