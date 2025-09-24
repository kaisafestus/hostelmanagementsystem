import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Wifi, Clock, Users } from "lucide-react";

const Internet = () => {
  const internetPlans = [
    {
      plan: "Basic",
      speed: "50 Mbps",
      price: 20,
      users: 100
    },
    {
      plan: "Premium",
      speed: "100 Mbps",
      price: 40,
      users: 50
    },
    {
      plan: "Unlimited",
      speed: "200 Mbps",
      price: 60,
      users: 25
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Internet</h1>
          <p className="text-muted-foreground">Internet services and management</p>
        </div>
        <Button>
          <Wifi className="w-4 h-4 mr-2" />
          Subscribe
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {internetPlans.map((plan) => (
          <Card key={plan.plan}>
            <CardHeader>
              <CardTitle>{plan.plan} Plan</CardTitle>
              <CardDescription>{plan.speed}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Price per month:</span>
                <span className="text-green-600">${plan.price}</span>
              </div>
              <div className="flex justify-between">
                <span>Active Users:</span>
                <Badge variant="secondary">{plan.users}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Internet;
