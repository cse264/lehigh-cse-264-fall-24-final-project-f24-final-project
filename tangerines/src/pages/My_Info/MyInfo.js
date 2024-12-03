import React, { useEffect } from "react";
import { useState } from "react";
import "./MyInfo.css";
import { db, auth } from "../../firebase";

function MyInfo() {
  const [myAllergies, setMyAllergies] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [user, setUser] = useState(null);

  // Fetch the signed-in user and their information when the component mounts
  useEffect(() => {
    async function getUserInfo() {
      try {
        // Get the currently logged-in user
        const currentUser = auth.currentUser;
        if (currentUser) {
          setUser(currentUser);
          // Reference to the user's document in the "users" collection
          const userRef = db.collection("users").doc(currentUser.email);
          const doc = await userRef.get();

          if (doc.exists) {
            const userData = doc.data();
            setMyAllergies(userData.allergies || []);
            setSavedRecipes(userData.savedRecipes || []);
          }
        } else {
          console.log("No user is signed in");
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    getUserInfo();
  }, []);

  const handleAllergieChange = async (e) => {
    const value = e.target.value;
    const allergieArray = value.split(",");

    try {
      if (user) {
        const userRef = db.collection("users").doc(user.email); // Reference to location in database
        const doc = await userRef.get();

        if (doc.exists) {
          await userRef.update({
            allergies: allergieArray,
          });
          setMyAllergies(allergieArray); // Update state to reflect new allergies
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSavedRecipes = async (e) => {
    const value = e.target.value;
    try {
      if (user) {
        const userRef = db.collection("users").doc(user.email); // Reference to location in database
        const doc = await userRef.get();
        const userRecipes = doc.data().savedRecipes;

        if (doc.exists) {
          if (userRecipes.includes(value)) {
            userRecipes.splice(userRecipes.indexOf(value), 1);
            await userRef.update({
              savedRecipes: userRecipes,
            });
            setSavedRecipes(userRecipes); // Update state to reflect new saved recipes
          } else {
            console.log("Recipe does not exist");
          }
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
// the return statement is just testing to see if the functions work
  return (
    <div>
      <h1>My Info</h1>
      <h2>Email: {user.email}</h2>
      <h2>role: {user.isChef ? "Chef" : "Diner"}</h2>
      <h2>My Allergies</h2>
      <input
        type="text"
        placeholder="Enter your allergies, separated by commas"
        onChange={handleAllergieChange}
        value={myAllergies.join(",")}
      />
      <h2>Saved Recipes</h2>
    </div>
  );
}

export default MyInfo;
