import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchPage() {
  return (
    <div className="flex flex-col items-center  h-screen w-screen bg-gradient-to-br from-pink-300 via-emerald-100 to-blue-300 p-6">
      <h1 className="text-3xl font-bold text-pink-400 mb-4">🌸 Find Your Plant 🌿</h1>
      <div className="relative w-full max-w-md">
        <Input
          type="text"
          placeholder="Search for plants, tips, or more..."
          className="pl-10 pr-4 py-2 w-full rounded-lg border-2 border-emerald-300 focus:ring-2 focus:ring-pink-100 focus:outline-none transition-all duration-300"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-200" size={20} />
      </div>
    </div>
  );
}

//"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",