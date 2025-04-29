import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { Group, Place, Tab } from "../types";

interface GroupContextType {
  groups: Group[];
  setGroups: Dispatch<SetStateAction<Group[]>>;
  toggleGroupVisibility: (groupId: string) => void;
  selectedGroupID: string | null;
  goToGroup: (groupId: string) => void;
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
  toggleGroupVisibility: () => {},
  selectedGroupID: null,
  goToGroup: () => {},
  searchQuery: "",
  setSearchQuery: () => {},
  searchResults: [],
  setSearchResults: () => {},
  tab: Tab.Search,
  setTab: () => {},
  search: async () => {},
  isSearching: false,
  setIsSearching: () => {},
});

export const GroupProvider = ({ children }: { children: ReactNode }) => {
  const [groups, setGroups] = useState<Group[]>([
    {
      id: "default",
      name: "Default",
      color: "#1a73e8",
      places: [],
      visible: true,
    },
  ]);
  const [selectedGroupID, setSelectedGroupID] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Place[]>([]);
  const [tab, setTab] = useState<Tab>(Tab.Search);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const toggleGroupVisibility = (groupId: string) => {
    setGroups(
      groups.map((group) =>
        group.id === groupId ? { ...group, visible: !group.visible } : group
      )
    );
  };

  const goToGroup = (groupId: string) => {
    setTab(Tab.Group);
    setSelectedGroupID(groupId);
  };

  const search = async (query: string, searchCircle: google.maps.Circle) => {
    setIsSearching(true);
    setTab(Tab.Search);
    setSearchResults([]);
    setSearchQuery(query);
    try {
      const service = new window.google.maps.places.PlacesService(
        document.createElement("div")
      );

      const center = searchCircle?.getCenter();
      const radius = searchCircle?.getRadius();

      if (!center || !radius) {
        throw new Error("Search circle is not properly defined");
      }

      const request: google.maps.places.TextSearchRequest = {
        location: center,
        radius: radius,
        query: query,
      };

      service.textSearch(request, (results, status) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          results
        ) {
          // Filter results to only include places within the circle
          const filteredResults = results.filter((place) => {
            if (!place.geometry?.location) return false;

            const placeLatLng = new google.maps.LatLng(
              place.geometry.location.lat(),
              place.geometry.location.lng()
            );

            const centerLatLng = new google.maps.LatLng(
              center.lat(),
              center.lng()
            );

            const distance =
              google.maps.geometry.spherical.computeDistanceBetween(
                placeLatLng,
                centerLatLng
              );

            return distance <= radius;
          });

          setSearchResults(filteredResults as unknown as Place[]);
        } else {
          console.error("PlacesServiceStatus:", status);
          setSearchResults([]);
        }
      });
    } catch (error) {
      console.error("Geocoding failed:", error);
      setSearchResults([]);
    }
    setIsSearching(false);
  };

  return (
    <GroupContext.Provider
      value={{
        groups,
        setGroups,
        toggleGroupVisibility,
        selectedGroupID,
        goToGroup,
        searchQuery,
        setSearchQuery,
        searchResults,
        setSearchResults,
        tab,
        setTab,
        search,
        isSearching,
        setIsSearching,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};
