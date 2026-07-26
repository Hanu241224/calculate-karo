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
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      {/* Tool Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-8">
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-4">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/category/finance" className="hover:text-blue-600 transition-colors">Finance</Link>
            <span>/</span>
            <span className="text-gray-900">{toolName}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">{toolName}</h1>
          <p className="text-gray-500 text-lg">Fast, accurate, and completely free to use.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2.5 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors shadow-sm">
            <BookmarkPlus className="w-5 h-5" />
          </button>
          <button className="p-2.5 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors shadow-sm">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Calculator Area */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-xl shadow-gray-200/40 p-6 md:p-10 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/3 pointer-events-none" />

        <div className="grid md:grid-cols-2 gap-12 relative z-10">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Enter Base Value</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-gray-900 outline-none"
                />
              </div>
            </div>
            <button
              onClick={handleCalculate}
              className="w-full bg-[#3635B8] text-white py-4 rounded-xl font-bold hover:bg-blue-800 transition-all hover:shadow-lg hover:shadow-blue-900/20 active:scale-[0.98] flex items-center justify-center gap-2 group"
            >
              Calculate Now
              <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            </button>
          </div>

          <div className="bg-[#F8F9FE] rounded-2xl p-8 border border-blue-100 flex flex-col justify-center">
            <div className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Final Result</div>
            {result ? (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="text-5xl font-black text-[#3635B8] tracking-tight mb-2">${result}</div>
                <div className="text-sm text-green-600 font-medium flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Calculated successfully
                </div>
              </div>
            ) : (
              <div className="text-gray-400 flex flex-col gap-3">
                <div className="text-4xl font-black tracking-tight opacity-50">$0.00</div>
                <div className="text-sm flex items-center gap-1.5 opacity-80">
                  <AlertCircle className="w-4 h-4" />
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
