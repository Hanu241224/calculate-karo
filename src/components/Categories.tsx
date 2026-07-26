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
  <Link to={to} className={`block p-5 rounded-3xl border transition-all duration-300 cursor-pointer group ${isActive ? 'bg-gradient-to-br from-[#F8F9FE] to-white border-blue-200 shadow-md shadow-blue-900/5 hover:shadow-lg' : 'bg-white border-gray-100 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1'}`}>
    <div className="flex justify-between items-start mb-6">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${isActive ? 'bg-gradient-to-br from-blue-600 to-[#3635B8] text-white shadow-lg shadow-blue-900/20' : 'bg-gray-50/80 group-hover:bg-blue-50'}`}>
        {isActive ? <div className="text-white [&>svg]:w-6 [&>svg]:h-6">{icon}</div> : <div className="[&>svg]:w-6 [&>svg]:h-6 transition-colors duration-300 group-hover:text-blue-600">{icon}</div>}
      </div>
      <span className={`text-xs font-bold px-3 py-1.5 rounded-full transition-colors duration-300 ${isActive ? 'text-blue-700 bg-blue-100/50' : 'text-gray-400 bg-gray-50 group-hover:bg-blue-50 group-hover:text-blue-600'}`}>{count}</span>
    </div>
    <div className={`font-bold text-lg tracking-tight transition-colors duration-300 ${isActive ? 'text-[#3635B8]' : 'text-gray-900 group-hover:text-[#3635B8]'}`}>{title}</div>
  </Link>
);

export default Categories;
