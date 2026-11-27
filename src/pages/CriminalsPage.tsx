import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Badge } from '../components/common/Badge';
import {
  Search,
  Plus,
  Filter,
  ShieldAlert,
  User,
  ExternalLink,
  X,
  Fingerprint,
  Calendar,
  Briefcase,
  AlertTriangle,
  FileText
} from 'lucide-react';
import { CriminalRecord } from '../types';
import { useNavigate } from 'react-router-dom';

export const CriminalsPage: React.FC = () => {
  const { criminals, addCriminal, cases } = useData();
  const { canPerformAction } = useAuth();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedRecord, setSelectedRecord] = useState<CriminalRecord | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New demo criminal form state
  const [newDemoName, setNewDemoName] = useState('');
  const [newCategory, setNewCategory] = useState('Cyber & Financial Offense');
  const [newAge, setNewAge] = useState(30);
  const [newGender, setNewGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [newRelatedCase, setNewRelatedCase] = useState('CASE-101');
  const [newNotes, setNewNotes] = useState('');

  const filteredCriminals = criminals.filter((c) => {
    const matchesSearch =
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.demoName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateCriminal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDemoName.trim()) return;

    addCriminal({
      demoName: `${newDemoName} (Demo)`,
      age: Number(newAge),
      gender: newGender,
      category: newCategory,
      status: 'Under Investigation',
      relatedCaseIds: [newRelatedCase],
      notes: newNotes || 'Demo profile created for academic testing.',
      biometricRegistered: true,
      demoFingerprintHash: `SHA256:${Math.random().toString(36).substring(2, 8)}...${Math.random().toString(36).substring(2, 6)} (Simulated)`,
    });

    setShowAddModal(false);
    setNewDemoName('');
    setNewNotes('');
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-navy-900 dark:text-white">
              Criminal Records (Demo)
            </h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900/60">
              DEMO DATA ONLY
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Fictional demo profiles cataloged for academic evaluation. No real personal records.
          </p>
        </div>

        {canPerformAction('create') && (
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl bg-navy-900 dark:bg-chakra-600 text-white font-semibold text-xs shadow-md hover:bg-navy-800 dark:hover:bg-chakra-500 transition-colors flex items-center gap-2 self-start"
          >
            <Plus className="w-4 h-4" />
            <span>Add Demo Record</span>
          </button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="p-4 bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder rounded-2xl shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by ID, Demo Name, or Category..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-darkborder bg-slate-50 dark:bg-darkbg text-xs text-navy-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-chakra-500"
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
            <option value="Under Investigation">Under Investigation</option>
            <option value="In Custody">In Custody</option>
            <option value="On Bail">On Bail</option>
            <option value="Convicted">Convicted</option>
          </select>
        </div>
      </div>

      {/* Records Table */}
      <div className="bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder rounded-2xl shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-darkcard2 border-b border-slate-200 dark:border-darkborder text-slate-500 dark:text-slate-400 uppercase font-semibold text-[11px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Criminal ID</th>
                <th className="py-3 px-4">Demo Subject Name</th>
                <th className="py-3 px-4">Related Case ID</th>
                <th className="py-3 px-4">Offense Category</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Last Updated</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredCriminals.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No matching demo criminal records found.
                  </td>
                </tr>
              ) : (
                filteredCriminals.map((crim) => (
                  <tr
                    key={crim.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedRecord(crim)}
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-navy-900 dark:text-white">
                      {crim.id}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-slate-200">
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>{crim.demoName}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      {crim.relatedCaseIds.map((cid) => (
                        <span
                          key={cid}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/app/cases?selected=${cid}`);
                          }}
                          className="font-mono text-xs text-chakra-600 dark:text-chakra-400 hover:underline mr-1"
                        >
                          {cid}
                        </span>
                      ))}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                      {crim.category}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {crim.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                      {crim.lastUpdated}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRecord(crim);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-chakra-600 dark:text-chakra-400 hover:bg-chakra-50 dark:hover:bg-slate-700 font-medium transition-colors text-xs inline-flex items-center gap-1"
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

      {/* Record Details Modal / Drawer */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-4 border-b border-slate-200 dark:border-darkborder flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-navy-900 dark:text-white text-base">
                    {selectedRecord.demoName} ({selectedRecord.id})
                  </h3>
                  <p className="text-xs text-slate-500">Demo Criminal Profile Catalog</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-amber-800 dark:text-amber-300 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Synthetic profile for educational evaluation only. Not connected to real persons.</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Category</span>
                  <p className="font-semibold text-navy-900 dark:text-white mt-1">{selectedRecord.category}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Current Custody Status</span>
                  <p className="font-semibold text-navy-900 dark:text-white mt-1">{selectedRecord.status}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Age & Gender</span>
                  <p className="font-semibold text-navy-900 dark:text-white mt-1">{selectedRecord.age} Yrs • {selectedRecord.gender}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Last Recorded Audit</span>
                  <p className="font-semibold font-mono text-navy-900 dark:text-white mt-1">{selectedRecord.lastUpdated}</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1.5">
                  <Fingerprint className="w-3.5 h-3.5 text-chakra-500" />
                  <span>Simulated Biometric Hash Record</span>
                </span>
                <p className="font-mono text-xs text-slate-700 dark:text-slate-300 mt-1">
                  {selectedRecord.demoFingerprintHash}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Internal Case Notes</span>
                <p className="text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
                  {selectedRecord.notes}
                </p>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Associated Case Files</span>
                  <p className="font-mono text-sm font-bold text-chakra-600 dark:text-chakra-400 mt-0.5">
                    {selectedRecord.relatedCaseIds.join(', ')}
                  </p>
                </div>
                <button
                  onClick={() => {
                    const cid = selectedRecord.relatedCaseIds[0];
                    setSelectedRecord(null);
                    navigate(`/app/cases?selected=${cid}`);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-chakra-600 text-white font-medium hover:bg-chakra-700 transition-colors flex items-center gap-1 text-xs"
                >
                  <span>Open Case</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-darkborder flex justify-end">
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Demo Record Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-lg bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-darkborder flex items-center justify-between">
              <h3 className="font-bold text-navy-900 dark:text-white text-base">
                Catalog New Demo Criminal Profile
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCriminal} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Demo Subject Name (Fictional)
                </label>
                <input
                  type="text"
                  required
                  value={newDemoName}
                  onChange={(e) => setNewDemoName(e.target.value)}
                  placeholder="e.g. Demo Person G"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-darkborder bg-slate-50 dark:bg-darkbg text-navy-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-chakra-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Age</label>
                  <input
                    type="number"
                    min="18"
                    max="90"
                    value={newAge}
                    onChange={(e) => setNewAge(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-darkborder bg-slate-50 dark:bg-darkbg text-navy-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Gender</label>
                  <select
                    value={newGender}
                    onChange={(e) => setNewGender(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-darkborder bg-slate-50 dark:bg-darkbg text-navy-900 dark:text-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Offense Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-darkborder bg-slate-50 dark:bg-darkbg text-navy-900 dark:text-white"
                >
                  <option value="Cyber & Financial Offense">Cyber & Financial Offense</option>
                  <option value="Forgery & Falsification">Forgery & Falsification</option>
                  <option value="Interstate Freight Theft">Interstate Freight Theft</option>
                  <option value="Identity Spoofing & Phishing">Identity Spoofing & Phishing</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Link to Case ID</label>
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

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Investigative Notes</label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Synthetic record context..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-darkborder bg-slate-50 dark:bg-darkbg text-navy-900 dark:text-white"
                />
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
                  className="px-4 py-2 rounded-xl bg-chakra-600 text-white font-semibold hover:bg-chakra-700"
                >
                  Catalog Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
