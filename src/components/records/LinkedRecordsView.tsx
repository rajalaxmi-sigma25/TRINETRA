import React, { useState } from 'react';
import { ArrowRight, FileText, Briefcase, UserCheck, ShieldAlert, Landmark, Calendar, ExternalLink } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';

interface LinkedRecordsViewProps {
  currentRecordId: string;
  className?: string;
}

export const LinkedRecordsView: React.FC<LinkedRecordsViewProps> = ({ currentRecordId, className = '' }) => {
  const { cases, firs, criminals, prisoners, courtCases, hearings } = useData();
  const navigate = useNavigate();
  const [activeNode, setActiveNode] = useState<string>(currentRecordId);

  // Find linked chain based on CASE-101 or currentRecordId
  const targetCase = cases.find(
    (c) =>
      c.id === currentRecordId ||
      c.firNumber === currentRecordId ||
      c.linkedCriminalIds.includes(currentRecordId) ||
      c.linkedPrisonerIds.includes(currentRecordId) ||
      c.courtCaseId === currentRecordId
  ) || cases[0];

  const linkedFir = firs.find((f) => f.firNumber === targetCase.firNumber || f.relatedCaseId === targetCase.id);
  const linkedCriminal = criminals.find((cr) => targetCase.linkedCriminalIds.includes(cr.id)) || criminals[0];
  const linkedPrisoner = prisoners.find((pr) => targetCase.linkedPrisonerIds.includes(pr.id) || pr.relatedCaseId === targetCase.id) || prisoners[0];
  const linkedCourt = courtCases.find((cc) => cc.id === targetCase.courtCaseId || cc.relatedCaseId === targetCase.id) || courtCases[0];
  const linkedHearing = hearings.find((h) => h.courtCaseId === linkedCourt?.id || h.relatedCaseId === targetCase.id) || hearings[0];

  const nodes = [
    {
      id: linkedFir?.firNumber || 'FIR-203',
      type: 'FIR',
      title: 'First Information Report',
      subtitle: linkedFir?.category || 'Complaint Record',
      meta: `Registered: ${linkedFir?.date || '2026-08-14'}`,
      icon: <FileText className="w-5 h-5 text-amber-600" />,
      color: 'border-amber-400 dark:border-amber-600 bg-amber-50/50 dark:bg-amber-950/30',
      badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200',
      status: linkedFir?.status || 'Registered',
      route: `/app/firs?selected=${linkedFir?.id}`,
    },
    {
      id: targetCase.id,
      type: 'Case',
      title: 'Central Digital Case',
      subtitle: targetCase.title,
      meta: `Agency: ${targetCase.assignedAgency} • Officer: ${targetCase.assignedOfficer}`,
      icon: <Briefcase className="w-5 h-5 text-blue-600" />,
      color: 'border-blue-500 dark:border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 shadow-md',
      badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200',
      status: targetCase.status,
      route: `/app/cases?selected=${targetCase.id}`,
    },
    {
      id: linkedCriminal?.id || 'CR-015',
      type: 'Criminal Record',
      title: 'Demo Profile Registry',
      subtitle: linkedCriminal?.demoName || 'Demo Subject',
      meta: `Biometric Hash: Verified • Age: ${linkedCriminal?.age || 38}`,
      icon: <ShieldAlert className="w-5 h-5 text-purple-600" />,
      color: 'border-purple-400 dark:border-purple-600 bg-purple-50/50 dark:bg-purple-950/30',
      badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-200',
      status: linkedCriminal?.status || 'In Custody',
      route: `/app/criminals?selected=${linkedCriminal?.id}`,
    },
    {
      id: linkedPrisoner?.id || 'PR-008',
      type: 'Prisoner Custody',
      title: 'Correctional Facility Record',
      subtitle: linkedPrisoner?.demoName || 'Inmate Record',
      meta: `Facility: ${linkedPrisoner?.assignedFacility || 'Central Facility'}`,
      icon: <UserCheck className="w-5 h-5 text-emerald-600" />,
      color: 'border-emerald-400 dark:border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/30',
      badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200',
      status: linkedPrisoner?.status || 'Active',
      route: `/app/prisoners?selected=${linkedPrisoner?.id}`,
    },
    {
      id: linkedCourt?.id || 'COURT-101',
      type: 'Court Docket',
      title: 'Judicial Referral Proceeding',
      subtitle: linkedCourt?.demoCourtName || 'Sessions Court',
      meta: `Stage: ${linkedCourt?.courtStage || 'Evidence Hearing'}`,
      icon: <Landmark className="w-5 h-5 text-indigo-600" />,
      color: 'border-indigo-400 dark:border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30',
      badgeColor: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-200',
      status: linkedCourt?.status || 'Hearing Scheduled',
      route: `/app/court?selected=${linkedCourt?.id}`,
    },
    {
      id: linkedHearing?.id || 'HEAR-001',
      type: 'Court Hearing',
      title: 'Scheduled Judicial Docket',
      subtitle: `${linkedHearing?.hearingType || 'Evidentiary'} • ${linkedHearing?.demoCourtroom || 'Courtroom 4B'}`,
      meta: `Date: ${linkedHearing?.hearingDate || '2026-09-30'} at ${linkedHearing?.hearingTime || '10:30 AM'}`,
      icon: <Calendar className="w-5 h-5 text-saffron-600" />,
      color: 'border-saffron-400 dark:border-saffron-600 bg-saffron-50/50 dark:bg-saffron-950/30',
      badgeColor: 'bg-saffron-100 text-saffron-800 dark:bg-saffron-900/60 dark:text-saffron-200',
      status: linkedHearing?.status || 'Scheduled',
      route: `/app/court?tab=hearings&selected=${linkedHearing?.id}`,
    }
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 bg-slate-100/70 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
        <div>
          <h3 className="font-bold text-navy-900 dark:text-white text-sm flex items-center gap-2">
            <span>Linked Relational Record Chain</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-chakra-100 dark:bg-chakra-950 text-chakra-700 dark:text-chakra-300 font-semibold">
              Live Connected Graph
            </span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Click on any node in the chain to inspect the fictional record or navigate directly to its module.
          </p>
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-igreen-500 animate-pulse"></span>
          <span>All 6 layers synchronized</span>
        </div>
      </div>

      {/* Horizontal Flow Diagram for Large Screens, Vertical for Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {nodes.map((node, index) => {
          const isSelected = activeNode === node.id || currentRecordId === node.id;
          return (
            <div key={node.id} className="relative flex flex-col">
              <div
                onClick={() => setActiveNode(node.id)}
                className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between h-full group hover:shadow-md ${
                  node.color
                } ${isSelected ? 'ring-2 ring-chakra-500 ring-offset-2 dark:ring-offset-darkcard' : 'opacity-90 hover:opacity-100'}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {node.type}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${node.badgeColor}`}>
                      {node.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 rounded-lg bg-white/80 dark:bg-darkcard/80 shrink-0 shadow-xs">
                      {node.icon}
                    </div>
                    <div>
                      <h4 className="font-mono font-bold text-sm text-navy-900 dark:text-white group-hover:text-chakra-600 transition-colors">
                        {node.id}
                      </h4>
                    </div>
                  </div>

                  <p className="text-xs font-medium text-slate-800 dark:text-slate-200 line-clamp-1">
                    {node.subtitle}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                    {node.meta}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-mono">Step {index + 1}/6</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(node.route);
                    }}
                    className="flex items-center gap-1 text-[11px] font-semibold text-chakra-600 dark:text-chakra-400 hover:underline"
                  >
                    <span>Open</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Node Details Box */}
      {activeNode && (
        <div className="p-4 bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder rounded-xl shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Node Details:</span>
              <span className="font-mono font-bold text-navy-900 dark:text-white">{activeNode}</span>
            </div>
            <span className="text-[11px] text-slate-400 italic">Academic Relational Data Integrity Verified</span>
          </div>
        </div>
      )}
    </div>
  );
};
