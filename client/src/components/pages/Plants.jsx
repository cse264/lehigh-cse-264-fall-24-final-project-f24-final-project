import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const plantItems = [
  {
    species: 'Fern',
    health: 'Good',
    health_rating: 3,
    sunlight: 'Partial shade',
    watering_general_benchmark: '1-2 times weekly',
  },
  {
    species: 'Cactus',
    health: 'Fair',
    health_rating: 2,
    sunlight: 'Full sun',
    watering_general_benchmark: 'Once every two weeks',
  },
  {
    species: 'Aloe Vera',
    health: 'Bad',
    health_rating: 1,
    sunlight: 'Bright, indirect light',
    watering_general_benchmark: '1-2 times monthly',
  },
  {
    species: 'Sunflower',
    health: 'Excellent',
    health_rating: 4,
    sunlight: 'Full sun',
    watering_general_benchmark: '2-3 times weekly during blooming season',
  }
];

export default function Plants() {

  return (
    <div className="pl-4 flex flex-col items-start">
      {plantItems.map((plant, index) => (
        <Card key={index} className="pl-2 my-4 w-full max-w-xl">
          <CardHeader>
            <CardTitle>{plant.species}</CardTitle>
            <CardDescription>Health: {plant.health}</CardDescription>
          </CardHeader>
          <CardContent>
            <p><strong>Sunlight:</strong> {plant.sunlight}</p>
            <p><strong>Watering:</strong> {plant.watering_general_benchmark}</p>
          </CardContent>
          <CardFooter>
            <p>Additional care information can be added here.</p>
          </CardFooter>
        </Card>
      ))}
      </div>
  );
}
