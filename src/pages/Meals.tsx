import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Utensils, Clock, Users } from "lucide-react";

const Meals = () => {
  const mealPlans = [
    {
      name: "Basic Plan",
      description: "3 meals per day",
      price: 150,
      subscribers: 120
    },
    {
      name: "Premium Plan",
      description: "3 meals + snacks",
      price: 250,
      subscribers: 80
    },
    {
      name: "Deluxe Plan",
      description: "Unlimited meals",
      price: 350,
      subscribers: 50
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Meal Plans</h1>
          <p className="text-muted-foreground">Manage meal plans and services</p>
        </div>
        <Button>
          <Utensils className="w-4 h-4 mr-2" />
          Add Plan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mealPlans.map((plan) => (
          <Card key={plan.name}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Price per month:</span>
                <span className="text-green-600">${plan.price}</span>
              </div>
              <div className="flex justify-between">
                <span>Subscribers:</span>
                <Badge variant="secondary">{plan.subscribers}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Meals;
