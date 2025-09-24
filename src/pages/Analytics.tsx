import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Users, Building2 } from "lucide-react";

const Analytics = () => {
  const analyticsData = [
    {
      title: "Total Students",
      value: 1200,
      change: "+5%",
      trend: "up"
    },
    {
      title: "Occupancy Rate",
      value: "85%",
      change: "+2%",
      trend: "up"
    },
    {
      title: "Revenue",
      value: "$150,000",
      change: "+10%",
      trend: "up"
    },
    {
      title: "Maintenance Requests",
      value: 25,
      change: "-3%",
      trend: "down"
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-muted-foreground">View detailed reports and insights</p>
        </div>
        <Button>
          <BarChart3 className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsData.map((item) => (
          <Card key={item.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={item.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                  {item.change}
                </span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Student Distribution</CardTitle>
            <CardDescription>By year and department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Freshman</span>
                <Badge variant="default">300</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Sophomore</span>
                <Badge variant="secondary">250</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Junior</span>
                <Badge variant="outline">350</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Senior</span>
                <Badge variant="destructive">300</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Room Utilization</CardTitle>
            <CardDescription>By building</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Building A</span>
                <Badge variant="default">90%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Building B</span>
                <Badge variant="secondary">80%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Building C</span>
                <Badge variant="outline">85%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
