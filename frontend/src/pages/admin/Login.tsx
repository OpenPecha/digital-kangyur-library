import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/atoms/button';
import { Input } from '@/components/ui/atoms/input';
import { Label } from '@/components/ui/atoms/label';
import { Card } from '@/components/ui/atoms/card';
import { LogIn, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast.success('Login successful');
      navigate('/admin');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-kangyur-cream to-white flex items-center justify-center p-4">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-kangyur-orange/5 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-kangyur-green/5 blur-3xl"></div>
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <img src="/logo.svg" alt="" className="w-[600px] h-[600px]" />
        </div>
      </div>

      <Card className="w-full max-w-md p-8 relative z-10 shadow-lg">
        <div className="flex flex-col items-center mb-6">
          <img src="/logo.svg" alt="Kangyur Logo" className="w-16 h-16 mb-4" />
          <h1 className="text-2xl font-bold text-kangyur-maroon mb-2">Admin Login</h1>
          <p className="text-sm text-gray-600">Sign in to access the admin panel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@kangyur.org"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              className="w-full"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-kangyur-orange hover:bg-kangyur-orange/90"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-center text-gray-500">
            Default credentials: admin@kangyur.org / admin123
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
