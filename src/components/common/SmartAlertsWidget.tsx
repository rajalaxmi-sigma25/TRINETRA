import React from 'react';
import { AlertCircle, Clock, Calendar, FileText, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';

export const SmartAlertsWidget: React.FC = () => {
  const { alerts } = useData();
  const navigate = useNavigate();

  const getAlertIcon = (module: string) => {
    switch (module) {
      case 'court':
        return <Calendar className="w-4 h-4 text-blue-500" />;
      case 'prisoners':
        return <Clock className="w-4 h-4 text-emerald-500" />;
      case 'documents':
        return <FileText className="w-4 h-4 text-amber-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-saffron-500" />;
    }
  };

  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'border-l-4 border-l-red-500 bg-red-50/40 dark:bg-red-950/20';
      case 'medium':
        return 'border-l-4 border-l-amber-500 bg-amber-50/40 dark:bg-amber-950/20';
      default:
        return 'border-l-4 border-l-blue-500 bg-blue-50/40 dark:bg-blue-950/20';
    }
  };

  const handleAlertClick = (module: string, recordId: string) => {
    navigate(`/app/${module}?selected=${recordId}`);
  };

  return (
    <div className="bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder rounded-2xl p-5 shadow-subtle">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-saffron-100 text-saffron-700 dark:bg-saffron-950/60 dark:text-saffron-300">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-navy-900 dark:text-white text-base leading-tight">
              What Needs Attention Today?
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Rule-based operational alerts & pending milestones
            </p>
          </div>
        </div>
        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
          {alerts.length} Items
        </span>
      </div>

      <div className="space-y-2.5">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            onClick={() => handleAlertClick(alert.module, alert.relatedRecord)}
            className={`p-3 rounded-xl border border-slate-150 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer flex items-center justify-between group ${getSeverityStyle(
              alert.severity
            )}`}
          >
            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded-lg bg-white dark:bg-slate-800 shrink-0 mt-0.5 shadow-xs">
                {getAlertIcon(alert.module)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-xs text-navy-900 dark:text-white group-hover:text-chakra-600 dark:group-hover:text-chakra-400 transition-colors">
                    {alert.title}
                  </h4>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-200/80 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                    {alert.relatedRecord}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 line-clamp-1">
                  {alert.message}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-slate-400 group-hover:text-chakra-600 dark:group-hover:text-chakra-400 text-xs shrink-0 pl-2">
              <span className="hidden sm:inline text-[11px]">Inspect</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-igreen-500" />
          <span>System integrity normal</span>
        </div>
        <span className="italic">Deterministic rule checks only • No automated judicial scoring</span>
      </div>
    </div>
  );
};
