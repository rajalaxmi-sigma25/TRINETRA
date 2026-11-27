import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Badge } from '../components/common/Badge';
import {
  Landmark,
  Calendar as CalendarIcon,
  Search,
  Filter,
  Plus,
  ExternalLink,
  X,
  Clock,
  LayoutList,
  CalendarDays,
  FileText,
  AlertCircle,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { CourtCaseRecord, HearingRecord, HearingStatus } from '../types';

export const CourtPage: React.FC = () => {
  const { courtCases, hearings, addHearing, updateHearingStatus, cases } = useData();
  const { canPerformAction, currentUser } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [activeMainTab, setActiveMainTab] = useState<'cases' | 'hearings'>('hearings');
  const [hearingViewMode, setHearingViewMode] = useState<'list' | 'calendar'>('list');

  const [searchQuery, setSearchQuery] = useState('');
  const [hearingStatusFilter, setHearingStatusFilter] = useState('All');
  const [selectedCourtCase, setSelectedCourtCase] = useState<CourtCaseRecord | null>(null);
  const [selectedHearing, setSelectedHearing] = useState<HearingRecord | null>(null);
  const [showAddHearingModal, setShowAddHearingModal] = useState(false);

  // New hearing form
  const [newCourtCaseId, setNewCourtCaseId] = useState('COURT-101');
  const [newHearingDate, setNewHearingDate] = useState('2026-10-12');
  const [newHearingTime, setNewHearingTime] = useState('11:30 AM');
  const [newHearingType, setNewHearingType] = useState<HearingRecord['hearingType']>('Evidence Submission');
  const [newCourtroom, setNewCourtroom] = useState('Courtroom 4B, 2nd Floor');
  const [newPresiding, setNewPresiding] = useState('Honorable Sessions Presiding Officer (Demo)');
  const [newNotes, setNewNotes] = useState('');

  // Sync tab with URL parameter
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'hearings') setActiveMainTab('hearings');
    else if (tab === 'cases') setActiveMainTab('cases');

    const selectedId = searchParams.get('selected');
    if (selectedId) {
      const matchCourt = courtCases.find((c) => c.id === selectedId);
      if (matchCourt) setSelectedCourtCase(matchCourt);

      const matchHearing = hearings.find((h) => h.id === selectedId);
      if (matchHearing) setSelectedHearing(matchHearing);
    }
  }, [searchParams, courtCases, hearings]);

  const filteredHearings = hearings.filter((h) => {
    const matchesSearch =
      h.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.relatedCaseId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.demoCourtroom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.hearingType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = hearingStatusFilter === 'All' || h.status === hearingStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredCourtCases = courtCases.filter((c) => {
    return (
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.relatedCaseId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.demoCourtName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleCreateHearing = (e: React.FormEvent) => {
    e.preventDefault();
    const courtCase = courtCases.find((c) => c.id === newCourtCaseId);

    addHearing({
      courtCaseId: newCourtCaseId,
      relatedCaseId: courtCase?.relatedCaseId || 'CASE-101',
      hearingDate: newHearingDate,
      hearingTime: newHearingTime,
      hearingType: newHearingType,
      demoCourtroom: newCourtroom,
      status: 'Scheduled',
      presidingOfficial: newPresiding,
      notes: newNotes || 'Routine docket appearance scheduled by registry.',
    });

    setShowAddHearingModal(false);
    setNewNotes('');
  };

  const handleUpdateStatus = (hearingId: string, status: HearingStatus) => {
    updateHearingStatus(hearingId, status);
    if (selectedHearing && selectedHearing.id === hearingId) {
      setSelectedHearing({ ...selectedHearing, status });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-navy-900 dark:text-white">
              Judiciary Court Cases & Hearing Dockets
            </h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
              METROPOLITAN SESSIONS
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Maintain courtroom schedules and case progress. Note: Court users do not make automated judicial rulings.
          </p>
        </div>

        {canPerformAction('create') && (
          <button
            onClick={() => setShowAddHearingModal(true)}
            className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs shadow-md transition-colors flex items-center gap-2 self-start"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule Hearing Docket</span>
          </button>
        )}
      </div>

      {/* Imminent Hearing Notification Banner */}
      <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40 text-xs text-blue-900 dark:text-blue-200 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <CalendarIcon className="w-4 h-4 shrink-0 text-blue-600 dark:text-blue-400" />
          <span>
            <strong>Imminent Hearing Notice:</strong> Docket <strong>HEAR-001</strong> (Metropolitan Sessions Court • Bench III) is scheduled for <strong>2026-09-30 at 10:30 AM</strong> in <strong>Courtroom 4B</strong>.
          </span>
        </div>
        <button
          onClick={() => {
            const h = hearings.find((item) => item.id === 'HEAR-001');
            if (h) setSelectedHearing(h);
          }}
          className="px-2.5 py-1 rounded-lg bg-blue-200 dark:bg-blue-900/60 font-semibold text-[11px] text-blue-950 dark:text-blue-100 hover:bg-blue-300 transition-colors shrink-0"
        >
          View Docket
        </button>
      </div>

      {/* Main Switcher: Court Cases vs Hearing Schedule */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-darkborder pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setActiveMainTab('hearings');
              setSearchParams({ tab: 'hearings' });
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeMainTab === 'hearings'
                ? 'bg-navy-900 dark:bg-chakra-600 text-white shadow-sm'
                : 'bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder text-slate-600 dark:text-slate-400 hover:bg-slate-50'
            }`}
          >
            <CalendarIcon className="w-4 h-4" />
            <span>Hearing Schedule ({hearings.length})</span>
          </button>
          <button
            onClick={() => {
              setActiveMainTab('cases');
              setSearchParams({ tab: 'cases' });
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeMainTab === 'cases'
                ? 'bg-navy-900 dark:bg-chakra-600 text-white shadow-sm'
                : 'bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder text-slate-600 dark:text-slate-400 hover:bg-slate-50'
            }`}
          >
            <Landmark className="w-4 h-4" />
            <span>Referred Court Cases ({courtCases.length})</span>
          </button>
        </div>

        {activeMainTab === 'hearings' && (
          <div className="flex items-center gap-2 self-end">
            <span className="text-xs text-slate-400">View Mode:</span>
            <div className="flex items-center bg-slate-100 dark:bg-darkcard border border-slate-200 dark:border-darkborder p-1 rounded-xl">
              <button
                onClick={() => setHearingViewMode('list')}
                className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                  hearingViewMode === 'list'
                    ? 'bg-white dark:bg-slate-800 text-navy-900 dark:text-white shadow-xs'
                    : 'text-slate-500'
                }`}
              >
                <LayoutList className="w-3.5 h-3.5" />
                <span>List View</span>
              </button>
              <button
                onClick={() => setHearingViewMode('calendar')}
                className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                  hearingViewMode === 'calendar'
                    ? 'bg-white dark:bg-slate-800 text-navy-900 dark:text-white shadow-xs'
                    : 'text-slate-500'
                }`}
              >
                <CalendarDays className="w-3.5 h-3.5" />
                <span>Calendar Grid</span>
              </button>
            </div>
          </div>
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
            placeholder={
              activeMainTab === 'hearings'
                ? 'Search hearing ID, case, courtroom...'
                : 'Search court case ID, court name...'
            }
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-darkborder bg-slate-50 dark:bg-darkbg text-xs text-navy-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {activeMainTab === 'hearings' && (
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-500 font-medium">Status:</span>
            <select
              value={hearingStatusFilter}
              onChange={(e) => setHearingStatusFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-darkborder bg-slate-50 dark:bg-darkbg text-xs text-slate-700 dark:text-slate-200 focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Postponed">Postponed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        )}
      </div>

      {/* HEARINGS TAB */}
      {activeMainTab === 'hearings' && (
        <>
          {hearingViewMode === 'list' ? (
            <div className="bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder rounded-2xl shadow-subtle overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-darkcard2 border-b border-slate-200 dark:border-darkborder text-slate-500 dark:text-slate-400 uppercase font-semibold text-[11px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Docket ID</th>
                      <th className="py-3 px-4">Related Case ID</th>
                      <th className="py-3 px-4">Hearing Date & Time</th>
                      <th className="py-3 px-4">Hearing Type</th>
                      <th className="py-3 px-4">Assigned Courtroom</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredHearings.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-400">
                          No matching hearing dockets found.
                        </td>
                      </tr>
                    ) : (
                      filteredHearings.map((h) => (
                        <tr
                          key={h.id}
                          className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                          onClick={() => setSelectedHearing(h)}
                        >
                          <td className="py-3.5 px-4 font-mono font-bold text-navy-900 dark:text-white">
                            {h.id}
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/app/cases?selected=${h.relatedCaseId}`);
                              }}
                              className="font-mono text-xs text-chakra-600 dark:text-chakra-400 hover:underline"
                            >
                              {h.relatedCaseId}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-slate-700 dark:text-slate-300 font-medium">
                            {h.hearingDate} at {h.hearingTime}
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-navy-900 dark:text-white">
                            {h.hearingType}
                          </td>
                          <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                            {h.demoCourtroom}
                          </td>
                          <td className="py-3.5 px-4">
                            <Badge variant="hearing">
                              {h.status}
                            </Badge>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedHearing(h);
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
          ) : (
            /* Calendar Grid View */
            <div className="bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder rounded-2xl p-6 shadow-subtle">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-base text-navy-900 dark:text-white">
                  September - October 2026 Judicial Hearing Calendar
                </h3>
                <span className="text-xs text-slate-400">All Scheduled Dockets</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredHearings.map((h) => (
                  <div
                    key={h.id}
                    onClick={() => setSelectedHearing(h)}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-amber-400 transition-all cursor-pointer bg-slate-50/50 dark:bg-darkcard2 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs font-bold text-chakra-600 dark:text-chakra-400">
                          {h.id}
                        </span>
                        <Badge variant="hearing">{h.status}</Badge>
                      </div>
                      <h4 className="font-bold text-sm text-navy-900 dark:text-white group-hover:text-amber-600 transition-colors">
                        {h.hearingType}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        Case: <span className="font-mono">{h.relatedCaseId}</span>
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                      <div className="flex items-center gap-1.5 font-medium">
                        <CalendarIcon className="w-3.5 h-3.5 text-amber-500" />
                        <span>{h.hearingDate} ({h.hearingTime})</span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {h.demoCourtroom}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* COURT CASES TAB */}
      {activeMainTab === 'cases' && (
        <div className="bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder rounded-2xl shadow-subtle overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-darkcard2 border-b border-slate-200 dark:border-darkborder text-slate-500 dark:text-slate-400 uppercase font-semibold text-[11px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Court Case ID</th>
                  <th className="py-3 px-4">Related Case ID</th>
                  <th className="py-3 px-4">FIR Number</th>
                  <th className="py-3 px-4">Demo Courtroom Bench</th>
                  <th className="py-3 px-4">Referral Date</th>
                  <th className="py-3 px-4">Court Stage</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredCourtCases.map((cc) => (
                  <tr
                    key={cc.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedCourtCase(cc)}
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-navy-900 dark:text-white">
                      {cc.id}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/app/cases?selected=${cc.relatedCaseId}`);
                        }}
                        className="font-mono text-xs text-chakra-600 dark:text-chakra-400 hover:underline"
                      >
                        {cc.relatedCaseId}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-slate-300">
                      {cc.firNumber}
                    </td>
                    <td className="py-3.5 px-4 text-slate-800 dark:text-slate-200 font-medium">
                      {cc.demoCourtName}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-500 text-[11px]">
                      {cc.referralDate}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                        {cc.courtStage}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                        {cc.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCourtCase(cc);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-chakra-600 dark:text-chakra-400 hover:bg-chakra-50 font-medium text-xs inline-flex items-center gap-1"
                      >
                        <span>View</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Hearing Detail Modal */}
      {selectedHearing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-4 border-b border-slate-200 dark:border-darkborder flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600">
                  <CalendarIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-navy-900 dark:text-white text-base">
                    Hearing Docket {selectedHearing.id}
                  </h3>
                  <p className="text-xs text-slate-500">Case Docket: {selectedHearing.courtCaseId}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedHearing(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 text-xs">
              {canPerformAction('update') && (
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <span className="font-bold text-navy-900 dark:text-white">Docket Status:</span>
                  <select
                    value={selectedHearing.status}
                    onChange={(e) => handleUpdateStatus(selectedHearing.id, e.target.value as HearingStatus)}
                    className="px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-darkcard font-semibold text-amber-600"
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="Completed">Completed</option>
                    <option value="Postponed">Postponed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Hearing Type</span>
                  <p className="font-semibold text-navy-900 dark:text-white mt-1">{selectedHearing.hearingType}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Assigned Courtroom</span>
                  <p className="font-semibold text-navy-900 dark:text-white mt-1">{selectedHearing.demoCourtroom}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Date & Time</span>
                  <p className="font-semibold font-mono text-navy-900 dark:text-white mt-1">
                    {selectedHearing.hearingDate} ({selectedHearing.hearingTime})
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Presiding Official</span>
                  <p className="font-semibold text-navy-900 dark:text-white mt-1">{selectedHearing.presidingOfficial}</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Proceedings Notes</span>
                <p className="text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
                  {selectedHearing.notes}
                </p>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Linked Central Case</span>
                  <p className="font-mono text-sm font-bold text-chakra-600 dark:text-chakra-400 mt-0.5">
                    {selectedHearing.relatedCaseId}
                  </p>
                </div>
                <button
                  onClick={() => {
                    const cid = selectedHearing.relatedCaseId;
                    setSelectedHearing(null);
                    navigate(`/app/cases?selected=${cid}`);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-chakra-600 text-white font-medium hover:bg-chakra-700 flex items-center gap-1 text-xs"
                >
                  <span>Open Case File</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-darkborder flex justify-end">
              <button
                onClick={() => setSelectedHearing(null)}
                className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Hearing Modal */}
      {showAddHearingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-lg bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-darkborder flex items-center justify-between">
              <h3 className="font-bold text-navy-900 dark:text-white text-base">
                Schedule Judicial Hearing Docket
              </h3>
              <button onClick={() => setShowAddHearingModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateHearing} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Court Case Reference
                </label>
                <select
                  value={newCourtCaseId}
                  onChange={(e) => setNewCourtCaseId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-darkborder bg-slate-50 dark:bg-darkbg text-navy-900 dark:text-white font-mono"
                >
                  {courtCases.map((c) => (
                    <option key={c.id} value={c.id}>{c.id} - {c.demoCourtName}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Hearing Date</label>
                  <input
                    type="date"
                    required
                    value={newHearingDate}
                    onChange={(e) => setNewHearingDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-darkborder bg-slate-50 dark:bg-darkbg text-navy-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Time</label>
                  <input
                    type="text"
                    value={newHearingTime}
                    onChange={(e) => setNewHearingTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-darkborder bg-slate-50 dark:bg-darkbg text-navy-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Hearing Type</label>
                <select
                  value={newHearingType}
                  onChange={(e) => setNewHearingType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-darkborder bg-slate-50 dark:bg-darkbg text-navy-900 dark:text-white"
                >
                  <option value="First Appearance">First Appearance</option>
                  <option value="Bail Hearing">Bail Hearing</option>
                  <option value="Framing of Charges">Framing of Charges</option>
                  <option value="Evidence Submission">Evidence Submission</option>
                  <option value="Final Arguments">Final Arguments</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Courtroom Allocation</label>
                <input
                  type="text"
                  value={newCourtroom}
                  onChange={(e) => setNewCourtroom(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-darkborder bg-slate-50 dark:bg-darkbg text-navy-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Docket Notes / Directions</label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Proceedings purpose and directives to defense/prosecution..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-darkborder bg-slate-50 dark:bg-darkbg text-navy-900 dark:text-white"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddHearingModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-600 text-white font-semibold hover:bg-amber-700"
                >
                  Schedule Docket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
