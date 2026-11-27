import React from 'react';
import { Scale, BookOpen, ShieldCheck, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

export const LegalPage: React.FC = () => {
  return (
    <div className="max-w-5xl space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-navy-900 dark:text-white">
            Legal & Regulatory Reference Framework
          </h1>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-igreen-100 dark:bg-igreen-950/60 text-igreen-800 dark:text-igreen-300 border border-igreen-200 dark:border-igreen-800">
            EDUCATIONAL COMPLIANCE
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Academic legal references informing record modeling, audit retention, and data segregation in Trinetra.
        </p>
      </div>

      {/* Mandatory Disclaimer */}
      <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2.5">
        <AlertCircle className="w-5 h-5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Academic Prototype Notice:</strong> Educational reference only. This system does not provide legal advice, judicial determinations, or formal statutory interpretation. All references to legal sections are pedagogical models used to structure the fictional database schema.
        </p>
      </div>

      {/* 4 Cards Framework */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* BNS 2023 */}
        <div className="p-6 rounded-2xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder shadow-subtle space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-saffron-600 dark:text-saffron-400">
              Substantive Law
            </span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              Act No. 45 of 2023
            </span>
          </div>
          <h3 className="font-bold text-base text-navy-900 dark:text-white">
            1. Bharatiya Nyaya Sanhita (BNS), 2023
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Replaces the Indian Penal Code (IPC), 1860. Modernizes definitions for organized crimes, financial cheating, electronic forgery, and offenses against the state.
          </p>
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
            <p className="font-semibold text-slate-700 dark:text-slate-300">Sections Modeled in Demo Data:</p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li><span className="font-mono text-saffron-600">BNS Section 303:</span> Theft and illegal property removal</li>
              <li><span className="font-mono text-saffron-600">BNS Section 318:</span> Cheating and fraudulent financial inducement</li>
              <li><span className="font-mono text-saffron-600">BNS Section 336:</span> Forgery of official seals and documentation</li>
            </ul>
          </div>
        </div>

        {/* BNSS 2023 */}
        <div className="p-6 rounded-2xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder shadow-subtle space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-chakra-600 dark:text-chakra-400">
              Procedural Law
            </span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              Act No. 46 of 2023
            </span>
          </div>
          <h3 className="font-bold text-base text-navy-900 dark:text-white">
            2. Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Replaces the Code of Criminal Procedure (CrPC), 1973. Strongly mandates digital records, electronic evidence collection, and strict timelines for chargesheets.
          </p>
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
            <p className="font-semibold text-slate-700 dark:text-slate-300">Procedural Mandates Reflected in Trinetra:</p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li><span className="font-mono text-chakra-600">Section 105 BNSS:</span> Mandatory audio-video recording of search and seizure operations</li>
              <li><span className="font-mono text-chakra-600">Electronic FIRs:</span> Standardized digital registration protocol</li>
              <li><span className="font-mono text-chakra-600">Remand Supervision:</span> Automated calculation of expected judicial release windows</li>
            </ul>
          </div>
        </div>

        {/* DPDP Act 2023 */}
        <div className="p-6 rounded-2xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder shadow-subtle space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-igreen-600 dark:text-igreen-400">
              Data Privacy
            </span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              Act No. 22 of 2023
            </span>
          </div>
          <h3 className="font-bold text-base text-navy-900 dark:text-white">
            3. Digital Personal Data Protection Act, 2023
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Establishes fiduciary duties and citizen privacy rights in digital systems. In Trinetra, synthetic masking is applied to all personal identifiers.
          </p>
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
            <p className="font-semibold text-slate-700 dark:text-slate-300">Privacy Safeguards Applied:</p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>Synthetic anonymization (100% fictional test records)</li>
              <li>Role-segregated least-privilege information access</li>
              <li>Cryptographic dummy hash tokens for biometric indices</li>
            </ul>
          </div>
        </div>

        {/* IT Act 2000 */}
        <div className="p-6 rounded-2xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder shadow-subtle space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              Cyber & Evidence Law
            </span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              Act No. 21 of 2000
            </span>
          </div>
          <h3 className="font-bold text-base text-navy-900 dark:text-white">
            4. Information Technology Act, 2000
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Legal recognition for electronic transactions, digital records, electronic signatures, and cyber offenses.
          </p>
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
            <p className="font-semibold text-slate-700 dark:text-slate-300">Evidentiary Standard Implementations:</p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li><span className="font-mono text-purple-600">Section 66D:</span> Impersonation using computer resources</li>
              <li>Electronic admissibility validation in court documents module</li>
              <li>Digital timestamping on all audit log transactions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
