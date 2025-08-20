import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, Eye, Edit, Bell, Calendar, AlertTriangle, Info, Settings, PartyPopper } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [newNotice, setNewNotice] = useState({
    title: "",
    content: "",
    type: "general",
    expires_at: ""
  });

  const noticeTypes = [
    { value: "general", label: "General", icon: Info, color: "bg-blue-500" },
    { value: "urgent", label: "Urgent", icon: AlertTriangle, color: "bg-red-500" },
    { value: "maintenance", label: "Maintenance", icon: Settings, color: "bg-orange-500" },
    { value: "event", label: "Event", icon: PartyPopper, color: "bg-green-500" }
  ];

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const { data: noticesData, error } = await supabase
        .from('notices')
        .select(`
          *,
          users(full_name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNotices(noticesData || []);
    } catch (error) {
      toast.error("Failed to fetch notices");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNotice = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from('notices')
        .insert({
          title: newNotice.title,
          content: newNotice.content,
          type: newNotice.type,
          expires_at: newNotice.expires_at || null,
          created_by: user?.id,
          is_active: true
        });

      if (error) throw error;

      toast.success("Notice published successfully");
      setIsAddDialogOpen(false);
      setNewNotice({
        title: "",
        content: "",
        type: "general",
        expires_at: ""
      });
      fetchNotices();
    } catch (error) {
      toast.error(error.message || "Failed to create notice");
    }
  };

  const toggleNoticeStatus = async (noticeId, currentStatus) => {
    try {
      const { error } = await supabase
        .from('notices')
        .update({ is_active: !currentStatus })
        .eq('id', noticeId);

      if (error) throw error;
      
      toast.success(`Notice ${!currentStatus ? 'activated' : 'deactivated'}`);
      fetchNotices();
    } catch (error) {
      toast.error("Failed to update notice status");
    }
  };

  const getTypeBadge = (type) => {
    const typeConfig = noticeTypes.find(t => t.value === type) || noticeTypes[0];
    const Icon = typeConfig.icon;

    return (
      <Badge variant="outline" className="gap-1">
        <Icon className="w-3 h-3" />
        {typeConfig.label}
      </Badge>
    );
  };

  const isExpired = (expiresAt) => {
    if (!expiresAt) return false;
    return new Date(expiresAt) < new Date();
  };

  const filteredNotices = notices.filter(notice => {
    const matchesSearch = 
      notice.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.content?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === "all" || notice.type === typeFilter;
    
    return matchesSearch && matchesType;
  });

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading notices...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notice Management</h1>
          <p className="text-muted-foreground">Create and manage announcements for students and staff</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Notice
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Notice</DialogTitle>
              <DialogDescription>Publish a new announcement or notice</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Notice Type</Label>
                  <Select value={newNotice.type} onValueChange={(value) => setNewNotice({...newNotice, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {noticeTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expires_at">Expiry Date (Optional)</Label>
                  <Input
                    id="expires_at"
                    type="datetime-local"
                    value={newNotice.expires_at}
                    onChange={(e) => setNewNotice({...newNotice, expires_at: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newNotice.title}
                  onChange={(e) => setNewNotice({...newNotice, title: e.target.value})}
                  placeholder="Notice title..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={newNotice.content}
                  onChange={(e) => setNewNotice({...newNotice, content: e.target.value})}
                  placeholder="Notice content and details..."
                  rows={6}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateNotice}>Publish Notice</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Active Notices Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {noticeTypes.map((type) => {
          const count = notices.filter(n => n.type === type.value && n.is_active && !isExpired(n.expires_at)).length;
          const Icon = type.icon;
          
          return (
            <Card key={type.value}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active {type.label}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{count}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Current Active Notices */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Current Active Notices
          </CardTitle>
          <CardDescription>Notices currently visible to students and staff</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {notices
              .filter(notice => notice.is_active && !isExpired(notice.expires_at))
              .slice(0, 3)
              .map((notice) => {
                const typeConfig = noticeTypes.find(t => t.value === notice.type) || noticeTypes[0];
                return (
                  <div key={notice.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${typeConfig.color} mt-2`}></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{notice.title}</h4>
                        {getTypeBadge(notice.type)}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{notice.content}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(notice.created_at).toLocaleDateString()}
                        </span>
                        {notice.expires_at && (
                          <span>Expires: {new Date(notice.expires_at).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Notices</CardTitle>
          <CardDescription>Manage all notices and announcements</CardDescription>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search notices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {noticeTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNotices.map((notice) => (
                <TableRow key={notice.id}>
                  <TableCell className="font-medium">{notice.title}</TableCell>
                  <TableCell>{getTypeBadge(notice.type)}</TableCell>
                  <TableCell>{new Date(notice.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {notice.expires_at ? (
                      <span className={isExpired(notice.expires_at) ? "text-red-600" : ""}>
                        {new Date(notice.expires_at).toLocaleDateString()}
                      </span>
                    ) : (
                      "No expiry"
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      !notice.is_active ? "secondary" : 
                      isExpired(notice.expires_at) ? "destructive" : 
                      "default"
                    }>
                      {!notice.is_active ? "Inactive" : 
                       isExpired(notice.expires_at) ? "Expired" : 
                       "Active"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedNotice(notice);
                          setIsViewDialogOpen(true);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleNoticeStatus(notice.id, notice.is_active)}
                      >
                        {notice.is_active ? "Deactivate" : "Activate"}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Notice Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Notice Details</DialogTitle>
          </DialogHeader>
          {selectedNotice && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">{selectedNotice.title}</h2>
                {getTypeBadge(selectedNotice.type)}
              </div>
              
              <div className="bg-muted/30 p-4 rounded-md">
                <p className="whitespace-pre-wrap">{selectedNotice.content}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Created by: </span>
                  {selectedNotice.users?.full_name || "System"}
                </div>
                <div>
                  <span className="font-medium">Created: </span>
                  {new Date(selectedNotice.created_at).toLocaleString()}
                </div>
                <div>
                  <span className="font-medium">Status: </span>
                  <Badge variant={selectedNotice.is_active ? "default" : "secondary"}>
                    {selectedNotice.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>
                {selectedNotice.expires_at && (
                  <div>
                    <span className="font-medium">Expires: </span>
                    <span className={isExpired(selectedNotice.expires_at) ? "text-red-600" : ""}>
                      {new Date(selectedNotice.expires_at).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Notices;