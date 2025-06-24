import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createUser } from '@/api/api';
import { useToast } from '@/hooks/use-toast';

const UserRegistration = () => {
  const [name, setName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ name: '', idNumber: '', phone: '' });
  const { toast } = useToast();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = { name: '', idNumber: '', phone: '' };
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!/^[0-9]{9,}$/.test(idNumber.trim())) newErrors.idNumber = 'ID must be numeric and at least 9 digits';
    if (!/^[0-9]{9,10}$/.test(phone.trim())) newErrors.phone = 'Phone must be numeric and 9-10 digits';
    setErrors(newErrors);
    return !newErrors.name && !newErrors.idNumber && !newErrors.phone;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const user = await createUser(idNumber.trim(), name.trim(), phone.trim());
      localStorage.setItem('learning_platform_current_user', JSON.stringify(user));
      toast({ title: "Welcome!", description: "Account created successfully" });
      navigate('/learning');
    } catch {
      toast({ title: "Error", description: "Failed to create account.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Create Account</CardTitle>
          <CardDescription>Start learning with AI</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Full Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            <div>
              <Label>ID Number</Label>
              <Input value={idNumber} onChange={(e) => setIdNumber(e.target.value)} />
              {errors.idNumber && <p className="text-red-500 text-sm">{errors.idNumber}</p>}
            </div>
            <div>
              <Label>Phone Number</Label>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
            <div className="text-center mt-4">
              <span>Already registered? </span>
              <Link to="/login" className="text-blue-600 hover:underline">Log in here</Link>
            </div>
            <div className="text-center mt-2">
              <Link to="/" className="text-gray-600 hover:underline">Back to Home</Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserRegistration;
