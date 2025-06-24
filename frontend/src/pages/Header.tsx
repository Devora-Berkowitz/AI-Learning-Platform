import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, User as UserIcon, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../components/UserContext';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const handleLogout = () => {
    localStorage.removeItem('learning_platform_current_user');
    setUser(null);
    navigate('/');
  };

  const goToAbout = () => {
    navigate('/about');
  };

  const isLoggedIn = Boolean(user);

  return (
    <header className="bg-white shadow-md border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <span className="text-xl font-bold text-blue-700">AI Learning Platform</span>
        </div>
        <div className="flex items-center space-x-4">
          <UserIcon className="h-4 w-4" />
          <span>{isLoggedIn ? user?.name : 'Guest'}</span>
          <Button
            onClick={goToAbout}
            variant="outline"
            size="sm"
            className="flex items-center space-x-2"
          >
            <Info className="h-4 w-4" />
            <span>About</span>
          </Button>

          {isLoggedIn && (
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
