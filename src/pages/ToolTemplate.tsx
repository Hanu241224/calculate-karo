import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Share2, BookmarkPlus, AlertCircle, RefreshCw } from 'lucide-react';

const ToolTemplate: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [value, setValue] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const toolName = slug ? slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Calculator Tool';

  const handleCalculate = () => {
    if (!value) return;
    setResult((parseFloat(value) * 1.42).toFixed(2));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      {/* Tool Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/category/finance" className="hover:text-blue-600 transition-colors">Finance</Link>
            <span>/</span>
            <span className="text-gray-900">{toolName}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight mb-2">{toolName}</h1>
          <p className="text-gray-500 text-sm font-medium">Fast, accurate, and completely free to use.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors no-shadow active:scale-95">
            <BookmarkPlus className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors no-shadow active:scale-95">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Calculator Area */}
      <div className="bg-white rounded-2xl border border-gray-200 no-shadow p-5 md:p-8 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none animate-pulse-slow" />

        <div className="grid md:grid-cols-2 gap-8 relative z-10">
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-900 mb-1.5 uppercase tracking-wide">Enter Base Value</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-7 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors font-bold text-gray-900 outline-none text-sm"
                />
              </div>
            </div>
            <button
              onClick={handleCalculate}
              className="w-full bg-[#3635B8] text-white py-3 rounded-lg font-bold hover:bg-blue-800 transition-colors active:scale-95 flex items-center justify-center gap-2 group"
            >
              Calculate Now
              <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            </button>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 flex flex-col justify-center">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Final Result</div>
            {result ? (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="text-4xl font-black text-[#3635B8] tracking-tight mb-2">${result}</div>
                <div className="text-xs text-green-600 font-bold flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Calculated successfully
                </div>
              </div>
            ) : (
              <div className="text-gray-400 flex flex-col gap-2">
                <div className="text-3xl font-black tracking-tight opacity-50">$0.00</div>
                <div className="text-xs font-bold flex items-center gap-1.5 opacity-80">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Enter a value to see result
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolTemplate;
