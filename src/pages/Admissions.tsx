import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserPlus, FileText, CheckCircle, Clock, XCircle } from "lucide-react";

const Admissions = () => {
  const admissionData = [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      status: "Approved",
      date: "2023-10-01"
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      status: "Pending",
      date: "2023-10-02"
    },
    {
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      status: "Rejected",
      date: "2023-10-03"
    }
  ];

  const stats = [
    {
      title: "Total Applications",
      value: 150,
      icon: UserPlus
    },
    {
      title: "Approved",
      value: 120,
      icon: CheckCircle
    },
    {
      title: "Pending",
      value: 20,
      icon: Clock
    },
    {
      title: "Rejected",
      value: 10,
      icon: XCircle
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Student Admissions</h1>
          <p className="text-muted-foreground">Process new student applications</p>
        </div>
        <Button>
          <FileText className="w-4 h-4 mr-2" />
          Export Applications
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
          <CardTitle>Recent Applications</CardTitle>
          <CardDescription>Review and manage student admission applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {admissionData.map((application, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">{application.name}</div>
                  <div className="text-sm text-muted-foreground">{application.email}</div>
                  <div className="text-sm text-muted-foreground">Applied on {application.date}</div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant={
                    application.status === 'Approved' ? 'default' :
                    application.status === 'Pending' ? 'secondary' : 'destructive'
                  }>
                    {application.status}
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

export default Admissions;
