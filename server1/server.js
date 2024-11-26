const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = {
    orgin: ["http://localhost:5173"]
}
app.use(cors(corsOptions))


app.listen(8080, () =>{
    console.log("Server started on port 8080");
});

/*GET*/
// route for getting plants by user
app.get("/users/:userID/plants", (req, res) => {

});

// route for getting plants 
app.get("/plants", (req, res) => {
    
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
