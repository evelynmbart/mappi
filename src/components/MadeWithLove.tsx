import styled from "styled-components";

export const MadeWithLove = () => {
  return (
    <>
      <Footer>
        Made with <Heart>♥</Heart> by{" "}
        <Link
          href="https://evelynmbart.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Evelyn Bart
        </Link>
        {" • "}
        <Link
          href="https://github.com/evelynmbart/mappi"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </Link>
      </Footer>
    </>
  );
};

const Footer = styled.div`
  margin-top: auto;
  padding-top: 32px;
  font-size: 0.9em;
  color: #666;
`;

const Heart = styled.span`
  color: #ff4b4b;
`;

const Link = styled.a`
  color: #1a73e8;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
