import React, { useState } from 'react';
import { Search, Bell, Sun, Moon, Menu, Shield, RefreshCw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';
import { UserRole } from '../../types';

interface TopbarProps {
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  onToggleMobileMenu: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  onOpenSearch,
  onOpenNotifications,
  onToggleMobileMenu,
}) => {
  const { currentRole, switchRole, currentUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { notifications, resetAllDemoData } = useData();
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const roleLabels: Record<UserRole, { label: string; badge: string; color: string }> = {
    police: { label: 'Police Officer', badge: 'Police', color: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300' },
    cbi: { label: 'CBI Officer', badge: 'CBI', color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300' },
    jailer: { label: 'Jailer / Prisons', badge: 'Correctional', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' },
    court: { label: 'Court User', badge: 'Judiciary', color: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' },
    admin: { label: 'System Admin', badge: 'Admin', color: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300' },
  };

  const handleRoleChange = (role: UserRole) => {
    switchRole(role);
    setRoleDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 h-20 bg-white/90 dark:bg-darkbg/90 backdrop-blur-md border-b border-slate-200 dark:border-darkborder px-4 sm:px-6 flex items-center justify-between transition-colors">
      {/* Left side: Mobile Toggle & Global Search Bar Trigger */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Global Search Button */}
        <button
          onClick={onOpenSearch}
          className="w-full max-w-md flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-darkcard border border-slate-200 dark:border-darkborder text-slate-400 hover:border-chakra-400 dark:hover:border-chakra-500 hover:text-slate-600 dark:hover:text-slate-200 transition-all text-xs sm:text-sm group shadow-xs"
        >
          <div className="flex items-center gap-2 truncate">
            <Search className="w-4 h-4 text-slate-400 group-hover:text-chakra-500 transition-colors" />
            <span className="truncate">Search Case ID, FIR, Criminal, Prisoner, Court...</span>
          </div>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 text-slate-500">
            Ctrl+K
          </kbd>
        </button>
      </div>

      {/* Right side: Academic Role Quick Switcher, Notification, Theme, Profile */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Role Quick Switcher for Demo / Seminar Evaluation */}
        <div className="relative">
          <button
            onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-darkborder bg-white dark:bg-darkcard hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-xs font-medium shadow-xs"
            title="Switch demo role perspective"
          >
            <Shield className="w-3.5 h-3.5 text-chakra-600 dark:text-chakra-400" />
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-[10px] text-slate-400 uppercase font-semibold leading-none">Perspective</span>
              <span className="text-xs font-bold text-navy-900 dark:text-white leading-tight">
                {roleLabels[currentRole]?.label}
              </span>
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${roleLabels[currentRole]?.color}`}>
              {roleLabels[currentRole]?.badge}
            </span>
          </button>

          {roleDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder rounded-2xl shadow-xl py-2 z-50 animate-fadeIn">
              <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Switch Authorized Role
              </div>
              {(['police', 'cbi', 'jailer', 'court', 'admin'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  onClick={() => handleRoleChange(r)}
                  className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors ${
                    currentRole === r ? 'font-bold text-chakra-600 dark:text-chakra-400 bg-chakra-50/50 dark:bg-chakra-950/30' : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span>{roleLabels[r].label}</span>
                  <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${roleLabels[r].color}`}>
                    {roleLabels[r].badge}
                  </span>
                </button>
              ))}
              <div className="mt-1 pt-1 border-t border-slate-100 dark:border-slate-800 px-3 py-1 text-[10px] text-slate-400 italic">
                Demonstrates academic RBAC transitions live
              </div>
            </div>
          )}
        </div>

        {/* Notifications Icon Button */}
        <button
          onClick={onOpenNotifications}
          aria-label="Notifications"
          className="relative p-2.5 rounded-xl border border-slate-200 dark:border-darkborder bg-white dark:bg-darkcard text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-xs"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-saffron-500 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle Dark/Light Mode"
          className="p-2.5 rounded-xl border border-slate-200 dark:border-darkborder bg-white dark:bg-darkcard text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-xs"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>

        {/* Reset Demo Data shortcut */}
        <button
          onClick={() => {
            if (confirm('Reset all fictional demo records back to baseline defaults?')) {
              resetAllDemoData();
            }
          }}
          title="Reset Demo Dataset"
          className="hidden lg:flex p-2.5 rounded-xl border border-slate-200 dark:border-darkborder bg-white dark:bg-darkcard text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-xs"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
