import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import QuickCalc from './QuickCalc';

const Hero: React.FC = () => {
  return (
    <div className="bg-[#F8F9FE] rounded-3xl p-8 md:p-12 border border-blue-50 relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-50 rounded-full blur-3xl opacity-50 translate-y-1/2 pointer-events-none"></div>

      <div className="flex-1 z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-2 bg-white border border-blue-100 rounded-full px-3 py-1 text-sm text-blue-600 shadow-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
            <span className="font-medium">India's #1 Calculator Platform</span>
          </div>
          <div className="flex items-center gap-1.5 bg-green-50 border border-green-100 rounded-full px-3 py-1 text-sm text-green-700 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-medium">AI-Powered</span>
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
          Calculate anything,<br />
          <span className="text-[#3635B8] italic font-serif font-medium">instantly.</span>
        </h1>

        <p className="text-gray-500 text-lg mb-8 max-w-xl leading-relaxed">
          86+ precise calculators for finance, health, maths and more — trusted by 12 million Indians every month.
        </p>

        <div className="flex items-center gap-4 mb-12">
          <Link to="/category/maths" className="bg-gray-900 text-white px-7 py-4 rounded-full font-semibold hover:bg-black transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-gray-900/20 active:scale-95 flex items-center gap-2 group">
            Explore All Tools
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link to="/tool/ask-ai" className="bg-white border border-blue-200 text-blue-700 px-7 py-4 rounded-full font-semibold hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-900/10 active:scale-95 flex items-center gap-2 shadow-sm group">
            <Sparkles className="w-4 h-4 text-blue-500 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
            Try Ask AI
          </Link>
        </div>

        <div className="flex items-center gap-8 md:gap-12">
          <Stat value="86+" label="Calculators" />
          <Stat value="12M+" label="Monthly users" />
          <Stat value="99.9%" label="Accuracy" />
          <Stat value="4.9" label="Rating" />
        </div>
      </div>

      <div className="w-full md:w-[320px] shrink-0 z-10">
        <QuickCalc />
      </div>
    </div>
  );
};

const Stat: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div>
    <div className="text-xl font-bold text-gray-900">{value}</div>
    <div className="text-xs text-gray-500 mt-1">{label}</div>
  </div>
);

export default Hero;
