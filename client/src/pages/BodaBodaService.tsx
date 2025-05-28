import { Link } from "wouter";
import { ArrowLeft, Bike, MapPin, Flag } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { InsertBodaBodaBooking } from "@shared/schema";

export default function BodaBodaService() {
  const [pickupLocation, setPickupLocation] = useState("");
  const [destination, setDestination] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createBookingMutation = useMutation({
    mutationFn: async (booking: InsertBodaBodaBooking) => {
      const response = await apiRequest("POST", "/api/boda-bookings", booking);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Booking Confirmed!",
        description: "Your BodaBoda will arrive in 5 minutes.",
      });
      setPickupLocation("");
      setDestination("");
      queryClient.invalidateQueries({ queryKey: ["/api/boda-bookings"] });
    },
    onError: () => {
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!pickupLocation || !destination) {
      toast({
        title: "Missing Information",
        description: "Please fill in both pickup and destination locations.",
        variant: "destructive",
      });
      return;
    }

    const booking: InsertBodaBodaBooking = {
      pickupLocation,
      destination,
      estimatedFare: "5.50",
      estimatedTime: "12 minutes",
      status: "pending",
    };

    createBookingMutation.mutate(booking);
  };

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
              <Bike className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Book a BodaBoda</h1>
            <p className="text-gray-600">Quick and affordable motorcycle taxi service</p>
          </div>

          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="pickup" className="block text-sm font-medium text-gray-700 mb-2">
                  Pickup Location
                </Label>
                <div className="relative">
                  <Input
                    id="pickup"
                    type="text"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    placeholder="Enter pickup location"
                    className="pl-10"
                  />
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div>
                <Label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
                  Destination
                </Label>
                <div className="relative">
                  <Input
                    id="destination"
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Enter destination"
                    className="pl-10"
                  />
                  <Flag className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Estimated fare:</span>
                  <span className="font-semibold text-primary">$5.50</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Estimated time:</span>
                  <span className="font-semibold text-gray-900">12 minutes</span>
                </div>
              </div>

              <Button
                type="submit"
                disabled={createBookingMutation.isPending}
                className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6"
              >
                {createBookingMutation.isPending ? "Booking..." : "Book BodaBoda"}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
