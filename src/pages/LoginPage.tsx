import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Logo } from '../components/common/Logo';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { UserRole } from '../types';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  Sun,
  Moon,
  AlertCircle,
  Database,
  CheckCircle2
} from 'lucide-react';
import { INITIAL_USERS } from '../data/mockData';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [selectedRole, setSelectedRole] = useState<UserRole>('police');
  const [email, setEmail] = useState('officer.police@trinetra.demo');
  const [password, setPassword] = useState('police123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Quick fill credentials mapping
  const demoAccounts: Array<{
    role: UserRole;
    name: string;
    email: string;
    pass: string;
    tag: string;
  }> = [
    {
      role: 'police',
      name: 'Inspector Vikram Singh (Demo)',
      email: 'officer.police@trinetra.demo',
      pass: 'police123',
      tag: 'Police',
    },
    {
      role: 'cbi',
      name: 'Special Agent Neha Sharma (Demo)',
      email: 'officer.cbi@trinetra.demo',
      pass: 'cbi123',
      tag: 'CBI',
    },
    {
      role: 'jailer',
      name: 'Superintendent R. Murthy (Demo)',
      email: 'jailer.central@trinetra.demo',
      pass: 'jailer123',
      tag: 'Correctional',
    },
    {
      role: 'court',
      name: 'Registrar Meera Rao (Demo)',
      email: 'clerk.district@trinetra.demo',
      pass: 'court123',
      tag: 'Judiciary',
    },
    {
      role: 'admin',
      name: 'Administrator Suresh Nair (Demo)',
      email: 'admin.system@trinetra.demo',
      pass: 'admin123',
      tag: 'System Admin',
    },
  ];

  const handleSelectRole = (r: UserRole) => {
    setSelectedRole(r);
    const acc = demoAccounts.find((a) => a.role === r);
    if (acc) {
      setEmail(acc.email);
      setPassword(acc.pass);
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both demo credentials.');
      return;
    }

    setIsLoading(true);
    try {
      await login(selectedRole);
      navigate('/app/dashboard');
    } catch {
      setErrorMessage('Failed to sign in. Please verify demo role.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-darkbg text-navy-900 dark:text-slate-100 flex flex-col justify-center py-8 px-4 sm:px-6 lg:px-8 transition-colors">
      {/* Top right floating theme toggle and back link */}
      <div className="absolute top-6 right-6 flex items-center gap-3">
        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="p-2.5 rounded-xl border border-slate-200 dark:border-darkborder bg-white dark:bg-darkcard text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all shadow-xs"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>
        <Link
          to="/"
          className="px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-darkborder bg-white dark:bg-darkcard text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
        >
          Back to Home
        </Link>
      </div>

      <div className="max-w-4xl w-full mx-auto bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left Side: Illustration, Branding & Message */}
        <div className="lg:col-span-5 bg-gradient-to-br from-navy-950 via-navy-900 to-slate-900 p-8 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Subtle tricolor background glow */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-saffron-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-igreen-500/20 rounded-full blur-3xl pointer-events-none" />

          <div>
            <Logo variant="full" className="text-white" />
            <div className="mt-8 space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-saffron-400">
                Enterprise Digital Governance
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-white leading-tight">
                Three Perspectives. One Connected System.
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Seamless digital coordination between Police, Central Investigating agencies, Correctional facilities, and Court Registrars with immutable audit logs.
              </p>
            </div>
          </div>

          {/* Security and Database Graphic Concept */}
          <div className="my-8 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-chakra-600/30 text-chakra-300">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Central Relational Store</p>
                <p className="text-[10px] text-slate-400">Fictional Demo Environment Active</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-igreen-400">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>Role-Based Access Control Enforced</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-saffron-400 shrink-0" />
            <span>Academic Software Engineering Project</span>
          </div>
        </div>

        {/* Right Side: Welcome Back, Role Selection & Form */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-navy-900 dark:text-white">
              Welcome Back
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Select an authorized demonstration role to access permitted modules.
            </p>
          </div>

          {/* Quick Demo Role Picker Chips */}
          <div className="mb-5">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Select Perspective Role
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {demoAccounts.map((acc) => (
                <button
                  type="button"
                  key={acc.role}
                  onClick={() => handleSelectRole(acc.role)}
                  className={`px-3 py-2 rounded-xl text-xs font-medium border text-left transition-all flex flex-col justify-between ${
                    selectedRole === acc.role
                      ? 'border-chakra-500 bg-chakra-50/70 dark:bg-chakra-950/60 text-chakra-700 dark:text-chakra-300 font-bold shadow-xs'
                      : 'border-slate-200 dark:border-darkborder hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <span className="truncate">{acc.tag}</span>
                  <span className="text-[10px] opacity-75 font-normal truncate mt-0.5">
                    {acc.role}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Error notice */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-xs text-red-600 dark:text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-navy-900 dark:text-slate-200 mb-1.5">
                Username / Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@trinetra.demo"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-darkborder bg-white dark:bg-darkcard text-navy-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-chakra-500 text-xs sm:text-sm transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-900 dark:text-slate-200 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-darkborder bg-white dark:bg-darkcard text-navy-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-chakra-500 text-xs sm:text-sm transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Login button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-navy-900 to-navy-800 dark:from-chakra-600 dark:to-chakra-700 text-white font-semibold text-sm shadow-md hover:from-navy-800 hover:to-navy-700 dark:hover:from-chakra-500 dark:hover:to-chakra-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Authenticating Role Scope...</span>
                </>
              ) : (
                <>
                  <span>Secure Login</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Demo disclaimer */}
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-darkborder text-center">
            <span className="text-[11px] text-slate-400 font-medium">
              Demo Access Only • No live credentials required
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
