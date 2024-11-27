import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPlants } from "@/api/api";  // Import the function to get plants
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Flower2 } from "lucide-react";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [plantItems, setPlantItems] = useState([]); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      navigate('/');  
    } else {
      setIsAuthenticated(true); 
    }
  }, [navigate]);

  // Fetch plants when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const userId = localStorage.getItem('id'); 
      getPlants(userId)
        .then((data) => {
          console.log('Fetched plants:', data);
          setPlantItems(data);
        })
        .catch((error) => {
          console.error('Error fetching plants:', error);
        });
    }
  }, [isAuthenticated]);  // Re-run when authentication status changes

  // Function to water a plant and update its watering status
  const onWater = (index) => {
    setPlantItems((prevItems) =>
      prevItems.map((plant, i) =>
        i === index && plant.water_done < plant.water_frequency
          ? { ...plant, water_done: plant.water_done + 1 }
          : plant
      )
    );
    toast({
      description: "Your plant has been watered successfully 💧",
      duration: 2000,
      variant: "water",
    });
  };

  return isAuthenticated ? (
    <div className="flex-row items-center justify-center w-screen bg-gradient-to-br from-pink-200 via-emerald-100 to-blue-200 p-6">
      <div className="flex flex-col items-center justify-center space-y-6">
        {plantItems.length > 0 ? (
          plantItems.map((plant, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{plant.common_name}</CardTitle>
                <CardDescription>Health: {plant.plant_health}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center">
                <div className="flex space-x-2 justify-center">
                  {Array.from({ length: plant.water_frequency }).map((_, i) => (
                    <Flower2
                      key={i}
                      size={70}
                      className={`${
                        i < plant.water_done ? "text-green-500" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-4 text-center">
                  <strong>Watering Progress:</strong>{" "}
                  {plant.water_done}/{plant.water_frequency}
                </p>
                <p className="text-center">
                  <strong>Sunlight:</strong> {plant.sunlight}
                </p>
                <p className="text-center">
                  <strong>Watering:</strong> {plant.water_frequency} times a week
                </p>
              </CardContent>
              <CardFooter className="space-x-5">
                <Button
                  variant="water"
                  onClick={() => onWater(index)}
                  disabled={plant.water_done >= plant.water_frequency}
                >
                  Water
                </Button>
                <Button variant="tips">Plant Tips</Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="text-gray-500">No plants found. Please add some plants!</p>
        )}
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
