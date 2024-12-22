import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState
} from "react";
import { DEFAULT_LOCATION, DEFAULT_RADIUS_METERS } from "../constants/defaults";
import { Group, Place, Tab } from "../types";

interface GroupContextType {
  groups: Group[];
  setGroups: Dispatch<SetStateAction<Group[]>>;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  searchResults: Place[];
  setSearchResults: Dispatch<SetStateAction<Place[]>>;
  tab: Tab;
  setTab: Dispatch<SetStateAction<Tab>>;
  search: (query: string, searchCircle: google.maps.Circle) => Promise<void>;
  isSearching: boolean;
  setIsSearching: Dispatch<SetStateAction<boolean>>;
}

export const GroupContext = createContext<GroupContextType>({
  groups: [],
  setGroups: () => {},
  searchQuery: "",
  setSearchQuery: () => {},
  searchResults: [],
  setSearchResults: () => {},
  tab: Tab.Search,
  setTab: () => {},
  search: async () => {},
  isSearching: false,
  setIsSearching: () => {}
});

export const GroupProvider = ({ children }: { children: ReactNode }) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Place[]>([]);
  const [tab, setTab] = useState<Tab>(Tab.Search);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const search = async (query: string, searchCircle: google.maps.Circle) => {
    setIsSearching(true);
    setTab(Tab.Search);
    setSearchResults([]);
    setSearchQuery(query);
    try {
      const service = new window.google.maps.places.PlacesService(
        document.createElement("div")
      );

      const request: google.maps.places.TextSearchRequest = {
        location: searchCircle?.getCenter() ?? DEFAULT_LOCATION,
        radius: searchCircle?.getRadius() ?? DEFAULT_RADIUS_METERS,
        query: query
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
    setIsSearching(false);
  };

  return (
    <GroupContext.Provider
      value={{
        groups,
        setGroups,
        searchQuery,
        setSearchQuery,
        searchResults,
        setSearchResults,
        tab,
        setTab,
        search,
        isSearching,
        setIsSearching
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};
