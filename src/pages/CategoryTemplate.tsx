import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calculator, ArrowRight, Star, Sparkles } from 'lucide-react';

const CategoryTemplate: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const categoryName = slug ? slug.charAt(0).toUpperCase() + slug.slice(1).replace('-', ' ') : 'Category';

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      {/* Category Header */}
      <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-200 p-8 md:p-10 no-shadow">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none animate-pulse-slow" />
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#3635B8] text-xs font-bold mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>34 Premium Tools</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-3">{categoryName}</h1>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-lg font-medium">
            Everything you need to calculate, estimate, and analyze {categoryName.toLowerCase()} metrics with absolute precision.
          </p>
        </div>
      </div>

      {/* Tools Grid */}
      <div>
        <h2 className="text-xl font-black text-gray-900 mb-5 flex items-center gap-2">
          Most Popular <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Link to={`/tool/calculator-${i}`} key={i} className="block p-4 rounded-2xl border border-gray-200 transition-all duration-300 cursor-pointer group no-shadow hover:-translate-y-1 bg-white hover:border-blue-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-4 group-hover:translate-x-0">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-[#3635B8]" />
                </div>
              </div>
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-blue-50">
                  <Calculator className="w-5 h-5 text-gray-600 transition-colors duration-300 group-hover:text-blue-600" />
                </div>
              </div>
              <h3 className="font-bold text-base tracking-tight text-gray-900 mb-1.5 group-hover:text-[#3635B8] transition-colors duration-300">{categoryName} Tool {i}</h3>
              <p className="text-gray-500 text-[11px] font-medium leading-relaxed pr-6">Calculate complex {categoryName.toLowerCase()} metrics instantly with our AI-powered engine.</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryTemplate;
