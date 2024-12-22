import { useContext, useState } from "react";
import { HexColorPicker } from "react-colorful";
import styled from "styled-components";
import { GroupContext } from "../contexts/GroupContext";

interface Props {
  onCancel: () => void;
  onSubmit: (name: string, color: string) => void;
  editingGroupID?: string;
}

export default function CreateGroup({
  onCancel,
  onSubmit,
  editingGroupID
}: Props) {
  const { groups } = useContext(GroupContext);
  const editingGroup = editingGroupID
    ? groups.find((g) => g.id === editingGroupID)
    : null;

  const [newGroupName, setNewGroupName] = useState(editingGroup?.name || "");
  const [newGroupColor, setNewGroupColor] = useState(
    editingGroup?.color ||
      `#${Math.floor(Math.random() * 0x9f + 0x60).toString(16)}${Math.floor(
        Math.random() * 0x9f + 0x60
      ).toString(16)}${Math.floor(Math.random() * 0x9f + 0x60).toString(16)}`
  ); // Generates random medium-bright color by limiting RGB values between 0x60-0xFF

  return (
    <>
      <ModalTitle>{editingGroup ? "Edit Group" : "New Group"}</ModalTitle>
      <Input
        type="text"
        placeholder="Group name"
        value={newGroupName}
        onChange={(e) => setNewGroupName(e.target.value)}
      />
      <HexColorPicker
        color={newGroupColor}
        onChange={setNewGroupColor}
        style={{ width: "100%", height: "150px" }}
      />
      <ModalButtons>
        <CancelButton onClick={onCancel}>Cancel</CancelButton>
        <CreateButton onClick={() => onSubmit(newGroupName, newGroupColor)}>
          {editingGroup ? "Save" : "Create"}
        </CreateButton>
      </ModalButtons>
    </>
  );
}

const ModalTitle = styled.h2`
  margin: 0 0 16px 0;
  font-size: 20px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;

  &:focus {
    border-color: #1a73e8;
    outline: none;
  }
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
