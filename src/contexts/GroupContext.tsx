import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState
} from "react";
import { Group, Place } from "../types";

interface GroupContextType {
  groups: Group[];
  setGroups: Dispatch<SetStateAction<Group[]>>;
  searchResults: Place[];
  setSearchResults: Dispatch<SetStateAction<Place[]>>;
}

export const GroupContext = createContext<GroupContextType>({
  groups: [],
  setGroups: () => {},
  searchResults: [],
  setSearchResults: () => {}
});

export const GroupProvider = ({ children }: { children: ReactNode }) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [searchResults, setSearchResults] = useState<Place[]>([]);

  return (
    <GroupContext.Provider
      value={{ groups, setGroups, searchResults, setSearchResults }}
    >
      {children}
    </GroupContext.Provider>
  );
};
