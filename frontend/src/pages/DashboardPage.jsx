import React from 'react';

// Mocked shadcn/ui components for a self-contained environment.
// In a real application, these would be in separate files and imported.
const Card = ({ children, className }) => (
  <div className={`bg-white rounded-xl shadow-lg ${className}`}>
    {children}
  </div>
);
const CardTitle = ({ children, className }) => (
  <h3 className={`text-2xl font-semibold ${className}`}>
    {children}
  </h3>
);
const CardContent = ({ children, className }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);
const Button = ({ children, className, variant, ...props }) => (
  <button
    className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 ${variant === 'link' ? 'text-blue-600 hover:underline' : 'bg-blue-600 text-white hover:bg-blue-700'} ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default function DashboardPage({ onLogout }) {
  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
  };

  return (
    <Card className="w-full max-w-md mx-auto p-6 text-center">
      <CardTitle>Welcome to your Dashboard!</CardTitle>
      <CardContent className="mt-4">
        <p>You are now logged in.</p>
      </CardContent>
      <Button onClick={handleLogout} className="mt-6">Log Out</Button>
    </Card>
  );
}
