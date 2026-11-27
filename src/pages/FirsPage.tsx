import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import {
  FileText,
  Plus,
  Search,
  Filter,
  ExternalLink,
  X,
  Briefcase,
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { FIRRecord } from '../types';
import { useNavigate } from 'react-router-dom';

export const FirsPage: React.FC = () => {
  const { firs, addFir, cases } = useData();
  const { canPerformAction, currentUser } = useAuth();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedFir, setSelectedFir] = useState<FIRRecord | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New FIR form state
  const [complainant, setComplainant] = useState('');
  const [accusedDemoName, setAccusedDemoName] = useState('');
  const [category, setCategory] = useState('Cyber Fraud & Embezzlement');
  const [incidentLocation, setIncidentLocation] = useState('Cyber City Division (Fictional)');
  const [sectionCode, setSectionCode] = useState('BNS-318 (Cheating), IT-66D');
  const [summary, setSummary] = useState('');

  const filteredFirs = firs.filter((f) => {
    const matchesSearch =
      f.firNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.complainant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.accusedDemoName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || f.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleRegisterFir = (e: React.FormEvent) => {
    e.preventDefault();
    if (!complainant.trim() || !accusedDemoName.trim() || !summary.trim()) return;

    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    addFir({
      firNumber: '',
      date: dateStr,
      time: timeStr,
      category,
      complainant: `${complainant} (Demo)`,
      accusedDemoName: `${accusedDemoName} (Demo)`,
      incidentLocation,
      assignedOfficer: currentUser?.name || 'Inspector Vikram Singh (Demo)',
      status: 'Registered',
      summary,
      sectionCode,
    });

    setShowAddModal(false);
    setComplainant('');
    setAccusedDemoName('');
    setSummary('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-navy-900 dark:text-white">
              FIR Management
            </h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-saffron-100 dark:bg-saffron-950/60 text-saffron-800 dark:text-saffron-300 border border-saffron-200 dark:border-saffron-800">
              FIRST INFORMATION REPORTS
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Register and manage standardized First Information Reports linking to investigative cases.
          </p>
        </div>

        {canPerformAction('create') && (
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl bg-saffron-500 hover:bg-saffron-600 text-white font-semibold text-xs shadow-md transition-colors flex items-center gap-2 self-start"
          >
            <Plus className="w-4 h-4" />
            <span>Register New FIR</span>
          </button>
        )}
      </div>

      {/* Filter and Search */}
      <div className="p-4 bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder rounded-2xl shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FIR number, complainant, accused..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-darkborder bg-slate-50 dark:bg-darkbg text-xs text-navy-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-saffron-500"
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
            <option value="Registered">Registered</option>
            <option value="Under Investigation">Under Investigation</option>
            <option value="Chargesheet Filed">Chargesheet Filed</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder rounded-2xl shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-darkcard2 border-b border-slate-200 dark:border-darkborder text-slate-500 dark:text-slate-400 uppercase font-semibold text-[11px] tracking-wider">
              <tr>
                <th className="py-3 px-4">FIR Number</th>
                <th className="py-3 px-4">Related Case</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Accused Subject</th>
                <th className="py-3 px-4">Assigned Officer</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredFirs.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No matching FIR records found.
                  </td>
                </tr>
              ) : (
                filteredFirs.map((fir) => (
                  <tr
                    key={fir.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedFir(fir)}
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-navy-900 dark:text-white">
                      {fir.firNumber}
                    </td>
                    <td className="py-3.5 px-4">
                      {fir.relatedCaseId ? (
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/app/cases?selected=${fir.relatedCaseId}`);
                          }}
                          className="font-mono text-xs text-chakra-600 dark:text-chakra-400 hover:underline"
                        >
                          {fir.relatedCaseId}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic">Unlinked</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 font-mono text-[11px]">
                      {fir.date} {fir.time}
                    </td>
                    <td className="py-3.5 px-4 text-slate-800 dark:text-slate-200 font-medium">
                      {fir.category}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                      {fir.accusedDemoName}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {fir.assignedOfficer}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-saffron-50 text-saffron-700 dark:bg-saffron-950/60 dark:text-saffron-300 border border-saffron-200 dark:border-saffron-800">
                        {fir.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFir(fir);
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

      {/* FIR Detail Modal */}
      {selectedFir && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-2xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-4 border-b border-slate-200 dark:border-darkborder flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-saffron-100 dark:bg-saffron-950 text-saffron-700">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-navy-900 dark:text-white text-base">
                    {selectedFir.firNumber} - {selectedFir.category}
                  </h3>
                  <p className="text-xs text-slate-500">First Information Report Record</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedFir(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Complainant</span>
                  <p className="font-semibold text-navy-900 dark:text-white mt-1">{selectedFir.complainant}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Accused Demo Subject</span>
                  <p className="font-semibold text-navy-900 dark:text-white mt-1">{selectedFir.accusedDemoName}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Statutory Sections</span>
                  <p className="font-semibold font-mono text-navy-900 dark:text-white mt-1">{selectedFir.sectionCode}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Incident Location</span>
                  <p className="font-semibold text-navy-900 dark:text-white mt-1">{selectedFir.incidentLocation}</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold">FIR Allegation Summary</span>
                <p className="text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
                  {selectedFir.summary}
                </p>
              </div>

              {selectedFir.relatedCaseId && (
                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Linked Central Case File</span>
                    <p className="font-mono text-sm font-bold text-chakra-600 dark:text-chakra-400 mt-0.5">
                      {selectedFir.relatedCaseId}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const cid = selectedFir.relatedCaseId;
                      setSelectedFir(null);
                      navigate(`/app/cases?selected=${cid}`);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-chakra-600 text-white font-medium hover:bg-chakra-700 transition-colors flex items-center gap-1 text-xs"
                  >
                    <span>View Case File</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-darkborder flex justify-end">
              <button
                onClick={() => setSelectedFir(null)}
                className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Register FIR Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-lg bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-darkborder flex items-center justify-between">
              <h3 className="font-bold text-navy-900 dark:text-white text-base">
                Register Fictional First Information Report
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRegisterFir} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Complainant Entity / Representative
                </label>
                <input
                  type="text"
                  required
                  value={complainant}
                  onChange={(e) => setComplainant(e.target.value)}
                  placeholder="e.g. Municipal Officer S. Kumar"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-darkborder bg-slate-50 dark:bg-darkbg text-navy-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Accused Demo Subject Name
                </label>
                <input
                  type="text"
                  required
                  value={accusedDemoName}
                  onChange={(e) => setAccusedDemoName(e.target.value)}
                  placeholder="e.g. Test Record H"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-darkborder bg-slate-50 dark:bg-darkbg text-navy-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Offense Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-darkborder bg-slate-50 dark:bg-darkbg text-navy-900 dark:text-white"
                  >
                    <option value="Cyber Fraud & Embezzlement">Cyber Fraud & Embezzlement</option>
                    <option value="Commercial Cargo Pilferage">Commercial Cargo Pilferage</option>
                    <option value="Counterfeit Document Circulation">Counterfeit Document Circulation</option>
                    <option value="Identity Spoofing & Phishing">Identity Spoofing & Phishing</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Statutory Section</label>
                  <input
                    type="text"
                    value={sectionCode}
                    onChange={(e) => setSectionCode(e.target.value)}
                    placeholder="e.g. BNS-318, IT-66D"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-darkborder bg-slate-50 dark:bg-darkbg text-navy-900 dark:text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Incident Location (Fictional)</label>
                <input
                  type="text"
                  value={incidentLocation}
                  onChange={(e) => setIncidentLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-darkborder bg-slate-50 dark:bg-darkbg text-navy-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">FIR Summary & Facts</label>
                <textarea
                  rows={2}
                  required
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Record summary of allegations and incident specifics..."
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
                  className="px-4 py-2 rounded-xl bg-saffron-500 text-white font-semibold hover:bg-saffron-600"
                >
                  Register FIR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
