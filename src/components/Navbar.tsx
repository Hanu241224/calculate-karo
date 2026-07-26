import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Sparkles, ChevronDown, Clock, TrendingUp, BookOpen, Calculator, DollarSign, Heart, Menu } from 'lucide-react';

interface NavbarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const [isBlogMenuOpen, setIsBlogMenuOpen] = useState(false);

  return (
    <nav className="h-14 border-b border-gray-300 bg-white/95 backdrop-blur-xl flex items-center justify-between px-4 md:px-5 fixed top-0 w-full z-50 transition-colors">
      <div className="flex items-center gap-3">
        <button
          className="md:hidden p-1.5 -ml-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="w-5 h-5" />
        </button>
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <div className="w-8 h-8 rounded-full border-[1.5px] border-orange-500 flex items-center justify-center text-xs font-bold text-gray-800 bg-white">
          <span className="text-blue-600">C</span>k
        </div>
        <div className="font-extrabold text-lg tracking-tight flex flex-col leading-none hidden sm:flex">
          <span className="text-gray-900">Calculate</span>
          <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">Karo</span>
        </div>
      </Link>
      </div>

      <div className="flex-1 max-w-2xl mx-4 md:mx-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-2.5 md:pl-3 flex items-center pointer-events-none">
            <Search className="h-3.5 w-3.5 md:h-4 md:w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-8 md:pl-10 pr-3 py-1.5 border border-gray-300 rounded-full bg-gray-50 text-xs font-medium placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Search tools..."
          />
          <div className="absolute inset-y-0 right-0 pr-2.5 hidden sm:flex items-center pointer-events-none">
            <span className="text-gray-400 text-[10px] border border-gray-200 rounded px-1.5 py-0.5 bg-white font-medium">⌘K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <div
          className="h-14 hidden md:flex items-center"
          onMouseEnter={() => setIsBlogMenuOpen(true)}
          onMouseLeave={() => setIsBlogMenuOpen(false)}
        >
          <Link to="/blog" className={`flex items-center text-sm font-bold transition-colors ${isBlogMenuOpen ? 'text-[#3635B8]' : 'text-gray-600 hover:text-[#3635B8]'}`}>
            Blogs <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${isBlogMenuOpen ? 'rotate-180' : ''}`} />
          </Link>

          {/* Mega Menu Overlay */}
          <div className={`absolute top-14 left-0 w-full bg-white border-b border-gray-200 transition-all duration-300 origin-top overflow-hidden no-shadow z-40 ${isBlogMenuOpen ? 'opacity-100 max-h-[500px] visible pointer-events-auto delay-0' : 'opacity-0 max-h-0 invisible pointer-events-none delay-100'}`}>
            <div className="max-w-[1400px] mx-auto p-8 grid grid-cols-12 gap-8 md:ml-60">
              {/* Categories */}
              <div className="col-span-3 space-y-4">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <BookOpen className="w-4 h-4" /> Categories
                </h3>
                <div className="flex flex-col gap-2">
                  <Link to="/blog?category=finance" className="group flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-blue-50 transition-colors">
                    <div className="w-8 h-8 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 group-hover:bg-white"><DollarSign className="w-4 h-4" /></div>
                    <span className="font-bold text-gray-700 group-hover:text-[#3635B8] text-sm">Finance Tips</span>
                  </Link>
                  <Link to="/blog?category=maths" className="group flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-blue-50 transition-colors">
                    <div className="w-8 h-8 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 group-hover:bg-white"><Calculator className="w-4 h-4" /></div>
                    <span className="font-bold text-gray-700 group-hover:text-[#3635B8] text-sm">Maths Hacks</span>
                  </Link>
                  <Link to="/blog?category=health" className="group flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-blue-50 transition-colors">
                    <div className="w-8 h-8 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 group-hover:bg-white"><Heart className="w-4 h-4" /></div>
                    <span className="font-bold text-gray-700 group-hover:text-[#3635B8] text-sm">Health Metrics</span>
                  </Link>
                </div>
              </div>

              {/* Featured Article */}
              <div className="col-span-5 border-l border-gray-100 pl-8 space-y-4">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" /> Featured
                </h3>
                <Link to="/blog/featured-post" className="block group">
                  <div className="h-40 rounded-xl overflow-hidden mb-3 border border-gray-200">
                    <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80" alt="Featured" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h4 className="font-black text-gray-900 group-hover:text-[#3635B8] text-base mb-1">Mastering Advanced Calculations in Finance</h4>
                  <p className="text-xs font-medium text-gray-500 line-clamp-2">Learn the secrets to accurate wealth projections using our new suite of AI tools.</p>
                </Link>
              </div>

              {/* Recent Posts */}
              <div className="col-span-4 border-l border-gray-100 pl-8 space-y-4">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Recent
                </h3>
                <div className="flex flex-col gap-4">
                  {[1, 2, 3].map((i) => (
                    <Link to={`/blog/recent-post-${i}`} key={i} className="group flex gap-3">
                      <div className="w-16 h-12 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden shrink-0">
                        <img src={`https://images.unsplash.com/photo-${1550000000000 + i * 10000}?auto=format&fit=crop&w=100&q=80`} alt="Recent" className="w-full h-full object-cover group-hover:opacity-80 transition-opacity" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 group-hover:text-[#3635B8] text-xs line-clamp-2 mb-1">Top 5 ways to calculate your daily nutritional needs</h4>
                        <span className="text-[10px] font-bold text-gray-400">Oct 2{i}, 2024</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Link to="/tool/ask-ai" className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#3635B8] bg-blue-50 border border-blue-100 rounded-full hover:bg-blue-100 transition-colors">
          <Sparkles className="h-3.5 w-3.5" />
          Ask AI
        </Link>
        <button className="px-3 md:px-4 py-1.5 text-xs font-bold text-white bg-gray-900 rounded-full hover:bg-black transition-colors active:scale-95 whitespace-nowrap">
          Sign in
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
