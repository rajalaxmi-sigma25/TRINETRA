import React from 'react';
import { CaseEvent } from '../../types';
import { CheckCircle2, Clock, Shield, Landmark, Calendar, UserCheck } from 'lucide-react';
import { Badge } from '../common/Badge';

interface CaseTimelineViewProps {
  events: CaseEvent[];
  className?: string;
}

export const CaseTimelineView: React.FC<CaseTimelineViewProps> = ({ events, className = '' }) => {
  const getRoleIcon = (role: string) => {
    const r = role.toLowerCase();
    if (r.includes('police')) return <Shield className="w-4 h-4 text-blue-500" />;
    if (r.includes('cbi')) return <Shield className="w-4 h-4 text-indigo-500" />;
    if (r.includes('court') || r.includes('judge') || r.includes('registry')) return <Landmark className="w-4 h-4 text-amber-500" />;
    if (r.includes('jail') || r.includes('superintendent')) return <UserCheck className="w-4 h-4 text-emerald-500" />;
    return <Clock className="w-4 h-4 text-slate-500" />;
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="relative border-l-2 border-slate-200 dark:border-slate-700 ml-4 md:ml-6 space-y-6 py-2">
        {events.map((event, index) => (
          <div key={event.id || index} className="relative pl-6 md:pl-8 group">
            {/* Timeline bullet icon */}
            <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-white dark:bg-darkcard border-2 border-chakra-500 dark:border-chakra-400 flex items-center justify-center shadow-xs">
              {getRoleIcon(event.userRole)}
            </div>

            {/* Event Card */}
            <div className="bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder rounded-xl p-4 shadow-xs hover:border-chakra-400/60 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-navy-900 dark:text-white">
                    {event.action}
                  </h4>
                  {event.statusTag && (
                    <Badge variant="caseStatus">
                      {event.statusTag as any}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-mono">{event.date}</span>
                  <span>•</span>
                  <span>{event.time}</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {event.description}
              </p>

              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-saffron-500"></span>
                  Role: {event.userRole}
                </span>
                <span className="font-mono text-[10px]">ID: {event.id}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
