import React, { useState } from 'react';

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
const SelectTrigger = ({ children, onClick, className }) => (
  <button type="button" onClick={onClick} className={`flex items-center justify-between w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}>
    {children}
  </button>
);
const SelectValue = ({ placeholder, value }) => (
  <span>{value || placeholder}</span>
);
const SelectContent = ({ children, className }) => (
  <div className={`py-1 ${className}`}>
    {children}
  </div>
);
const SelectItem = ({ value, children, onClick }) => (
  <div onClick={onClick} className="py-2 px-3 text-sm hover:bg-gray-100 cursor-pointer">
    {children}
  </div>
);

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
}
