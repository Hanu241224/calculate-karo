import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft, Heart, PlusSquare, DollarSign, Calendar, HelpCircle, ArrowRight } from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();

  // Determine active category for dynamic sub-menu
  let activeCategory = 'maths';
  if (location.pathname.includes('/health')) activeCategory = 'health';
  if (location.pathname.includes('/finance')) activeCategory = 'finance';
  if (location.pathname.includes('/age-date')) activeCategory = 'age-date';

  const categoryConfig = {
    'maths': { title: 'Maths', icon: <PlusSquare className="w-4 h-4" />, count: '34' },
    'health': { title: 'Health', icon: <Heart className="w-4 h-4" />, count: '18' },
    'finance': { title: 'Finance', icon: <DollarSign className="w-4 h-4" />, count: '22' },
    'age-date': { title: 'Age & Date', icon: <Calendar className="w-4 h-4" />, count: '12' },
  }[activeCategory];

  return (
    <div className="w-60 bg-white border-r border-gray-200 flex flex-col fixed left-0 top-14 bottom-0 z-40 overflow-hidden no-shadow">
      <div className="flex h-full">
        {/* Main Icon Navigation */}
        <div className="w-14 border-r border-gray-200 flex flex-col items-center py-4 bg-gray-50/50 z-10">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 text-gray-500 mb-6 hover:bg-white hover:text-gray-900 transition-colors active:scale-95 bg-white">
            <ChevronLeft className="w-4 h-4" />
          </button>

          <nav className="flex flex-col gap-4 w-full items-center flex-1">
            <NavItem to="/category/health" icon={<Heart className="w-4 h-4" />} label="Health" active={activeCategory === 'health'} />
            <NavItem to="/category/maths" icon={<PlusSquare className="w-4 h-4" />} label="Maths" active={activeCategory === 'maths'} />
            <NavItem to="/category/finance" icon={<DollarSign className="w-4 h-4" />} label="Finance" active={activeCategory === 'finance'} />
            <NavItem to="/category/age-date" icon={<Calendar className="w-4 h-4" />} label="Age/Date" active={activeCategory === 'age-date'} />
          </nav>

          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-700 transition-colors">
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic Sub Navigation */}
        <div className="flex-1 flex flex-col bg-white">
          <div className="p-4 border-b border-gray-200 flex items-center gap-3 sticky top-0 bg-white z-10">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 border border-blue-100 flex items-center justify-center">
              {categoryConfig?.icon}
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-sm tracking-tight">{categoryConfig?.title}</h2>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{categoryConfig?.count} tools</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto py-2">
            <SubNavItem to={`/tool/${activeCategory}-1`} number="1" title="Popular Tool 1" views="1.4M/mo" isHot />
            <SubNavItem to={`/tool/${activeCategory}-2`} number="2" title="Essential Calc" views="1.1M/mo" />
            <SubNavItem to={`/tool/${activeCategory}-3`} number="3" title="Basic Converter" views="760K/mo" />
            <SubNavItem to={`/tool/${activeCategory}-4`} number="4" title="Advanced Tool" views="540K/mo" />
            <SubNavItem to={`/tool/${activeCategory}-5`} number="5" title="Quick Formula" views="420K/mo" />
            <SubNavItem to={`/tool/${activeCategory}-6`} number="6" title="Data Analyzer" views="310K/mo" />
          </div>

          <div className="p-4 border-t border-gray-100 sticky bottom-0 bg-white">
             <Link to={`/category/${activeCategory}`} className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-2 rounded-lg text-xs font-bold hover:bg-black transition-colors active:scale-95 group">
               View all {categoryConfig?.count} tools
               <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const NavItem: React.FC<{ to: string; icon: React.ReactNode; label: string; active?: boolean }> = ({ to, icon, label, active }) => (
  <Link to={to} className={`flex flex-col items-center gap-1 w-full cursor-pointer group transition-colors ${active ? 'text-blue-700' : 'text-gray-400 hover:text-gray-700'}`}>
    <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 border ${active ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-transparent border-transparent group-hover:bg-white group-hover:border-gray-200'}`}>
      {icon}
    </div>
    <span className="text-[9px] font-bold text-center leading-tight tracking-wider uppercase">{label.replace(' ', '\n')}</span>
  </Link>
);

const SubNavItem: React.FC<{ to: string; number: string; title: string; views: string; isHot?: boolean }> = ({ to, number, title, views, isHot }) => (
  <Link to={to} className="w-full px-4 py-3 flex items-start gap-3 hover:bg-gray-50 transition-colors text-left group">
    <div className="w-5 h-5 rounded-full bg-gray-100 border border-gray-200 text-gray-500 group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors text-[10px] flex items-center justify-center font-bold shrink-0 mt-0.5">
      {number}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2">
        <span className="font-bold text-xs text-gray-700 group-hover:text-[#3635B8] transition-colors truncate">{title}</span>
        {isHot && (
          <span className="px-1 py-0.5 rounded text-[8px] font-black tracking-widest uppercase bg-red-100 text-red-600 border border-red-200 leading-none">HOT</span>
        )}
      </div>
      <span className="text-[10px] font-medium text-gray-400 block mt-0.5">{views}</span>
    </div>
  </Link>
);

export default Sidebar;
