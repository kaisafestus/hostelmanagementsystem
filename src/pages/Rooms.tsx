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
import { Plus, Search, Edit, Eye, Bed, Users, DollarSign } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [newRoom, setNewRoom] = useState({
    room_number: "",
    building_name: "",
    floor_number: "",
    type: "",
    capacity: "",
    price_per_semester: "",
    description: ""
  });

  const roomTypes = [
    { value: "single", label: "Single" },
    { value: "double", label: "Double" },
    { value: "dormitory", label: "Dormitory" }
  ];

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const { data: roomsData, error } = await supabase
        .from('rooms')
        .select(`
          *,
          room_assignments(
            id,
            students(
              student_id,
              users(full_name)
            )
          )
        `);

      if (error) throw error;
      setRooms(roomsData || []);
    } catch (error) {
      toast.error("Failed to fetch rooms");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRoom = async () => {
    try {
      const { error } = await supabase
        .from('rooms')
        .insert({
          room_number: newRoom.room_number,
          building_name: newRoom.building_name,
          floor_number: parseInt(newRoom.floor_number),
          type: newRoom.type,
          capacity: parseInt(newRoom.capacity),
          price_per_semester: parseFloat(newRoom.price_per_semester),
          description: newRoom.description,
          status: 'available',
          current_occupancy: 0
        });

      if (error) throw error;

      toast.success("Room created successfully");
      setIsAddDialogOpen(false);
      setNewRoom({
        room_number: "",
        building_name: "",
        floor_number: "",
        type: "",
        capacity: "",
        price_per_semester: "",
        description: ""
      });
      fetchRooms();
    } catch (error) {
      toast.error(error.message || "Failed to create room");
    }
  };

  const getStatusBadge = (room) => {
    if (room.current_occupancy === 0) {
      return <Badge variant="secondary">Available</Badge>;
    } else if (room.current_occupancy >= room.capacity) {
      return <Badge variant="destructive">Full</Badge>;
    } else {
      return <Badge variant="default">Partially Occupied</Badge>;
    }
  };

  const filteredRooms = rooms.filter(room =>
    room.room_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.building_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading rooms...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Room Management</h1>
          <p className="text-muted-foreground">Manage room availability, assignments, and pricing</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Room
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Room</DialogTitle>
              <DialogDescription>Create a new room for student accommodation</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="room_number">Room Number</Label>
                <Input
                  id="room_number"
                  value={newRoom.room_number}
                  onChange={(e) => setNewRoom({...newRoom, room_number: e.target.value})}
                  placeholder="101"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="building_name">Building Name</Label>
                <Input
                  id="building_name"
                  value={newRoom.building_name}
                  onChange={(e) => setNewRoom({...newRoom, building_name: e.target.value})}
                  placeholder="Building A"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="floor_number">Floor Number</Label>
                <Input
                  id="floor_number"
                  type="number"
                  value={newRoom.floor_number}
                  onChange={(e) => setNewRoom({...newRoom, floor_number: e.target.value})}
                  placeholder="1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Room Type</Label>
                <Select onValueChange={(value) => setNewRoom({...newRoom, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {roomTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={newRoom.capacity}
                  onChange={(e) => setNewRoom({...newRoom, capacity: e.target.value})}
                  placeholder="2"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price_per_semester">Price per Semester ($)</Label>
                <Input
                  id="price_per_semester"
                  type="number"
                  step="0.01"
                  value={newRoom.price_per_semester}
                  onChange={(e) => setNewRoom({...newRoom, price_per_semester: e.target.value})}
                  placeholder="2500.00"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newRoom.description}
                  onChange={(e) => setNewRoom({...newRoom, description: e.target.value})}
                  placeholder="Room amenities and features..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateRoom}>Create Room</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
            <Bed className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rooms.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {rooms.filter(room => room.current_occupancy < room.capacity).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupied</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {rooms.filter(room => room.current_occupancy > 0).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Full</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {rooms.filter(room => room.current_occupancy >= room.capacity).length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Rooms</CardTitle>
          <CardDescription>View and manage all accommodation rooms</CardDescription>
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search rooms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room</TableHead>
                <TableHead>Building</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Occupancy</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRooms.map((room) => (
                <TableRow key={room.id}>
                  <TableCell className="font-medium">{room.room_number}</TableCell>
                  <TableCell>{room.building_name}</TableCell>
                  <TableCell className="capitalize">{room.type}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {room.current_occupancy}/{room.capacity}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {room.price_per_semester}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(room)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedRoom(room);
                          setIsViewDialogOpen(true);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Room Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Room Details</DialogTitle>
          </DialogHeader>
          {selectedRoom && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Room Number</h4>
                  <p className="text-lg font-semibold">{selectedRoom.room_number}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Building</h4>
                  <p>{selectedRoom.building_name} - Floor {selectedRoom.floor_number}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Type</h4>
                  <p className="capitalize">{selectedRoom.type}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Capacity</h4>
                  <p>{selectedRoom.capacity} students</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Current Occupancy</h4>
                  <p>{selectedRoom.current_occupancy} students</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Price per Semester</h4>
                  <p className="text-lg font-semibold text-green-600">${selectedRoom.price_per_semester}</p>
                </div>
              </div>
              
              {selectedRoom.description && (
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Description</h4>
                  <p className="text-sm">{selectedRoom.description}</p>
                </div>
              )}

              {selectedRoom.room_assignments && selectedRoom.room_assignments.length > 0 && (
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Current Residents</h4>
                  <div className="space-y-2">
                    {selectedRoom.room_assignments.map((assignment, index) => (
                      <div key={index} className="bg-muted/30 p-3 rounded-md">
                        <p className="font-medium">{assignment.students?.users?.full_name}</p>
                        <p className="text-sm text-muted-foreground">ID: {assignment.students?.student_id}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Rooms;