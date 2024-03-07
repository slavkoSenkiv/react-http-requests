import logo from "./assets/logo.png";
import Places from "./components/Places";
import availablePlaces from "./../backend/data/places.json";
import { useState } from "react";
export default function App() {
  const [userPlaces, setUserPlaces] = useState();

  function handleSelectPlace(place) {
    setUserPlaces((prevUserPlaces) => {
      if (!userPlaces) {
        return [];
      }
      if (prevUserPlaces.some((userPlace) => userPlace.id === place.id)) {
        return prevUserPlaces;
      }
      return [...prevUserPlaces, place];
    });
  }

  return (
    <>
      <header>
        <img src={logo} alt="" />
        <h1>Placepicker</h1>
        <p>select places you dream to visit</p>
      </header>

      <main>
        <Places
          title="Selected places"
          fallbackText="click on available places"
          places={userPlaces}
          onSelectPlace={() => {}}
        />
        <Places
          title="Available places"
          fallbackText="there are no available places for you"
          places={availablePlaces}
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}
