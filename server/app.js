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
    const { token } = req.body; // Get the Google OAuth token from the frontend
    if (!token) {
      return res.status(400).send('Token is required');
    }
    try {
      // Verify the token
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID, // Your Google Client ID
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
    const { id, plantId, common_name, water_frequency = 1, water_done = 0 , plant_health = "Good" } = req.body;
    const parsedId = parseInt(id);
    if (!parsedId || !plantId || !common_name) {
      return res.status(400).send('Missing required fields');
    }
    const newPlant = { id: parsedId, plantId, common_name, water_frequency, water_done, plant_health };
    plantsList.push(newPlant);
    res.status(201).send({ message: 'Plant added successfully', plant: newPlant });
  });

//retrieve the whole garden
app.get('/plants', async (req, res) => {
    try {
      const { id } = req.query;
  
      if (id) {
        // Convert plant.id to string for comparison if it's a number or check string to string comparison
        const plants = plantsList.filter(plant => plant.id === parseInt(id)); // id is a string in your example
  
        if (plants.length > 0) {
          res.status(200).json({ message: 'Plant(s) fetched successfully', plants });
        } else {
          res.status(404).json({ message: 'No plants found with the given id' });
        }
      } else {
        // If no id is provided, return the entire plants list
        res.status(200).json({ message: 'Plants fetched successfully', plantsList });
      } 
    } catch (error) {
      console.error('Error fetching plants:', error);
      res.status(500).json({ message: 'Server error, could not fetch plants' });
    }
  });

  //delete plant from garden 
  app.delete('/plants', async (req, res) => {
    try {
      const { id } = req.query;
  
      if (id) {
        // Convert plant.id to string for comparison if it's a number or check string to string comparison
        const plants = plantsList.filter(plant => plant.id === parseInt(id)); // id is a string in your example
  
        if (plants.length > 0) {
          //delete the plant:
          plantList = plantList.filter(plant => plant.id != id)
          res.status(200).json({ message: 'Plant(s) fetched successfully', plants });
        } else {
          res.status(404).json({ message: 'No plants found with the given id' });
        }
      } else {
        // If no id is provided
        res.status(200).json({ message: 'No id provided'});
      } 
    } catch (error) {
      console.error('Error fetching plants:', error);
      res.status(500).json({ message: 'Server error, could not fetch plants' });
    }
  });

  //Water the plant
  app.put('/plants/water', async(req, res) =>{
    try{
        const { id } = req.query
        if(id){
            const plants = plantsList.filter(plant => plant.id === parseInt(id)); // id is a string in your example
            const plantIndex = plantsList.findIndex(plant => plant.id === parseInt(id)); // id is a string in your example

            if (plants.length > 0) {
                //water the plant:
                plantList[plantIndex].water_done +=1
                res.status(200).json({ message: `Plant ${id} has been watered`});
              } else {
                res.status(404).json({ message: 'No plants found with the given id' });
              }
        }else{
            // If no id is provided
            res.status(200).json({ message: 'No id provided'});
        }
    }catch (error) {
        console.error('Error fetching plants:', error);
        res.status(500).json({ message: 'Server error, could not fetch plants' });
    }
  })
  
  
  
// Routes
//const plantRoutes = require('./routes/plants');
//app.use('/api/plants', plantRoutes);

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
