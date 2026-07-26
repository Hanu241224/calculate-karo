import React from 'react';
import { PlusSquare } from 'lucide-react';

const QuickCalc: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
      <div className="bg-[#F8F9FE] px-4 py-3 flex items-center justify-between border-b border-gray-100">
        <span className="font-semibold text-[#3635B8] text-sm">Quick Calc</span>
        <div className="w-6 h-6 rounded bg-blue-600 text-white flex items-center justify-center">
          <PlusSquare className="w-3.5 h-3.5" />
        </div>
      </div>

      <div className="p-4">
        <div className="bg-[#F8F7EE] rounded-xl p-4 text-right mb-4 border border-[#E8E6D9]">
          <div className="text-xs text-gray-500 mb-1">Result</div>
          <div className="text-3xl font-bold text-gray-900 tracking-tight">2,431</div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '-', '0', '.', '=', '+'].map((btn, i) => (
            <button
              key={i}
              className={`
                h-10 rounded-lg text-sm font-medium transition-colors flex items-center justify-center
                ${btn === '=' ? 'bg-[#3635B8] text-white hover:bg-opacity-90 col-span-1' :
                  ['÷', '×', '-', '+'].includes(btn) ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' :
                  'bg-[#F3F4F6] text-gray-700 hover:bg-gray-200'}
              `}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickCalc;
