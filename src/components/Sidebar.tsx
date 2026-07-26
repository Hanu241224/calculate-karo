import React from 'react';
import { ArrowRight, Calendar, ChevronLeft, ChevronRight, DollarSign, Heart, HelpCircle, PlusSquare } from 'lucide-react';
import { categories, findCategory, findTool } from '../data/content';
import type { CategorySlug } from '../data/content';
import { Link } from '../lib/router';
import { useLocation } from '../lib/router-hooks';

interface SidebarProps {
  isMobileMenuOpen: boolean;
  isSubMenuCollapsed: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  setIsSubMenuCollapsed: (isCollapsed: boolean) => void;
}

const getActiveCategorySlug = (pathname: string): CategorySlug => {
  const categoryFromPath = categories.find((category) => pathname.includes(category.slug));
  const tool = findTool(pathname.split('/tool/')[1]);

  return categoryFromPath?.slug ?? tool?.categorySlug ?? 'maths';
};

const Sidebar: React.FC<SidebarProps> = ({ isMobileMenuOpen, isSubMenuCollapsed, setIsMobileMenuOpen, setIsSubMenuCollapsed }) => {
  const location = useLocation();
  const activeCategorySlug = getActiveCategorySlug(location.pathname);
  const activeToolSlug = location.pathname.split('/tool/')[1];
  const categoryConfig = findCategory(activeCategorySlug) ?? categories[1];
  const showSubMenu = !isSubMenuCollapsed || isMobileMenuOpen;

  return (
    <>
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-gray-950/40 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside className={`fixed left-0 top-14 bottom-0 z-40 flex overflow-hidden bg-gray-950 smooth-control w-64 ${isSubMenuCollapsed ? 'md:w-16' : 'md:w-64'} ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="flex h-full w-16 shrink-0 flex-col bg-[#0f0f0f]">
          <button
            className="m-3 flex h-10 items-center justify-center rounded-lg border border-gray-800 bg-gray-950 text-gray-400 smooth-control hover:border-gray-700 hover:text-white active:scale-95"
            onClick={() => {
              if (isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
                return;
              }
              setIsSubMenuCollapsed(!isSubMenuCollapsed);
            }}
            aria-label={isSubMenuCollapsed ? 'Expand category panel' : 'Collapse category panel'}
          >
            {isSubMenuCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>

          <nav className="flex flex-1 flex-col gap-1" aria-label="Calculator categories">
            {categories.map((category) => (
              <NavItem
                key={category.slug}
                to={`/category/${category.slug}`}
                icon={getCategoryIcon(category.slug)}
                label={category.title}
                active={activeCategorySlug === category.slug}
              />
            ))}
          </nav>

          <Link
            to="/blog"
            className="relative flex h-14 w-full items-center justify-center text-gray-400 smooth-control hover:bg-gray-950 hover:text-gray-200"
            aria-label="Open help and articles"
          >
            <HelpCircle className="w-4 h-4" />
          </Link>
        </div>

        <div className={`flex h-full flex-col overflow-hidden bg-gray-950 smooth-control ${showSubMenu ? 'w-48 opacity-100' : 'w-0 opacity-0 pointer-events-none'}`}>
          <div className="flex items-center justify-between gap-3 border-b border-gray-800 p-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-orange-100 bg-orange-500/10 text-orange-400">
                {getCategoryIcon(categoryConfig.slug)}
              </div>
              <div className="min-w-0">
                <h2 className="truncate text-sm font-semibold text-white">{categoryConfig.title}</h2>
                <p className="eyebrow text-[11px]">{categoryConfig.count} tools</p>
              </div>
            </div>
            <button
              onClick={() => setIsSubMenuCollapsed(true)}
              className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 smooth-control hover:bg-gray-900 hover:text-white md:flex"
              aria-label="Hide category panel"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-2">
            {categoryConfig.tools.map((tool, index) => (
              <SubNavItem
                key={tool.slug}
                to={`/tool/${tool.slug}`}
                number={String(index + 1)}
                title={tool.title}
                views={tool.popularity}
                isHot={tool.featured}
                active={activeToolSlug === tool.slug}
              />
            ))}
          </div>

          <div className="border-t border-gray-800 bg-gray-950 p-3">
            <Link to={`/category/${categoryConfig.slug}`} className="group flex w-full items-center justify-center gap-2 rounded-lg bg-gray-950 py-2 text-xs font-semibold text-white smooth-control hover:bg-black active:scale-95">
              View all tools
              <ArrowRight className="w-4 h-4 smooth-control group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

const getCategoryIcon = (slug: CategorySlug) => {
  if (slug === 'health') return <Heart className="w-4 h-4" />;
  if (slug === 'finance') return <DollarSign className="w-4 h-4" />;
  if (slug === 'age-date') return <Calendar className="w-4 h-4" />;
  return <PlusSquare className="w-4 h-4" />;
};

const NavItem: React.FC<{ to: string; icon: React.ReactNode; label: string; active?: boolean }> = ({ to, icon, label, active }) => (
  <Link
    to={to}
    className={`relative flex h-14 w-full items-center justify-center smooth-control ${active ? 'bg-gray-950 text-[#f4510b]' : 'text-gray-400 hover:bg-gray-950 hover:text-gray-200'}`}
    title={label}
  >
    <span className={`absolute left-0 top-0 h-full w-[5px] rounded-r-full smooth-control ${active ? 'bg-[#f4510b]' : 'bg-transparent'}`} />
    <span className={`flex h-9 w-9 items-center justify-center rounded-lg smooth-control ${active ? 'bg-orange-500/10' : 'group-hover:bg-gray-900'}`}>
      {icon}
    </span>
    <span className="sr-only">{label}</span>
  </Link>
);

const SubNavItem: React.FC<{ to: string; number: string; title: string; views: string; isHot?: boolean; active?: boolean }> = ({ to, number, title, views, isHot, active }) => (
  <Link to={to} className={`group flex w-full items-start gap-3 px-4 py-3 text-left smooth-control ${active ? 'bg-orange-500/10' : 'hover:bg-gray-900'}`}>
    <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-semibold smooth-control ${active ? 'border-orange-200 bg-gray-950 text-[#f4510b]' : 'border-gray-800 bg-gray-800 text-gray-400 group-hover:border-orange-200 group-hover:bg-orange-500/10 group-hover:text-orange-400'}`}>
      {number}
    </div>
    <div className="min-w-0 flex-1">
      <div className="flex items-center gap-2">
        <span className={`truncate text-xs font-semibold smooth-control ${active ? 'text-[#f4510b]' : 'text-gray-200 group-hover:text-[#f4510b]'}`}>{title}</span>
        {isHot && (
          <span className="rounded border border-orange-200 bg-orange-500/10 px-1 py-0.5 text-[8px] font-semibold uppercase leading-none text-orange-400">HOT</span>
        )}
      </div>
      <span className="mt-0.5 block text-[10px] font-medium text-gray-400">{views}</span>
    </div>
  </Link>
);

export default Sidebar;
