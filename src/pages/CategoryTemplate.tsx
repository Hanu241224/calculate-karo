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
            <Link to={`/tool/calculator-${i}`} key={i} className="group relative bg-white p-5 rounded-2xl border border-gray-200 no-shadow hover:-translate-y-1 hover:border-blue-200 transition-all duration-300 overflow-hidden block">
              <div className="absolute top-0 right-0 p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-4 group-hover:translate-x-0">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-[#3635B8]" />
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-4 group-hover:bg-blue-50 group-hover:border-blue-100 group-hover:scale-110 transition-all duration-300">
                <Calculator className="w-6 h-6 text-gray-700 group-hover:text-[#3635B8] transition-colors" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-1.5 group-hover:text-[#3635B8] transition-colors">{categoryName} Tool {i}</h3>
              <p className="text-gray-500 text-xs font-medium leading-relaxed">Calculate complex {categoryName.toLowerCase()} metrics instantly with our AI-powered engine.</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryTemplate;
