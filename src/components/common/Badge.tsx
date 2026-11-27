import React from 'react';
import { CaseStatus, CasePriority, UserRole, HearingStatus } from '../../types';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'caseStatus' | 'priority' | 'role' | 'hearing' | 'prisoner' | 'doc' | 'custom';
  color?: string;
  className?: string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'custom',
  color,
  className = '',
  size = 'sm'
}) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs font-medium' : 'px-2.5 py-1 text-sm font-medium';

  // Specific variant logic
  let styleClasses = 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700';

  if (variant === 'caseStatus') {
    const status = children as CaseStatus;
    switch (status) {
      case 'Registered':
        styleClasses = 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800';
        break;
      case 'Investigation':
        styleClasses = 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800';
        break;
      case 'Review':
        styleClasses = 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800';
        break;
      case 'Court Process':
        styleClasses = 'bg-saffron-50 text-saffron-700 dark:bg-saffron-950/60 dark:text-saffron-300 border-saffron-200 dark:border-saffron-800';
        break;
      case 'Closed':
        styleClasses = 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
        break;
    }
  } else if (variant === 'priority') {
    const priority = children as CasePriority;
    switch (priority) {
      case 'Critical':
        styleClasses = 'bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300 border-red-200 dark:border-red-800 font-semibold';
        break;
      case 'High':
        styleClasses = 'bg-orange-50 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300 border-orange-200 dark:border-orange-800';
        break;
      case 'Medium':
        styleClasses = 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800';
        break;
      case 'Low':
        styleClasses = 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700';
        break;
    }
  } else if (variant === 'role') {
    const role = children as UserRole;
    switch (role) {
      case 'police':
        styleClasses = 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800';
        break;
      case 'cbi':
        styleClasses = 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800';
        break;
      case 'jailer':
        styleClasses = 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
        break;
      case 'court':
        styleClasses = 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800';
        break;
      case 'admin':
        styleClasses = 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800';
        break;
    }
  } else if (variant === 'hearing') {
    const status = children as HearingStatus;
    switch (status) {
      case 'Scheduled':
        styleClasses = 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800';
        break;
      case 'Completed':
        styleClasses = 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
        break;
      case 'Postponed':
        styleClasses = 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800';
        break;
      case 'Cancelled':
        styleClasses = 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800';
        break;
    }
  }

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border tracking-wide select-none ${sizeClasses} ${styleClasses} ${className}`}
      style={color ? { backgroundColor: `${color}15`, color, borderColor: `${color}40` } : undefined}
    >
      {children}
    </span>
  );
};
