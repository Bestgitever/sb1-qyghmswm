import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TableProperties, Calculator } from 'lucide-react';

export function Navigation() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const linkClass = (path: string) =>
    `flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
      isActive(path)
        ? 'bg-blue-600 text-white'
        : 'text-gray-600 hover:bg-gray-100'
    }`;

  return (
    <nav className="bg-white shadow-sm mb-8">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex gap-4">
          <Link to="/price-update" className={linkClass('/price-update')}>
            <TableProperties className="w-5 h-5" />
            <span>Price Update</span>
          </Link>
          <Link to="/calculations" className={linkClass('/calculations')}>
            <Calculator className="w-5 h-5" />
            <span>Calculations</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}