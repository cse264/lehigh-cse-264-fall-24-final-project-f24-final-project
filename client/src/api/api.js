import axios from 'axios'
// API Requests

// Search bar get request
export const addPlant = async (plant) => {
    try {
      const res = await axios.post('http://localhost:8080/plants', plant);
      console.log('Plant added:', res.data);
    } catch (error) {
      console.error('Error adding plant:', error);
    }
  };
  
// Get User information from database


// Get Plants of User
export const getPlants = async (id) => {
    try {
      const res = await axios.get('http://localhost:8080/plants', {
        params: { id }  
      });
      console.log('Plants:', res.data);
      return res.data.plants;  
    } catch (error) {
      console.error('Error fetching plants:', error);  
      return [];
    }
  };

//delete plants
export const deletePlants = async (id) => {
  try {
    const res = await axios.delete('http://localhost:8080/plants', {
      params: { id }  
    });
    console.log('Plant Deleted:', res.data);
    return res.data.plants;  
  } catch (error) {
    console.error('Error deleting plants:', error);  
    return [];
  }
};

//PUT for watering the plants
export const waterPlants = async (id) => {
  try {
    const res = await axios.put('http://localhost:8080/plants', {
      params: { id }  
    });
    console.log('Plant Watered:', res.data);
    return res.data.plants;  
  } catch (error) {
    console.error('Error watering plants:', error);  
    return [];
  }
};

// Login


// PUT Request for watering

