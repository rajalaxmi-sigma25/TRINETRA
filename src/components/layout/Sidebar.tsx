import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../common/Logo';
import {
  LayoutDashboard,
  ShieldAlert,
  FileText,
  UserCheck,
  Landmark,
  Calendar,
  FolderOpen,
  BarChart3,
  History,
  Users,
  KeyRound,
  Settings,
  Scale,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { UserRole } from '../../types';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (val: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen
}) => {
  const { currentRole, logout, currentUser } = useAuth();

  // Navigation items with role permissions
  const allNavItems = [
    {
      name: 'Dashboard',
      path: '/app/dashboard',
      icon: <LayoutDashboard className="w-5 h-5 shrink-0" />,
      roles: ['police', 'cbi', 'jailer', 'court', 'admin'] as UserRole[],
    },
    {
      name: 'Criminal Records',
      path: '/app/criminals',
      icon: <ShieldAlert className="w-5 h-5 shrink-0" />,
      roles: ['police', 'cbi', 'admin'] as UserRole[],
    },
    {
      name: 'FIR & Cases',
      path: '/app/cases',
      icon: <FileText className="w-5 h-5 shrink-0" />,
      roles: ['police', 'cbi', 'admin'] as UserRole[],
    },
    {
      name: 'Prisoner Custody',
      path: '/app/prisoners',
      icon: <UserCheck className="w-5 h-5 shrink-0" />,
      roles: ['jailer', 'admin'] as UserRole[],
    },
    {
      name: 'Court Cases',
      path: '/app/court',
      icon: <Landmark className="w-5 h-5 shrink-0" />,
      roles: ['court', 'admin'] as UserRole[],
    },
    {
      name: 'Hearing Schedule',
      path: '/app/court?tab=hearings',
      icon: <Calendar className="w-5 h-5 shrink-0" />,
      roles: ['court', 'police', 'cbi', 'admin'] as UserRole[],
    },
    {
      name: 'Court Documents',
      path: '/app/documents',
      icon: <FolderOpen className="w-5 h-5 shrink-0" />,
      roles: ['court', 'police', 'cbi', 'admin'] as UserRole[],
    },
    {
      name: 'Reports & Analytics',
      path: '/app/reports',
      icon: <BarChart3 className="w-5 h-5 shrink-0" />,
      roles: ['police', 'cbi', 'jailer', 'court', 'admin'] as UserRole[],
    },
    {
      name: 'Audit Logs',
      path: '/app/audit',
      icon: <History className="w-5 h-5 shrink-0" />,
      roles: ['admin'] as UserRole[],
    },
    {
      name: 'User Management',
      path: '/app/users',
      icon: <Users className="w-5 h-5 shrink-0" />,
      roles: ['admin'] as UserRole[],
    },
    {
      name: 'Role Permissions',
      path: '/app/users?tab=permissions',
      icon: <KeyRound className="w-5 h-5 shrink-0" />,
      roles: ['admin'] as UserRole[],
    },
    {
      name: 'Legal Reference',
      path: '/app/legal',
      icon: <Scale className="w-5 h-5 shrink-0" />,
      roles: ['police', 'cbi', 'jailer', 'court', 'admin'] as UserRole[],
    },
    {
      name: 'Settings',
      path: '/app/settings',
      icon: <Settings className="w-5 h-5 shrink-0" />,
      roles: ['police', 'cbi', 'jailer', 'court', 'admin'] as UserRole[],
    },
  ];

  // Filter based on active role
  const visibleNavItems = allNavItems.filter((item) =>
    item.roles.includes(currentRole)
  );

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/50 md:hidden backdrop-blur-xs"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 bg-white dark:bg-darkcard border-r border-slate-200 dark:border-darkborder flex flex-col transition-all duration-300 ${
          collapsed ? 'w-20' : 'w-64'
        } ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand header */}
        <div className="h-20 flex items-center justify-between px-4 border-b border-slate-200 dark:border-darkborder shrink-0">
          <div className="overflow-hidden">
            <Logo variant={collapsed ? 'compact' : 'full'} />
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* User Role Pill */}
        <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-900/30">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-igreen-500 animate-pulse shrink-0" />
            {!collapsed ? (
              <div className="overflow-hidden">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Active Role
                </span>
                <span className="text-xs font-semibold text-navy-900 dark:text-white capitalize truncate block">
                  {currentUser?.role === 'cbi' ? 'CBI Officer' : currentUser?.role === 'court' ? 'Court User' : `${currentUser?.role} Officer`}
                </span>
              </div>
            ) : (
              <span className="text-[10px] font-bold text-slate-500 font-mono uppercase">
                {currentRole.substring(0, 3)}
              </span>
            )}
          </div>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {visibleNavItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                  isActive
                    ? 'bg-chakra-50 dark:bg-chakra-950/60 text-chakra-700 dark:text-chakra-300 font-semibold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-navy-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`
              }
              title={collapsed ? item.name : undefined}
            >
              {item.icon}
              {!collapsed && <span className="truncate">{item.name}</span>}
            </NavLink>
          ))}
        </div>

        {/* Bottom User & Logout area */}
        <div className="p-3 border-t border-slate-200 dark:border-darkborder shrink-0 bg-slate-50/50 dark:bg-slate-900/20">
          {!collapsed && (
            <div className="mb-2 px-2">
              <p className="text-xs font-semibold text-navy-900 dark:text-white truncate">
                {currentUser?.name || 'Demo Officer'}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono truncate">
                {currentUser?.badgeNumber}
              </p>
            </div>
          )}
          <button
            onClick={logout}
            className={`w-full flex items-center ${
              collapsed ? 'justify-center' : 'justify-start px-3'
            } py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors`}
            title="Sign Out"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!collapsed && <span className="ml-2">Sign Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
};
