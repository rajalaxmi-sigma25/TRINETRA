import React from 'react';

interface LogoProps {
  variant?: 'compact' | 'full' | 'hero';
  showTagline?: boolean;
  showBadge?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'full', showTagline = false, showBadge = false, className = '' }) => {
  const iconSize = variant === 'hero' ? 'w-16 h-16' : variant === 'compact' ? 'w-8 h-8' : 'w-10 h-10';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Trinetra Eye Brand Mark */}
      <div className={`relative flex items-center justify-center shrink-0 ${iconSize}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Upper Eyelid - Indian Saffron curve */}
          <path
            d="M 8,50 C 22,20 78,20 92,50"
            stroke="#F97316"
            strokeWidth="7"
            strokeLinecap="round"
          />
          {/* Subtle White / Neutral inner highlight */}
          <path
            d="M 16,50 C 28,28 72,28 84,50"
            stroke="currentColor"
            strokeOpacity="0.4"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="text-slate-400 dark:text-slate-200"
          />
          {/* Lower Eyelid - Indian Green curve */}
          <path
            d="M 8,50 C 22,80 78,80 92,50"
            stroke="#16A34A"
            strokeWidth="7"
            strokeLinecap="round"
          />
          {/* Central Iris - Deep Navy Ring with Indigo / Chakra Accent */}
          <circle
            cx="50"
            cy="50"
            r="19"
            className="fill-navy-900 dark:fill-darkbg stroke-chakra-600 dark:stroke-chakra-400"
            strokeWidth="3.5"
          />
          {/* Ashoka Chakra 24-spoke inspired geometric rays */}
          <g stroke="#3B82F6" strokeWidth="1.2" opacity="0.85">
            {[...Array(12)].map((_, i) => (
              <line
                key={i}
                x1="50"
                y1="34"
                x2="50"
                y2="66"
                transform={`rotate(${i * 15} 50 50)`}
              />
            ))}
          </g>
          {/* Center Pupil - Golden Saffron Point */}
          <circle cx="50" cy="50" r="5" fill="#F97316" />
          <circle cx="50" cy="50" r="2" fill="#FFFFFF" />
        </svg>
      </div>

      {variant !== 'compact' && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold tracking-wider text-xl font-sans text-navy-900 dark:text-white leading-none">
              TRINETRA
            </span>
            {showBadge && (
              <span className="text-[10px] font-semibold tracking-widest uppercase px-1.5 py-0.5 rounded bg-saffron-100 text-saffron-800 dark:bg-saffron-950/70 dark:text-saffron-300 border border-saffron-200 dark:border-saffron-800/60">
                CRMS
              </span>
            )}
          </div>
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 tracking-tight leading-tight mt-0.5">
            Criminal Record Management System
          </span>
          {showTagline && (
            <span className="text-[10px] text-slate-400 dark:text-slate-500 italic mt-0.5">
              “Three Perspectives. One Connected System.”
            </span>
          )}
        </div>
      )}
    </div>
  );
};
