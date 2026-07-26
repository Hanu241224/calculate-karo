import React from 'react';
import { Link } from '../lib/router';
import { Home } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <h1 className="mb-4 bg-gradient-to-r from-orange-600 to-orange-600 bg-clip-text text-8xl font-semibold text-transparent md:text-9xl">404</h1>
      <h2 className="text-3xl font-bold text-white mb-4">Page not found</h2>
      <p className="text-gray-400 mb-8 max-w-md">Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.</p>
      <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-black transition-colors hover:scale-105 active:scale-95 shadow-lg shadow-gray-900/20">
        <Home className="w-4 h-4" />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
