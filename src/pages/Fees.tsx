import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingUp, FileText } from "lucide-react";

const Fees = () => {
  const feeData = [
    {
      student: "Alice Johnson",
      type: "Tuition",
      amount: 2500,
      status: "Paid"
    },
    {
      student: "Bob Smith",
      type: "Room Rent",
      amount: 500,
      status: "Pending"
    },
    {
      student: "Charlie Brown",
      type: "Mess Fee",
      amount: 300,
      status: "Overdue"
    }
  ];

  const totalFees = feeData.reduce((sum, fee) => sum + fee.amount, 0);
  const paidFees = feeData.filter(f => f.status === 'Paid').reduce((sum, fee) => sum + fee.amount, 0);
  const pendingFees = feeData.filter(f => f.status === 'Pending').reduce((sum, fee) => sum + fee.amount, 0);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Fee Management</h1>
          <p className="text-muted-foreground">Handle payments and financial records</p>
        </div>
        <Button>
          <FileText className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Fees</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalFees.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${paidFees.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">${pendingFees.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Fee Records</CardTitle>
          <CardDescription>Track all fee payments and dues</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {feeData.map((fee, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">{fee.student}</div>
                  <div className="text-sm text-muted-foreground">{fee.type}</div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-semibold">${fee.amount}</span>
                  <Badge variant={fee.status === 'Paid' ? 'default' : 'secondary'}>
                    {fee.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Fees;
