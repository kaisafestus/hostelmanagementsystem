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
import Students from "./pages/Students";
import Rooms from "./pages/Rooms";
import Payments from "./pages/Payments";
import Notices from "./pages/Notices";
import Profiles from "./pages/Profiles";
import Occupancy from "./pages/Occupancy";
import FinancialReports from "./pages/FinancialReports";
import Meals from "./pages/Meals";
import Laundry from "./pages/Laundry";
import Parking from "./pages/Parking";
import Internet from "./pages/Internet";
import Emergency from "./pages/Emergency";
import Fees from "./pages/Fees";
import Analytics from "./pages/Analytics";
import Admissions from "./pages/Admissions";
import Checkin from "./pages/Checkin";

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
                  <Route path="/students" element={<Students />} />
                  <Route path="/rooms" element={<Rooms />} />
                  <Route path="/fees" element={<Fees />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/admissions" element={<Admissions />} />
                  <Route path="/checkin" element={<Checkin />} />
                  <Route path="/allocation" element={<div className="p-8"><h1 className="text-2xl font-bold">Room Allocation</h1><p className="text-muted-foreground">Assign and manage room allocations</p></div>} />
                  <Route path="/maintenance" element={<div className="p-8"><h1 className="text-2xl font-bold">Maintenance</h1><p className="text-muted-foreground">Track and manage maintenance requests</p></div>} />
                  <Route path="/payments" element={<Payments />} />
                  <Route path="/notices" element={<Notices />} />
                  <Route path="/messages" element={<div className="p-8"><h1 className="text-2xl font-bold">Messages</h1><p className="text-muted-foreground">Internal communication system</p></div>} />
                  <Route path="/staff" element={<div className="p-8"><h1 className="text-2xl font-bold">Staff Management</h1><p className="text-muted-foreground">Manage staff and permissions</p></div>} />
                  <Route path="/reports" element={<div className="p-8"><h1 className="text-2xl font-bold">Reports</h1><p className="text-muted-foreground">Generate various reports</p></div>} />
                  <Route path="/settings" element={<div className="p-8"><h1 className="text-2xl font-bold">System Settings</h1><p className="text-muted-foreground">Configure system preferences</p></div>} />
                  <Route path="/profiles" element={<Profiles />} />
                  <Route path="/occupancy" element={<Occupancy />} />
                  <Route path="/financial-reports" element={<FinancialReports />} />
                  <Route path="/meals" element={<Meals />} />
                  <Route path="/laundry" element={<Laundry />} />
                  <Route path="/parking" element={<Parking />} />
                  <Route path="/internet" element={<Internet />} />
                  <Route path="/emergency" element={<Emergency />} />
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
