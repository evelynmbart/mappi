// src/App.jsx
import React from "react";
import Map from "./components/Map";
import { GroupProvider } from "./contexts/GroupContext";

function App() {
  return (
    <GroupProvider>
      <Map />
    </GroupProvider>
  );
}

export default App;
