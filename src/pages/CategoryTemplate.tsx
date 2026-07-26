import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calculator, ArrowRight, Star, Sparkles } from 'lucide-react';

const CategoryTemplate: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const categoryName = slug ? slug.charAt(0).toUpperCase() + slug.slice(1).replace('-', ' ') : 'Category';

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      {/* Category Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-[#3635B8] to-purple-900 p-8 md:p-12 text-white shadow-2xl shadow-blue-900/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-sm font-medium mb-6 border border-white/10 shadow-inner">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>34 Premium Tools</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">{categoryName} Calculators</h1>
          <p className="text-blue-100 text-lg leading-relaxed">
            Everything you need to calculate, estimate, and analyze {categoryName.toLowerCase()} metrics with absolute precision.
          </p>
        </div>
      </div>

      {/* Tools Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          Most Popular <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Link to={`/tool/calculator-${i}`} key={i} className="group relative bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 hover:border-blue-100 transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-4 group-hover:translate-x-0">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-blue-600" />
                </div>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Calculator className="w-7 h-7 text-[#3635B8]" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#3635B8] transition-colors">{categoryName} Tool {i}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Calculate complex {categoryName.toLowerCase()} metrics instantly with our AI-powered engine.</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryTemplate;
