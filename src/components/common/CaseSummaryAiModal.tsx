import React, { useState } from 'react';
import { Sparkles, X, ShieldAlert, CheckCircle2, FileText, Bot, AlertCircle } from 'lucide-react';
import { CaseRecord } from '../../types';

interface CaseSummaryAiModalProps {
  caseItem: CaseRecord;
  isOpen: boolean;
  onClose: () => void;
}

export const CaseSummaryAiModal: React.FC<CaseSummaryAiModalProps> = ({ caseItem, isOpen, onClose }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGenerated(true);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-darkborder flex items-center justify-between bg-gradient-to-r from-saffron-500/10 via-chakra-500/10 to-transparent">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-saffron-100 text-saffron-700 dark:bg-saffron-950 dark:text-saffron-300">
              <Sparkles className="w-5 h-5 text-saffron-600 dark:text-saffron-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-navy-900 dark:text-white text-base">
                  AI-Assisted Case Summary
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-saffron-100 text-saffron-800 dark:bg-saffron-950 dark:text-saffron-300 border border-saffron-200 dark:border-saffron-800">
                  Demo Feature
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Synthesis of existing case facts for {caseItem.id} ({caseItem.firNumber})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Strict Ethical Warning Banner */}
        <div className="px-4 py-2.5 bg-amber-50 dark:bg-amber-950/30 border-b border-amber-200 dark:border-amber-900/40 text-amber-800 dark:text-amber-300 text-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
          <p>
            <strong>Academic Prototype Notice:</strong> This feature performs text synthesis on existing fictional record data only. It does <u>not</u> provide legal advice, does <u>not</u> make guilt determinations, does <u>not</u> calculate criminal risk scores, and does <u>not</u> engage in judicial decision-making.
          </p>
        </div>

        {/* Body content */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          {!generated ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-saffron-50 dark:bg-saffron-950/50 flex items-center justify-center text-saffron-600">
                <Bot className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-semibold text-navy-900 dark:text-white text-base">
                  Generate Structured Case Synthesis
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1">
                  Synthesize the FIR details, investigative chronology, and court stages for <span className="font-mono font-bold text-navy-900 dark:text-white">{caseItem.id}</span>.
                </p>
              </div>
              <button
                disabled={isGenerating}
                onClick={handleGenerate}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-saffron-500 to-saffron-600 text-white font-medium text-xs hover:from-saffron-600 hover:to-saffron-700 shadow-md transition-all flex items-center gap-2 mx-auto disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Synthesizing Record Nodes...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate AI Case Summary</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-4 text-xs">
              {/* Executive Summary */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <h5 className="font-bold text-navy-900 dark:text-white mb-1.5 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-chakra-500" />
                  <span>1. Executive Overview</span>
                </h5>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {caseItem.summary}
                </p>
              </div>

              {/* Key Synthetic Facts Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Current Status & Agency</span>
                  <p className="font-semibold text-navy-900 dark:text-white mt-1">
                    {caseItem.status} • {caseItem.assignedAgency} ({caseItem.assignedOfficer})
                  </p>
                </div>
                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Accused Subject(s)</span>
                  <p className="font-semibold text-navy-900 dark:text-white mt-1">
                    {caseItem.accusedDemoNames.join(', ')} (Demo)
                  </p>
                </div>
              </div>

              {/* Timeline Extraction */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <h5 className="font-bold text-navy-900 dark:text-white mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-igreen-500" />
                  <span>2. Key Chronological Milestones</span>
                </h5>
                <ul className="space-y-1.5 pl-2">
                  {caseItem.timelineEvents.map((evt) => (
                    <li key={evt.id} className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
                      <span className="font-mono text-slate-400 shrink-0">{evt.date}:</span>
                      <span>{evt.action} — {evt.description}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Linked Record References */}
              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Associated IDs</span>
                  <p className="font-mono text-slate-700 dark:text-slate-300 mt-0.5">
                    FIR: {caseItem.firNumber} | Criminal: {caseItem.linkedCriminalIds.join(', ') || 'N/A'} | Prisoner: {caseItem.linkedPrisonerIds.join(', ') || 'N/A'} | Court: {caseItem.courtCaseId || 'N/A'}
                  </p>
                </div>
                <span className="text-[10px] px-2 py-1 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                  Consistent
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-darkborder flex items-center justify-between text-xs">
          <span className="text-[11px] text-slate-500">
            Trinetra AI Demo Module • Fictional Synthesizer
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
