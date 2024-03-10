import logo from "./assets/logo.png";
import Places from "./components/Places";
import availablePlaces from "./../backend/data/places.json";
import { useState, useRef, useCallback, useEffect } from "react";
import Modal from "./components/Modal";
import DeleteConfirmation from "./components/DeleteConfirmation";
import { sortPlacesByDistance } from "./loc";
import {
  fetchAvailablePlaces,
  fetchUserPlaces,
  updateUserPlaces,
} from "./http";
import AvailablePlaces from "./components/AvailablePlaces";

export default function App() {
  const [userPlaces, setUserPlaces] = useState([]);
  const [availableSortedPlaces, setAvailableSortedPlaces] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState();
  const selectedPlace = useRef();

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        const userPlacesData = await fetchUserPlaces();
        setUserPlaces(userPlacesData);
      } catch (error) {
        setError({ message: error.message || "failed to fetch user places" });
        console.error("Error fetching data:", error);
      }
      setIsFetching(false);
    }

    fetchPlaces();
  }, []);

  async function handleSelectPlace(place) {
    setUserPlaces((prevUserPlaces) => {
      if (prevUserPlaces.some((userPlace) => userPlace.id === place.id)) {
        return prevUserPlaces;
      }
      return [...prevUserPlaces, place];
    });
    try {
      await updateUserPlaces([...userPlaces, place]);
    } catch (error) {
      setUserPlaces(userPlaces);
      setErrorUpdatingPlaces({
        message: error.message || "failed to update user places",
      });
      console.error("Error fetching data:", error);
    }
  }

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  const handleRemovePlace = useCallback(
    async function handleRemovePlace() {
      setUserPlaces((prevUserPlaces) =>
        prevUserPlaces.filter(
          (userPlace) => userPlace.id !== selectedPlace.current.id
        )
      );
      try {
        await updateUserPlaces(
          userPlaces.filter(
            (userPlace) => userPlace.id !== selectedPlace.current.id
          )
        );
      } catch (error) {
        setUserPlaces(userPlaces);
        setErrorUpdatingPlaces({
          message: error.message || "failed to delete user places",
        });
        console.error("Error fetching data:", error);
      }
      setModalIsOpen(false);
    },
    [userPlaces]
  );

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  function handleError() {
    setError(null);
  }

  return (
    <>
      <Modal open={errorUpdatingPlaces} oClose={handleError}>
        {errorUpdatingPlaces && (
          <Error
            message={errorUpdatingPlaces.message}
            onConfirm={handleError}
          />
        )}
      </Modal>

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
        <AvailablePlaces onSelectPlace={handleSelectPlace}/>
      </main>
    </>
  );
}
