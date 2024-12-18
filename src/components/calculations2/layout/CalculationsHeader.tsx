import React from 'react';

interface CalculationsHeaderProps {
  title: string;
  icon: React.ReactNode;
  username: string | null;
  onLogout: () => void;
  logoutIcon: React.ReactNode;
}

export function CalculationsHeader({
  title,
  icon,
  username,
  onLogout,
  logoutIcon
}: CalculationsHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        {icon}
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">
          Logged in as: {username}
        </span>
        <button
          onClick={onLogout}
          className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-red-600 rounded-md hover:bg-gray-100"
        >
          {logoutIcon}
          Logout
        </button>
      </div>
    </div>
  );
}