import React from 'react';
import { ArrowRight, Calendar, DollarSign, Heart, PlusSquare, type LucideIcon } from 'lucide-react';
import { categories } from '../data/content';
import type { CategorySlug } from '../data/content';
import { Link } from '../lib/router';

const Categories: React.FC = () => {
  return (
    <section className="mt-12">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h3 className="eyebrow">Categories</h3>
        <Link to="/category/maths" className="flex items-center text-sm font-semibold text-[#f4510b] smooth-control hover:text-orange-300">
          View all <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => {
          const visual = categoryVisuals[category.slug];
          return (
            <CategoryCard
              key={category.slug}
              to={`/category/${category.slug}`}
              icon={visual.icon}
              iconClassName={visual.iconClassName}
              activeIconClassName={visual.activeIconClassName}
              count={String(category.count)}
              title={category.title}
              isActive={category.slug === 'maths'}
            />
          );
        })}
      </div>
    </section>
  );
};

const categoryVisuals: Record<CategorySlug, { icon: LucideIcon; iconClassName: string; activeIconClassName: string }> = {
  health: {
    icon: Heart,
    iconClassName: 'bg-gray-950 text-orange-500 shadow-sm',
    activeIconClassName: 'bg-orange-500 text-white',
  },
  maths: {
    icon: PlusSquare,
    iconClassName: 'bg-orange-500/10 text-[#f4510b]',
    activeIconClassName: 'bg-[#f4510b] text-orange-100 shadow-sm',
  },
  finance: {
    icon: DollarSign,
    iconClassName: 'bg-gray-950 text-orange-400 shadow-sm',
    activeIconClassName: 'bg-orange-500 text-white',
  },
  'age-date': {
    icon: Calendar,
    iconClassName: 'bg-gray-950 text-orange-400 shadow-sm',
    activeIconClassName: 'bg-orange-600 text-white',
  },
};

const CategoryCard: React.FC<{
  to: string;
  icon: LucideIcon;
  iconClassName: string;
  activeIconClassName: string;
  count: string;
  title: string;
  isActive: boolean;
}> = ({ to, icon: Icon, iconClassName, activeIconClassName, count, title, isActive }) => (
  <Link
    to={to}
    className={`group flex min-h-[114px] flex-col justify-between rounded-lg border p-4 smooth-control hover:-translate-y-0.5 ${
      isActive
        ? 'border-orange-200 bg-orange-500/10 shadow-[0_12px_32px_rgba(54,53,184,0.08)]'
        : 'border-gray-800 bg-gray-950 hover:border-orange-200 hover:bg-orange-500/10'
    }`}
  >
    <div className="flex items-start justify-between gap-4">
      <div className={`flex h-10 w-10 items-center justify-center rounded-lg smooth-control ${isActive ? activeIconClassName : iconClassName}`}>
        <Icon className="h-5 w-5" />
      </div>
      <span className={`rounded-md px-2 py-1 text-[11px] font-semibold smooth-control ${isActive ? 'bg-orange-500/20 text-[#f4510b]' : 'bg-gray-800 text-gray-400 group-hover:bg-orange-500/20 group-hover:text-[#f4510b]'}`}>
        {count} Tools
      </span>
    </div>
    <div className={`text-base font-semibold smooth-control ${isActive ? 'text-[#f4510b]' : 'text-white group-hover:text-[#f4510b]'}`}>{title}</div>
  </Link>
);

export default Categories;
