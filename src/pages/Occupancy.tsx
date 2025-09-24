import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, Bed } from "lucide-react";

const Occupancy = () => {
  const occupancyData = [
    {
      building: "Building A",
      totalRooms: 50,
      occupied: 45,
      available: 5
    },
    {
      building: "Building B",
      totalRooms: 30,
      occupied: 28,
      available: 2
    },
    {
      building: "Building C",
      totalRooms: 40,
      occupied: 35,
      available: 5
    }
  ];

  const totalOccupied = occupancyData.reduce((sum, data) => sum + data.occupied, 0);
  const totalAvailable = occupancyData.reduce((sum, data) => sum + data.available, 0);
  const totalRooms = occupancyData.reduce((sum, data) => sum + data.totalRooms, 0);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Occupancy</h1>
          <p className="text-muted-foreground">View room occupancy and availability</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRooms}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupied</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalOccupied}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
            <Bed className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{totalAvailable}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {occupancyData.map((data) => (
          <Card key={data.building}>
            <CardHeader>
              <CardTitle>{data.building}</CardTitle>
              <CardDescription>Occupancy Details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Total Rooms:</span>
                <span>{data.totalRooms}</span>
              </div>
              <div className="flex justify-between">
                <span>Occupied:</span>
                <Badge variant="default">{data.occupied}</Badge>
              </div>
              <div className="flex justify-between">
                <span>Available:</span>
                <Badge variant="secondary">{data.available}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Occupancy;
