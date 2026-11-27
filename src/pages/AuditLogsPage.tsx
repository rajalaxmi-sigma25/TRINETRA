import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import {
  History,
  Search,
  Filter,
  Shield,
  Download,
  Calendar,
  LayoutList,
  Clock,
  ExternalLink,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { AuditLogItem } from '../types';
import { useNavigate } from 'react-router-dom';

export const AuditLogsPage: React.FC = () => {
  const { auditLogs } = useData();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [moduleFilter, setModuleFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'table' | 'timeline'>('table');

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.relatedRecord.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.details && log.details.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesRole = roleFilter === 'All' || log.role === roleFilter;
    const matchesModule = moduleFilter === 'All' || log.module === moduleFilter;
    return matchesSearch && matchesRole && matchesModule;
  });

  const getActionColor = (action: string) => {
    switch (action) {
      case 'Created':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'Updated':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'Status Changed':
        return 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      case 'Deleted':
        return 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  const handleExport = () => {
    alert('Academic Demo: Exported tamper-evident immutable audit log digest.');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-navy-900 dark:text-white">
              System Audit Logs & Governance Trail
            </h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-900/60">
              IMMUTABLE RECORD
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Compliant with Section 105 BNSS electronic logging standards. Every record mutation is timestamped.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start">
          <button
            onClick={handleExport}
            className="px-4 py-2 rounded-xl bg-navy-900 dark:bg-chakra-600 text-white font-semibold text-xs shadow-md transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Trail</span>
          </button>
        </div>
      </div>

      {/* Filter and View Mode Toolbar */}
      <div className="p-4 bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder rounded-2xl shadow-subtle flex flex-col lg:flex-row items-center justify-between gap-3">
        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search user, record ID, or action..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-darkborder bg-slate-50 dark:bg-darkbg text-xs text-navy-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-chakra-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-medium">Role:</span>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-darkborder bg-slate-50 dark:bg-darkbg text-xs text-slate-700 dark:text-slate-200 focus:outline-none"
            >
              <option value="All">All Roles</option>
              <option value="Police Officer">Police Officer</option>
              <option value="CBI Officer">CBI Officer</option>
              <option value="Jailer">Jailer</option>
              <option value="Court User">Court User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-medium">Module:</span>
            <select
              value={moduleFilter}
              onChange={(e) => setModuleFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-darkborder bg-slate-50 dark:bg-darkbg text-xs text-slate-700 dark:text-slate-200 focus:outline-none"
            >
              <option value="All">All Modules</option>
              <option value="Case">Case</option>
              <option value="FIR">FIR</option>
              <option value="Criminal">Criminal</option>
              <option value="Prisoner">Prisoner</option>
              <option value="Court">Court</option>
              <option value="Hearing">Hearing</option>
              <option value="User">User</option>
            </select>
          </div>

          <div className="flex items-center bg-slate-100 dark:bg-darkcard border border-slate-200 dark:border-darkborder p-1 rounded-xl">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-slate-800 text-navy-900 dark:text-white shadow-xs'
                  : 'text-slate-500'
              }`}
            >
              <LayoutList className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                viewMode === 'timeline'
                  ? 'bg-white dark:bg-slate-800 text-navy-900 dark:text-white shadow-xs'
                  : 'text-slate-500'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Timeline</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main View: Table vs Timeline */}
      {viewMode === 'table' ? (
        <div className="bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder rounded-2xl shadow-subtle overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-darkcard2 border-b border-slate-200 dark:border-darkborder text-slate-500 dark:text-slate-400 uppercase font-semibold text-[11px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Timestamp (UTC+5:30)</th>
                  <th className="py-3 px-4">Authorized User</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4">Related Record</th>
                  <th className="py-3 px-4">Module</th>
                  <th className="py-3 px-4">Operation Details</th>
                  <th className="py-3 px-4">IP Origin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400">
                      No matching audit log entries found.
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="py-3 px-4 font-mono text-slate-500 text-[11px] whitespace-nowrap">
                        {log.timestamp}
                      </td>
                      <td className="py-3 px-4 font-semibold text-navy-900 dark:text-white">
                        {log.user}
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-slate-600 dark:text-slate-300 font-medium">
                          {log.role}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getActionColor(log.action)}`}>
                          {log.action}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-chakra-600 dark:text-chakra-400">
                        {log.relatedRecord}
                      </td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                        {log.module}
                      </td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400 max-w-xs truncate">
                        {log.details}
                      </td>
                      <td className="py-3 px-4 font-mono text-[10px] text-slate-400">
                        {log.ipAddress}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Timeline View */
        <div className="bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder rounded-2xl p-6 shadow-subtle">
          <div className="relative border-l-2 border-slate-200 dark:border-slate-700 ml-4 space-y-6 py-2">
            {filteredLogs.map((log) => (
              <div key={log.id} className="relative pl-6">
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-chakra-500 border-2 border-white dark:border-darkcard" />
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-darkcard2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-navy-900 dark:text-white">
                        {log.user} ({log.role})
                      </span>
                      <span className={`px-2 py-0.2 rounded-full text-[10px] font-semibold border ${getActionColor(log.action)}`}>
                        {log.action}
                      </span>
                      <span className="font-mono text-xs font-bold text-chakra-600 dark:text-chakra-400">
                        {log.relatedRecord}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      {log.details}
                    </p>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono shrink-0">
                    {log.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
