import React, { useState, useEffect } from 'react';

// Main App component to manage state and navigation
export default function App() {
  // 'view' state manages which page is displayed: 'cadetLogin', 'adminLogin', 'register', or 'dashboard'.
  const [view, setView] = useState('cadetLogin');
  // 'isLoggedIn' state tracks if a user is authenticated.
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Checks for a token in local storage on component mount to handle persistent login sessions.
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const API_URL = 'http://localhost:5000';

  /**
   * Handles user login by making a POST request to the backend.
   * @param {string} path - The API endpoint for login (e.g., '/login' or '/admin/login').
   * @param {object} data - The user's login credentials.
   */
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
        setIsLoggedIn(true);
        alert('Login Successful!'); // Replace with a more elegant UI notification later.
      } else {
        alert('Login Failed: ' + result.message);
      }
    } catch (error) {
      console.error('Login Error:', error);
      alert('An unexpected error occurred during login.');
    }
  };

  /**
   * Handles user registration by making a POST request to the backend.
   * @param {object} data - The new cadet's registration details.
   */
  const handleRegister = async (data) => {
    console.log('Data being sent to server:', data);//checker
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (response.ok) {
        alert('Registration Successful! You can now log in.');
        setView('cadetLogin');
      } else {
        alert('Registration Failed: ' + result.message);
      }
    } catch (error) {
      console.error('Registration Error:', error);
      alert('An unexpected error occurred during registration.');
    }
  };
  
  // --- Components from other files ---
  const LoginPage = ({ role, setView, onLogin }) => {
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
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm mx-auto">
        <h3 className="text-2xl font-semibold">
          {role === 'cadet' ? 'Cadet Login' : 'Admin Login'}
        </h3>
        <p className="text-sm text-gray-500 mt-1">Enter your credentials to log in.</p>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 mt-6">
            {role === 'cadet' ? (
              <div className="grid gap-2">
                <label htmlFor="regimentalNo" className="block text-sm font-medium text-gray-700">Regimental No.</label>
                <input id="regimentalNo" name="regimentalNo" placeholder="Enter regimental number" required onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
              </div>
            ) : (
              <div className="grid gap-2">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                <input id="username" name="username" placeholder="Enter username" required onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
              </div>
            )}
            <div className="grid gap-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input id="password" name="password" type="password" placeholder="Enter password" required onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
          </div>
          <div className="p-6 flex">
            <button type="submit" className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700">Log In</button>
          </div>
        </form>
        <div className="flex flex-col items-center p-6 space-y-3">
          {role === 'cadet' ? (
            <>
              <button className="text-blue-600 hover:underline" onClick={() => setView('adminLogin')}>Login as Admin</button>
              <p className="text-sm text-gray-500">Don't have an account?</p>
              <button className="text-blue-600 hover:underline" onClick={() => setView('register')}>Register</button>
            </>
          ) : (
            <button className="text-blue-600 hover:underline" onClick={() => setView('cadetLogin')}>Back to Cadet Login</button>
          )}
        </div>
      </div>
    );
  };
  
  const RegisterPage = ({ setView, onRegister }) => {
    const [formData, setFormData] = useState({
      name: '', regimentalNo: '', password: '', unit: '', college: '', gender: '', year: '', enrollmentYear: ''
    });

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onRegister(formData);
    };

    return (
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg mx-auto">
        <h3 className="text-2xl font-semibold">Register a Cadet</h3>
        <p className="text-sm text-gray-500 mt-1">Fill out the form below to create a new cadet account.</p>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 mt-6">
            <div className="grid gap-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input id="name" name="name" placeholder="Full Name" required onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="regimentalNo" className="block text-sm font-medium text-gray-700">Regimental No.</label>
              <input id="regimentalNo" name="regimentalNo" placeholder="Regimental Number" required onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input id="password" name="password" type="password" placeholder="Choose a password" required onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="unit" className="block text-sm font-medium text-gray-700">Unit</label>
              <input id="unit" name="unit" placeholder="Unit Name" required onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="college" className="block text-sm font-medium text-gray-700">College</label>
              <select id="college" name="college" onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option value="">Select your College</option>
                <option value="college-a">College A</option>
                <option value="college-b">College B</option>
                <option value="college-c">College C</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                <select id="gender" name="gender" onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Select SD/SW</option>
                  <option value="SD">SD</option>
                  <option value="SW">SW</option>
                </select>
              </div>
              <div className="grid gap-2">
                <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
                <select id="year" name="year" onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Select Year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                </select>
              </div>
            </div>
            <div className="grid gap-2">
              <label htmlFor="enrollmentYear" className="block text-sm font-medium text-gray-700">Enrollment Year</label>
              <input id="enrollmentYear" name="enrollmentYear" type="number" placeholder="e.g., 2024" required onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
          </div>
          <div className="p-6 flex-col">
            <button type="submit" className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700">Register</button>
            <button className="text-blue-600 hover:underline mt-2" onClick={() => setView('cadetLogin')}>Back to Login</button>
          </div>
        </form>
      </div>
    );
  };
  
  const DashboardPage = ({ onLogout }) => {
    const handleLogout = () => {
      localStorage.removeItem('token');
      onLogout();
    };

    return (
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-auto text-center">
        <h3 className="text-2xl font-semibold">Welcome to your Dashboard!</h3>
        <p className="mt-4">You are now logged in.</p>
        <button onClick={handleLogout} className="mt-6 inline-flex items-center justify-center rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700">Log Out</button>
      </div>
    );
  };

  /**
   * Renders the correct page based on the current application state.
   */
  const renderPage = () => {
    if (isLoggedIn) {
      return <DashboardPage onLogout={() => setIsLoggedIn(false)} />;
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
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-blue-600">Cadet Tracker</h1>
      {renderPage()}
    </div>
  );
}
