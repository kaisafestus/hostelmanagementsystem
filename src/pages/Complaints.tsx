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
import { Plus, Search, Eye, MessageSquare, AlertTriangle, CheckCircle, Clock, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [students, setStudents] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [newComplaint, setNewComplaint] = useState({
    student_id: "",
    room_id: "",
    title: "",
    description: "",
    type: "",
    urgency: "medium"
  });

  const complaintTypes = [
    { value: "maintenance", label: "Maintenance" },
    { value: "noise", label: "Noise" },
    { value: "cleanliness", label: "Cleanliness" },
    { value: "safety", label: "Safety" },
    { value: "electrical", label: "Electrical" },
    { value: "plumbing", label: "Plumbing" },
    { value: "hvac", label: "HVAC" },
    { value: "other", label: "Other" }
  ];

  const urgencyLevels = [
    { value: "low", label: "Low", color: "text-blue-600" },
    { value: "medium", label: "Medium", color: "text-yellow-600" },
    { value: "high", label: "High", color: "text-orange-600" },
    { value: "urgent", label: "Urgent", color: "text-red-600" }
  ];

  useEffect(() => {
    fetchComplaints();
    fetchStudents();
    fetchRooms();
  }, []);

  const fetchComplaints = async () => {
    try {
      const { data: complaintsData, error } = await supabase
        .from('complaints')
        .select(`
          *,
          students(
            student_id,
            users(full_name, email)
          ),
          rooms(room_number, building_name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComplaints(complaintsData || []);
    } catch (error) {
      toast.error("Failed to fetch complaints");
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      const { data, error } = await supabase
        .from('students')
        .select('id, student_id, users(full_name)');
      
      if (error) throw error;
      setStudents(data || []);
    } catch (error) {
      console.error("Failed to fetch students:", error);
    }
  };

  const fetchRooms = async () => {
    try {
      const { data, error } = await supabase
        .from('rooms')
        .select('id, room_number, building_name');
      
      if (error) throw error;
      setRooms(data || []);
    } catch (error) {
      console.error("Failed to fetch rooms:", error);
    }
  };

  const fetchComments = async (complaintId) => {
    try {
      const { data, error } = await supabase
        .from('complaint_comments')
        .select(`
          *,
          users(full_name)
        `)
        .eq('complaint_id', complaintId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };

  const handleCreateComplaint = async () => {
    try {
      const { error } = await supabase
        .from('complaints')
        .insert({
          room_id: newComplaint.room_id || null,
          title: newComplaint.title,
          description: newComplaint.description,
          type: newComplaint.type,
          urgency: newComplaint.urgency,
          status: 'submitted'
        });

      if (error) throw error;

      toast.success("Complaint submitted successfully");
      setIsAddDialogOpen(false);
      setNewComplaint({
        student_id: "",
        room_id: "",
        title: "",
        description: "",
        type: "",
        urgency: "medium"
      });
      fetchComplaints();
    } catch (error) {
      toast.error(error.message || "Failed to submit complaint");
    }
  };

  const updateComplaintStatus = async (complaintId, newStatus) => {
    try {
      const updates = { status: newStatus };

      const { error } = await supabase
        .from('complaints')
        .update(updates)
        .eq('id', complaintId);

      if (error) throw error;
      
      toast.success(`Complaint ${newStatus}`);
      fetchComplaints();
      if (selectedComplaint?.id === complaintId) {
        setSelectedComplaint({...selectedComplaint, status: newStatus});
      }
    } catch (error) {
      toast.error("Failed to update complaint status");
    }
  };

  const addComment = async () => {
    if (!newComment.trim()) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from('complaint_comments')
        .insert({
          complaint_id: selectedComplaint.id,
          user_id: user?.id,
          content: newComment
        });

      if (error) throw error;
      
      setNewComment("");
      fetchComments(selectedComplaint.id);
      toast.success("Comment added");
    } catch (error) {
      toast.error("Failed to add comment");
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      submitted: { variant: "secondary", icon: Clock, color: "text-blue-600" },
      in_progress: { variant: "default", icon: MessageSquare, color: "text-yellow-600" },
      resolved: { variant: "default", icon: CheckCircle, color: "text-green-600" },
      closed: { variant: "outline", icon: X, color: "text-gray-600" }
    };

    const config = statusConfig[status] || statusConfig.submitted;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon className="w-3 h-3" />
        {status.replace('_', ' ')}
      </Badge>
    );
  };

  const getUrgencyBadge = (urgency) => {
    const urgencyConfig = urgencyLevels.find(u => u.value === urgency) || urgencyLevels[1];
    
    return (
      <Badge variant="outline" className={`gap-1 ${urgencyConfig.color}`}>
        <AlertTriangle className="w-3 h-3" />
        {urgencyConfig.label}
      </Badge>
    );
  };

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = 
      complaint.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.students?.users?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.students?.student_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.type?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || complaint.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading complaints...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Complaint Management</h1>
          <p className="text-muted-foreground">Track and resolve student complaints and issues</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Complaint
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Submit New Complaint</DialogTitle>
              <DialogDescription>Create a new complaint or issue report</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="student_id">Student</Label>
                  <Select onValueChange={(value) => setNewComplaint({...newComplaint, student_id: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select student" />
                    </SelectTrigger>
                    <SelectContent>
                      {students.map((student) => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.users?.full_name} ({student.student_id})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="room_id">Room (Optional)</Label>
                  <Select onValueChange={(value) => setNewComplaint({...newComplaint, room_id: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select room" />
                    </SelectTrigger>
                    <SelectContent>
                      {rooms.map((room) => (
                        <SelectItem key={room.id} value={room.id}>
                          {room.building_name} - {room.room_number}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Complaint Type</Label>
                  <Select onValueChange={(value) => setNewComplaint({...newComplaint, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {complaintTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="urgency">Urgency Level</Label>
                  <Select value={newComplaint.urgency} onValueChange={(value) => setNewComplaint({...newComplaint, urgency: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {urgencyLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newComplaint.title}
                  onChange={(e) => setNewComplaint({...newComplaint, title: e.target.value})}
                  placeholder="Brief description of the issue"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newComplaint.description}
                  onChange={(e) => setNewComplaint({...newComplaint, description: e.target.value})}
                  placeholder="Detailed description of the complaint..."
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateComplaint}>Submit Complaint</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Complaints</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{complaints.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {complaints.filter(c => c.status === 'submitted' || c.status === 'in_progress').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {complaints.filter(c => c.status === 'resolved').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Urgent</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {complaints.filter(c => c.urgency === 'urgent' && c.status !== 'resolved').length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Complaints</CardTitle>
          <CardDescription>Track and manage student complaints and issues</CardDescription>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search complaints..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Urgency</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredComplaints.map((complaint) => (
                <TableRow key={complaint.id}>
                  <TableCell className="font-medium">{complaint.title}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{complaint.students?.users?.full_name}</div>
                      <div className="text-sm text-muted-foreground">{complaint.students?.student_id}</div>
                    </div>
                  </TableCell>
                  <TableCell className="capitalize">{complaint.type}</TableCell>
                  <TableCell>{getUrgencyBadge(complaint.urgency)}</TableCell>
                  <TableCell>{getStatusBadge(complaint.status)}</TableCell>
                  <TableCell>{new Date(complaint.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedComplaint(complaint);
                          fetchComments(complaint.id);
                          setIsViewDialogOpen(true);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Complaint Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Complaint Details</DialogTitle>
          </DialogHeader>
          {selectedComplaint && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Title</h4>
                  <p className="text-lg font-semibold">{selectedComplaint.title}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Student</h4>
                  <p>{selectedComplaint.students?.users?.full_name} ({selectedComplaint.students?.student_id})</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Type</h4>
                  <p className="capitalize">{selectedComplaint.type}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Urgency</h4>
                  {getUrgencyBadge(selectedComplaint.urgency)}
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Status</h4>
                  {getStatusBadge(selectedComplaint.status)}
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Created</h4>
                  <p>{new Date(selectedComplaint.created_at).toLocaleString()}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Description</h4>
                <p className="bg-muted/30 p-3 rounded-md">{selectedComplaint.description}</p>
              </div>

              {selectedComplaint.status !== 'resolved' && (
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => updateComplaintStatus(selectedComplaint.id, 'in_progress')}
                    disabled={selectedComplaint.status === 'in_progress'}
                  >
                    Mark In Progress
                  </Button>
                  <Button
                    onClick={() => updateComplaintStatus(selectedComplaint.id, 'resolved')}
                  >
                    Mark Resolved
                  </Button>
                </div>
              )}

              <div>
                <h4 className="font-medium mb-3">Comments</h4>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {comments.map((comment) => (
                    <div key={comment.id} className="bg-muted/30 p-3 rounded-md">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{comment.users?.full_name}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(comment.created_at).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2 mt-3">
                  <Input
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addComment()}
                  />
                  <Button onClick={addComment} disabled={!newComment.trim()}>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Complaints;