import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import {
  UserCheck,
  Search,
  Filter,
  Plus,
  ExternalLink,
  X,
  Clock,
  Calendar,
  AlertTriangle,
  Building,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { PrisonerRecord } from '../types';
import { useNavigate } from 'react-router-dom';

export const PrisonersPage: React.FC = () => {
  const { prisoners, addPrisoner, updatePrisonerStatus, cases } = useData();
  const { canPerformAction } = useAuth();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedPrisoner, setSelectedPrisoner] = useState<PrisonerRecord | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New prisoner form
  const [newDemoName, setNewDemoName] = useState('');
  const [newRelatedCase, setNewRelatedCase] = useState('CASE-101');
  const [newFacility, setNewFacility] = useState('Central Correctional Facility • Ward 3');
  const [newCellBlock, setNewCellBlock] = useState('Block C-05');
  const [newSecurity, setNewSecurity] = useState<'Minimum' | 'Medium' | 'Maximum'>('Medium');
  const [newReleaseDate, setNewReleaseDate] = useState('2026-11-20');

  const filteredPrisoners = prisoners.filter((p) => {
    const matchesSearch =
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.demoName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.assignedFacility.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.relatedCaseId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreatePrisoner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDemoName.trim()) return;

    const now = new Date().toISOString().split('T')[0];
    addPrisoner({
      demoName: `${newDemoName} (Demo)`,
      relatedCaseId: newRelatedCase,
      admissionDate: now,
      expectedReleaseDate: newReleaseDate,
      status: 'Active',
      assignedFacility: newFacility,
      cellBlock: newCellBlock,
      securityLevel: newSecurity,
      behaviorScore: 'Good',
      paroleEligible: true,
    });

    setShowAddModal(false);
    setNewDemoName('');
  };

  const handleStatusChange = (newStatus: PrisonerRecord['status']) => {
    if (!selectedPrisoner) return;
    updatePrisonerStatus(selectedPrisoner.id, newStatus);
    setSelectedPrisoner((prev) => prev ? { ...prev, status: newStatus } : null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-navy-900 dark:text-white">
              Prisoner Custody & Remand Management
            </h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              CORRECTIONAL WING
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Supervise inmate facility assignments, behavioral evaluations, and release reminders.
          </p>
        </div>

        {canPerformAction('create') && (
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-md transition-colors flex items-center gap-2 self-start"
          >
            <Plus className="w-4 h-4" />
            <span>Admit Demo Inmate</span>
          </button>
        )}
      </div>

      {/* Release Reminder Banner */}
      <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-800 dark:text-amber-300 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Clock className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <span>
            <strong>Upcoming Release Alert:</strong> Inmate <strong>Demo Person B (PR-008)</strong> reaches end of judicial remand sentence on <strong>2026-10-15</strong>.
          </span>
        </div>
        <button
          onClick={() => {
            const pr = prisoners.find((p) => p.id === 'PR-008');
            if (pr) setSelectedPrisoner(pr);
          }}
          className="px-2.5 py-1 rounded-lg bg-amber-200 dark:bg-amber-900/60 font-semibold text-[11px] text-amber-900 dark:text-amber-200 hover:bg-amber-300 transition-colors shrink-0"
        >
          Review File
        </button>
      </div>

      {/* Filter and Search */}
      <div className="p-4 bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder rounded-2xl shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Prisoner ID, name, facility..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-darkborder bg-slate-50 dark:bg-darkbg text-xs text-navy-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-500 font-medium">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-darkborder bg-slate-50 dark:bg-darkbg text-xs text-slate-700 dark:text-slate-200 focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Released">Released</option>
            <option value="Transferred">Transferred</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder rounded-2xl shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-darkcard2 border-b border-slate-200 dark:border-darkborder text-slate-500 dark:text-slate-400 uppercase font-semibold text-[11px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Prisoner ID</th>
                <th className="py-3 px-4">Demo Inmate Name</th>
                <th className="py-3 px-4">Related Case ID</th>
                <th className="py-3 px-4">Admission Date</th>
                <th className="py-3 px-4">Expected Release</th>
                <th className="py-3 px-4">Assigned Facility</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredPrisoners.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No matching prisoner custody records found.
                  </td>
                </tr>
              ) : (
                filteredPrisoners.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedPrisoner(p)}
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-navy-900 dark:text-white">
                      {p.id}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-slate-200">
                      {p.demoName}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/app/cases?selected=${p.relatedCaseId}`);
                        }}
                        className="font-mono text-xs text-chakra-600 dark:text-chakra-400 hover:underline"
                      >
                        {p.relatedCaseId}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-500 text-[11px]">
                      {p.admissionDate}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-700 dark:text-slate-300 font-semibold text-[11px]">
                      {p.expectedReleaseDate}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                      {p.assignedFacility} ({p.cellBlock})
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${
                          p.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300'
                            : p.status === 'Released'
                            ? 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300'
                            : 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300'
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPrisoner(p);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-chakra-600 dark:text-chakra-400 hover:bg-chakra-50 font-medium text-xs inline-flex items-center gap-1"
                      >
                        <span>View</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Prisoner Details Modal */}
      {selectedPrisoner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-4 border-b border-slate-200 dark:border-darkborder flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-navy-900 dark:text-white text-base">
                    {selectedPrisoner.demoName} ({selectedPrisoner.id})
                  </h3>
                  <p className="text-xs text-slate-500">Judicial Remand Inmate File</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedPrisoner(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 text-xs">
              {canPerformAction('update') && (
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <span className="font-bold text-navy-900 dark:text-white">Inmate Custody Status:</span>
                  <select
                    value={selectedPrisoner.status}
                    onChange={(e) => handleStatusChange(e.target.value as PrisonerRecord['status'])}
                    className="px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-darkcard font-semibold text-emerald-600"
                  >
                    <option value="Active">Active Remand</option>
                    <option value="Released">Released</option>
                    <option value="Transferred">Transferred</option>
                    <option value="Pending">Pending Assessment</option>
                  </select>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Assigned Facility</span>
                  <p className="font-semibold text-navy-900 dark:text-white mt-1">{selectedPrisoner.assignedFacility}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Cell Allocation</span>
                  <p className="font-semibold text-navy-900 dark:text-white mt-1">{selectedPrisoner.cellBlock}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Security Classification</span>
                  <p className="font-semibold text-navy-900 dark:text-white mt-1">{selectedPrisoner.securityLevel} Security</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Behavior Rating</span>
                  <p className="font-semibold text-navy-900 dark:text-white mt-1">{selectedPrisoner.behaviorScore}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Admission Date</span>
                  <p className="font-semibold font-mono text-navy-900 dark:text-white mt-1">{selectedPrisoner.admissionDate}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Expected Release Date</span>
                  <p className="font-semibold font-mono text-amber-600 dark:text-amber-400 mt-1">{selectedPrisoner.expectedReleaseDate}</p>
                </div>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Linked Judicial Case</span>
                  <p className="font-mono text-sm font-bold text-chakra-600 dark:text-chakra-400 mt-0.5">
                    {selectedPrisoner.relatedCaseId}
                  </p>
                </div>
                <button
                  onClick={() => {
                    const cid = selectedPrisoner.relatedCaseId;
                    setSelectedPrisoner(null);
                    navigate(`/app/cases?selected=${cid}`);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-chakra-600 text-white font-medium hover:bg-chakra-700 transition-colors flex items-center gap-1 text-xs"
                >
                  <span>Open Case File</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-darkborder flex justify-end">
              <button
                onClick={() => setSelectedPrisoner(null)}
                className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admit Prisoner Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-lg bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-darkborder flex items-center justify-between">
              <h3 className="font-bold text-navy-900 dark:text-white text-base">
                Admit Demo Inmate to Remand Facility
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePrisoner} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Demo Inmate Name
                </label>
                <input
                  type="text"
                  required
                  value={newDemoName}
                  onChange={(e) => setNewDemoName(e.target.value)}
                  placeholder="e.g. Demo Inmate J"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-darkborder bg-slate-50 dark:bg-darkbg text-navy-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Linked Case ID</label>
                <select
                  value={newRelatedCase}
                  onChange={(e) => setNewRelatedCase(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-darkborder bg-slate-50 dark:bg-darkbg text-navy-900 dark:text-white font-mono"
                >
                  {cases.map((c) => (
                    <option key={c.id} value={c.id}>{c.id} - {c.title}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Facility Complex</label>
                  <input
                    type="text"
                    value={newFacility}
                    onChange={(e) => setNewFacility(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-darkborder bg-slate-50 dark:bg-darkbg text-navy-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Cell Block</label>
                  <input
                    type="text"
                    value={newCellBlock}
                    onChange={(e) => setNewCellBlock(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-darkborder bg-slate-50 dark:bg-darkbg text-navy-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Security Level</label>
                  <select
                    value={newSecurity}
                    onChange={(e) => setNewSecurity(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-darkborder bg-slate-50 dark:bg-darkbg text-navy-900 dark:text-white"
                  >
                    <option value="Minimum">Minimum</option>
                    <option value="Medium">Medium</option>
                    <option value="Maximum">Maximum</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Expected Release Date</label>
                  <input
                    type="date"
                    value={newReleaseDate}
                    onChange={(e) => setNewReleaseDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-darkborder bg-slate-50 dark:bg-darkbg text-navy-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700"
                >
                  Admit Inmate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
