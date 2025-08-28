import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

// In a real project, you would import these components from separate files.
// For a self-contained immersive, we mock them here.
const Card = ({ children, className }) => <div className={`bg-white rounded-xl shadow-lg ${className}`}>{children}</div>;
const CardHeader = ({ children, className }) => <div className={`p-6 ${className}`}>{children}</div>;
const CardTitle = ({ children, className }) => <h3 className={`text-2xl font-semibold ${className}`}>{children}</h3>;
const CardDescription = ({ children, className }) => <p className={`text-sm text-gray-500 ${className}`}>{children}</p>;
const CardContent = ({ children, className }) => <div className={`p-6 ${className}`}>{children}</div>;
const CardFooter = ({ children, className }) => <div className={`p-6 flex ${className}`}>{children}</div>;
const Label = ({ children, htmlFor }) => <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">{children}</label>;
const Input = ({ className, ...props }) => <input className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${className}`} {...props} />;
const Button = ({ children, className, variant, ...props }) => <button className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 ${variant === 'link' ? 'text-blue-600 hover:underline' : 'bg-blue-600 text-white hover:bg-blue-700'} ${className}`} {...props}>{children}</button>;
const Select = ({ onValueChange, children, ...props }) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(props.value || '');
    return (
        <div className="relative">
            <SelectTrigger onClick={() => setOpen(!open)} className="w-full">
                <SelectValue placeholder={props.placeholder} value={value} />
            </SelectTrigger>
            {open && (
                <SelectContent className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1">
                    {React.Children.map(children, child =>
                        React.cloneElement(child, {
                            onClick: () => {
                                setValue(child.props.value);
                                onValueChange(child.props.value);
                                setOpen(false);
                            }
                        })
                    )}
                </SelectContent>
            )}
        </div>
    );
};
const SelectTrigger = ({ children, onClick, className }) => <button type="button" onClick={onClick} className={`flex items-center justify-between w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}>{children}</button>;
const SelectValue = ({ placeholder, value }) => <span>{value || placeholder}</span>;
const SelectContent = ({ children, className }) => <div className={`py-1 ${className}`}>{children}</div>;
const SelectItem = ({ value, children, onClick }) => <div onClick={onClick} className="py-2 px-3 text-sm hover:bg-gray-100 cursor-pointer">{children}</div>;
const Table = ({ children, className }) => <table className={`w-full ${className}`}>{children}</table>;
const TableBody = ({ children, className }) => <tbody className={className}>{children}</tbody>;
const TableCell = ({ children, className }) => <td className={`p-2 border-b ${className}`}>{children}</td>;
const TableHead = ({ children, className }) => <th className={`p-2 border-b text-left font-semibold ${className}`}>{children}</th>;
const TableHeader = ({ children, className }) => <thead className={className}>{children}</thead>;
const TableRow = ({ children, className }) => <tr className={className}>{children}</tr>;

// --- Mock Toast functionality ---
const ToastContext = createContext();
const useToast = () => useContext(ToastContext);
const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);
  const addToast = useCallback(({ title, description, variant }) => {
    setToast({ title, description, variant });
    setTimeout(() => setToast(null), 3000);
  }, []);
  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      {toast && (
        <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white ${toast.variant === 'destructive' ? 'bg-red-500' : 'bg-green-500'}`}>
          <h4 className="font-bold">{toast.title}</h4>
          <p className="text-sm">{toast.description}</p>
        </div>
      )}
    </ToastContext.Provider>
  );
};
const Toaster = () => null;

const API_URL = 'http://localhost:3000';

const getRoleFromToken = (token) => {
    try {
        const payload = token.split('.')[1];
        const decoded = JSON.parse(atob(payload));
        return decoded.role;
    } catch (error) {
        return null;
    }
};

// --- View Components ---
const LoginPage = ({ role, setView, onLogin }) => {
    const [formData, setFormData] = useState({
      regimentalNo: '', username: '', password: ''
    });

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (role === 'cadet') {
        onLogin('/login', { regimentalNo: formData.regimentalNo, password: formData.password });
      } else {
        onLogin('/admin/login', { username: formData.username, password: formData.password });
      }
    };

    return (
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">{role === 'cadet' ? 'Cadet Login' : 'Admin Login'}</CardTitle>
          <CardDescription>Enter your credentials to log in.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-4">
            {role === 'cadet' ? (
              <div className="grid gap-2">
                <Label htmlFor="regimentalNo">Regimental No.</Label>
                <Input id="regimentalNo" name="regimentalNo" placeholder="Enter regimental number" required onChange={handleChange} />
              </div>
            ) : (
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" name="username" placeholder="Enter username" required onChange={handleChange} />
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="Enter password" required onChange={handleChange} />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Log In</Button>
          </CardFooter>
        </form>
        <div className="flex flex-col items-center p-6 space-y-3">
          {role === 'cadet' ? (
            <>
              <Button variant="link" onClick={() => setView('adminLogin')}>Login as Admin</Button>
              <p className="text-sm text-gray-500">Don't have an account?</p>
              <Button variant="link" onClick={() => setView('register')}>Register</Button>
            </>
          ) : (
            <Button variant="link" onClick={() => setView('cadetLogin')}>Back to Cadet Login</Button>
          )}
        </div>
      </Card>
    );
  };

const RegisterPage = ({ setView, onRegister }) => {
    const [formData, setFormData] = useState({
      name: '', regimentalNo: '', password: '', unit: '', college: '', gender: '', year: '', enrollmentYear: ''
    });

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (name) => (value) => {
      setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onRegister(formData);
    };

    return (
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Register a Cadet</CardTitle>
          <CardDescription>Fill out the form below to create a new cadet account.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" placeholder="Full Name" required onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="regimentalNo">Regimental No.</Label>
              <Input id="regimentalNo" name="regimentalNo" placeholder="Regimental Number" required onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="Choose a password" required onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="unit">Unit</Label>
              <Input id="unit" name="unit" placeholder="Unit Name" required onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="college">College</Label>
              <Select onValueChange={handleSelectChange('college')} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select your College" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="college-a">College A</SelectItem>
                  <SelectItem value="college-b">College B</SelectItem>
                  <SelectItem value="college-c">College C</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="gender">Gender</Label>
                <Select onValueChange={handleSelectChange('gender')} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select SD/SW" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SD">SD</SelectItem>
                    <SelectItem value="SW">SW</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="year">Year</Label>
                <Select onValueChange={handleSelectChange('year')} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1st Year">1st Year</SelectItem>
                    <SelectItem value="2nd Year">2nd Year</SelectItem>
                    <SelectItem value="3rd Year">3rd Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="enrollmentYear">Enrollment Year</Label>
              <Input id="enrollmentYear" name="enrollmentYear" type="number" placeholder="e.g., 2024" required onChange={handleChange} />
            </div>
          </CardContent>
          <CardFooter className="flex-col">
            <Button type="submit" className="w-full">Register</Button>
            <Button variant="link" className="mt-2" onClick={() => setView('cadetLogin')}>Back to Login</Button>
          </CardFooter>
        </form>
      </Card>
    );
  };

const DashboardPage = ({ onLogout, role, setView }) => {
    const [dashboardData, setDashboardData] = useState(null);
    const { toast } = useToast();

    const fetchDashboardData = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast({ title: 'Error', description: 'Not authenticated.', variant: 'destructive' });
            return;
        }

        const path = role === 'admin' ? '/api/admin/parades' : '/api/cadet/dashboard';

        try {
            const response = await fetch(`${API_URL}${path}`, {
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
    }, [role]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        onLogout();
    };

    return (
        <Card className="w-full max-w-md mx-auto p-6">
            <CardHeader>
                <CardTitle>{role === 'admin' ? 'Admin Dashboard' : 'Cadet Dashboard'}</CardTitle>
                <CardDescription>
                    {role === 'admin' ? 'Manage parades and attendance.' : 'Your attendance at a glance.'}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {dashboardData ? (
                    <div>
                        {role === 'cadet' ? (
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
                            <div>
                                <h4 className="text-md font-medium">Parades</h4>
                                <ul className="list-disc list-inside">
                                    {dashboardData.map(p => (
                                        <li key={p._id}>{p.eventName} ({new Date(p.date).toLocaleDateString()})</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <p>Loading dashboard data...</p>
                )}
            </CardContent>
            <CardFooter className="justify-end space-x-2">
                {role === 'admin' && (
                    <Button variant="outline" onClick={() => setView('createParade')}>Create Parade</Button>
                )}
                <Button onClick={onLogout}>Logout</Button>
            </CardFooter>
        </Card>
    );
};

// Main App component to manage state and navigation
export default function App() {
  const [view, setView] = useState('cadetLogin');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
        const role = getRoleFromToken(storedToken);
        if (role) {
            setIsLoggedIn(true);
            setUserRole(role);
            setView('dashboard');
        } else {
            localStorage.removeItem('token');
        }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserRole(null);
    setView('cadetLogin');
  };

  const handleLogin = async (path, data) => {
    try {
      const response = await fetch(`${API_URL}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        localStorage.setItem('token', result.token);
        const role = getRoleFromToken(result.token);
        setIsLoggedIn(true);
        setUserRole(role);
        setView('dashboard');
        toast({ title: "Login Successful", description: result.message });
      } else {
        toast({ title: "Login Failed", description: result.message, variant: "destructive" });
      }
    } catch (error) {
      console.error('API Error:', error);
      toast({ title: "Error", description: "An unexpected error occurred.", variant: "destructive" });
    }
  };

  const handleRegister = async (data) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        toast({ title: "Registration Successful", description: result.message });
        setView('cadetLogin');
      } else {
        toast({ title: "Registration Failed", description: result.message, variant: "destructive" });
      }
    } catch (error) {
      console.error('API Error:', error);
      toast({ title: "Error", description: "An unexpected error occurred.", variant: "destructive" });
    }
  };

  const renderView = () => {
    if (isLoggedIn) {
      return <DashboardPage onLogout={handleLogout} role={userRole} setView={setView} />;
    }
    switch (view) {
      case 'cadetLogin':
        return <LoginPage role="cadet" setView={setView} onLogin={handleLogin} />;
      case 'adminLogin':
        return <LoginPage role="admin" setView={setView} onLogin={handleLogin} />;
      case 'register':
        return <RegisterPage setView={setView} onRegister={handleRegister} />;
      default:
        return <LoginPage role="cadet" setView={setView} onLogin={handleLogin} />;
    }
  };

  return (
    <ToastProvider>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
        <h1 className="text-3xl font-bold mb-8 text-blue-600">Cadet Tracker</h1>
        {renderView()}
      </div>
    </ToastProvider>
  );
}
