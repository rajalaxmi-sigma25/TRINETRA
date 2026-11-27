import React from 'react';

export const CourthouseSvg: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full max-w-lg mx-auto ${className}`}>
      {/* Decorative ambient gradient backdrop */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-saffron-500/10 via-chakra-500/10 to-igreen-500/10 rounded-3xl blur-2xl -z-10" />

      <svg
        viewBox="0 0 600 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-xl select-none"
      >
        <defs>
          <linearGradient id="pedimentGrad" x1="300" y1="40" x2="300" y2="130" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>

          <linearGradient id="pillarGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="50%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>

          <linearGradient id="tricolorTop" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#F97316" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#16A34A" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="cardBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1E293B" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#0F172A" stopOpacity="0.95" />
          </linearGradient>

          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Digital Grid Network in Background */}
        <g stroke="#3B82F6" strokeOpacity="0.15" strokeDasharray="3 3">
          <line x1="50" y1="100" x2="550" y2="100" />
          <line x1="50" y1="200" x2="550" y2="200" />
          <line x1="50" y1="300" x2="550" y2="300" />
          <line x1="50" y1="400" x2="550" y2="400" />
          <line x1="150" y1="50" x2="150" y2="450" />
          <line x1="300" y1="50" x2="300" y2="450" />
          <line x1="450" y1="50" x2="450" y2="450" />
        </g>

        {/* COURTHOUSE STRUCTURE */}
        {/* Foundation Steps */}
        <rect x="110" y="380" width="380" height="12" rx="3" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
        <rect x="90" y="392" width="420" height="14" rx="4" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
        <rect x="70" y="406" width="460" height="16" rx="5" fill="#090E1A" stroke="#1E293B" strokeWidth="1.5" />
        
        {/* Foundation Tricolor Accent Line */}
        <line x1="80" y1="422" x2="520" y2="422" stroke="url(#tricolorTop)" strokeWidth="3" strokeLinecap="round" />

        {/* Main Courthouse Body Wall */}
        <rect x="130" y="160" width="340" height="220" rx="4" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />

        {/* Central Courthouse Entrance Arch */}
        <path d="M 260 380 V 270 Q 300 240 340 270 V 380 Z" fill="#090E1A" stroke="#2563EB" strokeWidth="2" />
        {/* Double Doors */}
        <line x1="300" y1="260" x2="300" y2="380" stroke="#334155" strokeWidth="2" />
        <rect x="270" y="295" width="20" height="40" rx="2" fill="#1E293B" />
        <rect x="310" y="295" width="20" height="40" rx="2" fill="#1E293B" />

        {/* Grand Pillars (6 Architectural Columns) */}
        {[145, 195, 245, 335, 385, 435].map((x, idx) => (
          <g key={idx}>
            {/* Column Capital */}
            <rect x={x - 6} y="152" width="32" height="10" rx="2" fill="#475569" />
            <rect x={x - 4} y="150" width="28" height="4" rx="1" fill="#64748B" />
            {/* Shaft */}
            <rect x={x} y="162" width="20" height="216" fill="url(#pillarGrad)" stroke="#334155" strokeWidth="1" />
            {/* Fluting highlight */}
            <line x1={x + 6} y1="164" x2={x + 6} y2="376" stroke="#475569" strokeWidth="1" opacity="0.6" />
            <line x1={x + 14} y1="164" x2={x + 14} y2="376" stroke="#475569" strokeWidth="1" opacity="0.6" />
            {/* Column Base */}
            <rect x={x - 4} y="374" width="28" height="6" rx="1" fill="#475569" />
          </g>
        ))}

        {/* Entablature Beam above pillars */}
        <rect x="120" y="132" width="360" height="20" rx="2" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
        <text x="300" y="146" fill="#94A3B8" fontSize="8" fontWeight="600" letterSpacing="4" textAnchor="middle">
          JUSTICE • EQUALITY • CONSTITUTION
        </text>

        {/* Triangular Pediment (Apex of Roof) */}
        <polygon points="110,132 300,55 490,132" fill="url(#pedimentGrad)" stroke="#475569" strokeWidth="2" />

        {/* Top Flagpole / Crest Accent */}
        <line x1="300" y1="55" x2="300" y2="28" stroke="#64748B" strokeWidth="2" />
        {/* Subtle Tricolor Finial */}
        <circle cx="300" cy="26" r="5" fill="#F97316" />
        <circle cx="300" cy="26" r="2.5" fill="#FFFFFF" />

        {/* Ashoka Chakra Crest in Center of Pediment */}
        <g transform="translate(300, 100)">
          <circle cx="0" cy="0" r="18" fill="#090E1A" stroke="#2563EB" strokeWidth="2.5" />
          <circle cx="0" cy="0" r="14" fill="none" stroke="#3B82F6" strokeWidth="1" strokeDasharray="2 2" />
          {[...Array(12)].map((_, i) => (
            <line
              key={i}
              x1="0"
              y1="-14"
              x2="0"
              y2="14"
              stroke="#60A5FA"
              strokeWidth="1.2"
              transform={`rotate(${i * 15})`}
            />
          ))}
          <circle cx="0" cy="0" r="4" fill="#F97316" />
        </g>

        {/* FLOATING DIGITAL RECORD CARDS (Enterprise CRMS Elements) */}

        {/* Left Card: FIR Registration Card */}
        <g transform="translate(35, 180)" filter="url(#softGlow)">
          <rect width="130" height="75" rx="8" fill="url(#cardBg)" stroke="#F97316" strokeWidth="1.5" strokeOpacity="0.8" />
          <rect x="10" y="10" width="32" height="6" rx="3" fill="#F97316" />
          <text x="10" y="30" fill="#FFFFFF" fontSize="11" fontWeight="bold">FIR-203</text>
          <text x="10" y="44" fill="#94A3B8" fontSize="8">Cyber Inquest • Remanded</text>
          <line x1="10" y1="52" x2="120" y2="52" stroke="#334155" strokeWidth="1" />
          <circle cx="16" cy="62" r="3" fill="#16A34A" />
          <text x="24" y="65" fill="#4ADE80" fontSize="8" fontWeight="600">Digital Logged</text>
        </g>

        {/* Right Card: Connected Court Docket Card */}
        <g transform="translate(435, 210)" filter="url(#softGlow)">
          <rect width="135" height="80" rx="8" fill="url(#cardBg)" stroke="#2563EB" strokeWidth="1.5" strokeOpacity="0.8" />
          <rect x="10" y="10" width="40" height="6" rx="3" fill="#2563EB" />
          <text x="10" y="30" fill="#FFFFFF" fontSize="11" fontWeight="bold">CASE-101</text>
          <text x="10" y="44" fill="#94A3B8" fontSize="8">Hearing: HEAR-001 (Sep 30)</text>
          <line x1="10" y1="52" x2="125" y2="52" stroke="#334155" strokeWidth="1" />
          <circle cx="16" cy="64" r="3" fill="#3B82F6" />
          <text x="24" y="67" fill="#60A5FA" fontSize="8" fontWeight="600">Court Docket Linked</text>
        </g>

        {/* Bottom Floating Pill: Biometric Hash & Shield */}
        <g transform="translate(190, 420)">
          <rect width="220" height="34" rx="17" fill="#0F172A" stroke="#10B981" strokeWidth="1.5" />
          {/* Shield Icon */}
          <path d="M 215 433 L 210 435 L 210 441 Q 210 445 215 448 Q 220 445 220 441 L 220 435 Z" fill="#10B981" />
          <text x="230" y="442" fill="#E2E8F0" fontSize="10" fontWeight="600">
            RBAC • Audit Verified • Fictional
          </text>
        </g>

        {/* Data Stream Circuit Lines Connecting to Central Arch */}
        <path d="M 165 218 Q 220 220 260 280" stroke="#F97316" strokeWidth="1.5" strokeDasharray="4 4" fill="none" opacity="0.7" />
        <path d="M 435 250 Q 380 250 340 280" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="4 4" fill="none" opacity="0.7" />
      </svg>
    </div>
  );
};
