import axios from 'axios';

// Function to get places data from the server
async function getPlaces() {
  try {
    const response = await axios.get('http://localhost:3000/places');
    return response.data;
  } catch (error) {
    console.error('Error fetching places:', error);
    throw error;
  }
}

// Function to get user places data from the server
async function getUserPlaces() {
  try {
    const response = await axios.get('http://localhost:3000/user-places');
    return response.data;
  } catch (error) {
    console.error('Error fetching user places:', error);
    throw error;
  }
}

// Function to update user places data on the server
async function updateUserPlaces(newData) {
  try {
    const response = await axios.put('http://localhost:3000/user-places', newData);
    return response.data;
  } catch (error) {
    console.error('Error updating user places:', error);
    throw error;
  }
}

export { getPlaces, getUserPlaces, updateUserPlaces };
