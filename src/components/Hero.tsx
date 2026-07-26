import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, BrainCircuit } from 'lucide-react';
import QuickCalc from './QuickCalc';

const Hero: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl p-6 md:p-10 border border-gray-200 relative overflow-hidden flex flex-col md:flex-row items-center gap-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Decorative animated elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3 pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50 translate-y-1/2 pointer-events-none"></div>

      <div className="flex-1 z-10">
        <div className="flex items-center gap-2 mb-5">
          <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-full px-2.5 py-1 text-xs font-bold text-gray-600 uppercase tracking-widest">
            <Zap className="w-3 h-3 text-orange-500" />
            India's #1 Platform
          </div>
          <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-100 rounded-full px-2.5 py-1 text-xs font-bold text-[#3635B8] uppercase tracking-widest">
            <BrainCircuit className="w-3 h-3" />
            AI-Powered
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-[1.1] mb-4">
          Calculate anything,<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3635B8] to-blue-500">instantly.</span>
        </h1>

        <p className="text-gray-500 text-sm md:text-base mb-8 max-w-lg font-medium leading-relaxed">
          86+ precise calculators for finance, health, maths and more — trusted by 12 million Indians every month.
        </p>

        <div className="flex flex-wrap items-center gap-3 mb-10">
          <Link to="/category/maths" className="bg-[#3635B8] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-800 transition-colors active:scale-95 flex items-center gap-2 group border border-transparent">
            Explore All Tools
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link to="/tool/ask-ai" className="bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-bold hover:bg-gray-50 hover:border-gray-300 transition-colors active:scale-95 flex items-center gap-2 group">
            <Sparkles className="w-4 h-4 text-[#3635B8]" />
            Try Ask AI
          </Link>
        </div>

        <div className="flex items-center gap-6 md:gap-10 border-t border-gray-100 pt-6">
          <Stat value="86+" label="Calculators" />
          <Stat value="12M+" label="Monthly users" />
          <Stat value="99.9%" label="Accuracy" />
        </div>
      </div>

      <div className="w-full md:w-[280px] shrink-0 z-10 animate-float">
        <QuickCalc />
      </div>
    </div>
  );
};

const Stat: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div>
    <div className="text-2xl font-black text-gray-900 tracking-tight">{value}</div>
    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{label}</div>
  </div>
);

export default Hero;
