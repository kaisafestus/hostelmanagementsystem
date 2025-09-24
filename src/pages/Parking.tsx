import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Car, MapPin, Clock } from "lucide-react";

const Parking = () => {
  const parkingSpots = [
    {
      spot: "A1",
      type: "Standard",
      price: 10,
      status: "Available"
    },
    {
      spot: "B2",
      type: "Premium",
      price: 20,
      status: "Occupied"
    },
    {
      spot: "C3",
      type: "Standard",
      price: 10,
      status: "Available"
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Parking</h1>
          <p className="text-muted-foreground">Parking facilities and management</p>
        </div>
        <Button>
          <Car className="w-4 h-4 mr-2" />
          Reserve Spot
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {parkingSpots.map((spot) => (
          <Card key={spot.spot}>
            <CardHeader>
              <CardTitle>{spot.spot}</CardTitle>
              <CardDescription>{spot.type} - ${spot.price}/day</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Badge variant={spot.status === "Available" ? "default" : "secondary"}>
                {spot.status}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Parking;
