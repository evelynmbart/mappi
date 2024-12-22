export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Place {
  formatted_address: string;
  geometry: {
    location: Coordinates;
  };
  name: string;
  photos: google.maps.places.PlacePhoto[];
  place_id: string;
  rating: number;
  user_ratings_total: number;
}

export interface Group {
  id: string;
  name: string;
  color: string;
  visible: boolean;
  places: Place[];
}

export enum Tab {
  Search = "search",
  ManageGroups = "manage-groups",
  Group = "group"
}
