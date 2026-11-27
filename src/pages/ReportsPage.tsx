import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import {
  BarChart3,
  TrendingUp,
  Download,
  Filter,
  Calendar,
  Briefcase,
  UserCheck,
  Landmark,
  ShieldCheck,
  FileSpreadsheet
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
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';

export const ReportsPage: React.FC = () => {
  const { cases, prisoners, hearings, auditLogs } = useData();
  const [selectedRange, setSelectedRange] = useState('Quarter 3 (Jul - Sep 2026)');

  // Metrics
  const totalCases = cases.length;
  const pendingCases = cases.filter((c) => c.status !== 'Closed').length;
  const closedCases = cases.filter((c) => c.status === 'Closed').length;
  const activePrisoners = prisoners.filter((p) => p.status === 'Active').length;
  const upcomingHearings = hearings.filter((h) => h.status === 'Scheduled').length;

  // Monthly Case Trends
  const monthlyTrendData = [
    { month: 'May 2026', cases: 1, resolved: 0 },
    { month: 'Jun 2026', cases: 2, resolved: 1 },
    { month: 'Jul 2026', cases: 3, resolved: 1 },
    { month: 'Aug 2026', cases: 4, resolved: 2 },
    { month: 'Sep 2026', cases: 5, resolved: 3 },
  ];

  // Cases by Category
  const categoryData = [
    { name: 'Cyber & Financial', count: 2, color: '#3B82F6' },
    { name: 'Freight Cargo', count: 1, color: '#8B5CF6' },
    { name: 'Counterfeit & Forgery', count: 1, color: '#F97316' },
    { name: 'Identity Phishing', count: 1, color: '#10B981' },
  ];

  // Hearing Status distribution
  const hearingPieData = [
    { name: 'Scheduled', value: hearings.filter((h) => h.status === 'Scheduled').length, color: '#3B82F6' },
    { name: 'Completed', value: hearings.filter((h) => h.status === 'Completed').length, color: '#10B981' },
    { name: 'Postponed', value: hearings.filter((h) => h.status === 'Postponed').length, color: '#F59E0B' },
  ];

  // Activity Overview by Module
  const moduleActivityData = [
    { name: 'Case', events: auditLogs.filter((l) => l.module === 'Case').length },
    { name: 'FIR', events: auditLogs.filter((l) => l.module === 'FIR').length },
    { name: 'Prisoner', events: auditLogs.filter((l) => l.module === 'Prisoner').length },
    { name: 'Hearing', events: auditLogs.filter((l) => l.module === 'Hearing').length },
    { name: 'User/System', events: auditLogs.filter((l) => l.module === 'User' || l.module === 'System').length },
  ];

  const handleExport = () => {
    alert('Academic Demo: Synthetic analytical report exported to CSV / PDF format.');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-navy-900 dark:text-white">
              Reports & Digital Governance Analytics
            </h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-900/60">
              AGGREGATED METRICS
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Fictional trend analytics across cases, courtroom hearings, correctional remands, and activity logs.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start">
          <select
            value={selectedRange}
            onChange={(e) => setSelectedRange(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-darkborder bg-white dark:bg-darkcard text-xs text-navy-900 dark:text-white font-medium"
          >
            <option value="Quarter 3 (Jul - Sep 2026)">Q3 (Jul - Sep 2026)</option>
            <option value="Year to Date 2026">Year to Date 2026</option>
            <option value="All Time Baseline">All Time Baseline</option>
          </select>
          <button
            onClick={handleExport}
            className="px-4 py-2 rounded-xl bg-navy-900 dark:bg-chakra-600 text-white font-semibold text-xs shadow-md transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Summary Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder shadow-subtle">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Cases</p>
          <h3 className="text-2xl font-extrabold text-navy-900 dark:text-white mt-1">{totalCases}</h3>
          <span className="text-[10px] text-chakra-600 font-semibold mt-1 block">Indexed Files</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder shadow-subtle">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Pending Inquests</p>
          <h3 className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">{pendingCases}</h3>
          <span className="text-[10px] text-amber-600 font-semibold mt-1 block">Active In Progress</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder shadow-subtle">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Closed Inquiries</p>
          <h3 className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">{closedCases}</h3>
          <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">Disposed Files</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder shadow-subtle">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Active Inmates</p>
          <h3 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">{activePrisoners}</h3>
          <span className="text-[10px] text-blue-600 font-semibold mt-1 block">Remand Custody</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder shadow-subtle">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Scheduled Hearings</p>
          <h3 className="text-2xl font-extrabold text-saffron-600 dark:text-saffron-400 mt-1">{upcomingHearings}</h3>
          <span className="text-[10px] text-saffron-600 font-semibold mt-1 block">Judicial Dockets</span>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Monthly Case Trend Line Chart */}
        <div className="lg:col-span-8 bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder rounded-2xl p-5 shadow-subtle">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-navy-900 dark:text-white text-base">
                Monthly Case Influx & Resolution Trend
              </h3>
              <p className="text-xs text-slate-500">
                5-month historical trajectory of registered vs completed cases
              </p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              Aggregated
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrendData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
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
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Line type="monotone" dataKey="cases" name="Registered Cases" stroke="#2563EB" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="resolved" name="Resolved / Disposed" stroke="#10B981" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Hearings Status Pie Chart */}
        <div className="lg:col-span-4 bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder rounded-2xl p-5 shadow-subtle flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-navy-900 dark:text-white text-base mb-1">
              Court Hearing Outcomes
            </h3>
            <p className="text-xs text-slate-500">
              Distribution across docket statuses
            </p>
          </div>

          <div className="h-52 w-full flex items-center justify-center my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={hearingPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {hearingPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    color: '#FFF',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-1 pt-2 border-t border-slate-100 dark:border-slate-800 text-center text-xs">
            {hearingPieData.map((item) => (
              <div key={item.name}>
                <span className="text-[10px] text-slate-400 block">{item.name}</span>
                <span className="font-bold text-navy-900 dark:text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Second Row: Cases by Category & Audit Activity by Module */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder rounded-2xl p-5 shadow-subtle">
          <h3 className="font-bold text-navy-900 dark:text-white text-base mb-1">
            Cases by Offense Category
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Categorization across economic, forgery, and digital crimes
          </p>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical" margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={120} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    color: '#FFF',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder rounded-2xl p-5 shadow-subtle">
          <h3 className="font-bold text-navy-900 dark:text-white text-base mb-1">
            System Operations by Module
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Audit frequency across Case, FIR, Prisoner, and Court modules
          </p>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={moduleActivityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                <Bar dataKey="events" fill="#4F46E5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
