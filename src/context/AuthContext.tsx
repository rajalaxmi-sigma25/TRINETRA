import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { INITIAL_USERS, INITIAL_PERMISSIONS } from '../data/mockData';

interface AuthContextType {
  currentUser: User | null;
  currentRole: UserRole;
  isAuthenticated: boolean;
  login: (role: UserRole) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  hasAccessToModule: (moduleName: string) => boolean;
  canPerformAction: (action: 'view' | 'create' | 'update' | 'delete') => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedRole = localStorage.getItem('trinetra_auth_role') as UserRole | null;
    if (savedRole) {
      const match = INITIAL_USERS.find((u) => u.role === savedRole);
      return match || INITIAL_USERS[0];
    }
    // Default to police officer if previously logged in, or null if visitor
    const isAuthed = localStorage.getItem('trinetra_is_authenticated') === 'true';
    return isAuthed ? INITIAL_USERS[0] : null;
  });

  const isAuthenticated = currentUser !== null;
  const currentRole: UserRole = currentUser?.role || 'police';

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('trinetra_auth_role', currentUser.role);
      localStorage.setItem('trinetra_is_authenticated', 'true');
    } else {
      localStorage.removeItem('trinetra_auth_role');
      localStorage.setItem('trinetra_is_authenticated', 'false');
    }
  }, [currentUser]);

  const login = async (role: UserRole): Promise<boolean> => {
    // Simulate slight network latency for realistic feel
    await new Promise((resolve) => setTimeout(resolve, 300));
    const user = INITIAL_USERS.find((u) => u.role === role) || INITIAL_USERS[0];
    setCurrentUser(user);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const switchRole = (role: UserRole) => {
    const user = INITIAL_USERS.find((u) => u.role === role) || INITIAL_USERS[0];
    setCurrentUser(user);
  };

  const hasAccessToModule = (moduleName: string): boolean => {
    if (!currentUser) return false;
    if (currentUser.role === 'admin') return true;

    const perm = INITIAL_PERMISSIONS.find((p) => p.role === currentUser.role);
    if (!perm) return false;

    // Direct match or partial category match
    return perm.accessibleModules.some((mod) => 
      mod.toLowerCase() === moduleName.toLowerCase() ||
      mod.toLowerCase().includes(moduleName.toLowerCase()) ||
      moduleName.toLowerCase().includes(mod.toLowerCase())
    );
  };

  const canPerformAction = (action: 'view' | 'create' | 'update' | 'delete'): boolean => {
    if (!currentUser) return false;
    const perm = INITIAL_PERMISSIONS.find((p) => p.role === currentUser.role);
    if (!perm) return false;

    switch (action) {
      case 'view': return perm.canView;
      case 'create': return perm.canCreate;
      case 'update': return perm.canUpdate;
      case 'delete': return perm.canDelete;
      default: return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentRole,
        isAuthenticated,
        login,
        logout,
        switchRole,
        hasAccessToModule,
        canPerformAction
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
