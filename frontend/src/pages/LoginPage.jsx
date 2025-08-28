import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Label,
  Input,
  Button
} from './components/ui';

// Mocked shadcn/ui components for a self-contained environment.
// In a real application, these would be in separate files and imported.
const Card = ({ children, className }) => (
  <div className={`bg-white rounded-xl shadow-lg ${className}`}>
    {children}
  </div>
);
const CardHeader = ({ children, className }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);
const CardTitle = ({ children, className }) => (
  <h3 className={`text-2xl font-semibold ${className}`}>
    {children}
  </h3>
);
const CardDescription = ({ children, className }) => (
  <p className={`text-sm text-gray-500 ${className}`}>
    {children}
  </p>
);
const CardContent = ({ children, className }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);
const CardFooter = ({ children, className }) => (
  <div className={`p-6 flex ${className}`}>
    {children}
  </div>
);
const Label = ({ children, htmlFor }) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
    {children}
  </label>
);
const Input = ({ className, ...props }) => (
  <input
    className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${className}`}
    {...props}
  />
);
const Button = ({ children, className, variant, ...props }) => (
  <button
    className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 ${variant === 'link' ? 'text-blue-600 hover:underline' : 'bg-blue-600 text-white hover:bg-blue-700'} ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default function LoginPage({ role, setView, onLogin }) {
  const [formData, setFormData] = useState({ regimentalNo: '', username: '', password: '' });

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
