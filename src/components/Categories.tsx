import React from 'react';
import { Heart, PlusSquare, DollarSign, Calendar, ArrowRight } from 'lucide-react';

const Categories: React.FC = () => {
  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Categories</h3>
        <button className="flex items-center text-sm font-medium text-[#3635B8] hover:text-blue-800 transition-colors">
          View all <ArrowRight className="ml-1 h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CategoryCard
          icon={<Heart className="w-5 h-5 text-red-500" />}
          count="18"
          title="Health"
        />
        <CategoryCard
          icon={<PlusSquare className="w-5 h-5 text-blue-600" />}
          count="34"
          title="Maths"
          isActive
        />
        <CategoryCard
          icon={<DollarSign className="w-5 h-5 text-orange-600" />}
          count="22"
          title="Finance"
        />
        <CategoryCard
          icon={<Calendar className="w-5 h-5 text-green-600" />}
          count="12"
          title="Age & Date"
        />
      </div>
    </div>
  );
};

const CategoryCard: React.FC<{ icon: React.ReactNode; count: string; title: string; isActive?: boolean }> = ({ icon, count, title, isActive }) => (
  <div className={`p-4 rounded-2xl border transition-all cursor-pointer ${isActive ? 'bg-[#F8F9FE] border-blue-100 shadow-sm' : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm'}`}>
    <div className="flex justify-between items-start mb-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isActive ? 'bg-[#3635B8] text-white' : 'bg-gray-50'}`}>
        {isActive ? <div className="text-white [&>svg]:w-5 [&>svg]:h-5">{icon}</div> : icon}
      </div>
      <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-full">{count}</span>
    </div>
    <div className="font-semibold text-gray-900">{title}</div>
  </div>
);

export default Categories;
