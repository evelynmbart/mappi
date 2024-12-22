import { useContext } from "react";
import { FiBookmark, FiSearch } from "react-icons/fi";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import styled from "styled-components";
import { GroupContext } from "../contexts/GroupContext";
import { GroupDetails } from "./GroupDetails";
import GroupManager from "./GroupManager";
import { Search } from "./Search";

enum Tab {
  Search = "search",
  ManageGroups = "manage-groups",
  Group = "group"
}

interface Props {
  circle: google.maps.Circle;
}

export default function Controls({ circle }: Props) {
  const { groups, goToGroup, toggleGroupVisibility, tab, setTab } =
    useContext(GroupContext);

  return (
    <Container>
      <Sidebar>
        <SidebarButton onClick={() => setTab(Tab.Search)}>
          <FiSearch size={24} />
          Search
        </SidebarButton>
        <Divider />

        <SidebarButton onClick={() => setTab(Tab.ManageGroups)}>
          <FiBookmark size={24} />
          Groups
        </SidebarButton>
        {groups.map((group) => (
          <SidebarButton
            key={group.id}
            onClick={() => {
              goToGroup(group.id);
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
        {tab === Tab.Search && <Search circle={circle} />}
        {tab === Tab.ManageGroups && <GroupManager searchCircle={circle} />}
        {tab === Tab.Group && <GroupDetails searchCircle={circle} />}
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
  padding: 20px 4px;
  z-index: 2;
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
`;

const CreateGroupContainer = styled.div`
  padding: 10px;
  background: #333;
  color: white;
  margin-left: 20px;
  position: relative;
  border-radius: 5px;
`;
