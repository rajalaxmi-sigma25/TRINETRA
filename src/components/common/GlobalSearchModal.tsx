import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, FileText, Shield, User, Landmark, Calendar, ArrowRight } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SearchCategory = 'All' | 'Cases' | 'FIRs' | 'Criminals' | 'Prisoners' | 'Courts' | 'Hearings';

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<SearchCategory>('All');
  const { cases, firs, criminals, prisoners, courtCases, hearings } = useData();
  const { hasAccessToModule } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset query when opening
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActiveCategory('All');
    }
  }, [isOpen]);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();

    const results: Array<{
      id: string;
      title: string;
      subtitle: string;
      category: SearchCategory;
      tag: string;
      route: string;
    }> = [];

    // Cases
    if (hasAccessToModule('Cases') && (activeCategory === 'All' || activeCategory === 'Cases')) {
      cases.forEach((c) => {
        if (
          c.id.toLowerCase().includes(q) ||
          c.firNumber.toLowerCase().includes(q) ||
          c.title.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.accusedDemoNames.some((n) => n.toLowerCase().includes(q))
        ) {
          results.push({
            id: c.id,
            title: `${c.id}: ${c.title}`,
            subtitle: `FIR: ${c.firNumber} • Status: ${c.status} • Officer: ${c.assignedOfficer}`,
            category: 'Cases',
            tag: c.status,
            route: `/app/cases?selected=${c.id}`,
          });
        }
      });
    }

    // FIRs
    if (hasAccessToModule('FIR') && (activeCategory === 'All' || activeCategory === 'FIRs')) {
      firs.forEach((f) => {
        if (
          f.id.toLowerCase().includes(q) ||
          f.firNumber.toLowerCase().includes(q) ||
          f.complainant.toLowerCase().includes(q) ||
          f.accusedDemoName.toLowerCase().includes(q) ||
          f.category.toLowerCase().includes(q)
        ) {
          results.push({
            id: f.id,
            title: `${f.firNumber} - ${f.category}`,
            subtitle: `Complainant: ${f.complainant} • Accused: ${f.accusedDemoName}`,
            category: 'FIRs',
            tag: f.status,
            route: `/app/firs?selected=${f.id}`,
          });
        }
      });
    }

    // Criminals
    if (hasAccessToModule('Criminal') && (activeCategory === 'All' || activeCategory === 'Criminals')) {
      criminals.forEach((cr) => {
        if (
          cr.id.toLowerCase().includes(q) ||
          cr.demoName.toLowerCase().includes(q) ||
          cr.category.toLowerCase().includes(q)
        ) {
          results.push({
            id: cr.id,
            title: `${cr.id}: ${cr.demoName}`,
            subtitle: `Category: ${cr.category} • Status: ${cr.status}`,
            category: 'Criminals',
            tag: cr.status,
            route: `/app/criminals?selected=${cr.id}`,
          });
        }
      });
    }

    // Prisoners
    if (hasAccessToModule('Prisoners') && (activeCategory === 'All' || activeCategory === 'Prisoners')) {
      prisoners.forEach((p) => {
        if (
          p.id.toLowerCase().includes(q) ||
          p.demoName.toLowerCase().includes(q) ||
          p.assignedFacility.toLowerCase().includes(q) ||
          p.relatedCaseId.toLowerCase().includes(q)
        ) {
          results.push({
            id: p.id,
            title: `${p.id}: ${p.demoName}`,
            subtitle: `Facility: ${p.assignedFacility} • Release: ${p.expectedReleaseDate}`,
            category: 'Prisoners',
            tag: p.status,
            route: `/app/prisoners?selected=${p.id}`,
          });
        }
      });
    }

    // Courts
    if (hasAccessToModule('Court') && (activeCategory === 'All' || activeCategory === 'Courts')) {
      courtCases.forEach((cc) => {
        if (
          cc.id.toLowerCase().includes(q) ||
          cc.relatedCaseId.toLowerCase().includes(q) ||
          cc.demoCourtName.toLowerCase().includes(q)
        ) {
          results.push({
            id: cc.id,
            title: `${cc.id} (${cc.demoCourtName})`,
            subtitle: `Case: ${cc.relatedCaseId} • Stage: ${cc.courtStage}`,
            category: 'Courts',
            tag: cc.status,
            route: `/app/court?selected=${cc.id}`,
          });
        }
      });
    }

    // Hearings
    if (hasAccessToModule('Hearing') && (activeCategory === 'All' || activeCategory === 'Hearings')) {
      hearings.forEach((h) => {
        if (
          h.id.toLowerCase().includes(q) ||
          h.relatedCaseId.toLowerCase().includes(q) ||
          h.demoCourtroom.toLowerCase().includes(q) ||
          h.hearingType.toLowerCase().includes(q)
        ) {
          results.push({
            id: h.id,
            title: `${h.id}: ${h.hearingType}`,
            subtitle: `Date: ${h.hearingDate} at ${h.hearingTime} • Room: ${h.demoCourtroom}`,
            category: 'Hearings',
            tag: h.status,
            route: `/app/court?tab=hearings&selected=${h.id}`,
          });
        }
      });
    }

    return results;
  }, [query, activeCategory, cases, firs, criminals, prisoners, courtCases, hearings, hasAccessToModule]);

  if (!isOpen) return null;

  const getCategoryIcon = (cat: SearchCategory) => {
    switch (cat) {
      case 'Cases': return <Shield className="w-4 h-4 text-blue-500" />;
      case 'FIRs': return <FileText className="w-4 h-4 text-amber-500" />;
      case 'Criminals': return <User className="w-4 h-4 text-purple-500" />;
      case 'Prisoners': return <User className="w-4 h-4 text-emerald-500" />;
      case 'Courts': return <Landmark className="w-4 h-4 text-indigo-500" />;
      case 'Hearings': return <Calendar className="w-4 h-4 text-saffron-500" />;
      default: return <Search className="w-4 h-4 text-slate-400" />;
    }
  };

  const handleSelectResult = (route: string) => {
    onClose();
    navigate(route);
  };

  const categories: SearchCategory[] = ['All', 'Cases', 'FIRs', 'Criminals', 'Prisoners', 'Courts', 'Hearings'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-slate-200 dark:border-darkborder gap-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Case ID, FIR Number, Criminal ID, Prisoner ID or Court Case ID..."
            className="w-full bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none text-base font-normal"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Categories Chips */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-slate-100 dark:border-slate-800/80 overflow-x-auto bg-slate-50/50 dark:bg-slate-900/40">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-chakra-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2">
          {query.trim() === '' ? (
            <div className="py-12 text-center text-slate-400 dark:text-slate-500">
              <Search className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-medium">Type to search across fictional records</p>
              <p className="text-xs mt-1">Try querying: <span className="font-mono text-chakra-500 cursor-pointer" onClick={() => setQuery('CASE-101')}>CASE-101</span>, <span className="font-mono text-chakra-500 cursor-pointer" onClick={() => setQuery('FIR-203')}>FIR-203</span>, or <span className="font-mono text-chakra-500 cursor-pointer" onClick={() => setQuery('PR-008')}>PR-008</span></p>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="py-12 text-center text-slate-400 dark:text-slate-500">
              <p className="text-sm font-medium">No matching records found for "{query}"</p>
              <p className="text-xs mt-1">Check that you have permissions for this module or try a different keyword.</p>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Found {searchResults.length} record{searchResults.length > 1 ? 's' : ''} (Demo)
              </div>
              {searchResults.map((item) => (
                <div
                  key={`${item.category}-${item.id}`}
                  onClick={() => handleSelectResult(item.route)}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0">
                      {getCategoryIcon(item.category)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-navy-900 dark:text-white group-hover:text-chakra-600 dark:group-hover:text-chakra-400 transition-colors">
                          {item.title}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium">
                          {item.tag}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400 group-hover:text-chakra-600 dark:group-hover:text-chakra-400 text-xs font-medium">
                    <span>View</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-darkborder text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-igreen-500"></span>
            <span>Role-filtered index • Fictional Demo Data</span>
          </div>
          <div className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px]">ESC</kbd>
            <span>to close</span>
          </div>
        </div>
      </div>
    </div>
  );
};
