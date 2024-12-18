import React from 'react';
import { CalculationsHeader } from './CalculationsHeader';

interface CalculationsLayoutProps {
  children: React.ReactNode;
  title: string;
  icon: React.ReactNode;
  username: string | null;
  onLogout: () => void;
  logoutIcon: React.ReactNode;
}

export function CalculationsLayout({
  children,
  title,
  icon,
  username,
  onLogout,
  logoutIcon
}: CalculationsLayoutProps) {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-4">
        <CalculationsHeader
          title={title}
          icon={icon}
          username={username}
          onLogout={onLogout}
          logoutIcon={logoutIcon}
        />
        {children}
      </div>
    </div>
  );
}