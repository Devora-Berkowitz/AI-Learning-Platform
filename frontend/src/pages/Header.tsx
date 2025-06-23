import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, User as UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  userName: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ userName, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/'); 
  };

  return (
    <header className="bg-white shadow-md border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* לוגו/שם האתר */}
        <div className="flex items-center space-x-3">
          <span className="text-xl font-bold text-blue-700">AI Learning Platform</span>
        </div>

        {/* שם משתמש + יציאה */}
        <div className="flex items-center space-x-4">
          <UserIcon className="h-5 w-5 text-gray-600" />
          <span className="text-gray-800 font-medium">{userName}</span>
          <Button 
            onClick={handleLogout} 
            variant="outline" 
            size="sm" 
            className="flex items-center space-x-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>

      </div>
    </header>
  );
};

export default Header;
