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
import { Plus, Search, Edit, Eye, UserPlus, Phone, Mail, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    student_id: "",
    full_name: "",
    email: "",
    phone: "",
    department: "",
    academic_year: "",
    gender: "",
    date_of_birth: "",
    address: "",
    emergency_contact: {
      name: "",
      relationship: "",
      phone: "",
      email: ""
    }
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const { data: studentsData, error } = await supabase
        .from('students')
        .select(`
          *,
          users(full_name, email),
          room_assignments(
            rooms(room_number, building_name),
            status
          )
        `);

      if (error) throw error;
      setStudents(studentsData || []);
    } catch (error) {
      toast.error("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStudent = async () => {
    try {
      // First create user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: newStudent.email,
        password: "temppassword123", // They'll need to reset
      });

      if (authError) throw authError;

      // Create user profile
      const { error: userError } = await supabase
        .from('users')
        .insert({
          id: authData.user?.id,
          email: newStudent.email,
          full_name: newStudent.full_name,
          role: 'student'
        });

      if (userError) throw userError;

      // Create student record
      const { error: studentError } = await supabase
        .from('students')
        .insert({
          id: authData.user?.id,
          student_id: newStudent.student_id,
          phone: newStudent.phone,
          department: newStudent.department,
          academic_year: newStudent.academic_year,
          gender: newStudent.gender,
          date_of_birth: newStudent.date_of_birth,
          address: newStudent.address,
          emergency_contact: newStudent.emergency_contact
        });

      if (studentError) throw studentError;

      toast.success("Student created successfully");
      setIsAddDialogOpen(false);
      setNewStudent({
        student_id: "",
        full_name: "",
        email: "",
        phone: "",
        department: "",
        academic_year: "",
        gender: "",
        date_of_birth: "",
        address: "",
        emergency_contact: { name: "", relationship: "", phone: "", email: "" }
      });
      fetchStudents();
    } catch (error) {
      toast.error(error.message || "Failed to create student");
    }
  };

  const filteredStudents = students.filter(student =>
    student.users?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.student_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.department?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading students...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Students Management</h1>
          <p className="text-muted-foreground">Manage student registrations, profiles, and information</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Student
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
              <DialogDescription>Create a new student account and profile</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="student_id">Student ID</Label>
                <Input
                  id="student_id"
                  value={newStudent.student_id}
                  onChange={(e) => setNewStudent({...newStudent, student_id: e.target.value})}
                  placeholder="STU001"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  value={newStudent.full_name}
                  onChange={(e) => setNewStudent({...newStudent, full_name: e.target.value})}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={newStudent.phone}
                  onChange={(e) => setNewStudent({...newStudent, phone: e.target.value})}
                  placeholder="+1234567890"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={newStudent.department}
                  onChange={(e) => setNewStudent({...newStudent, department: e.target.value})}
                  placeholder="Computer Science"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="academic_year">Academic Year</Label>
                <Select onValueChange={(value) => setNewStudent({...newStudent, academic_year: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024-2025">2024-2025</SelectItem>
                    <SelectItem value="2025-2026">2025-2026</SelectItem>
                    <SelectItem value="2026-2027">2026-2027</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select onValueChange={(value) => setNewStudent({...newStudent, gender: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date_of_birth">Date of Birth</Label>
                <Input
                  id="date_of_birth"
                  type="date"
                  value={newStudent.date_of_birth}
                  onChange={(e) => setNewStudent({...newStudent, date_of_birth: e.target.value})}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={newStudent.address}
                  onChange={(e) => setNewStudent({...newStudent, address: e.target.value})}
                  placeholder="Student's home address"
                />
              </div>
              <div className="col-span-2">
                <h4 className="font-medium mb-2">Emergency Contact</h4>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Contact Name"
                    value={newStudent.emergency_contact.name}
                    onChange={(e) => setNewStudent({
                      ...newStudent,
                      emergency_contact: {...newStudent.emergency_contact, name: e.target.value}
                    })}
                  />
                  <Input
                    placeholder="Relationship"
                    value={newStudent.emergency_contact.relationship}
                    onChange={(e) => setNewStudent({
                      ...newStudent,
                      emergency_contact: {...newStudent.emergency_contact, relationship: e.target.value}
                    })}
                  />
                  <Input
                    placeholder="Phone"
                    value={newStudent.emergency_contact.phone}
                    onChange={(e) => setNewStudent({
                      ...newStudent,
                      emergency_contact: {...newStudent.emergency_contact, phone: e.target.value}
                    })}
                  />
                  <Input
                    placeholder="Email"
                    value={newStudent.emergency_contact.email}
                    onChange={(e) => setNewStudent({
                      ...newStudent,
                      emergency_contact: {...newStudent.emergency_contact, email: e.target.value}
                    })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateStudent}>Create Student</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Students</CardTitle>
          <CardDescription>View and manage all registered students</CardDescription>
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search students..."
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
                <TableHead>Student ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.student_id}</TableCell>
                  <TableCell>{student.users?.full_name}</TableCell>
                  <TableCell>{student.department}</TableCell>
                  <TableCell>{student.academic_year}</TableCell>
                  <TableCell>
                    {student.room_assignments?.[0]?.rooms ? 
                      `${student.room_assignments[0].rooms.building_name} - ${student.room_assignments[0].rooms.room_number}` 
                      : 'Not assigned'
                    }
                  </TableCell>
                  <TableCell>
                    <Badge variant={student.room_assignments?.[0]?.status === 'active' ? 'default' : 'secondary'}>
                      {student.room_assignments?.[0]?.status || 'No room'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedStudent(student);
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

      {/* Student Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Student Details</DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Student ID</h4>
                  <p>{selectedStudent.student_id}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Full Name</h4>
                  <p>{selectedStudent.users?.full_name}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Email</h4>
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {selectedStudent.users?.email}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Phone</h4>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {selectedStudent.phone}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Department</h4>
                  <p>{selectedStudent.department}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Academic Year</h4>
                  <p>{selectedStudent.academic_year}</p>
                </div>
              </div>
              
              {selectedStudent.address && (
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Address</h4>
                  <p className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-1" />
                    {selectedStudent.address}
                  </p>
                </div>
              )}

              {selectedStudent.emergency_contact && (
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Emergency Contact</h4>
                  <div className="bg-muted/30 p-3 rounded-md">
                    <p><strong>{selectedStudent.emergency_contact.name}</strong> ({selectedStudent.emergency_contact.relationship})</p>
                    <p>Phone: {selectedStudent.emergency_contact.phone}</p>
                    {selectedStudent.emergency_contact.email && (
                      <p>Email: {selectedStudent.emergency_contact.email}</p>
                    )}
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

export default Students;