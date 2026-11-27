import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Badge } from '../components/common/Badge';
import { LinkedRecordsView } from '../components/records/LinkedRecordsView';
import { CaseTimelineView } from '../components/records/CaseTimelineView';
import { CaseSummaryAiModal } from '../components/common/CaseSummaryAiModal';
import {
  Briefcase,
  Search,
  Filter,
  Plus,
  ExternalLink,
  X,
  Clock,
  Sparkles,
  GitCommit,
  FileText,
  History,
  Landmark,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { CaseRecord, CaseStatus, CasePriority } from '../types';

export const CasesPage: React.FC = () => {
  const { cases, addCase, updateCaseStatus, firs, documents, auditLogs } = useData();
  const { canPerformAction, currentUser, currentRole } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [selectedCase, setSelectedCase] = useState<CaseRecord | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'linked' | 'documents' | 'activity' | 'court'>('overview');
  const [showAiModal, setShowAiModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Case Form
  const [newTitle, setNewTitle] = useState('');
  const [newFirNumber, setNewFirNumber] = useState('FIR-203');
  const [newCategory, setNewCategory] = useState('Cyber Fraud & Embezzlement');
  const [newPriority, setNewPriority] = useState<CasePriority>('Medium');
  const [newAccused, setNewAccused] = useState('');
  const [newSummary, setNewSummary] = useState('');

  // Check URL parameter `selected`
  useEffect(() => {
    const selectedId = searchParams.get('selected');
    if (selectedId) {
      const found = cases.find((c) => c.id === selectedId || c.firNumber === selectedId);
      if (found) {
        setSelectedCase(found);
      }
    }
  }, [searchParams, cases]);

  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.firNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.assignedOfficer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || c.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleStatusChange = (newStatus: CaseStatus) => {
    if (!selectedCase) return;
    updateCaseStatus(
      selectedCase.id,
      newStatus,
      currentUser?.name || 'Authorized Officer',
      currentUser?.role ? `${currentUser.role.toUpperCase()} Officer` : 'Officer'
    );
    setSelectedCase((prev) => prev ? { ...prev, status: newStatus } : null);
  };

  const handleCreateCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSummary.trim()) return;

    const newId = addCase({
      firNumber: newFirNumber,
      title: newTitle,
      category: newCategory,
      status: 'Registered',
      priority: newPriority,
      assignedOfficer: currentUser?.name || 'Inspector Vikram Singh (Demo)',
      assignedAgency: currentRole === 'cbi' ? 'CBI' : 'Police',
      accusedDemoNames: newAccused ? [newAccused] : ['Demo Subject'],
      complainant: 'Complainant Desk',
      linkedCriminalIds: [],
      linkedPrisonerIds: [],
      summary: newSummary,
    });

    setShowAddModal(false);
    setNewTitle('');
    setNewSummary('');
    setNewAccused('');
    navigate(`/app/cases?selected=${newId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-navy-900 dark:text-white">
              Case Management
            </h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900/60">
              CENTRAL DIGITAL REPOSITORY
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Track multi-agency criminal investigations from registration through judicial disposition.
          </p>
        </div>

        {canPerformAction('create') && (
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl bg-navy-900 dark:bg-chakra-600 text-white font-semibold text-xs shadow-md hover:bg-navy-800 dark:hover:bg-chakra-500 transition-colors flex items-center gap-2 self-start"
          >
            <Plus className="w-4 h-4" />
            <span>Initialize New Case</span>
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
            placeholder="Search Case ID, title, FIR, officer..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-darkborder bg-slate-50 dark:bg-darkbg text-xs text-navy-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-chakra-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-medium">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-darkborder bg-slate-50 dark:bg-darkbg text-xs text-slate-700 dark:text-slate-200 focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Registered">Registered</option>
              <option value="Investigation">Investigation</option>
              <option value="Review">Review</option>
              <option value="Court Process">Court Process</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-medium">Priority:</span>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-darkborder bg-slate-50 dark:bg-darkbg text-xs text-slate-700 dark:text-slate-200 focus:outline-none"
            >
              <option value="All">All Priorities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Case Table */}
      <div className="bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder rounded-2xl shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-darkcard2 border-b border-slate-200 dark:border-darkborder text-slate-500 dark:text-slate-400 uppercase font-semibold text-[11px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Case ID</th>
                <th className="py-3 px-4">FIR Number</th>
                <th className="py-3 px-4">Case Title & Category</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Assigned Officer</th>
                <th className="py-3 px-4">Last Updated</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredCases.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No matching case files found.
                  </td>
                </tr>
              ) : (
                filteredCases.map((c) => (
                  <tr
                    key={c.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                    onClick={() => {
                      setSelectedCase(c);
                      setActiveTab('overview');
                    }}
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-navy-900 dark:text-white">
                      {c.id}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-saffron-600 dark:text-saffron-400">
                      {c.firNumber}
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-slate-900 dark:text-slate-100 line-clamp-1">
                        {c.title}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {c.category}
                      </p>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant="caseStatus">
                        {c.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant="priority">
                        {c.priority}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                      <span className="font-medium text-navy-900 dark:text-white block">{c.assignedOfficer}</span>
                      <span className="text-[10px] text-slate-400">{c.assignedAgency}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                      {c.lastUpdated}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCase(c);
                          setActiveTab('overview');
                        }}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-chakra-600 dark:text-chakra-400 hover:bg-chakra-50 font-medium text-xs inline-flex items-center gap-1"
                      >
                        <span>Details</span>
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

      {/* Case Detailed Modal with 6 Tabs */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-5xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            {/* Modal Top Banner */}
            <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-darkborder bg-slate-50/70 dark:bg-darkcard2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {selectedCase.id}
                  </span>
                  <Badge variant="caseStatus">{selectedCase.status}</Badge>
                  <Badge variant="priority">{selectedCase.priority}</Badge>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Linked FIR: {selectedCase.firNumber}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-navy-900 dark:text-white">
                  {selectedCase.title}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {selectedCase.category} • Lead: {selectedCase.assignedOfficer} ({selectedCase.assignedAgency})
                </p>
              </div>

              {/* Status Transition Control and AI Summary Trigger */}
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setShowAiModal(true)}
                  className="px-3 py-2 rounded-xl bg-gradient-to-r from-saffron-500 to-saffron-600 text-white font-semibold text-xs shadow-sm hover:from-saffron-600 hover:to-saffron-700 flex items-center gap-1.5 transition-all"
                  title="Generate factual AI synthesis of this case"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Case Summary</span>
                </button>

                {canPerformAction('update') && (
                  <div className="flex items-center gap-1.5 bg-white dark:bg-darkcard border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-xs">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Progress:</span>
                    <select
                      value={selectedCase.status}
                      onChange={(e) => handleStatusChange(e.target.value as CaseStatus)}
                      className="bg-transparent font-semibold text-chakra-600 dark:text-chakra-400 focus:outline-none cursor-pointer"
                    >
                      <option value="Registered">Registered</option>
                      <option value="Investigation">Investigation</option>
                      <option value="Review">Review</option>
                      <option value="Court Process">Court Process</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                )}

                <button
                  onClick={() => {
                    setSelectedCase(null);
                    setSearchParams({});
                  }}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs (6 Tabs) */}
            <div className="px-6 border-b border-slate-200 dark:border-darkborder bg-white dark:bg-darkcard flex gap-4 overflow-x-auto text-xs font-semibold">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-3.5 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'overview'
                    ? 'border-chakra-600 text-chakra-600 dark:text-chakra-400'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>1. Overview</span>
              </button>
              <button
                onClick={() => setActiveTab('timeline')}
                className={`py-3.5 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'timeline'
                    ? 'border-chakra-600 text-chakra-600 dark:text-chakra-400'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>2. Case Timeline</span>
              </button>
              <button
                onClick={() => setActiveTab('linked')}
                className={`py-3.5 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'linked'
                    ? 'border-chakra-600 text-chakra-600 dark:text-chakra-400'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <GitCommit className="w-4 h-4" />
                <span>3. Linked Records Graph</span>
              </button>
              <button
                onClick={() => setActiveTab('documents')}
                className={`py-3.5 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'documents'
                    ? 'border-chakra-600 text-chakra-600 dark:text-chakra-400'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>4. Documents</span>
              </button>
              <button
                onClick={() => setActiveTab('activity')}
                className={`py-3.5 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'activity'
                    ? 'border-chakra-600 text-chakra-600 dark:text-chakra-400'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <History className="w-4 h-4" />
                <span>5. Activity History</span>
              </button>
              <button
                onClick={() => setActiveTab('court')}
                className={`py-3.5 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'court'
                    ? 'border-chakra-600 text-chakra-600 dark:text-chakra-400'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Landmark className="w-4 h-4" />
                <span>6. Court Referral</span>
              </button>
            </div>

            {/* Tab Body */}
            <div className="p-6 overflow-y-auto flex-1">
              {activeTab === 'overview' && (
                <div className="space-y-4 text-xs">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                    <h4 className="font-bold text-sm text-navy-900 dark:text-white mb-2">
                      Executive Narrative Summary
                    </h4>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                      {selectedCase.summary}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase font-bold">Complainant Entity</span>
                      <p className="font-semibold text-navy-900 dark:text-white mt-1">{selectedCase.complainant}</p>
                    </div>
                    <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase font-bold">Accused Demo Subject(s)</span>
                      <p className="font-semibold text-navy-900 dark:text-white mt-1">{selectedCase.accusedDemoNames.join(', ')}</p>
                    </div>
                    <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase font-bold">Registered Date</span>
                      <p className="font-semibold font-mono text-navy-900 dark:text-white mt-1">{selectedCase.registeredDate}</p>
                    </div>
                  </div>

                  {/* Visual Status Progression Stepper */}
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-4">
                      Lifecycle Progression Stage
                    </h4>
                    <div className="grid grid-cols-5 gap-2 text-center text-xs">
                      {['Registered', 'Investigation', 'Review', 'Court Process', 'Closed'].map((st, i) => {
                        const isCurrent = selectedCase.status === st;
                        return (
                          <div
                            key={st}
                            className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                              isCurrent
                                ? 'border-chakra-500 bg-chakra-50 dark:bg-chakra-950 font-bold text-chakra-700 dark:text-chakra-300 shadow-sm'
                                : 'border-slate-200 dark:border-slate-800 text-slate-400'
                            }`}
                          >
                            <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-mono text-[10px]">
                              {i + 1}
                            </span>
                            <span className="text-[11px] truncate w-full">{st}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'timeline' && (
                <div>
                  <h4 className="font-bold text-sm text-navy-900 dark:text-white mb-4">
                    Chronological Case Event Milestones
                  </h4>
                  <CaseTimelineView events={selectedCase.timelineEvents} />
                </div>
              )}

              {activeTab === 'linked' && (
                <div>
                  <LinkedRecordsView currentRecordId={selectedCase.id} />
                </div>
              )}

              {activeTab === 'documents' && (
                <div className="space-y-4 text-xs">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-navy-900 dark:text-white">
                      Indexed Exhibits & Notices
                    </h4>
                    <button
                      onClick={() => navigate('/app/documents')}
                      className="text-xs text-chakra-600 font-semibold hover:underline flex items-center gap-1"
                    >
                      <span>Documents Module</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="divide-y divide-slate-100 dark:divide-slate-800 border rounded-2xl border-slate-200 dark:border-slate-800 overflow-hidden">
                    {documents
                      .filter((d) => d.relatedCaseId === selectedCase.id)
                      .map((doc) => (
                        <div key={doc.id} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/40">
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-chakra-600" />
                            <div>
                              <p className="font-semibold text-navy-900 dark:text-white">{doc.title}</p>
                              <p className="text-[11px] text-slate-400">
                                {doc.documentType} • Uploaded by {doc.uploadedBy} on {doc.uploadDate}
                              </p>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                            {doc.verificationStatus}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {activeTab === 'activity' && (
                <div className="space-y-4 text-xs">
                  <h4 className="font-bold text-sm text-navy-900 dark:text-white">
                    Immutable Audit Log Trail for {selectedCase.id}
                  </h4>
                  <div className="divide-y divide-slate-100 dark:divide-slate-800 border rounded-2xl border-slate-200 dark:border-slate-800 overflow-hidden">
                    {auditLogs
                      .filter((l) => l.relatedRecord === selectedCase.id)
                      .map((log) => (
                        <div key={log.id} className="p-3.5 flex items-center justify-between text-xs">
                          <div>
                            <span className="font-bold text-navy-900 dark:text-white">{log.user}</span> ({log.role})
                            <p className="text-slate-500 mt-0.5">{log.details}</p>
                          </div>
                          <span className="font-mono text-slate-400 text-[11px]">{log.timestamp}</span>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {activeTab === 'court' && (
                <div className="space-y-4 text-xs">
                  <h4 className="font-bold text-sm text-navy-900 dark:text-white">
                    Metropolitan Sessions Court Docket Information
                  </h4>
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400">Court Docket ID</span>
                        <p className="font-mono text-sm font-bold text-navy-900 dark:text-white mt-0.5">
                          {selectedCase.courtCaseId || 'COURT-101'}
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400">Presiding Bench</span>
                        <p className="text-sm font-semibold text-navy-900 dark:text-white mt-0.5">
                          Metropolitan Sessions Court • Bench III
                        </p>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end">
                      <button
                        onClick={() => navigate('/app/court')}
                        className="px-4 py-2 rounded-xl bg-chakra-600 text-white font-medium hover:bg-chakra-700 flex items-center gap-1.5"
                      >
                        <span>Open Court Cases Schedule</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Initialize New Case Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-lg bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-darkborder flex items-center justify-between">
              <h3 className="font-bold text-navy-900 dark:text-white text-base">
                Initialize Fictional Case File
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCase} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Case Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Synthetic Identity Phishing Syndicate"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-darkborder bg-slate-50 dark:bg-darkbg text-navy-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Linked FIR</label>
                  <select
                    value={newFirNumber}
                    onChange={(e) => setNewFirNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-darkborder bg-slate-50 dark:bg-darkbg text-navy-900 dark:text-white font-mono"
                  >
                    {firs.map((f) => (
                      <option key={f.id} value={f.firNumber}>{f.firNumber} - {f.category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as CasePriority)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-darkborder bg-slate-50 dark:bg-darkbg text-navy-900 dark:text-white"
                  >
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Accused Demo Person</label>
                <input
                  type="text"
                  value={newAccused}
                  onChange={(e) => setNewAccused(e.target.value)}
                  placeholder="e.g. Demo Subject K"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-darkborder bg-slate-50 dark:bg-darkbg text-navy-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Investigation Summary</label>
                <textarea
                  rows={2}
                  required
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  placeholder="Investigation context and preliminary evidence..."
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
                  className="px-4 py-2 rounded-xl bg-navy-900 dark:bg-chakra-600 text-white font-semibold hover:bg-navy-800"
                >
                  Create Case File
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AI Summary Modal */}
      {selectedCase && (
        <CaseSummaryAiModal
          caseItem={selectedCase}
          isOpen={showAiModal}
          onClose={() => setShowAiModal(false)}
        />
      )}
    </div>
  );
};
