import { useEffect, useState } from "react";
import { fetchAvailablePlaces } from "../http";
import Places from "./Places";
export default function AvailablePlaces({onSelectPlace}) {
  const [availablePlaces, setAvailablePlaces] = useState([])
  const [isFetching, setIsFetching] = useState()

  useEffect(()=>{
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        const places = await fetchAvailablePlaces();
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });
      } catch(error) {
        setError({
          message: error.message || "Cound not fetch places, please try later",
        });
        setIsFetching(false)
      }
    }
    fetchPlaces()
  }, [])
  return (
    <Places
      title="Available places"
      fallbackText="there are no available places for you"
      places={availableSortedPlaces}
      onSelectPlace={onSelectPlace}
    />
  );
}
