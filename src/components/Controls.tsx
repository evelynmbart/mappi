import { useContext, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { FiPlus, FiSearch } from "react-icons/fi";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { GroupContext } from "../contexts/GroupContext";
import GroupManager from "./GroupManager";
import SearchBar from "./SearchBar";

enum Tab {
  Search = "search",
  CreateGroup = "create-group",
  Group = "group"
}

const DEFAULT_GROUP_COLOR = "#5aa1e8";

export default function Controls() {
  const { groups, setGroups } = useContext(GroupContext);

  const [tab, setTab] = useState<Tab>(Tab.Search);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupColor, setNewGroupColor] = useState(DEFAULT_GROUP_COLOR);

  console.log(groups);

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
    setNewGroupColor(DEFAULT_GROUP_COLOR);
  };

  const toggleGroupVisibility = (groupId: string) => {
    setGroups(
      groups.map((group) =>
        group.id === groupId ? { ...group, visible: !group.visible } : group
      )
    );
  };

  return (
    <Container>
      <Sidebar>
        <SidebarButton onClick={() => setTab(Tab.Search)}>
          <FiSearch size={24} />
          Search
        </SidebarButton>
        <Divider />

        <SidebarButton onClick={() => setTab(Tab.CreateGroup)}>
          <FiPlus size={24} />
          Add group
        </SidebarButton>
        {groups.map((group) => (
          <SidebarButton
            key={group.id}
            onClick={() => {
              setTab(Tab.Group);
              setSelectedGroupId(group.id);
            }}
            style={{ color: group.color }}
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
            {group.name}
          </SidebarButton>
        ))}
      </Sidebar>
      <Content>
        {tab === Tab.Search && <SearchBar />}
        {tab === Tab.CreateGroup && (
          <div>
            <h3>Create New Group</h3>
            <input
              type="text"
              placeholder="Group Name"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
            />
            <HexColorPicker color={newGroupColor} onChange={setNewGroupColor} />
            <button onClick={createGroup}>Create Group</button>
          </div>
        )}
        {tab === Tab.Group && <GroupManager />}
      </Content>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  z-index: 1;
  background: white;
  color: black;
  height: 100vh;
  box-shadow: 0 1px 2px rgba(60, 64, 67, 0.3),
    0 2px 6px 2px rgba(60, 64, 67, 0.15);
  display: flex;
`;

const Sidebar = styled.div`
  box-shadow: 0 1px 2px rgba(60, 64, 67, 0.3),
    0 2px 6px 2px rgba(60, 64, 67, 0.15);
  width: 80px;
  font-size: 12px;
  font-weight: bold;
  color: gray;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px 0;
`;

const SidebarButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
  cursor: pointer;
  gap: 5px;

  &:hover {
    color: black;
  }
`;

const Divider = styled.div`
  height: 1px;
  width: calc(100% - 30px);
  background: lightgray;
`;

const Content = styled.div`
  width: 400px;
  padding: 20px;
`;

const CreateGroupContainer = styled.div`
  padding: 10px;
  background: #333;
  color: white;
  margin-left: 20px;
  position: relative;
  border-radius: 5px;
`;
