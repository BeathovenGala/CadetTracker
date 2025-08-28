import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

export default function RegisterPage({ setView, onRegister }) {
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
    // Create a copy of the formData to modify it
  const dataToSend = { ...formData };
  
  // Convert the enrollmentYear string to an integer
  dataToSend.enrollmentYear = parseInt(dataToSend.enrollmentYear, 10);
    dataToSend.regimentalNo = parseInt(dataToSend.regimentalNo, 10);
  
  // Check if the conversion resulted in a valid number
  if (isNaN(dataToSend.enrollmentYear)) {
    alert("Please enter a valid enrollment year/regimentalNo.");
    return;
  }
  
  // Pass the converted data to the onRegister function
  onRegister(dataToSend);
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
}
