import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../components/ui/use-toast'; // ShadCN useToast hook
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('cadet'); // default to cadet
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: 'Missing fields',
        description: 'Please enter both email and password.',
        variant: 'destructive',
      });
      return;
    }

    // **Dummy authentication logic**
    // In a real app, you'd call an API here.
    localStorage.setItem('token', 'dummy-jwt-token');
    localStorage.setItem('role', userType);

    toast({
      title: 'Login successful',
      description: `Logged in as ${userType}`,
    });

    // Navigate to the appropriate dashboard
    if (userType === 'admin') {
      navigate('/admin');
    } else {
      navigate('/cadet');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <CardContent className="space-y-4">
            {/* User Type Selection */}
            <div className="flex flex-col">
              <Label htmlFor="userType">Login As</Label>
              <select
                id="userType"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="admin">Admin</option>
                <option value="cadet">Cadet</option>
              </select>
            </div>

            {/* Email Field */}
            <div className="flex flex-col">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              Login
            </Button>
            <p className="text-sm text-center">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:underline">
                Register here
              </Link>
              .
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
