import logo from "./assets/logo.png";
import Places from "./components/Places";
import availablePlaces from "./../backend/data/places.json";
import { useState } from "react";
import Modal from "./components/Modal";
import DeleteConfirmation from "./components/DeleteConfirmation";

export default function App() {
  const [userPlaces, setUserPlaces] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleSelectPlace(place) {
    setUserPlaces((prevUserPlaces) => {
      if (prevUserPlaces.some((userPlace) => userPlace.id === place.id)) {
        return prevUserPlaces;
      }
      return [...prevUserPlaces, place];
    });
  }

  function handleRemovePlace(place) {
    setUserPlaces((prevUserPlaces) => {
      return prevUserPlaces.filter((userPlace) => userPlace.id !== place.id);
    });
  }

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    handleRemovePlace(place);
  }

  function handleStopRemovePlace() {

  }

  return (
    <>
      <header>
        <img src={logo} alt="" />
        <h1>Placepicker</h1>
        <p>select places you dream to visit</p>
      </header>

      <main>

        <Modal 
          open={modalIsOpen} 
          onClose={handleStopRemovePlace}
        >
          <DeleteConfirmation />
        </Modal>

        <Places
          title="Selected places"
          fallbackText="click on available places"
          places={userPlaces}
          onSelectPlace={handleStartRemovePlace}
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
