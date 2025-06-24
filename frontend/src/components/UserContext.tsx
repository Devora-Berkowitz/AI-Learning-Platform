import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/types/types';

interface UserContextType {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('learning_platform_current_user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('learning_platform_token') || null;
  });

  const handleSetUser = (user: User | null) => {
    setUser(user);
    if (user) {
      localStorage.setItem('learning_platform_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('learning_platform_current_user');
    }
  };

  const handleSetToken = (token: string | null) => {
    setToken(token);
    if (token) {
      localStorage.setItem('learning_platform_token', token);
    } else {
      localStorage.removeItem('learning_platform_token');
    }
  };

  return (
    <UserContext.Provider value={{ user, token, setUser: handleSetUser, setToken: handleSetToken }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
