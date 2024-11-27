import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `https://perenual.com/api/species-list?key=${import.meta.env.VITE_PLANT_API_KEY}&q=${searchTerm}`
      );
      const data = response.data.data;
      console.log("Fetched plants:", data);
      setPlants(data); 
    } catch (error) {
      console.error("Error fetching plant data:", error);
      setPlants([]); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center  w-screen bg-gradient-to-br from-pink-200 via-emerald-100 to-blue-200 p-6">
      <h1 className="text-3xl font-bold text-pink-400 mb-4">🌸 Find Your Plant 🌿</h1>
      <div className="relative w-full max-w-md">
        <Input
          type="text"
          placeholder="Search for plants"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 w-full rounded-lg border-2 border-emerald-300 focus:ring-2 focus:ring-pink-100 focus:outline-none transition-all duration-300"
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-200"
          size={20}
        />
      </div>
      <button
        onClick={handleSearch}
        className="mt-4 px-4 py-2 rounded-md bg-emerald-400 text-white font-medium hover:bg-emerald-500 transition duration-300"
      >
        {loading ? "Searching..." : "Search"}
      </button>
      <div className="mt-6 w-full max-w-md text-center">
        {plants.length > 0 ? (
          plants.map((plant) => (
            <div key={plant.id} className="p-4 mb-4 rounded-lg bg-white shadow-md">
              <h2 className="text-xl font-bold text-emerald-600">{plant.common_name || "Unknown Plant"}</h2>
              <p className="text-sm text-gray-500">
                {plant.scientific_name ? `Scientific Name: ${plant.scientific_name}` : "No scientific name available."}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No results found.</p>
        )}
      </div>
    </div>
  );
}


//"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",