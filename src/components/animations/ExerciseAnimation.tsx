import React from 'react';

export interface ExerciseAnimationProps {
  exerciseId: string;
  className?: string;
  size?: number;
}

// Colors
const BODY = "#c8c8d0";
const ACTIVE = "#6366f1";
const EQUIP = "#5a5a6e";

// Helpers to draw common parts (we use standard path/circle definitions and animate them using CSS or animate/animateTransform)
const genericDumbbell = () => (
  <g>
    <rect x="75" y="90" width="50" height="20" rx="4" fill={EQUIP} />
    <rect x="65" y="80" width="10" height="40" rx="2" fill={EQUIP} />
    <rect x="125" y="80" width="10" height="40" rx="2" fill={EQUIP} />
  </g>
);

const renderExercise = (id: string) => {
  switch (id) {
    case 'machine-chest-press':
    case 'incline-machine-press':
      return (
        <g>
          <style>{`
            @keyframes press { 0%, 100% { transform: translateX(0px); } 50% { transform: translateX(30px); } }
            @keyframes armPress { 0%, 100% { stroke-dashoffset: 0; } 50% { stroke-dashoffset: -10; } }
          `}</style>
          <rect x="40" y="50" width="20" height="100" fill={EQUIP} rx="5" />
          <circle cx="70" cy="60" r="15" fill={BODY} />
          <rect x="60" y="80" width="20" height="60" fill={BODY} rx="10" />
          <path d="M70 90 L100 90" stroke={ACTIVE} strokeWidth="8" strokeLinecap="round" style={{ animation: 'press 3s infinite ease-in-out' }} />
          <rect x="95" y="85" width="10" height="30" fill={EQUIP} style={{ animation: 'press 3s infinite ease-in-out' }} />
        </g>
      );
    case 'db-incline-press':
    case 'db-bench-press':
      return (
        <g>
          <style>{`
            @keyframes dbPress { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-40px); } }
          `}</style>
          <rect x="40" y="120" width="120" height="15" fill={EQUIP} rx="5" transform={id === 'db-incline-press' ? "rotate(-30 40 120)" : ""} />
          <circle cx="70" cy="110" r="15" fill={BODY} />
          <path d="M70 120 L130 120" stroke={BODY} strokeWidth="20" strokeLinecap="round" />
          <g style={{ animation: 'dbPress 3s infinite ease-in-out' }}>
            <path d="M100 110 L100 70" stroke={ACTIVE} strokeWidth="8" strokeLinecap="round" />
            <rect x="85" y="60" width="30" height="10" fill={EQUIP} />
          </g>
        </g>
      );
    case 'machine-chest-fly':
    case 'cable-fly':
    case 'rear-delt-fly':
      return (
        <g>
          <style>{`
            @keyframes fly { 0%, 100% { transform: scaleX(1); } 50% { transform: scaleX(0.5); } }
          `}</style>
          <circle cx="100" cy="60" r="15" fill={BODY} />
          <rect x="85" y="80" width="30" height="70" fill={BODY} rx="10" />
          <g transform="translate(100, 90)" style={{ animation: 'fly 3s infinite ease-in-out' }}>
            <path d="M0 0 L-40 20 L-60 20" stroke={ACTIVE} strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M0 0 L40 20 L60 20" stroke={ACTIVE} strokeWidth="8" strokeLinecap="round" fill="none" />
          </g>
        </g>
      );
    case 'db-shoulder-press':
    case 'machine-shoulder-press':
      return (
        <g>
          <style>{`
            @keyframes shoulderPress { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-35px); } }
          `}</style>
          <rect x="70" y="120" width="60" height="15" fill={EQUIP} />
          <circle cx="100" cy="50" r="15" fill={BODY} />
          <rect x="85" y="70" width="30" height="60" fill={BODY} rx="10" />
          <g style={{ animation: 'shoulderPress 3s infinite ease-in-out' }}>
            <path d="M85 80 L60 80 L60 50" stroke={ACTIVE} strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M115 80 L140 80 L140 50" stroke={ACTIVE} strokeWidth="8" strokeLinecap="round" fill="none" />
            <rect x="45" y="40" width="30" height="10" fill={EQUIP} />
            <rect x="125" y="40" width="30" height="10" fill={EQUIP} />
          </g>
        </g>
      );
    case 'db-lateral-raise':
    case 'cable-lateral-raise':
      return (
        <g>
          <style>{`
            @keyframes lateralRaise { 0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(-70deg); } }
            @keyframes lateralRaiseRight { 0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(70deg); } }
          `}</style>
          <circle cx="100" cy="40" r="15" fill={BODY} />
          <rect x="90" y="60" width="20" height="70" fill={BODY} rx="10" />
          <g transform="translate(95, 70)" style={{ animation: 'lateralRaise 3s infinite ease-in-out' }}>
            <path d="M0 0 L-10 50" stroke={ACTIVE} strokeWidth="8" strokeLinecap="round" />
          </g>
          <g transform="translate(105, 70)" style={{ animation: 'lateralRaiseRight 3s infinite ease-in-out' }}>
            <path d="M0 0 L10 50" stroke={ACTIVE} strokeWidth="8" strokeLinecap="round" />
          </g>
        </g>
      );
    case 'tricep-pushdown':
    case 'overhead-tricep-extension':
      return (
        <g>
          <style>{`
            @keyframes pushdown { 0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(-50deg); } }
          `}</style>
          <circle cx="80" cy="50" r="15" fill={BODY} />
          <rect x="70" y="70" width="20" height="70" fill={BODY} rx="10" />
          <path d="M120 20 L120 180" stroke={EQUIP} strokeWidth="4" strokeDasharray="5,5" />
          <path d="M80 80 L100 110" stroke={BODY} strokeWidth="8" strokeLinecap="round" />
          <g transform="translate(100, 110)" style={{ animation: 'pushdown 3s infinite ease-in-out' }}>
            <path d="M0 0 L0 40" stroke={ACTIVE} strokeWidth="8" strokeLinecap="round" />
            <circle cx="0" cy="40" r="5" fill={EQUIP} />
          </g>
        </g>
      );
    case 'cable-lat-pulldown':
    case 'machine-lat-pulldown':
      return (
        <g>
          <style>{`
            @keyframes pulldown { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(40px); } }
          `}</style>
          <rect x="70" y="140" width="60" height="15" fill={EQUIP} />
          <circle cx="100" cy="60" r="15" fill={BODY} />
          <rect x="85" y="80" width="30" height="60" fill={BODY} rx="10" />
          <g style={{ animation: 'pulldown 3s infinite ease-in-out' }}>
            <path d="M100 20 L100 80" stroke={EQUIP} strokeWidth="4" />
            <rect x="40" y="20" width="120" height="6" fill={EQUIP} />
            <path d="M85 90 L50 20" stroke={ACTIVE} strokeWidth="8" strokeLinecap="round" />
            <path d="M115 90 L150 20" stroke={ACTIVE} strokeWidth="8" strokeLinecap="round" />
          </g>
        </g>
      );
    case 'seated-cable-row':
    case 'machine-seated-row':
    case 'face-pull':
      return (
        <g>
          <style>{`
            @keyframes row { 0%, 100% { transform: translateX(0px); } 50% { transform: translateX(30px); } }
          `}</style>
          <rect x="40" y="140" width="60" height="15" fill={EQUIP} />
          <circle cx="60" cy="60" r="15" fill={BODY} />
          <rect x="50" y="80" width="20" height="60" fill={BODY} rx="10" />
          <g style={{ animation: 'row 3s infinite ease-in-out' }}>
            <path d="M60 90 L120 90" stroke={ACTIVE} strokeWidth="8" strokeLinecap="round" />
            <path d="M180 90 L120 90" stroke={EQUIP} strokeWidth="4" />
          </g>
        </g>
      );
    case 'db-row':
    case 'chest-supported-row':
      return (
        <g>
          <style>{`
            @keyframes dbrow { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-40px); } }
          `}</style>
          <rect x="50" y="120" width="100" height="15" fill={EQUIP} />
          <circle cx="60" cy="70" r="15" fill={BODY} />
          <path d="M60 85 L120 85" stroke={BODY} strokeWidth="20" strokeLinecap="round" transform="rotate(30 60 85)" />
          <g style={{ animation: 'dbrow 3s infinite ease-in-out' }}>
            <path d="M80 110 L80 160" stroke={ACTIVE} strokeWidth="8" strokeLinecap="round" />
            <rect x="65" y="150" width="30" height="10" fill={EQUIP} />
          </g>
        </g>
      );
    case 'db-bicep-curl':
    case 'db-hammer-curl':
    case 'ez-bar-curl':
    case 'cable-hammer-curl':
      return (
        <g>
          <style>{`
            @keyframes curl { 0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(-100deg); } }
          `}</style>
          <circle cx="100" cy="40" r="15" fill={BODY} />
          <rect x="90" y="60" width="20" height="80" fill={BODY} rx="10" />
          <path d="M100 70 L100 110" stroke={BODY} strokeWidth="8" strokeLinecap="round" />
          <g transform="translate(100, 110)" style={{ animation: 'curl 3s infinite ease-in-out' }}>
            <path d="M0 0 L0 40" stroke={ACTIVE} strokeWidth="8" strokeLinecap="round" />
            <circle cx="0" cy="40" r="6" fill={EQUIP} />
          </g>
        </g>
      );
    case 'leg-press':
    case 'hack-squat':
      return (
        <g>
          <style>{`
            @keyframes legpress { 0%, 100% { transform: rotate(0deg) translate(0,0); } 50% { transform: rotate(20deg) translate(20px,-20px); } }
          `}</style>
          <rect x="30" y="100" width="60" height="15" fill={EQUIP} transform="rotate(-45 30 100)" />
          <circle cx="50" cy="70" r="15" fill={BODY} />
          <path d="M60 90 L100 90" stroke={BODY} strokeWidth="20" strokeLinecap="round" />
          <g transform="translate(100, 90)" style={{ animation: 'legpress 3s infinite ease-in-out' }}>
            <path d="M0 0 L40 -40 L40 -60" stroke={ACTIVE} strokeWidth="12" strokeLinecap="round" fill="none" />
            <rect x="30" y="-70" width="20" height="60" fill={EQUIP} transform="rotate(45 30 -70)" />
          </g>
        </g>
      );
    case 'goblet-squat':
      return (
        <g>
          <style>{`
            @keyframes squat { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(40px); } }
            @keyframes knees { 0%, 100% { d: path("M100 130 L100 180"); } 50% { d: path("M100 130 L130 150 L100 180"); } }
          `}</style>
          <g style={{ animation: 'squat 3s infinite ease-in-out' }}>
            <circle cx="100" cy="40" r="15" fill={BODY} />
            <rect x="90" y="60" width="20" height="70" fill={BODY} rx="10" />
            <rect x="95" y="70" width="10" height="20" fill={EQUIP} />
          </g>
          <path d="M100 130 L100 180" stroke={ACTIVE} strokeWidth="12" strokeLinecap="round" fill="none" style={{ animation: 'knees 3s infinite ease-in-out' }} />
        </g>
      );
    case 'seated-leg-curl':
    case 'lying-leg-curl':
    case 'leg-extension':
      return (
        <g>
          <style>{`
            @keyframes legcurl { 0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(${id === 'leg-extension' ? '-80deg' : '80deg'}); } }
          `}</style>
          <rect x="40" y="100" width="80" height="15" fill={EQUIP} />
          <circle cx="60" cy="50" r="15" fill={BODY} />
          <rect x="50" y="70" width="20" height="50" fill={BODY} rx="10" />
          <path d="M60 110 L130 110" stroke={BODY} strokeWidth="12" strokeLinecap="round" />
          <g transform="translate(130, 110)" style={{ animation: 'legcurl 3s infinite ease-in-out' }}>
            <path d="M0 0 L0 60" stroke={ACTIVE} strokeWidth="10" strokeLinecap="round" />
            <circle cx="0" cy="50" r="8" fill={EQUIP} />
          </g>
        </g>
      );
    case 'standing-calf-raise':
    case 'seated-calf-raise':
      return (
        <g>
          <style>{`
            @keyframes calfraise { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
          `}</style>
          <g style={{ animation: 'calfraise 3s infinite ease-in-out' }}>
            <circle cx="100" cy="40" r="15" fill={BODY} />
            <rect x="90" y="60" width="20" height="70" fill={BODY} rx="10" />
            <path d="M100 130 L100 180" stroke={BODY} strokeWidth="12" strokeLinecap="round" />
            <path d="M100 150 L100 170" stroke={ACTIVE} strokeWidth="14" strokeLinecap="round" />
          </g>
          <rect x="80" y="180" width="40" height="10" fill={EQUIP} />
        </g>
      );
    case 'plank':
    case 'cable-crunch':
      return (
        <g>
          <style>{`
            @keyframes plank { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(5px); } }
          `}</style>
          <g style={{ animation: 'plank 3s infinite ease-in-out' }}>
            <circle cx="40" cy="140" r="15" fill={BODY} />
            <rect x="60" y="130" width="80" height="20" fill={ACTIVE} rx="10" />
            <path d="M140 140 L180 140" stroke={BODY} strokeWidth="12" strokeLinecap="round" />
            <path d="M50 140 L50 170 L70 170" stroke={BODY} strokeWidth="8" strokeLinecap="round" fill="none" />
          </g>
          <rect x="30" y="170" width="160" height="5" fill={EQUIP} />
        </g>
      );
    case 'romanian-deadlift':
      return (
        <g>
          <style>{`
            @keyframes hinge { 0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(70deg); } }
            @keyframes bar { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(60px); } }
          `}</style>
          <path d="M80 120 L80 180" stroke={ACTIVE} strokeWidth="12" strokeLinecap="round" />
          <g transform="translate(80, 120)" style={{ animation: 'hinge 3s infinite ease-in-out' }}>
            <rect x="-10" y="-70" width="20" height="70" fill={BODY} rx="10" />
            <circle cx="0" cy="-90" r="15" fill={BODY} />
            <path d="M0 -70 L0 0" stroke={BODY} strokeWidth="8" strokeLinecap="round" />
          </g>
          <g transform="translate(80, 100)" style={{ animation: 'bar 3s infinite ease-in-out' }}>
            <circle cx="0" cy="0" r="8" fill={EQUIP} />
          </g>
        </g>
      );
    default:
      return genericDumbbell();
  }
};

export const ExerciseAnimation: React.FC<ExerciseAnimationProps> = ({
  exerciseId,
  className = '',
  size = 200,
}) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 200 200"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-lg"
      >
        {renderExercise(exerciseId)}
      </svg>
    </div>
  );
};
