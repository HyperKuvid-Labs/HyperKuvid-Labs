import React from 'react';

const BrainCircuitIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <defs>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g filter="url(#glow)">
      <path
        d="M128,24A104,104,0,0,0,24,128c0,13.1,2.4,25.7,7,37.1V128a97,97,0,0,1,97-97h37.1C153.7,26.4,141.1,24,128,24Z"
        opacity="0.2"
      />
      <path d="M224.9,158.4a104.3,104.3,0,0,0-26.5-26.5L160,170.3V208a8,8,0,0,0,16,0v-28.3l20.1-20.2a88.1,88.1,0,0,1,23.7,23.7l-20.2,20.1H152a8,8,0,0,0,0,16h38.4l38.4-38.4v-38.4a8,8,0,0,0-16,0v28.3L170.3,160l26.5-26.5a104.3,104.3,0,0,0,26.5,26.5l-38.4,38.4h.3v.3Z" />
      <path d="M128,40a88,88,0,1,0,88,88A88.1,88.1,0,0,0,128,40Zm0,160a72,72,0,1,1,72-72A72.1,72.1,0,0,1,128,200Z" />
      <path d="M188,108a8,8,0,0,0-8,8,52,52,0,0,1-85.5,39.1,8,8,0,0,0-12.2,9.8,68,68,0,0,0,111.9-51.1A8,8,0,0,0,188,108Z" />
      <path d="M96,128a32,32,0,1,0-32-32A32,32,0,0,0,96,128Zm0-48a16,16,0,1,1-16,16A16,16,0,0,1,96,80Z" />
    </g>
  </svg>
);

export default BrainCircuitIcon;
