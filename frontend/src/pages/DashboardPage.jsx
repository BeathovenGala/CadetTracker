import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Button, Label, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/card';
import { useToast } from '../components/ui/use-toast';

const API_URL = 'http://localhost:5000';

const getRoleFromToken = (token) => {
    try {
        const payload = token.split('.')[1];
        const decoded = JSON.parse(atob(payload));
        return decoded.role;
    } catch (error) {
        return null;
    }
};

const fetchDashboardData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      // If there's no token, we can't fetch data.
      setIsLoading(false);
      return;
    }
};

const CreateParadeForm = ({ onBack, onParadeCreated }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
      eventName: '', date: '', latitude: '', longitude: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      toast({ title: 'Error', description: 'Not authenticated.', variant: 'destructive' });
      return;
    }

    try {
        const payload = {
            eventName: formData.eventName,
            date: new Date(formData.date),
            location: {
                latitude: parseFloat(formData.latitude),
                longitude: parseFloat(formData.longitude)
            }
        };

        const response = await fetch(`${API_URL}/api/admin/parades`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        if (response.ok) {
            toast({ title: 'Success', description: 'Parade created successfully!' });
            onParadeCreated();
            onBack();
        } else {
            toast({ title: 'Error', description: result.message, variant: 'destructive' });
        }
    } catch (error) {
        toast({ title: 'Error', description: 'Failed to create parade.', variant: 'destructive' });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create a New Parade Event</CardTitle>
        <CardDescription>Fill out the form below to create a new parade.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="eventName">Event Name</Label>
                <Input id="eventName" name="eventName" required onChange={handleChange} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" name="date" type="date" required onChange={handleChange} />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="latitude">Latitude</Label>
                    <Input id="latitude" name="latitude" type="number" step="any" required onChange={handleChange} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="longitude">Longitude</Label>
                    <Input id="longitude" name="longitude" type="number" step="any" required onChange={handleChange} />
                </div>
            </div>
        </CardContent>
        <CardFooter className="justify-between">
            <Button variant="outline" onClick={onBack}>Cancel</Button>
            <Button type="submit">Create Parade</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

const AdminDashboard = ({ onLogout, setView }) => {
    const { toast } = useToast();
    const [parades, setParades] = useState([]);
    const [paradeDetails, setParadeDetails] = useState(null);
    const [adminView, setAdminView] = useState('list');

    const fetchParades = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast({ title: 'Error', description: 'Not authenticated.', variant: 'destructive' });
            return;
        }
        try {
            const response = await fetch(`${API_URL}/api/admin/parades`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            const result = await response.json();
            if (response.ok) {
                setParades(result);
            } else {
                toast({ title: 'Error', description: result.message, variant: 'destructive' });
            }
        } catch (error) {
            toast({ title: 'Error', description: 'Failed to fetch parades.', variant: 'destructive' });
        }
    };

    const fetchParadeDetails = async (paradeId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast({ title: 'Error', description: 'Not authenticated.', variant: 'destructive' });
            return;
        }
        try {
            const response = await fetch(`${API_URL}/api/admin/parades/${paradeId}`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            const result = await response.json();
            if (response.ok) {
                setParadeDetails(result);
            } else {
                toast({ title: 'Error', description: result.message, variant: 'destructive' });
            }
        } catch (error) {
            toast({ title: 'Error', description: 'Failed to fetch parade details.', variant: 'destructive' });
        }
    };

    useEffect(() => {
        fetchParades();
    }, []);

    const handleSelectParade = (paradeId) => {
        fetchParadeDetails(paradeId);
        setAdminView('details');
    };

    const handleBackToList = () => {
      setParadeDetails(null);
      setAdminView('list');
    };

    const renderView = () => {
      if (adminView === 'create') {
        return <CreateParadeForm onBack={handleBackToList} onParadeCreated={fetchParades} />;
      }
      if (adminView === 'details' && paradeDetails) {
        const attendanceData = [
          { name: 'SD', value: paradeDetails.attendanceStats.totalSDs },
          { name: 'SW', value: paradeDetails.attendanceStats.totalSWs },
        ];
        const collegeData = Object.entries(paradeDetails.attendanceStats.cadetsByCollege).map(([name, value]) => ({ name, value }));
        const COLORS = ['#4c68d7', '#8a4fe3', '#ffc658', '#ff8042', '#00c49f'];

        return (
          <div className="p-4">
              <Button onClick={handleBackToList} variant="outline" className="mb-4">Back to Parades</Button>
              <Card>
                  <CardHeader>
                      <CardTitle className="text-2xl">{paradeDetails.eventName}</CardTitle>
                      <CardDescription>Date: {new Date(paradeDetails.date).toLocaleDateString()}</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                      <p className="font-semibold">Total Cadets Attended: {paradeDetails.attendanceStats.totalCadets}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex flex-col items-center">
                              <h3 className="text-lg font-semibold">Attendance by Gender</h3>
                              <ResponsiveContainer width="100%" height={200}>
                                  <PieChart>
                                      <Pie data={attendanceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                                          {attendanceData.map((entry, index) => (
                                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                          ))}
                                      </Pie>
                                      <Tooltip />
                                      <Legend />
                                  </PieChart>
                              </ResponsiveContainer>
                          </div>
                          <div className="flex flex-col items-center">
                              <h3 className="text-lg font-semibold">Attendance by College</h3>
                              <ResponsiveContainer width="100%" height={200}>
                                  <PieChart>
                                      <Pie data={collegeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                                          {collegeData.map((entry, index) => (
                                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                          ))}
                                      </Pie>
                                      <Tooltip />
                                      <Legend />
                                  </PieChart>
                              </ResponsiveContainer>
                          </div>
                      </div>
                      <h3 className="text-lg font-semibold mt-4">Attendees</h3>
                      <Table>
                          <TableHeader>
                              <TableRow>
                                  <TableHead>Regimental No.</TableHead>
                                  <TableHead>Name</TableHead>
                                  <TableHead>College</TableHead>
                                  <TableHead>Gender</TableHead>
                              </TableRow>
                          </TableHeader>
                          <TableBody>
                              {paradeDetails.attendees.map(cadet => (
                                  <TableRow key={cadet.regimentalNo}>
                                      <TableCell>{cadet.regimentalNo}</TableCell>
                                      <TableCell>{cadet.name}</TableCell>
                                      <TableCell>{cadet.college}</TableCell>
                                      <TableCell>{cadet.gender}</TableCell>
                                  </TableRow>
                              ))}
                          </TableBody>
                      </Table>
                  </CardContent>
              </Card>
          </div>
        );
      }
      return (
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
                <CardHeader>
                    <CardTitle>Admin Dashboard</CardTitle>
                    <CardDescription>Manage parades and attendance.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button onClick={() => setAdminView('create')}>Create New Parade</Button>
                </CardContent>
                <CardHeader>
                    <CardTitle>All Parades</CardTitle>
                </CardHeader>
                <CardContent>
                    <Select onValueChange={handleSelectParade}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a parade to view details" />
                        </SelectTrigger>
                        <SelectContent>
                            {parades.map(parade => (
                                <SelectItem key={parade._id} value={parade._id}>
                                    {parade.eventName} - {new Date(parade.date).toLocaleDateString()}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </CardContent>
                <CardFooter className="justify-end">
                    <Button onClick={onLogout}>Logout</Button>
                </CardFooter>
            </Card>
        </div>
      );
    };
        
    return renderView();
};

const CadetDashboard = ({ onLogout }) => {
    const [dashboardData, setDashboardData] = useState(null);
    const { toast } = useToast();

    const fetchDashboardData = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast({ title: 'Error', description: 'Not authenticated.', variant: 'destructive' });
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/cadet/dashboard`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            const result = await response.json();
            if (response.ok) {
                setDashboardData(result);
            } else {
                toast({ title: 'Error', description: result.message, variant: 'destructive' });
            }
        } catch (error) {
            toast({ title: 'Error', description: 'Failed to fetch dashboard data.', variant: 'destructive' });
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    return (
        <Card className="w-full max-w-md mx-auto p-6">
            <CardHeader>
                <CardTitle>Cadet Dashboard</CardTitle>
                <CardDescription>Your attendance at a glance.</CardDescription>
            </CardHeader>
            <CardContent>
                {dashboardData ? (
                    <div>
                        <h3 className="text-lg font-semibold">Attendance: {dashboardData.attendancePercentage}%</h3>
                        <div className="mt-4">
                            <h4 className="text-md font-medium">Attended Parades</h4>
                            <ul className="list-disc list-inside">
                                {dashboardData.attendedParades.map(p => (
                                    <li key={p.eventName}>{p.eventName} ({new Date(p.date).toLocaleDateString()})</li>
                                ))}
                            </ul>
                        </div>
                        <div className="mt-4">
                            <h4 className="text-md font-medium">Missed Parades</h4>
                            <ul className="list-disc list-inside text-red-500">
                                {dashboardData.missedParades.map(p => (
                                    <li key={p.eventName}>{p.eventName} ({new Date(p.date).toLocaleDateString()})</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ) : (
                    <p>Loading dashboard data...</p>
                )}
            </CardContent>
            <CardFooter className="justify-end">
                <Button onClick={onLogout}>Logout</Button>
            </CardFooter>
        </Card>
    );
};