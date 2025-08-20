import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Layout } from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/*" element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/students" element={<div className="p-8"><h1 className="text-2xl font-bold">Students Management</h1><p className="text-muted-foreground">Manage all student records and profiles</p></div>} />
                  <Route path="/rooms" element={<div className="p-8"><h1 className="text-2xl font-bold">Room Management</h1><p className="text-muted-foreground">Manage rooms, allocations and maintenance</p></div>} />
                  <Route path="/fees" element={<div className="p-8"><h1 className="text-2xl font-bold">Fee Management</h1><p className="text-muted-foreground">Handle payments and financial records</p></div>} />
                  <Route path="/analytics" element={<div className="p-8"><h1 className="text-2xl font-bold">Analytics Dashboard</h1><p className="text-muted-foreground">View detailed reports and insights</p></div>} />
                  <Route path="/admissions" element={<div className="p-8"><h1 className="text-2xl font-bold">Student Admissions</h1><p className="text-muted-foreground">Process new student applications</p></div>} />
                  <Route path="/checkin" element={<div className="p-8"><h1 className="text-2xl font-bold">Check-in/Check-out</h1><p className="text-muted-foreground">Manage student arrivals and departures</p></div>} />
                  <Route path="/allocation" element={<div className="p-8"><h1 className="text-2xl font-bold">Room Allocation</h1><p className="text-muted-foreground">Assign and manage room allocations</p></div>} />
                  <Route path="/maintenance" element={<div className="p-8"><h1 className="text-2xl font-bold">Maintenance</h1><p className="text-muted-foreground">Track and manage maintenance requests</p></div>} />
                  <Route path="/payments" element={<div className="p-8"><h1 className="text-2xl font-bold">Payment Processing</h1><p className="text-muted-foreground">Process and track payments</p></div>} />
                  <Route path="/notices" element={<div className="p-8"><h1 className="text-2xl font-bold">Notices & Announcements</h1><p className="text-muted-foreground">Create and manage notices</p></div>} />
                  <Route path="/messages" element={<div className="p-8"><h1 className="text-2xl font-bold">Messages</h1><p className="text-muted-foreground">Internal communication system</p></div>} />
                  <Route path="/staff" element={<div className="p-8"><h1 className="text-2xl font-bold">Staff Management</h1><p className="text-muted-foreground">Manage staff and permissions</p></div>} />
                  <Route path="/reports" element={<div className="p-8"><h1 className="text-2xl font-bold">Reports</h1><p className="text-muted-foreground">Generate various reports</p></div>} />
                  <Route path="/settings" element={<div className="p-8"><h1 className="text-2xl font-bold">System Settings</h1><p className="text-muted-foreground">Configure system preferences</p></div>} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            } />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
