import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sprout, Flower2 } from "lucide-react";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [plantItems, setPlantItems] = useState(initialPlantItems); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      navigate('/');  
    } else {
      setIsAuthenticated(true); 
    }
  }, [navigate]);

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
        {plantItems.map((plant, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{plant.species}</CardTitle>
              <CardDescription>Health: {plant.plant_health}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
              <div className="flex space-x-2 justify-center">
                {Array.from({ length: plant.water_frequency }).map((_, i) => (
                  <Flower2
                    key={i}
                    size={70}
                    className={`${i < plant.water_done ? "text-green-500" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <p className="mt-4 text-center">
                <strong>Watering Progress:</strong> {plant.water_done}/{plant.water_frequency}
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
        ))}
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

const initialPlantItems = [
  {
    species: "Fern",
    water_frequency: 2,
    water_done: 1,
    plant_health: "Fair"
  },
  {
    species: "Cactus",
    water_frequency: 3,
    water_done: 2,
    plant_health: "Good"
  },
  {
    species: "Aloe Vera",
    water_frequency: 4,
    water_done: 2,
    plant_health: "Fair"
  },
  {
    species: "Sunflower",
    water_frequency: 2,
    water_done: 1,
    plant_health: "Good"
  },
];