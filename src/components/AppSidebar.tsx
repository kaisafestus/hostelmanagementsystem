import {
  Users,
  Home,
  Building2,
  CreditCard,
  ClipboardList,
  Settings,
  Bell,
  FileText,
  UserCheck,
  Calendar,
  DollarSign,
  Wrench,
  MessageSquare,
  Shield,
  BarChart3,
  Package,
  Car,
  Wifi,
  Phone,
  LogOut,
  ChevronDown,
  User
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

// Comprehensive navigation items for hostel management
const navigationItems = [
  {
    title: "Overview",
    items: [
      { title: "Dashboard", url: "/", icon: Home },
      { title: "Analytics", url: "/analytics", icon: BarChart3 },
    ]
  },
  {
    title: "Student Management",
    items: [
      { title: "All Students", url: "/students", icon: Users },
      { title: "Admissions", url: "/admissions", icon: UserCheck },
      { title: "Check-in/Check-out", url: "/checkin", icon: ClipboardList },
      { title: "Student Profiles", url: "/profiles", icon: User },
    ]
  },
  {
    title: "Room Management",
    items: [
      { title: "Rooms", url: "/rooms", icon: Building2 },
      { title: "Room Allocation", url: "/allocation", icon: Package },
      { title: "Maintenance", url: "/maintenance", icon: Wrench },
      { title: "Occupancy", url: "/occupancy", icon: Calendar },
    ]
  },
  {
    title: "Financial",
    items: [
      { title: "Fee Management", url: "/fees", icon: DollarSign },
      { title: "Payments", url: "/payments", icon: CreditCard },
      { title: "Financial Reports", url: "/financial-reports", icon: FileText },
    ]
  },
  {
    title: "Services",
    items: [
      { title: "Meal Plans", url: "/meals", icon: Package },
      { title: "Laundry", url: "/laundry", icon: Package },
      { title: "Parking", url: "/parking", icon: Car },
      { title: "Internet", url: "/internet", icon: Wifi },
    ]
  },
  {
    title: "Communication",
    items: [
      { title: "Notices", url: "/notices", icon: Bell },
      { title: "Messages", url: "/messages", icon: MessageSquare },
      { title: "Emergency Contacts", url: "/emergency", icon: Phone },
    ]
  },
  {
    title: "Administration",
    items: [
      { title: "Staff Management", url: "/staff", icon: Shield },
      { title: "Reports", url: "/reports", icon: FileText },
      { title: "Settings", url: "/settings", icon: Settings },
    ]
  }
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Signed out successfully");
      navigate("/auth");
    } catch (error) {
      toast.error("Error signing out");
    }
  };

  return (
    <Sidebar className={collapsed ? "w-14" : "w-72"} collapsible="icon">
      <SidebarHeader className="border-b border-border p-4">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
              <Building2 className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">HostelPro</h2>
              <p className="text-xs text-muted-foreground">Management System</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center mx-auto">
            <Building2 className="w-4 h-4 text-primary-foreground" />
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className="px-2">
        {navigationItems.map((section, index) => (
          <Collapsible key={section.title} defaultOpen={index < 2}>
            <SidebarGroup>
              <CollapsibleTrigger asChild>
                <SidebarGroupLabel className="cursor-pointer hover:bg-muted/50 rounded-md px-2 py-1 flex items-center justify-between">
                  {!collapsed && section.title}
                  {!collapsed && <ChevronDown className="w-4 h-4" />}
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {section.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <NavLink
                            to={item.url}
                            className={({ isActive }) =>
                              `flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                                isActive
                                  ? "bg-primary text-primary-foreground font-medium"
                                  : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                              }`
                            }
                          >
                            <item.icon className="w-4 h-4 flex-shrink-0" />
                            {!collapsed && <span>{item.title}</span>}
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-4">
        <Button
          variant="ghost"
          onClick={handleSignOut}
          className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground hover:bg-muted/50"
        >
          <LogOut className="w-4 h-4" />
          {!collapsed && "Sign Out"}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}