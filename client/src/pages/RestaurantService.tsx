import { Link } from "wouter";
import { ArrowLeft, Utensils, Star } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Restaurant } from "@shared/schema";

const categories = ["All", "Fast Food", "Local Cuisine", "Pizza", "Desserts"];

export default function RestaurantService() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const { data: restaurants, isLoading } = useQuery<Restaurant[]>({
    queryKey: ["/api/restaurants", selectedCategory],
    queryFn: async () => {
      const response = await fetch(`/api/restaurants?category=${selectedCategory}`);
      if (!response.ok) throw new Error("Failed to fetch restaurants");
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="animate-fade-in">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="text-primary hover:text-primary/80">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
        <div className="text-center">Loading restaurants...</div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <Link href="/">
          <Button variant="ghost" className="text-primary hover:text-primary/80">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      <Card className="bg-white shadow-lg">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Utensils className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Restaurant Orders</h1>
            <p className="text-gray-600">Order delicious meals from local restaurants</p>
          </div>

          {/* Restaurant Categories */}
          <div className="flex flex-wrap gap-3 mb-8 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Restaurant List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {restaurants?.map((restaurant) => (
              <Card key={restaurant.id} className="border border-gray-200 hover:border-primary transition-colors">
                <CardContent className="p-4">
                  {restaurant.imageUrl && (
                    <img
                      src={restaurant.imageUrl}
                      alt={restaurant.name}
                      className="w-full h-32 object-cover rounded-lg mb-4"
                    />
                  )}
                  <h3 className="font-semibold text-gray-900 mb-1">{restaurant.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{restaurant.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(parseFloat(restaurant.rating))
                                ? "fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">{restaurant.rating}</span>
                    </div>
                    <Button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 text-sm">
                      Order Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
