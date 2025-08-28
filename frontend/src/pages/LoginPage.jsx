import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

export default function LoginPage({ role, setView, onLogin }) {
  const [formData, setFormData] = useState({ regimentalNo: '', username: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // A simple function to convert form data types before sending
const convertData = (data) => {
    const dataToSend = { ...data };
    dataToSend.regimentalNo = parseInt(dataToSend.regimentalNo, 10);
    // Can other conversions here if needed
    return dataToSend;
};
//handleLogin function
const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = convertData(formData);
    
    if (role === 'cadet') {
        onLogin('/login', dataToSend);
    } else {
        onLogin('/admin/login', { username: formData.username, password: formData.password });
    }
};

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle>{role === 'cadet' ? 'Cadet Login' : 'Admin Login'}</CardTitle>
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
}
