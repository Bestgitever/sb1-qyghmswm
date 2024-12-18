import React from 'react';

interface StickyHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function StickyHeader({ children, className = '' }: StickyHeaderProps) {
  return (
    <thead className="bg-gray-50">
      <tr className={`sticky top-0 z-20 bg-gray-50 shadow-sm ${className}`}>
        {children}
      </tr>
    </thead>
  );
}