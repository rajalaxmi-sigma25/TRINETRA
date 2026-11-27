import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import {
  Settings,
  Sun,
  Moon,
  Laptop,
  User,
  Bell,
  RefreshCw,
  ShieldCheck,
  CheckCircle2,
  Info
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { currentUser, currentRole } = useAuth();
  const { resetAllDemoData } = useData();

  const [notifSound, setNotifSound] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [compactTables, setCompactTables] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleReset = () => {
    if (confirm('Reset all demo databases (Cases, FIRs, Criminals, Inmates, Hearings, Logs) back to original default mock data?')) {
      resetAllDemoData();
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 3000);
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-navy-900 dark:text-white">
          System Preferences & Configuration
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Customize UI appearance, notification behaviors, and manage demo session data.
        </p>
      </div>

      {resetSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-200 flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Demo dataset reset to factory academic baseline successfully.</span>
        </div>
      )}

      {/* 1. Appearance Section */}
      <div className="p-6 rounded-2xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder shadow-subtle space-y-4">
        <div>
          <h2 className="text-base font-bold text-navy-900 dark:text-white flex items-center gap-2">
            <Sun className="w-5 h-5 text-saffron-500" />
            <span>Theme & Visual Appearance</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Switch between carefully tuned Light Mode and Dark Mode enterprise palettes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Light Theme Card */}
          <div
            onClick={() => setTheme('light')}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
              theme === 'light'
                ? 'border-chakra-500 bg-chakra-50/50 dark:bg-slate-800 text-navy-900 shadow-sm'
                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-amber-500">
                <Sun className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm text-navy-900 dark:text-white">Light Mode</p>
                <p className="text-xs text-slate-500">Crisp soft white backgrounds with deep navy text</p>
              </div>
            </div>
            {theme === 'light' && <CheckCircle2 className="w-5 h-5 text-chakra-600 shrink-0" />}
          </div>

          {/* Dark Theme Card */}
          <div
            onClick={() => setTheme('dark')}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
              theme === 'dark'
                ? 'border-chakra-500 bg-chakra-950/40 text-white shadow-sm'
                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-blue-400">
                <Moon className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm text-navy-900 dark:text-white">Dark Mode</p>
                <p className="text-xs text-slate-500">Deep navy tone with balanced saffron/green accents</p>
              </div>
            </div>
            {theme === 'dark' && <CheckCircle2 className="w-5 h-5 text-chakra-500 shrink-0" />}
          </div>
        </div>
      </div>

      {/* 2. Account Profile & Active Credentials */}
      <div className="p-6 rounded-2xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder shadow-subtle space-y-4">
        <div>
          <h2 className="text-base font-bold text-navy-900 dark:text-white flex items-center gap-2">
            <User className="w-5 h-5 text-chakra-600" />
            <span>Active Demonstration Profile</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Current simulated officer identity and jurisdictional division.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Officer Name</span>
            <p className="font-semibold text-navy-900 dark:text-white text-sm mt-0.5">{currentUser?.name}</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Demo Email</span>
            <p className="font-semibold font-mono text-navy-900 dark:text-white mt-0.5">{currentUser?.email}</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Jurisdiction Badge</span>
            <p className="font-semibold font-mono text-navy-900 dark:text-white mt-0.5">{currentUser?.badgeNumber}</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Operational Scope</span>
            <p className="font-semibold text-navy-900 dark:text-white capitalize mt-0.5">{currentRole} Officer</p>
          </div>
        </div>
      </div>

      {/* 3. Operational Preferences */}
      <div className="p-6 rounded-2xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder shadow-subtle space-y-4">
        <div>
          <h2 className="text-base font-bold text-navy-900 dark:text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-emerald-600" />
            <span>Alert & Operational Preferences</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure system audio, table density, and real-time dashboard updates.
          </p>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
          <div className="py-3 flex items-center justify-between">
            <div>
              <p className="font-semibold text-navy-900 dark:text-white">Smart Operational Alert Chimes</p>
              <p className="text-[11px] text-slate-500">Play auditory chime when new hearing notifications occur</p>
            </div>
            <input
              type="checkbox"
              checked={notifSound}
              onChange={(e) => setNotifSound(e.target.checked)}
              className="w-4 h-4 accent-chakra-600 rounded cursor-pointer"
            />
          </div>

          <div className="py-3 flex items-center justify-between">
            <div>
              <p className="font-semibold text-navy-900 dark:text-white">Auto-Synchronize Audit Stream</p>
              <p className="text-[11px] text-slate-500">Automatically reload station activities every 60 seconds</p>
            </div>
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="w-4 h-4 accent-chakra-600 rounded cursor-pointer"
            />
          </div>

          <div className="py-3 flex items-center justify-between">
            <div>
              <p className="font-semibold text-navy-900 dark:text-white">Compact Data Table View</p>
              <p className="text-[11px] text-slate-500">Reduce cell padding for high-density record browsing</p>
            </div>
            <input
              type="checkbox"
              checked={compactTables}
              onChange={(e) => setCompactTables(e.target.checked)}
              className="w-4 h-4 accent-chakra-600 rounded cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* 4. Demo Data Management */}
      <div className="p-6 rounded-2xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder shadow-subtle space-y-4">
        <div>
          <h2 className="text-base font-bold text-navy-900 dark:text-white flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-rose-500" />
            <span>Demo Data Reset & Storage</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Reset mutated records (FIRs, cases, logs, user modifications) back to initial seminar demo seeds.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <div>
            <p className="font-semibold text-xs text-navy-900 dark:text-white">Factory Demo Reset</p>
            <p className="text-[11px] text-slate-500">Clears browser storage cache and restores baseline records</p>
          </div>
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs shadow-sm transition-colors flex items-center gap-2 shrink-0 self-start sm:self-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
        </div>

        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40 text-[11px] text-blue-900 dark:text-blue-300 flex items-start gap-2">
          <Info className="w-4 h-4 shrink-0 text-blue-600 dark:text-blue-400 mt-0.5" />
          <p>
            <strong>Academic Integrity Notice:</strong> All data is stored in client browser LocalStorage. No real criminal records or confidential government data are transmitted over networks.
          </p>
        </div>
      </div>
    </div>
  );
};
