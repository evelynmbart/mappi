import styled from "styled-components";
import { Place } from "../types";

interface Props {
  place: Place;
  onAdd: (place: Place) => void;
}

export function SearchResult({ place, onAdd }: Props) {
  return (
    <Container>
      <Top>
        <Info>
          <Name>{place.name}</Name>
          <Rating>
            {place.rating} stars ({place.user_ratings_total} reviews)
          </Rating>
          <Address title={place.formatted_address}>
            {place.formatted_address}
          </Address>
        </Info>
        {place.photos?.[0] && <Photo src={place.photos[0].getUrl()} />}
      </Top>
      <Bottom>
        <Button onClick={() => onAdd(place)}>Add to group</Button>
        <a
          href={`https://www.google.com/maps/place/?q=place_id:${place.place_id}`}
          target="_blank"
          rel="noreferrer"
        >
          <Button>View on Google</Button>
        </a>
      </Bottom>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-bottom: 1px solid lightgray;
  padding: 16px 20px 24px;
`;

const Top = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const Bottom = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 16px;
  border: 1px solid dodgerblue;
  color: dodgerblue;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  background-color: white;
  width: 100%;

  &:hover {
    cursor: pointer;
    background-color: aliceblue;
    box-shadow: 0 1px 2px rgba(60, 64, 67, 0.3),
      0 1px 3px 1px rgba(60, 64, 67, 0.15);
  }
`;

const Info = styled.div`
  flex: 1;
  padding: 8px;
`;

const Name = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

const Rating = styled.div`
  font-size: 14px;
  color: dimgray;
`;

const Address = styled.div`
  font-size: 12px;
  color: dimgray;
  padding-right: 16px;
`;

const Photo = styled.img`
  width: 84px;
  height: 84px;
  object-fit: cover;
  border-radius: 8px;
`;
