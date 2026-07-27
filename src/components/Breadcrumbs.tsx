import React from 'react';
import { Link } from '../lib/router';
import { useLocation } from '../lib/router-hooks';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Don't show breadcrumbs on home page
  if (pathnames.length === 0) return null;

  return (
    <div className="flex items-center px-6 py-3 bg-white/50 backdrop-blur-sm shadow-sm shadow-gray-200/20">
      <nav className="flex text-xs font-semibold text-gray-500" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2">
          <li className="inline-flex items-center">
            <Link to="/" className="inline-flex items-center hover:text-[#f4510b] transition-colors gap-1.5">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
          </li>

          {pathnames.map((name, index) => {
            const isLast = index === pathnames.length - 1;

            // Format name: capitalize and replace dashes with spaces
            const formattedName = name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ');

            return (
              <li key={name}>
                <div className="flex items-center">
                  <ChevronRight className="w-3.5 h-3.5 mx-1 text-gray-400" />
                  {isLast ? (
                    <span className="text-gray-900 font-bold" aria-current="page">
                      {formattedName}
                    </span>
                  ) : (
                    <span className="text-gray-500 cursor-default">{formattedName}</span>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumbs;
