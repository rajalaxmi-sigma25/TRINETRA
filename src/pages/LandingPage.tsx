import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import {
  ArrowRight,
  CheckCircle2,
  Database,
  Lock,
  Search,
  Clock,
  Bell,
  GitCommit,
  BarChart3,
  History,
  ShieldAlert,
  UserCheck,
  Landmark,
  Scale,
  FileText,
  AlertCircle,
  FileSpreadsheet,
  Check,
  Fingerprint,
  GraduationCap,
  Play,
  ChevronRight,
  Users,
  Link2,
  Folder
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-darkbg text-navy-900 dark:text-slate-100 transition-colors">
      <Navbar />

      {/* ==================================================
          SECTION 6: HERO SECTION
          ================================================== */}
      <section id="home" className="relative bg-white dark:bg-darkbg pt-3 pb-10 sm:pt-4 sm:pb-14 lg:pt-0 lg:pb-6 overflow-hidden transition-colors">
        {/* Subtle decorative background lights */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-saffron-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-chakra-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center min-h-[460px] lg:min-h-[520px]">
            {/* Left Column (approx 42% width) */}
            <div className="lg:col-span-5 space-y-5 text-left relative z-10 py-4 lg:py-8">
              {/* Academic Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e8f1fc] dark:bg-blue-950/60 text-[#1a73e8] dark:text-blue-300 text-xs font-semibold shadow-xs">
                <GraduationCap className="w-4 h-4 text-[#1a73e8] dark:text-blue-300" />
                <span>Academic Software Engineering Project</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-[#0b1a30] dark:text-white leading-[1.12]">
                Smarter Records. <br />
                Better <span className="text-[#128c53] dark:text-[#22a053]">Case Management.</span>
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                Trinetra is a centralized digital platform designed to organize fictional criminal, case, prisoner and court-related records through role-based access, faster search, connected records and smart monitoring.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={() => navigate('/login')}
                  className="px-6 py-3 rounded-full bg-[#0a2540] hover:bg-[#0f172a] dark:bg-chakra-600 dark:hover:bg-chakra-500 text-white font-semibold text-sm shadow-md transition-all flex items-center gap-2 group"
                >
                  <span>Explore Platform</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <a
                  href="#how-it-works"
                  className="px-6 py-3 rounded-full border border-[#0a2540] dark:border-slate-300 bg-white dark:bg-darkcard text-[#0a2540] dark:text-slate-200 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center gap-2.5"
                >
                  <span className="w-5 h-5 rounded-full border border-[#0a2540] dark:border-slate-300 flex items-center justify-center">
                    <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                  </span>
                  <span>See How It Works</span>
                </a>
              </div>

              {/* Benefits Checklist (Single horizontal row) */}
              <div className="pt-3 flex flex-wrap items-center gap-5 sm:gap-7 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#128c53] dark:text-[#22a053] stroke-[3]" />
                  <span>Centralized Records</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#128c53] dark:text-[#22a053] stroke-[3]" />
                  <span>Role-Based Access</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#128c53] dark:text-[#22a053] stroke-[3]" />
                  <span>Smart Monitoring</span>
                </div>
              </div>
            </div>

            {/* Right Column: Large, Prominent Courthouse Hero Image (approx 58% width) */}
            <div className="lg:col-span-7 relative flex items-center justify-center lg:justify-end w-full">
              <div className="relative w-full max-w-2xl lg:max-w-none flex items-center justify-end overflow-hidden">
                <img
                  src="/hero-courthouse.png"
                  alt="Trinetra Digital Court Record Management and Supreme Court Architecture"
                  className="w-full h-auto object-contain select-none max-h-[480px] xl:max-h-[540px]"
                  style={{
                    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, transparent 2%, black 10%, black 100%)',
                    maskImage: 'linear-gradient(to right, transparent 0%, transparent 2%, black 10%, black 100%)',
                  }}
                />
                {/* Seamless feathering gradient on the left edge */}
                <div className="absolute inset-y-0 left-0 w-14 sm:w-24 bg-gradient-to-r from-white dark:from-darkbg via-white/80 dark:via-darkbg/70 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION: KEY FEATURES (Directly below Hero Section)
          ================================================== */}
      <section id="features" className="py-14 sm:py-18 bg-white dark:bg-darkbg transition-colors border-t border-slate-100 dark:border-darkborder/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center justify-center gap-3 mb-2.5">
              <div className="h-[2px] w-6 bg-saffron-500 rounded-full" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-saffron-600 dark:text-saffron-400">
                KEY FEATURES
              </span>
              <div className="h-[2px] w-6 bg-saffron-500 rounded-full" />
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-[#0b1a30] dark:text-white leading-tight">
              Everything You Need for Smarter Record Management
            </h2>
          </div>

          {/* 8 Feature Cards Grid (4 columns x 2 rows) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Card 1: Centralized Record Management */}
            <div className="p-5 rounded-2xl bg-white dark:bg-darkcard border border-slate-100 dark:border-darkborder shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md transition-all flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#e8f1fc] text-[#1a73e8] dark:bg-blue-950/60 dark:text-blue-300 flex items-center justify-center shrink-0">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-[#0b1a30] dark:text-white text-sm mb-1 leading-snug">
                  Centralized Record Management
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Manage criminal records, FIRs, cases, prisoners and court records in one platform.
                </p>
              </div>
            </div>

            {/* Card 2: Role-Based Access */}
            <div className="p-5 rounded-2xl bg-white dark:bg-darkcard border border-slate-100 dark:border-darkborder shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md transition-all flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#eaf7ee] text-[#22a053] dark:bg-emerald-950/60 dark:text-emerald-300 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-[#0b1a30] dark:text-white text-sm mb-1 leading-snug">
                  Role-Based Access
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Different permissions for Police Officers, CBI Officers, Jailers, Court Users and Administrators.
                </p>
              </div>
            </div>

            {/* Card 3: Global Search */}
            <div className="p-5 rounded-2xl bg-white dark:bg-darkcard border border-slate-100 dark:border-darkborder shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md transition-all flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#f1edfc] text-[#7048e8] dark:bg-purple-950/60 dark:text-purple-300 flex items-center justify-center shrink-0">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-[#0b1a30] dark:text-white text-sm mb-1 leading-snug">
                  Global Search
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Search by Case ID, FIR Number, Criminal ID, Prisoner ID, Court Case ID and Hearing ID.
                </p>
              </div>
            </div>

            {/* Card 4: Interactive Case Timeline */}
            <div className="p-5 rounded-2xl bg-white dark:bg-darkcard border border-slate-100 dark:border-darkborder shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md transition-all flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#fef2e6] text-[#f76707] dark:bg-orange-950/60 dark:text-orange-300 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-[#0b1a30] dark:text-white text-sm mb-1 leading-snug">
                  Interactive Case Timeline
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Track the progress of a case through connected events.
                </p>
              </div>
            </div>

            {/* Card 5: Smart Alerts */}
            <div className="p-5 rounded-2xl bg-white dark:bg-darkcard border border-slate-100 dark:border-darkborder shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md transition-all flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#fdeeed] text-[#e03131] dark:bg-rose-950/60 dark:text-rose-300 flex items-center justify-center shrink-0">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-[#0b1a30] dark:text-white text-sm mb-1 leading-snug">
                  Smart Alerts
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Get reminders for pending updates, upcoming hearings, pending documents and important activities.
                </p>
              </div>
            </div>

            {/* Card 6: Linked Records */}
            <div className="p-5 rounded-2xl bg-white dark:bg-darkcard border border-slate-100 dark:border-darkborder shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md transition-all flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#e7f7fd] text-[#1098ad] dark:bg-cyan-950/60 dark:text-cyan-300 flex items-center justify-center shrink-0">
                <Link2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-[#0b1a30] dark:text-white text-sm mb-1 leading-snug">
                  Linked Records
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Connect FIRs, cases, criminal records, prisoners, court cases and hearings.
                </p>
              </div>
            </div>

            {/* Card 7: Reports & Analytics */}
            <div className="p-5 rounded-2xl bg-white dark:bg-darkcard border border-slate-100 dark:border-darkborder shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md transition-all flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#eef0fc] text-[#4263eb] dark:bg-indigo-950/60 dark:text-indigo-300 flex items-center justify-center shrink-0">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-[#0b1a30] dark:text-white text-sm mb-1 leading-snug">
                  Reports & Analytics
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  View useful summaries and charts for demo data.
                </p>
              </div>
            </div>

            {/* Card 8: Audit Logs */}
            <div className="p-5 rounded-2xl bg-white dark:bg-darkcard border border-slate-100 dark:border-darkborder shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md transition-all flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#edf2f7] text-[#2b4c7e] dark:bg-slate-800 dark:text-slate-300 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-[#0b1a30] dark:text-white text-sm mb-1 leading-snug">
                  Audit Logs
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Track system activities and record updates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION: HOW IT WORKS (Directly below Key Features)
          ================================================== */}
      <section id="how-it-works" className="py-16 sm:py-20 bg-slate-50/70 dark:bg-darkcard/20 border-t border-slate-100 dark:border-darkborder transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center justify-center gap-3 mb-2.5">
              <div className="h-[2px] w-6 bg-saffron-500 rounded-full" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-saffron-600 dark:text-saffron-400">
                HOW IT WORKS
              </span>
              <div className="h-[2px] w-6 bg-saffron-500 rounded-full" />
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-[#0b1a30] dark:text-white leading-tight">
              Get Started in 4 Simple Steps
            </h2>
          </div>

          {/* 4 Connected Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative items-center">
            {/* Step 1 */}
            <div className="flex items-center gap-3 relative">
              <div className="flex items-center gap-2.5 shrink-0">
                <span className="w-9 h-9 rounded-full bg-[#0a2540] dark:bg-chakra-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                  01
                </span>
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-darkcard border border-blue-100 dark:border-darkborder shadow-xs flex items-center justify-center text-[#1a73e8] shrink-0">
                  <UserCheck className="w-5 h-5" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm text-[#0b1a30] dark:text-white leading-snug">
                  Secure Login
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug mt-0.5">
                  Sign in with authorized demo credentials.
                </p>
              </div>
              {/* Connector Arrow */}
              <div className="hidden lg:flex items-center text-slate-300 dark:text-slate-600 pl-2">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-center gap-3 relative">
              <div className="flex items-center gap-2.5 shrink-0">
                <span className="w-9 h-9 rounded-full bg-[#0a2540] dark:bg-chakra-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                  02
                </span>
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-darkcard border border-blue-100 dark:border-darkborder shadow-xs flex items-center justify-center text-[#1a73e8] shrink-0">
                  <ShieldAlert className="w-5 h-5" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm text-[#0b1a30] dark:text-white leading-snug">
                  Select Role
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug mt-0.5">
                  The system identifies your role and permissions.
                </p>
              </div>
              {/* Connector Arrow */}
              <div className="hidden lg:flex items-center text-slate-300 dark:text-slate-600 pl-2">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-center gap-3 relative">
              <div className="flex items-center gap-2.5 shrink-0">
                <span className="w-9 h-9 rounded-full bg-[#0a2540] dark:bg-chakra-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                  03
                </span>
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-darkcard border border-blue-100 dark:border-darkborder shadow-xs flex items-center justify-center text-[#1a73e8] shrink-0">
                  <Folder className="w-5 h-5" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm text-[#0b1a30] dark:text-white leading-snug">
                  Manage Records
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug mt-0.5">
                  View and update only the information permitted for your role.
                </p>
              </div>
              {/* Connector Arrow */}
              <div className="hidden lg:flex items-center text-slate-300 dark:text-slate-600 pl-2">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-center gap-3 relative">
              <div className="flex items-center gap-2.5 shrink-0">
                <span className="w-9 h-9 rounded-full bg-[#0a2540] dark:bg-chakra-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                  04
                </span>
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-darkcard border border-blue-100 dark:border-darkborder shadow-xs flex items-center justify-center text-[#1a73e8] shrink-0">
                  <BarChart3 className="w-5 h-5" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm text-[#0b1a30] dark:text-white leading-snug">
                  Monitor & Report
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug mt-0.5">
                  Track cases, hearings, alerts, activities and reports.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION: PROBLEM → SOLUTION SECTION
          ================================================== */}
      <section className="py-20 bg-white dark:bg-darkcard/50 border-t border-slate-200 dark:border-darkborder transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-saffron-600 dark:text-saffron-400">
            System Evolution
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 dark:text-white mt-2 mb-4">
            From Manual Records to Smart Digital Management
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-16">
            A cohesive three-stage architectural model addressing legacy documentation bottlenecks with modern governance workflows.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-darkcard border border-slate-200 dark:border-darkborder text-left relative flex flex-col justify-between shadow-subtle group hover:border-red-300 dark:hover:border-red-900/60 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-600 flex items-center justify-center font-bold text-lg mb-4">
                  01
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                  Legacy Paradigm
                </span>
                <h3 className="text-lg font-bold text-navy-900 dark:text-white mt-1 mb-3">
                  Manual & Scattered Records
                </h3>
                <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    <span>Physical paper files and registry ledgers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    <span>Difficult, time-consuming manual searches</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    <span>Duplicate data across station outposts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    <span>Delayed inter-departmental updates</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-darkcard border border-slate-200 dark:border-darkborder text-left relative flex flex-col justify-between shadow-subtle group hover:border-chakra-400 dark:hover:border-chakra-700 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-chakra-100 dark:bg-chakra-950/60 text-chakra-600 flex items-center justify-center font-bold text-lg mb-4">
                  02
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-chakra-600 dark:text-chakra-400">
                  Core Foundation
                </span>
                <h3 className="text-lg font-bold text-navy-900 dark:text-white mt-1 mb-3">
                  Centralized Digital Records
                </h3>
                <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-chakra-500" />
                    <span>Structured digital records & verified schemas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-chakra-500" />
                    <span>Organized information architecture</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-chakra-500" />
                    <span>Granular role-based access permissions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-chakra-500" />
                    <span>Instant multi-parameter record retrieval</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-darkcard border border-slate-200 dark:border-darkborder text-left relative flex flex-col justify-between shadow-subtle group hover:border-igreen-400 dark:hover:border-igreen-700 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-igreen-100 dark:bg-igreen-950/60 text-igreen-600 flex items-center justify-center font-bold text-lg mb-4">
                  03
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-igreen-600 dark:text-igreen-400">
                  Intelligent Operations
                </span>
                <h3 className="text-lg font-bold text-navy-900 dark:text-white mt-1 mb-3">
                  Smart Case Management
                </h3>
                <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-igreen-500" />
                    <span>Linked relational records (FIR to Hearing)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-igreen-500" />
                    <span>Interactive chronological case timelines</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-igreen-500" />
                    <span>Deterministic rule alerts for pending actions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-igreen-500" />
                    <span>Comprehensive analytics & audit transparency</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 10: ROLE SECTION
          ================================================== */}
      <section id="roles" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-saffron-600 dark:text-saffron-400">
              Role-Based Access
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 dark:text-white mt-2 mb-4">
              One Platform. Multiple Authorized Roles.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Each stakeholder group accesses a tailored workspace respecting operational separation of powers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Police Officer */}
            <div className="p-6 rounded-2xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder shadow-subtle flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 flex items-center justify-center mb-3">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-navy-900 dark:text-white mb-2">
                  Police Officer
                </h3>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-blue-500" /> FIR Registration</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-blue-500" /> Case Management</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-blue-500" /> Criminal Profiles</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-blue-500" /> Permitted Updates</li>
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
                Primary Investigating Authority
              </div>
            </div>

            {/* CBI Officer */}
            <div className="p-6 rounded-2xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder shadow-subtle flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 flex items-center justify-center mb-3">
                  <Database className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-navy-900 dark:text-white mb-2">
                  CBI Officer
                </h3>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-indigo-500" /> Assigned Special Cases</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-indigo-500" /> Investigation Logs</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-indigo-500" /> Cross-Agency Tracking</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-indigo-500" /> Inquest Reports</li>
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
                Central Inquiry Bureau
              </div>
            </div>

            {/* Jailer */}
            <div className="p-6 rounded-2xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder shadow-subtle flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center mb-3">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-navy-900 dark:text-white mb-2">
                  Jailer / Prisons
                </h3>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Inmate Remands</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Admission Details</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Release Calendars</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Prisoner Conduct</li>
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
                Correctional Administration
              </div>
            </div>

            {/* Court User */}
            <div className="p-6 rounded-2xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder shadow-subtle flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 flex items-center justify-center mb-3">
                  <Landmark className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-navy-900 dark:text-white mb-2">
                  Court User (Clerk)
                </h3>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-500" /> Court Case Dockets</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-500" /> Hearing Schedules</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-500" /> Document Indexing</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-500" /> Court Stage Updates</li>
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
                No Automated Judicial Decisions
              </div>
            </div>

            {/* Admin */}
            <div className="p-6 rounded-2xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder shadow-subtle flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 flex items-center justify-center mb-3">
                  <Scale className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-navy-900 dark:text-white mb-2">
                  System Admin
                </h3>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-purple-500" /> User Lifecycle CRUD</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-purple-500" /> Permission Matrix</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-purple-500" /> System Monitoring</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-purple-500" /> Audit Log Auditing</li>
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
                Governance & Governance Logs
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 11: SECURITY SECTION
          ================================================== */}
      <section id="security" className="py-20 bg-slate-100/60 dark:bg-darkcard/30 border-y border-slate-200 dark:border-darkborder transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-chakra-600 dark:text-chakra-400">
              Trust & Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 dark:text-white mt-2 mb-3">
              Designed with Responsible Access in Mind
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Enterprise digital governance principles enforcing strict record integrity and access hygiene.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder flex items-start gap-4">
              <div className="p-2.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-navy-900 dark:text-white mb-1">
                  Role-Based Permissions
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Strict authorization boundary limits data access strictly to designated officer responsibilities.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder flex items-start gap-4">
              <div className="p-2.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 shrink-0">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-navy-900 dark:text-white mb-1">
                  Controlled Record Access
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Data queries and mutation requests are filtered client-side and authenticated against active sessions.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder flex items-start gap-4">
              <div className="p-2.5 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-600 shrink-0">
                <History className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-navy-900 dark:text-white mb-1">
                  Audit Trail Accountability
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Every FIR submission, case status progression, and prisoner admission is logged with user and role stamps.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder flex items-start gap-4">
              <div className="p-2.5 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-600 shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-navy-900 dark:text-white mb-1">
                  Structured Digital Records
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Eliminates unstructured ambiguity by imposing verified relational models between FIRs, Cases, and Hearings.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder flex items-start gap-4">
              <div className="p-2.5 rounded-lg bg-saffron-100 dark:bg-saffron-950 text-saffron-600 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-navy-900 dark:text-white mb-1">
                  Input Validation & Integrity
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Format enforcement on Case IDs, section citations, and dates protects data quality across modules.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder flex items-start gap-4">
              <div className="p-2.5 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-600 shrink-0">
                <Fingerprint className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-navy-900 dark:text-white mb-1">
                  Protected System Routes
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Direct URL routing automatically verifies role capabilities, redirecting unauthorized navigations gracefully.
                </p>
              </div>
            </div>
          </div>

          {/* Academic Banner */}
          <div className="mt-8 p-4 rounded-xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder text-center">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Academic Prototype — Fictional Demo Data Only. Does not claim government accreditation or live police dispatch capabilities.
            </span>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 12: LEGAL REFERENCE
          ================================================== */}
      <section id="legal" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-igreen-600 dark:text-igreen-400">
              Regulatory Context
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 dark:text-white mt-2 mb-4">
              Legal Reference Framework
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Academic references to contemporary Indian criminal and digital data legislation guiding our design schemas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder shadow-subtle">
              <span className="text-[11px] font-bold text-saffron-600 dark:text-saffron-400 uppercase tracking-wider">
                Substantive Criminal Law
              </span>
              <h3 className="font-bold text-base text-navy-900 dark:text-white mt-1 mb-2">
                Bharatiya Nyaya Sanhita (BNS), 2023
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Modernized criminal code defining offenses such as cheating (Sec 318), theft (Sec 303), and forgery (Sec 336) reflected in demo FIRs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder shadow-subtle">
              <span className="text-[11px] font-bold text-chakra-600 dark:text-chakra-400 uppercase tracking-wider">
                Procedural Sanhita
              </span>
              <h3 className="font-bold text-base text-navy-900 dark:text-white mt-1 mb-2">
                Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Mandates electronic recording of search, seizure, and investigative timelines (Section 105), foundational to Trinetra’s audit logging.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder shadow-subtle">
              <span className="text-[11px] font-bold text-igreen-600 dark:text-igreen-400 uppercase tracking-wider">
                Privacy Architecture
              </span>
              <h3 className="font-bold text-base text-navy-900 dark:text-white mt-1 mb-2">
                Digital Personal Data Protection Act, 2023
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Encourages purpose limitation, minimal data collection, role segregation, and rigorous synthetic masking for software training.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder shadow-subtle">
              <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                Cyber Legislation
              </span>
              <h3 className="font-bold text-base text-navy-900 dark:text-white mt-1 mb-2">
                Information Technology Act, 2000
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Governs digital authentication, evidentiary validity of electronic records, and offenses relating to cyber tampering (Sec 66D).
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <span className="text-xs text-slate-400 italic">
              Educational reference only. This system does not provide legal advice, statutory counsel, or judicial interpretation.
            </span>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 13: FINAL CTA
          ================================================== */}
      <section className="py-20 bg-gradient-to-b from-slate-100 to-white dark:from-darkcard/50 dark:to-darkbg border-t border-slate-200 dark:border-darkborder transition-colors">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-navy-900 dark:text-white tracking-tight">
            Ready to Move from Manual Records to Smart Digital Management?
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Explore a connected, role-based approach to managing fictional records, cases, hearings and reports designed for academic demonstration.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-4 rounded-xl bg-navy-900 dark:bg-chakra-600 text-white font-semibold text-base shadow-lg hover:shadow-xl hover:bg-navy-800 dark:hover:bg-chakra-500 transition-all flex items-center gap-2 group"
            >
              <span>Explore Platform</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-4 rounded-xl border border-slate-300 dark:border-darkborder bg-white dark:bg-darkcard text-slate-800 dark:text-slate-200 font-semibold text-base hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              Sign In with Demo Roles
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
