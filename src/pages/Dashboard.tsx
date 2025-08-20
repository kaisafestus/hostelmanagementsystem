import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Building2, 
  DollarSign, 
  AlertTriangle,
  TrendingUp,
  UserCheck,
  Clock,
  CheckCircle
} from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Students",
      value: "1,247",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Occupied Rooms",
      value: "892",
      change: "89%",
      trend: "stable",
      icon: Building2,
      color: "text-green-600"
    },
    {
      title: "Monthly Revenue",
      value: "$124,580",
      change: "+8.2%",
      trend: "up",
      icon: DollarSign,
      color: "text-emerald-600"
    },
    {
      title: "Pending Issues",
      value: "23",
      change: "-15%",
      trend: "down",
      icon: AlertTriangle,
      color: "text-amber-600"
    }
  ];

  const recentActivities = [
    { id: 1, type: "checkin", student: "Alice Johnson", room: "A-101", time: "2 hours ago", status: "completed" },
    { id: 2, type: "payment", student: "Bob Smith", amount: "$850", time: "4 hours ago", status: "completed" },
    { id: 3, type: "maintenance", issue: "AC Repair", room: "B-205", time: "6 hours ago", status: "pending" },
    { id: 4, type: "checkout", student: "Carol Davis", room: "C-301", time: "1 day ago", status: "completed" },
  ];

  const quickActions = [
    { title: "New Student Admission", action: "Add Student", href: "/admissions" },
    { title: "Room Assignment", action: "Assign Room", href: "/allocation" },
    { title: "Generate Report", action: "Create Report", href: "/reports" },
    { title: "Send Notice", action: "New Notice", href: "/notices" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening at your hostel.</p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary">
          <TrendingUp className="w-4 h-4 mr-2" />
          View Analytics
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center space-x-1 text-xs">
                <span className={`${stat.trend === 'up' ? 'text-green-600' : stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
                  {stat.change}
                </span>
                <span className="text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <Card className="lg:col-span-2 border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-foreground">Recent Activities</CardTitle>
            <CardDescription>Latest updates from your hostel management</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg bg-muted/20">
                  <div className="flex-shrink-0">
                    {activity.type === 'checkin' && <UserCheck className="w-4 h-4 text-green-600" />}
                    {activity.type === 'payment' && <DollarSign className="w-4 h-4 text-blue-600" />}
                    {activity.type === 'maintenance' && <AlertTriangle className="w-4 h-4 text-amber-600" />}
                    {activity.type === 'checkout' && <CheckCircle className="w-4 h-4 text-purple-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {activity.student || activity.issue}
                      {activity.room && <span className="text-muted-foreground"> - {activity.room}</span>}
                      {activity.amount && <span className="text-muted-foreground"> - {activity.amount}</span>}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  </div>
                  <Badge variant={activity.status === 'completed' ? 'default' : 'secondary'}>
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-foreground">Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {quickActions.map((action) => (
                <Button
                  key={action.title}
                  variant="outline"
                  className="w-full justify-start bg-background/50 hover:bg-muted/50 border-border/50"
                >
                  <div className="text-left">
                    <div className="font-medium text-foreground">{action.title}</div>
                    <div className="text-xs text-muted-foreground">{action.action}</div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}