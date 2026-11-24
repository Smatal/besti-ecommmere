import React from 'react';

interface BrandHeartIconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function BrandHeartIcon({ size = 20, className = '', style }: BrandHeartIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="brandGoldGradient" x1="2" y1="3" x2="22" y2="21.35" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="45%" stopColor="#dfb743" />
          <stop offset="100%" stopColor="#a47c1b" />
        </linearGradient>
      </defs>
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill="url(#brandGoldGradient)"
      />
    </svg>
  );
}

