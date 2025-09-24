import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, AlertTriangle } from "lucide-react";

const Emergency = () => {
  const emergencyContacts = [
    {
      name: "Fire Department",
      phone: "911",
      location: "City Fire Station"
    },
    {
      name: "Police Department",
      phone: "911",
      location: "City Police Station"
    },
    {
      name: "Hospital",
      phone: "(555) 123-4567",
      location: "City Hospital"
    },
    {
      name: "Hostel Security",
      phone: "(555) 987-6543",
      location: "On-site"
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Emergency Contacts</h1>
          <p className="text-muted-foreground">Emergency contact information</p>
        </div>
        <Button variant="destructive">
          <AlertTriangle className="w-4 h-4 mr-2" />
          Emergency Call
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {emergencyContacts.map((contact) => (
          <Card key={contact.name}>
            <CardHeader>
              <CardTitle>{contact.name}</CardTitle>
              <CardDescription>{contact.location}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-lg font-semibold">{contact.phone}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Emergency;
