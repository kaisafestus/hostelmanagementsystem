import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserCheck, UserX, Clock, CheckCircle } from "lucide-react";

const Checkin = () => {
  const checkinData = [
    {
      student: "Alice Johnson",
      action: "Check-in",
      date: "2023-10-01",
      status: "Completed"
    },
    {
      student: "Bob Smith",
      action: "Check-out",
      date: "2023-10-02",
      status: "Pending"
    },
    {
      student: "Charlie Brown",
      action: "Check-in",
      date: "2023-10-03",
      status: "Completed"
    }
  ];

  const stats = [
    {
      title: "Total Check-ins",
      value: 150,
      icon: UserCheck
    },
    {
      title: "Total Check-outs",
      value: 120,
      icon: UserX
    },
    {
      title: "Pending",
      value: 20,
      icon: Clock
    },
    {
      title: "Completed",
      value: 250,
      icon: CheckCircle
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Check-in/Check-out</h1>
          <p className="text-muted-foreground">Manage student arrivals and departures</p>
        </div>
        <Button>
          <UserCheck className="w-4 h-4 mr-2" />
          New Check-in
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Check-ins/Check-outs</CardTitle>
          <CardDescription>Track student movements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {checkinData.map((record, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">{record.student}</div>
                  <div className="text-sm text-muted-foreground">{record.action} on {record.date}</div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant={record.status === 'Completed' ? 'default' : 'secondary'}>
                    {record.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Checkin;
