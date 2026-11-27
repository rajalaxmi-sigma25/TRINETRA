import React from 'react';
import { Logo } from '../common/Logo';
import { ShieldCheck, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-white dark:bg-darkbg border-t border-slate-200 dark:border-darkborder transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="full" />
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              A centralized digital governance platform designed to organize fictional criminal, case, prisoner, and court-related records through role-based access, faster search, and linked monitoring.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-xs border border-slate-200 dark:border-slate-700">
              <ShieldCheck className="w-4 h-4 text-igreen-600 dark:text-igreen-400" />
              <span>Academic Engineering Prototype • Demo Data Only</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-navy-900 dark:text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li><a href="#home" className="hover:text-chakra-600 dark:hover:text-chakra-400 transition-colors">Home</a></li>
              <li><a href="#features" className="hover:text-chakra-600 dark:hover:text-chakra-400 transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-chakra-600 dark:hover:text-chakra-400 transition-colors">How It Works</a></li>
              <li><a href="#roles" className="hover:text-chakra-600 dark:hover:text-chakra-400 transition-colors">Roles & Access</a></li>
              <li><a href="#security" className="hover:text-chakra-600 dark:hover:text-chakra-400 transition-colors">Security Architecture</a></li>
            </ul>
          </div>

          {/* Platform Modules (Navigates to login) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-navy-900 dark:text-white mb-4">
              Platform Modules
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li><button onClick={() => navigate('/login')} className="hover:text-chakra-600 dark:hover:text-chakra-400 text-left transition-colors">Criminal Records</button></li>
              <li><button onClick={() => navigate('/login')} className="hover:text-chakra-600 dark:hover:text-chakra-400 text-left transition-colors">FIR & Cases</button></li>
              <li><button onClick={() => navigate('/login')} className="hover:text-chakra-600 dark:hover:text-chakra-400 text-left transition-colors">Prisoner Custody</button></li>
              <li><button onClick={() => navigate('/login')} className="hover:text-chakra-600 dark:hover:text-chakra-400 text-left transition-colors">Court Cases & Hearings</button></li>
              <li><button onClick={() => navigate('/login')} className="hover:text-chakra-600 dark:hover:text-chakra-400 text-left transition-colors">Reports & Analytics</button></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-navy-900 dark:text-white mb-4">
              Project Information
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li><a href="#legal" className="hover:text-chakra-600 dark:hover:text-chakra-400 transition-colors">Legal References</a></li>
              <li><a href="#security" className="hover:text-chakra-600 dark:hover:text-chakra-400 transition-colors">Data Privacy & Ethics</a></li>
              <li><span className="text-xs text-slate-400">Version: 1.0.0-Academic</span></li>
              <li><span className="text-xs text-slate-400">Built for: Seminar Demonstration</span></li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="mt-12 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-darkborder text-xs text-slate-500 dark:text-slate-400 flex items-start gap-3">
          <Info className="w-5 h-5 shrink-0 text-slate-400 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Prototype Compliance Note:</strong> TRINETRA is an academic software engineering project. All data including names, FIR numbers, case files, custody entries, and court dockets are purely fictional. This platform does not connect to real-world police, judicial, or correctional databases. It does not provide legal advice or render automated judicial outcomes.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-darkborder flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
          <div className="flex items-center gap-2">
            <span>Academic Software Engineering Project • Fictional Demo Data Only</span>
          </div>
          <div>
            © 2026 TRINETRA. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
