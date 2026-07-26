import React from 'react';
import { ChevronLeft, Heart, PlusSquare, DollarSign, Calendar, HelpCircle, ArrowRight } from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full overflow-hidden">
      <div className="flex h-full">
        {/* Main Icon Navigation */}
        <div className="w-16 border-r border-gray-200 flex flex-col items-center py-4 bg-white z-10 shadow-sm">
          <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 mb-6 hover:bg-gray-50">
            <ChevronLeft className="w-4 h-4" />
          </button>

          <nav className="flex flex-col gap-6 w-full items-center flex-1">
            <NavItem icon={<Heart className="w-5 h-5" />} label="Health" />
            <NavItem icon={<PlusSquare className="w-5 h-5" />} label="Maths" active />
            <NavItem icon={<DollarSign className="w-5 h-5" />} label="Finance" />
            <NavItem icon={<Calendar className="w-5 h-5" />} label="Age & Date" />
          </nav>

          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200">
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>

        {/* Sub Navigation for Maths */}
        <div className="flex-1 flex flex-col bg-[#F9F9FA]">
          <div className="p-4 border-b border-gray-100 flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-blue-100 text-blue-600 flex items-center justify-center">
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

          <div className="p-4">
             <button className="w-full flex items-center justify-center gap-2 bg-[#3635B8] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-all">
               View all 34 tools
               <ArrowRight className="w-4 h-4" />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean }> = ({ icon, label, active }) => (
  <div className={`flex flex-col items-center gap-1 w-full cursor-pointer group ${active ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}>
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${active ? 'bg-blue-50 border border-blue-100' : 'group-hover:bg-gray-50'}`}>
      {icon}
    </div>
    <span className="text-[10px] font-medium text-center leading-tight whitespace-pre-wrap">{label.replace(' ', '\n')}</span>
  </div>
);

const SubNavItem: React.FC<{ number: string; title: string; views: string; isHot?: boolean }> = ({ number, title, views, isHot }) => (
  <button className="w-full px-4 py-3 flex items-start gap-3 hover:bg-gray-100 transition-colors text-left">
    <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 text-xs flex items-center justify-center font-medium shrink-0 mt-0.5">
      {number}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2">
        <span className="font-medium text-sm text-gray-900 truncate">{title}</span>
        {isHot && (
          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-500 text-white leading-none">HOT</span>
        )}
      </div>
      <span className="text-xs text-gray-500 block mt-0.5">{views}</span>
    </div>
  </button>
);

export default Sidebar;
