import "react-tippy/dist/tippy.css";
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
