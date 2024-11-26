const express = require("express");
const dotenv = require('dotenv')
const app = express();
const cors = require("cors");
const corsOptions = {
    origin: ["http://localhost:5173"],
}
app.use(cors(corsOptions))
app.use(express.json());
dotenv.config();
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.listen(8080, () =>{
    console.log("Server started on port 8080");
});

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
/*GET*/
// route for getting plants by user
app.get("/users/:userID/plants", (req, res) => {

});

// route for getting plants 
app.get("/plants", (req, res) => {
    res.json('hello')
});


app.get("/plants/:plantID/tips", (req,res) => {

})


/* POST */
// route for when a user adds a plant
app.post("/users/:userID/plants", (req,res) => {

});

/*PUT*/
// route for putting when plant is watered
app.put("/plants/:plantID/water", (req,res) => {

})
