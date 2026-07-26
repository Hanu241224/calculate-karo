import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Sparkles, ChevronDown } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="h-16 border-b border-gray-200 bg-white/80 backdrop-blur-md flex items-center justify-between px-6 fixed top-0 w-full z-50">
      <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <div className="w-10 h-10 rounded-full border-2 border-orange-500 flex items-center justify-center text-sm font-bold text-gray-800 shadow-sm">
          <span className="text-blue-600">C</span>k
        </div>
        <div className="font-bold text-xl tracking-tight flex flex-col leading-none">
          <span className="text-gray-900">Calculate</span>
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">Karo</span>
        </div>
      </Link>

      <div className="flex-1 max-w-2xl mx-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full bg-gray-50 text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search calculators..."
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-400 text-xs border border-gray-200 rounded px-1 bg-white">⌘K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Link to="/blog" className="flex items-center text-sm font-medium text-gray-600 hover:text-[#3635B8] transition-colors">
          Blogs <ChevronDown className="ml-1 h-4 w-4" />
        </Link>
        <Link to="/tool/ask-ai" className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-[#3635B8] bg-blue-50 rounded-full hover:bg-blue-100 hover:shadow-md transition-all">
          <Sparkles className="h-4 w-4" />
          Ask AI
        </Link>
        <button className="px-5 py-2 text-sm font-medium text-white bg-gray-900 rounded-full hover:bg-black transition-all hover:shadow-lg hover:scale-105 active:scale-95">
          Sign in
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
