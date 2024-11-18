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
import { useState } from "react";

const getFillPercentage = (rating) => `${(rating / 4) * 100}`;

export default function Home() {
  const { toast } = useToast();
  const [plantItems, setPlantItems] = useState(initialPlantItems);
  const onWater = (index) => {
    setPlantItems((prevItems) =>
      prevItems.map((plant, i) =>
        i === index
          ? {
              ...plant,
              health: "Excellent",
              health_rating: 4,
            }
          : plant
      )
    );
    toast({
      description: "Your plant has been watered successfully💧",
      duration: 2000,
      variant: "water",
    });
  };
  return (
    <div className="flex-row items-start">
      <div className="pl-4 flex flex-col items-start">
        {plantItems.map((plant, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{plant.species}</CardTitle>
              <CardDescription>Health: {plant.health}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
              <div className="relative w-[100px] h-[100px]">
                {/* Empty Background Icon */}
                <Flower2
                  size={100}
                  className="absolute text-gray-300"
                  aria-hidden="true"
                />
                {/* Filled Area */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{
                    clipPath: `polygon(50% ${100 - getFillPercentage(plant.health_rating)}%, 100% ${100 - getFillPercentage(plant.health_rating)}%, 100% 100%, 0 100%, 0 ${100 - getFillPercentage(plant.health_rating)}%)`,
                  }}
                >
                  <Flower2 size={100} className="text-emerald-500" />
                </div>
              </div>
              <p className="mt-4 text-center">
                <strong>Sunlight:</strong> {plant.sunlight}
              </p>
              <p className="text-center">
                <strong>Watering:</strong> {plant.watering_general_benchmark}
              </p>
            </CardContent>
            <CardFooter className="space-x-5">
              <Button variant="water" onClick={() => onWater(index)}>
                Water
              </Button>
              <Button variant="tips">Plant Tips</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

const initialPlantItems = [
  {
    species: "Fern",
    health: "Good",
    health_rating: 3,
    sunlight: "Partial shade",
    watering_general_benchmark: "1-2 times weekly",
  },
  {
    species: "Cactus",
    health: "Fair",
    health_rating: 2,
    sunlight: "Full sun",
    watering_general_benchmark: "Once every two weeks",
  },
  {
    species: "Aloe Vera",
    health: "Bad",
    health_rating: 1,
    sunlight: "Bright, indirect light",
    watering_general_benchmark: "1-2 times monthly",
  },
  {
    species: "Sunflower",
    health: "Excellent",
    health_rating: 4,
    sunlight: "Full sun",
    watering_general_benchmark: "2-3 times weekly during blooming season",
  },
];