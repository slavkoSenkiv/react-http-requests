import { useState, useRef, useCallback, useEffect } from "react";
import Places from "./components/Places";
import Modal from "./components/Modal";
import DeleteConfirmation from "./components/DeleteConfirmation";
import logo from "./assets/logo.png";
import availablePlaces from "./../backend/data/places.json";
import { fetchUserPlaces, updateUserPlaces } from "./http";
import AvailablePlaces from "./components/AvailablePlaces";

export default function App() {
  const selectedPlace = useRef();
  const [userPlaces, setUserPlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);

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

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(place) {
    setUserPlaces((prevUserPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevUserPlaces.some((userPlace) => userPlace.id === place.id)) {
        return prevUserPlaces;
      }
      return [...prevUserPlaces, place];
    });

    /* 
    the folowing code is aka optimistic state update,
    where you update FE first (setUserPlaces above)
    and send BE request afterwards (try & catch below)

    optimistinc updating has better UX than loading progress bar.
    this works when performing updates, 
    but does not work with fetching data */
    try {
      await updateUserPlaces([...userPlaces, place]);
    } catch (error) {
      /* 
      if something goes wrong, 
      we roll back the change and update UI  */
      setUserPlaces(userPlaces);
      setErrorUpdatingPlaces({
        message: error.message || "failed to update user places",
      });
      console.error("Error fetching data:", error);
    }
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

  function handleError() {
    setErrorUpdatingPlaces(null);
  }

  return (
    <>
      <Modal open={errorUpdatingPlaces} oClose={handleError}>
        {/* the modal opens (open sets to true) if we have an error */}
        {errorUpdatingPlaces && (
          <Error
            message={errorUpdatingPlaces.message}
            onConfirm={handleError}
          />
        )}
      </Modal>

      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logo} alt="" />
        <h1>Placepicker</h1>
        <p>select places you dream to visit</p>
      </header>

      <main>
        {!error && (
          <Places
            title="Selected places"
            fallbackText="click on available places"
            isLoading={isFetching}
            loadingText="Fetching user place data..."
            places={userPlaces}
            onSelectPlace={handleStartRemovePlace}
          />
        )}
        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}
