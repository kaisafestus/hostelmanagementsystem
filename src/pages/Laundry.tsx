import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shirt, Clock, CheckCircle } from "lucide-react";

const Laundry = () => {
  const laundryServices = [
    {
      service: "Wash & Fold",
      price: 5,
      duration: "24 hours",
      status: "Available"
    },
    {
      service: "Dry Cleaning",
      price: 10,
      duration: "48 hours",
      status: "Available"
    },
    {
      service: "Express Service",
      price: 15,
      duration: "12 hours",
      status: "Busy"
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Laundry</h1>
          <p className="text-muted-foreground">Laundry services and management</p>
        </div>
        <Button>
          <Shirt className="w-4 h-4 mr-2" />
          New Order
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {laundryServices.map((service) => (
          <Card key={service.service}>
            <CardHeader>
              <CardTitle>{service.service}</CardTitle>
              <CardDescription>Price: ${service.price}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Duration:</span>
                <span>{service.duration}</span>
              </div>
              <Badge variant={service.status === "Available" ? "default" : "secondary"}>
                {service.status}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Laundry;
