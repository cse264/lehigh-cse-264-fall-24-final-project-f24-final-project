require('dotenv').config();  // Only call it once at the top

const express = require('express');
const cors = require('cors');

const corsOptions = {
    origin: ["http://localhost:5173"],
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

let plantsList = [];
const water_frequency = 1;
const water_done = 0;
const plant_health = 'Fair';

app.get("/api", (req, res) => {
    res.json({plantTest: ["fern", "flower", "weed"]});
});

//OAuth Log in 
app.post('/login', async (req, res) => {
    console.log(req.body);
    const { token } = req.body; 
    if (!token) {
      return res.status(400).send('Token is required');
    }
    try {
      // Verify the token
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID, 
      });
      const payload = ticket.getPayload();
      console.log(payload); 
      res.status(200).send({ message: 'User authenticated', user: payload });
    } catch (error) {
      console.error('Error verifying token:', error);
      res.status(400).send('Invalid token');
    }
});

//Add new plant to garden
app.post('/plants', async (req, res) => {
  console.log('Request Body:', req.body);
  const { userId, common_name, water_frequency = 1, water_done = 0, plant_health = "Good" } = req.body;
  const plantId = getLatestPlantId() + 1;
  const parsedUserId = parseInt(userId);
  if (!parsedUserId) {
    return res.status(400).send('Missing required field: userId');
  }
  if (!plantId) {
    return res.status(400).send('Error generating plantId');
  }
  if (!common_name) {
    return res.status(400).send('Missing required field: common_name');
  }
  const newPlant = { userId: parsedUserId, plantId, common_name, water_frequency, water_done, plant_health };
  plantsList.push(newPlant);
  res.status(201).send({ message: 'Plant added successfully', plant: newPlant });
});



//retrieve the whole garden
app.get('/plants', async (req, res) => {
    try {
      const { userId } = req.query;
      if (userId) {
        const plants = plantsList.filter(plant => plant.userId === parseInt(userId)); 
        if (plants.length > 0) {
          res.status(200).json({ message: 'Plant(s) fetched successfully', plants });
        } else {
          res.status(404).json({ message: 'No plants found with the given id' });
        }
      } else {
        res.status(200).json({ message: 'Plants fetched successfully', plantsList });
      } 
    } catch (error) {
      console.error('Error fetching plants:', error);
      res.status(500).json({ message: 'Server error, could not fetch plants' });
    }
  });

  //delete plant from garden 
  app.delete('/plants/:plantId', async (req, res) => {
    try {
      const { plantId } = req.params;
      if (plantId) {
        const plant = plantsList.filter(plant => plant.plantId === parseInt(plantId)); 
        if (plant) {
          plantList = plantList.filter(plant => plant.id != plantId)
          res.status(200).json({ message: 'Plant(s) fetched successfully', plants });
        } else {
          res.status(404).json({ message: 'No plants found with the given id' });
        }
      } else {
        res.status(200).json({ message: 'No id provided'});
      } 
    } catch (error) {
      console.error('Error fetching plants:', error);
      res.status(500).json({ message: 'Server error, could not fetch plants' });
    }
  });

  //Water the plant
  app.put('/plants/water', async (req, res) => {
    try {
      const { plantId } = req.body;  // Get plantId from the body
      if (!plantId) {
        return res.status(400).json({ message: 'Plant ID is required' });
      }
      const plantIndex = plantList.findIndex(plant => plant.plantId === parseInt(plantId));
      if (plantIndex !== -1) {
        if (plantList[plantIndex].water_done === undefined) {
          plantList[plantIndex].water_done = 0;
        }
        plantList[plantIndex].water_done += 1;
        return res.status(200).json({
          message: `Plant ${plantId} has been watered`,
          plant: plantList[plantIndex],  
        });
      } else {
        return res.status(404).json({ message: 'No plant found with the given plantId' });
      }
    } catch (error) {
      console.error('Error watering plant:', error);
      return res.status(500).json({ message: 'Server error, could not water plant' });
    }
  });
  
  
  const getLatestPlantId = () => {
    if (plantsList.length === 0) {
      return 0; 
    }
    const latestPlant = plantsList.reduce((max, plant) => (plant.plantId > max.plantId ? plant : max), plantsList[0]);
    return latestPlant.plantId;
  };
  
// Routes
//const plantRoutes = require('./routes/plants');
//app.use('/api/plants', plantRoutes);

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
