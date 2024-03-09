import logo from "./assets/logo.png";
import Places from "./components/Places";
import availablePlaces from "./../backend/data/places.json";
import { useState, useRef, useCallback, useEffect } from "react";
import Modal from "./components/Modal";
import DeleteConfirmation from "./components/DeleteConfirmation";
import { sortPlacesByDistance } from "./loc";
import { getPlaces, getUserPlaces, updateUserPlaces } from "./http";

export default function App() {
  const [userPlaces, setUserPlaces] = useState([]);
  const [availableSortedPlaces, setAvailableSortedPlaces] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const selectedPlace = useRef();

  useEffect(() => {
    async function fetchData() {
      try {
        const userPlacesData = await getUserPlaces();
        setUserPlaces(userPlacesData);

        const placesData = await getPlaces();
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            placesData,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailableSortedPlaces(sortedPlaces);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        availablePlaces,
        position.coords.latitude,
        position.coords.longitude
      );
      setAvailableSortedPlaces(sortedPlaces);
    });
  }, []);

  function handleSelectPlace(place) {
    setUserPlaces((prevUserPlaces) => {
      if (prevUserPlaces.some((userPlace) => userPlace.id === place.id)) {
        return prevUserPlaces;
      }
      return [...prevUserPlaces, place];
    });
  }

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  const handleRemovePlace = useCallback(
    function handleRemovePlace() {
      setUserPlaces((prevUserPlaces) => {
        return prevUserPlaces.filter(
          (userPlace) => userPlace.id !== selectedPlace.current.id
        );
      });
      setModalIsOpen(false);
    },
    [userPlaces]
  );

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  return (
    <>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onConfirm={handleRemovePlace}
          onCancel={handleStopRemovePlace}
        />
      </Modal>

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
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available places"
          fallbackText="there are no available places for you"
          places={availableSortedPlaces}
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}
