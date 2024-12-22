import { useEffect, useState } from "react";
import styled from "styled-components";
import { MadeWithLove } from "./components/MadeWithLove";
import Map from "./components/Map";
import { GroupProvider } from "./contexts/GroupContext";

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [bypassMobile, setBypassMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile && !bypassMobile) {
    return (
      <MobileBlocker>
        <Icon>📱</Icon>
        <Title>Please use a larger screen :(</Title>
        <Message>
          Sorry about that. Mappi has lots of tools and controls. It works best
          on a desktop screen. Please visit on a device with a larger screen for
          the best experience.
        </Message>
        <BypassButton onClick={() => setBypassMobile(true)}>
          I don&apos;t care, let me in anyway.
        </BypassButton>
        <div>
          <MadeWithLove />
        </div>
      </MobileBlocker>
    );
  }

  return (
    <GroupProvider>
      <Container>
        <Map />
      </Container>
    </GroupProvider>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;

const MobileBlocker = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: #f6fafe;
  margin: 0;
`;

const Icon = styled.div`
  font-size: 48px;
  margin-bottom: 24px;
  margin-top: -100px;
`;

const Title = styled.h1`
  color: #333;
  font-size: 24px;
  margin-bottom: 16px;
`;

const Message = styled.p`
  color: #666;
  font-size: 16px;
  line-height: 1.6;
  max-width: 400px;
`;

const BypassButton = styled.button`
  margin-top: 24px;
  padding: 8px 16px;
  font-size: 14px;
  color: #666;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f0f0f0;
  }
`;

export default App;
