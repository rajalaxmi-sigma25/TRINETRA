import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { SmartAlertsWidget } from '../components/common/SmartAlertsWidget';
import { Badge } from '../components/common/Badge';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Briefcase,
  UserCheck,
  Landmark,
  Calendar,
  ShieldAlert,
  Clock,
  ArrowUpRight,
  TrendingUp,
  AlertCircle,
  Users,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export const DashboardPage: React.FC = () => {
  const { currentRole, currentUser } = useAuth();
  const { cases, firs, criminals, prisoners, courtCases, hearings, documents, auditLogs, users } = useData();
  const navigate = useNavigate();

  // Dynamic statistics calculations
  const totalCases = cases.length;
  const pendingCases = cases.filter((c) => c.status !== 'Closed').length;
  const closedCases = cases.filter((c) => c.status === 'Closed').length;
  const totalFirs = firs.length;

  const activePrisoners = prisoners.filter((p) => p.status === 'Active').length;
  const upcomingReleases = prisoners.filter((p) => p.status === 'Active' && p.expectedReleaseDate.startsWith('2026-10')).length;

  const upcomingHearings = hearings.filter((h) => h.status === 'Scheduled').length;
  const pendingDocs = documents.filter((d) => d.verificationStatus === 'Pending').length;

  // Chart data: Cases by Status
  const statusCounts = [
    { name: 'Registered', count: cases.filter((c) => c.status === 'Registered').length, color: '#3B82F6' },
    { name: 'Investigation', count: cases.filter((c) => c.status === 'Investigation').length, color: '#F59E0B' },
    { name: 'Review', count: cases.filter((c) => c.status === 'Review').length, color: '#8B5CF6' },
    { name: 'Court Process', count: cases.filter((c) => c.status === 'Court Process').length, color: '#F97316' },
    { name: 'Closed', count: cases.filter((c) => c.status === 'Closed').length, color: '#10B981' },
  ];

  // Hearing Status distribution
  const hearingStatusData = [
    { name: 'Scheduled', value: hearings.filter((h) => h.status === 'Scheduled').length, color: '#3B82F6' },
    { name: 'Completed', value: hearings.filter((h) => h.status === 'Completed').length, color: '#10B981' },
    { name: 'Postponed', value: hearings.filter((h) => h.status === 'Postponed').length, color: '#F59E0B' },
  ];

  // Inmate facility data
  const prisonerStatusData = [
    { name: 'Active Remand', value: prisoners.filter((p) => p.status === 'Active').length, color: '#10B981' },
    { name: 'Released', value: prisoners.filter((p) => p.status === 'Released').length, color: '#64748B' },
    { name: 'Transferred', value: prisoners.filter((p) => p.status === 'Transferred').length, color: '#3B82F6' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-navy-950 via-navy-900 to-slate-900 text-white shadow-xl relative overflow-hidden">
        {/* Subtle tricolor ambient accents */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-saffron-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-igreen-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/10 text-saffron-300 border border-white/10">
                {currentRole === 'police' && 'Police Officer Perspective'}
                {currentRole === 'cbi' && 'CBI Officer Perspective'}
                {currentRole === 'jailer' && 'Jailer Perspective'}
                {currentRole === 'court' && 'Court User Perspective'}
                {currentRole === 'admin' && 'System Administrator Console'}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {currentUser?.badgeNumber}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, {currentUser?.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              {currentUser?.department} • All activities digitally notarized in audit logs.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/app/cases')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-colors border border-white/10 flex items-center gap-1.5"
            >
              <span>Explore Cases</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            {currentRole === 'police' && (
              <button
                onClick={() => navigate('/app/firs?action=new')}
                className="px-4 py-2.5 rounded-xl bg-saffron-500 hover:bg-saffron-600 text-white font-semibold text-xs transition-colors shadow-md flex items-center gap-1.5"
              >
                <span>+ Register Demo FIR</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ==========================================
          ROLE-SPECIFIC TOP METRIC CARDS
          ========================================== */}
      {currentRole === 'police' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder shadow-subtle flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Cases</p>
              <h3 className="text-3xl font-extrabold text-navy-900 dark:text-white mt-1">{totalCases}</h3>
              <span className="text-[11px] text-igreen-600 dark:text-igreen-400 font-medium flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" /> Fictional Records
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600">
              <Briefcase className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder shadow-subtle flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Pending Cases</p>
              <h3 className="text-3xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">{pendingCases}</h3>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">Active Inquests</span>
            </div>
            <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder shadow-subtle flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Closed Cases</p>
              <h3 className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">{closedCases}</h3>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">Formally Disposed</span>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder shadow-subtle flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total FIRs</p>
              <h3 className="text-3xl font-extrabold text-saffron-600 dark:text-saffron-400 mt-1">{totalFirs}</h3>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">First Info Reports</span>
            </div>
            <div className="p-3 rounded-2xl bg-saffron-50 dark:bg-saffron-950/60 text-saffron-600">
              <FileText className="w-6 h-6" />
            </div>
          </div>
        </div>
      )}

      {currentRole === 'cbi' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder shadow-subtle flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Assigned Special Cases</p>
              <h3 className="text-3xl font-extrabold text-navy-900 dark:text-white mt-1">
                {cases.filter((c) => c.assignedAgency === 'CBI').length}
              </h3>
              <span className="text-[11px] text-chakra-600 dark:text-chakra-400 font-medium">Federal Priority</span>
            </div>
            <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600">
              <Briefcase className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder shadow-subtle flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Active Investigations</p>
              <h3 className="text-3xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">
                {cases.filter((c) => c.assignedAgency === 'CBI' && c.status === 'Investigation').length}
              </h3>
              <span className="text-[11px] text-slate-500 mt-1 block">In Progress</span>
            </div>
            <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder shadow-subtle flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Completed Inquiries</p>
              <h3 className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                {cases.filter((c) => c.assignedAgency === 'CBI' && c.status === 'Closed').length}
              </h3>
              <span className="text-[11px] text-slate-500 mt-1 block">Final Closure Logged</span>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder shadow-subtle flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Pending Updates</p>
              <h3 className="text-3xl font-extrabold text-saffron-600 dark:text-saffron-400 mt-1">1</h3>
              <span className="text-[11px] text-slate-500 mt-1 block">Seizure protocol verification</span>
            </div>
            <div className="p-3 rounded-2xl bg-saffron-50 dark:bg-saffron-950/60 text-saffron-600">
              <AlertCircle className="w-6 h-6" />
            </div>
          </div>
        </div>
      )}

      {currentRole === 'jailer' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder shadow-subtle flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Active Inmates</p>
              <h3 className="text-3xl font-extrabold text-navy-900 dark:text-white mt-1">{activePrisoners}</h3>
              <span className="text-[11px] text-emerald-600 font-medium">Under Remand Custody</span>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600">
              <UserCheck className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder shadow-subtle flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">New Admissions (30d)</p>
              <h3 className="text-3xl font-extrabold text-chakra-600 dark:text-chakra-400 mt-1">2</h3>
              <span className="text-[11px] text-slate-500 mt-1 block">Formal Inmate Intake</span>
            </div>
            <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder shadow-subtle flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Upcoming Releases</p>
              <h3 className="text-3xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">{upcomingReleases}</h3>
              <span className="text-[11px] text-amber-600 font-medium">Within Next 30 Days</span>
            </div>
            <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600">
              <Calendar className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder shadow-subtle flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Facility Score</p>
              <h3 className="text-3xl font-extrabold text-igreen-600 dark:text-igreen-400 mt-1">98%</h3>
              <span className="text-[11px] text-slate-500 mt-1 block">Conduct Norms Compliant</span>
            </div>
            <div className="p-3 rounded-2xl bg-green-50 dark:bg-green-950/60 text-green-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>
        </div>
      )}

      {currentRole === 'court' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder shadow-subtle flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Court Cases</p>
              <h3 className="text-3xl font-extrabold text-navy-900 dark:text-white mt-1">{courtCases.length}</h3>
              <span className="text-[11px] text-indigo-600 font-medium">Active Registry Dockets</span>
            </div>
            <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600">
              <Landmark className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder shadow-subtle flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Upcoming Hearings</p>
              <h3 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">{upcomingHearings}</h3>
              <span className="text-[11px] text-blue-600 font-medium">Next: HEAR-001 (Sep 30)</span>
            </div>
            <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600">
              <Calendar className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder shadow-subtle flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Pending Documents</p>
              <h3 className="text-3xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">{pendingDocs}</h3>
              <span className="text-[11px] text-amber-600 font-medium">Awaiting Registry Check</span>
            </div>
            <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600">
              <FileText className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder shadow-subtle flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Court Stages</p>
              <h3 className="text-3xl font-extrabold text-saffron-600 dark:text-saffron-400 mt-1">2</h3>
              <span className="text-[11px] text-slate-500 mt-1 block">Charges / Evidence</span>
            </div>
            <div className="p-3 rounded-2xl bg-saffron-50 dark:bg-saffron-950/60 text-saffron-600">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </div>
      )}

      {currentRole === 'admin' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder shadow-subtle flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Users</p>
              <h3 className="text-3xl font-extrabold text-navy-900 dark:text-white mt-1">{users.length}</h3>
              <span className="text-[11px] text-purple-600 font-medium">Provisioned Roles</span>
            </div>
            <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder shadow-subtle flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Active Sessions</p>
              <h3 className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                {users.filter((u) => u.active).length}
              </h3>
              <span className="text-[11px] text-emerald-600 font-medium">100% Identity Verified</span>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder shadow-subtle flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Records</p>
              <h3 className="text-3xl font-extrabold text-chakra-600 dark:text-chakra-400 mt-1">
                {cases.length + firs.length + criminals.length + prisoners.length + courtCases.length}
              </h3>
              <span className="text-[11px] text-slate-500 mt-1 block">In Relational Graph</span>
            </div>
            <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600">
              <Briefcase className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder shadow-subtle flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Audit Events</p>
              <h3 className="text-3xl font-extrabold text-rose-600 dark:text-rose-400 mt-1">{auditLogs.length}</h3>
              <span className="text-[11px] text-slate-500 mt-1 block">Immutable Trail</span>
            </div>
            <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          MIDDLE ROW: CHARTS & SMART ALERTS
          ========================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Chart / Widget Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder rounded-2xl p-5 shadow-subtle">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-navy-900 dark:text-white text-base">
                  Case Status Distribution
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Progression across digital case lifecycle stages
                </p>
              </div>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {cases.length} Total
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusCounts} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0F172A',
                      borderColor: '#334155',
                      borderRadius: '8px',
                      color: '#FFF',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {statusCounts.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Records Activity Stream */}
          <div className="bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder rounded-2xl p-5 shadow-subtle">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-navy-900 dark:text-white text-base">
                  Recent Station Activities
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Real-time mutations logged across authorized modules
                </p>
              </div>
              <button
                onClick={() => navigate('/app/audit')}
                className="text-xs font-semibold text-chakra-600 dark:text-chakra-400 hover:underline flex items-center gap-1"
              >
                <span>Full Audit</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {auditLogs.slice(0, 4).map((log) => (
                <div key={log.id} className="py-3 flex items-start justify-between gap-3 text-xs">
                  <div className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-chakra-500 shrink-0 mt-1.5" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-navy-900 dark:text-white">
                          {log.user}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">
                          {log.role}
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 mt-0.5">
                        {log.details || `${log.action} on ${log.relatedRecord}`}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-400 shrink-0 font-mono">
                    {log.timestamp.substring(11, 16)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Smart Alerts Widget */}
        <div className="lg:col-span-5 space-y-6">
          <SmartAlertsWidget />

          {/* Quick Module Navigation Box */}
          <div className="p-5 rounded-2xl bg-slate-100/70 dark:bg-darkcard2 border border-slate-200 dark:border-darkborder space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Quick Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => navigate('/app/cases')}
                className="p-3 rounded-xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder text-left hover:border-chakra-400 transition-colors group"
              >
                <span className="font-bold text-navy-900 dark:text-white block group-hover:text-chakra-600">Cases</span>
                <span className="text-[11px] text-slate-500">View & track files</span>
              </button>
              <button
                onClick={() => navigate('/app/court?tab=hearings')}
                className="p-3 rounded-xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder text-left hover:border-chakra-400 transition-colors group"
              >
                <span className="font-bold text-navy-900 dark:text-white block group-hover:text-chakra-600">Hearings</span>
                <span className="text-[11px] text-slate-500">Check courtroom slots</span>
              </button>
              <button
                onClick={() => navigate('/app/reports')}
                className="p-3 rounded-xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder text-left hover:border-chakra-400 transition-colors group"
              >
                <span className="font-bold text-navy-900 dark:text-white block group-hover:text-chakra-600">Reports</span>
                <span className="text-[11px] text-slate-500">Statistical metrics</span>
              </button>
              <button
                onClick={() => navigate('/app/legal')}
                className="p-3 rounded-xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder text-left hover:border-chakra-400 transition-colors group"
              >
                <span className="font-bold text-navy-900 dark:text-white block group-hover:text-chakra-600">Legal BNS</span>
                <span className="text-[11px] text-slate-500">Statutory references</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
