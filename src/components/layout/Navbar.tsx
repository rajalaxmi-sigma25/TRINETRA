import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../common/Logo';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, ArrowRight, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Roles', href: '#roles' },
    { name: 'Security', href: '#security' },
    { name: 'Legal Reference', href: '#legal' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/85 dark:bg-darkbg/85 border-b border-slate-200/80 dark:border-darkborder/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <a href="#home" className="hover:opacity-90 transition-opacity">
            <Logo variant="full" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`py-2 text-sm font-medium transition-colors ${
                  link.name === 'Home'
                    ? 'text-navy-900 dark:text-white font-semibold relative'
                    : 'text-slate-600 dark:text-slate-300 hover:text-navy-900 dark:hover:text-white'
                }`}
              >
                {link.name}
                {link.name === 'Home' && (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-saffron-500 rounded-full" />
                )}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="px-2.5 py-1 rounded-full border border-slate-200 dark:border-darkborder bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-300 hover:text-navy-900 dark:hover:text-white transition-all shadow-xs flex items-center justify-center"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Sun className="w-3.5 h-3.5 text-slate-500" />}
            </button>

            {/* Refresh / Reset Icon */}
            <button
              onClick={() => window.location.reload()}
              aria-label="Refresh Page"
              className="w-8 h-8 rounded-full bg-[#0a2540] hover:bg-[#0f172a] dark:bg-chakra-600 dark:hover:bg-chakra-500 text-white flex items-center justify-center transition-all shadow-xs"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>

            {/* Sign In CTA */}
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-2 rounded-full bg-[#0a2540] hover:bg-[#0f172a] dark:bg-chakra-600 dark:hover:bg-chakra-500 text-white font-medium text-sm shadow-sm transition-all"
            >
              Sign In
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-lg border border-slate-200 dark:border-darkborder text-slate-600 dark:text-slate-300"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-darkborder bg-white dark:bg-darkcard px-4 pt-2 pb-6 space-y-3">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/login');
              }}
              className="w-full py-3 rounded-xl bg-navy-900 dark:bg-chakra-600 text-white font-medium text-center flex items-center justify-center gap-2"
            >
              <span>Sign In to Platform</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
