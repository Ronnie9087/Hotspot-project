// frontend/components/InternetService.tsx

import { Link } from "wouter";
import { ArrowLeft, Wifi, Check } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mirror backend InternetPlan type for type safety
export type InternetPlan = {
  id: string;
  name: string;
  price: number;
  isPopular: boolean;
  features: string[];
};

export default function InternetService() {
  const { data: plans, isLoading } = useQuery<InternetPlan[]>({
    queryKey: ["/api/internet-plans"],
    queryFn: () =>
      fetch("/api/internet-plans").then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      }),
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
        <div className="text-center">Loading plans...</div>
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
              <Wifi className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Internet Plans</h1>
            <p className="text-gray-600">Choose the perfect internet plan for your needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {plans?.map((plan) => (
              <div
                key={plan.id}
                className={`border rounded-lg p-6 hover:border-primary transition-colors relative ${
                  plan.isPopular ? "border-2 border-primary" : "border-gray-200"
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-white">POPULAR</Badge>
                  </div>
                )}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-primary mb-4">
                  KES {plan.price}
                </div>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  {(plan.features || []).map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                  Select Plan
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
