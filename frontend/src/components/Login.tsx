import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { loginUser } from '@/api/api';
import { useUser } from '../components/UserContext';

const Login = () => {
  const [idNumber, setIdNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setUser } = useUser();

  const validate = () => {
    if (!/^[0-9]{9,}$/.test(idNumber.trim())) {
      setError('ID must be numeric and at least 9 digits');
      return false;
    }
    setError('');
    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const { user, token } = await loginUser(idNumber.trim());

      localStorage.setItem('learning_platform_current_user', JSON.stringify(user));
      localStorage.setItem('learning_platform_token', token);
      setUser(user);

      toast({ title: 'Welcome!', description: `Hello ${user.name}` });

      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/learning');
      }
    } catch {
      toast({ title: 'Error', description: 'Server error. Please try again later.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your ID number to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label>ID Number</Label>
              <Input value={idNumber} onChange={(e) => setIdNumber(e.target.value)} />
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
            <div className="text-center mt-4">
              <span>Don't have an account? </span>
              <Button
                type="button"
                variant="link"
                className="text-blue-600 hover:underline p-0"
                onClick={() => navigate('/register')}
              >
                Register here
              </Button>
            </div>
            <div className="text-center mt-2">
              <Button
                variant="link"
                className="text-gray-600 hover:underline p-0"
                type="button"
                onClick={() => navigate('/')}
              >
                Back to Home
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
