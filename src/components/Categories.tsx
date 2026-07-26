import React from 'react';
import { Link } from 'react-router-dom';
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
          to="/category/health"
          icon={<Heart className="w-5 h-5 text-red-500" />}
          count="18"
          title="Health"
        />
        <CategoryCard
          to="/category/maths"
          icon={<PlusSquare className="w-5 h-5 text-blue-600" />}
          count="34"
          title="Maths"
          isActive
        />
        <CategoryCard
          to="/category/finance"
          icon={<DollarSign className="w-5 h-5 text-orange-600" />}
          count="22"
          title="Finance"
        />
        <CategoryCard
          to="/category/age-date"
          icon={<Calendar className="w-5 h-5 text-green-600" />}
          count="12"
          title="Age & Date"
        />
      </div>
    </div>
  );
};

const CategoryCard: React.FC<{ to: string; icon: React.ReactNode; count: string; title: string; isActive?: boolean }> = ({ to, icon, count, title, isActive }) => (
  <Link to={to} className={`block p-4 rounded-2xl border transition-all duration-300 cursor-pointer group no-shadow hover:-translate-y-1 ${isActive ? 'bg-blue-50/50 border-blue-200' : 'bg-white border-gray-200 hover:border-blue-200'}`}>
    <div className="flex justify-between items-start mb-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${isActive ? 'bg-[#3635B8] text-white' : 'bg-gray-50 group-hover:bg-blue-50'}`}>
        {isActive ? <div className="text-white [&>svg]:w-5 [&>svg]:h-5">{icon}</div> : <div className="[&>svg]:w-5 [&>svg]:h-5 transition-colors duration-300 group-hover:text-blue-600">{icon}</div>}
      </div>
      <span className={`text-[10px] font-bold px-2 py-1 rounded-md transition-colors duration-300 ${isActive ? 'text-blue-700 bg-blue-100/50' : 'text-gray-500 bg-gray-100 group-hover:bg-blue-50 group-hover:text-blue-600'}`}>{count} Tools</span>
    </div>
    <div className={`font-bold text-base tracking-tight transition-colors duration-300 ${isActive ? 'text-[#3635B8]' : 'text-gray-900 group-hover:text-[#3635B8]'}`}>{title}</div>
  </Link>
);

export default Categories;
