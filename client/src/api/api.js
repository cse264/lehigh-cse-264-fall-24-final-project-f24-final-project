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


// Get Plants of User
export const getPlants = async (userId) => {
    try {
      const res = await axios.get('http://localhost:8080/plants', {
        params: { userId }  
      });
      console.log('Plants:', res.data);
      return res.data.plants;  
    } catch (error) {
      console.error('Error fetching plants:', error);  
      return [];
    }
};

//delete plants
export const deletePlants = async (userId, plantId) => {
  try {
    const res = await axios.delete(`http://localhost:8080/plants/${plantId}`);
    console.log('Plant Deleted:', res.data);
    return res.data.plant; 
  } catch (error) {
    console.error('Error deleting plant:', error);
    return null; 
  }
};


//PUT for watering the plants
export const waterPlants = async (plantId) => {
  try {
    const res = await axios.put('http://localhost:8080/plants/water', { plantId });
    console.log('Plant Watered:', res.data);
    return res.data.plant; 
  } catch (error) {
    console.error('Error watering plants:', error);
    return null; 
  }
};



// Login


// PUT Request for watering

