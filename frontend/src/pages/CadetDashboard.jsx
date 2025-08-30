import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/ui//use-toast'; // ShadCN useToast hook
import { Button } from '../components/ui/button';

export default function CadetDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    toast({ title: 'Logged out', description: 'You have been logged out.' });
    navigate('/login');
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Cadet Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <p className="text-lg">
        Welcome, Cadet! This is your dashboard. You can add cadet-specific content here.
      </p>
      {/* Additional cadet dashboard content can go here */}
    </div>
  );
}
