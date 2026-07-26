import React from 'react';
import { ChevronLeft, Heart, PlusSquare, DollarSign, Calendar, HelpCircle, ArrowRight } from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col fixed left-0 top-16 bottom-0 z-40 overflow-hidden shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      <div className="flex h-full">
        {/* Main Icon Navigation */}
        <div className="w-16 border-r border-gray-100 flex flex-col items-center py-4 bg-white/50 backdrop-blur z-10">
          <button className="w-8 h-8 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500 mb-6 hover:bg-gray-50 hover:text-gray-900 transition-all hover:scale-105 active:scale-95 shadow-sm">
            <ChevronLeft className="w-4 h-4" />
          </button>

          <nav className="flex flex-col gap-6 w-full items-center flex-1">
            <NavItem icon={<Heart className="w-5 h-5" />} label="Health" />
            <NavItem icon={<PlusSquare className="w-5 h-5" />} label="Maths" active />
            <NavItem icon={<DollarSign className="w-5 h-5" />} label="Finance" />
            <NavItem icon={<Calendar className="w-5 h-5" />} label="Age & Date" />
          </nav>

          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-all shadow-inner">
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>

        {/* Sub Navigation for Maths */}
        <div className="flex-1 flex flex-col bg-gradient-to-b from-[#F8F9FE] to-white">
          <div className="p-5 border-b border-gray-100/50 flex items-center gap-3 backdrop-blur-sm sticky top-0">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white shadow-md shadow-blue-200 flex items-center justify-center">
              <PlusSquare className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900 text-sm">Maths</h2>
              <p className="text-xs text-gray-500">34 calculators</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto py-2">
            <SubNavItem number="1" title="Percentage" views="1.4M/mo" isHot />
            <SubNavItem number="2" title="Scientific Calc" views="1.1M/mo" />
            <SubNavItem number="3" title="Fractions" views="760K/mo" />
            <SubNavItem number="4" title="Square Root" views="540K/mo" />
            <SubNavItem number="5" title="LCM & HCF" views="420K/mo" />
            <SubNavItem number="6" title="Statistics" views="310K/mo" />
          </div>

          <div className="p-4 bg-gradient-to-t from-white via-white to-transparent sticky bottom-0">
             <button className="w-full flex items-center justify-center gap-2 bg-[#3635B8] text-white py-2.5 rounded-xl text-sm font-medium hover:bg-blue-800 transition-all hover:shadow-lg hover:shadow-blue-900/20 active:scale-[0.98]">
               View all 34 tools
               <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean }> = ({ icon, label, active }) => (
  <div className={`flex flex-col items-center gap-1.5 w-full cursor-pointer group transition-colors ${active ? 'text-blue-600' : 'text-gray-400 hover:text-gray-700'}`}>
    <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${active ? 'bg-blue-50 shadow-inner border border-blue-100 scale-110' : 'group-hover:bg-gray-50 group-hover:scale-105 group-active:scale-95'}`}>
      {icon}
    </div>
    <span className="text-[10px] font-semibold text-center leading-tight whitespace-pre-wrap tracking-wide">{label.replace(' ', '\n')}</span>
  </div>
);

const SubNavItem: React.FC<{ number: string; title: string; views: string; isHot?: boolean }> = ({ number, title, views, isHot }) => (
  <button className="w-full px-5 py-3.5 flex items-start gap-3 hover:bg-white/80 transition-all text-left group relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-50/0 to-blue-50/0 group-hover:from-blue-50/50 group-hover:to-transparent transition-all opacity-0 group-hover:opacity-100" />
    <div className="w-6 h-6 rounded-full bg-gray-100 border border-gray-200 text-gray-500 group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors text-xs flex items-center justify-center font-bold shrink-0 mt-0.5 shadow-sm">
      {number}
    </div>
    <div className="flex-1 min-w-0 relative z-10">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-sm text-gray-700 group-hover:text-gray-900 transition-colors truncate">{title}</span>
        {isHot && (
          <span className="px-1.5 py-0.5 rounded shadow-sm text-[9px] font-black tracking-wider uppercase bg-gradient-to-r from-red-500 to-orange-500 text-white leading-none">HOT</span>
        )}
      </div>
      <span className="text-xs text-gray-400 group-hover:text-gray-500 transition-colors block mt-0.5">{views}</span>
    </div>
  </button>
);

export default Sidebar;
