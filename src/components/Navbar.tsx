import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Sparkles, ChevronDown } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="h-14 border-b border-gray-300 bg-white/95 backdrop-blur-xl flex items-center justify-between px-5 fixed top-0 w-full z-50">
      <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <div className="w-8 h-8 rounded-full border-[1.5px] border-orange-500 flex items-center justify-center text-xs font-bold text-gray-800 bg-white">
          <span className="text-blue-600">C</span>k
        </div>
        <div className="font-extrabold text-lg tracking-tight flex flex-col leading-none">
          <span className="text-gray-900">Calculate</span>
          <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">Karo</span>
        </div>
      </Link>

      <div className="flex-1 max-w-2xl mx-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-1.5 border border-gray-300 rounded-full bg-gray-50 text-xs font-medium placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Search tools..."
          />
          <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
            <span className="text-gray-400 text-[10px] border border-gray-200 rounded px-1.5 py-0.5 bg-white font-medium">⌘K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Link to="/blog" className="flex items-center text-sm font-medium text-gray-600 hover:text-[#3635B8] transition-colors">
          Blogs <ChevronDown className="ml-1 h-4 w-4" />
        </Link>
        <Link to="/tool/ask-ai" className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#3635B8] bg-blue-50 border border-blue-100 rounded-full hover:bg-blue-100 transition-colors">
          <Sparkles className="h-3.5 w-3.5" />
          Ask AI
        </Link>
        <button className="px-4 py-1.5 text-xs font-bold text-white bg-gray-900 rounded-full hover:bg-black transition-colors active:scale-95">
          Sign in
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
