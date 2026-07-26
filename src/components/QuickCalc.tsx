import React, { useState } from 'react';
import { PlusSquare } from 'lucide-react';

const QuickCalc: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const formatNumber = (numStr: string) => {
    if (numStr === 'Error') return numStr;
    const parts = numStr.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  };

  const calculate = (a: number, b: number, op: string) => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return b === 0 ? NaN : a / b;
      default: return b;
    }
  };

  const handleButtonClick = (btn: string) => {
    if (['+', '-', '×', '÷'].includes(btn)) {
      if (operator && !waitingForNewValue && previousValue !== null) {
        const result = calculate(previousValue, parseFloat(display), operator);
        if (isNaN(result)) {
           setDisplay('Error');
           setPreviousValue(null);
           setOperator(null);
        } else {
           setDisplay(String(result));
           setPreviousValue(result);
        }
      } else {
        setPreviousValue(parseFloat(display));
      }
      setOperator(btn);
      setWaitingForNewValue(true);
    } else if (btn === '=') {
      if (operator && previousValue !== null) {
        const result = calculate(previousValue, parseFloat(display), operator);
        if (isNaN(result)) {
           setDisplay('Error');
        } else {
           setDisplay(String(result));
        }
        setPreviousValue(null);
        setOperator(null);
        setWaitingForNewValue(true);
      }
    } else if (btn === '.') {
      if (waitingForNewValue) {
        setDisplay('0.');
        setWaitingForNewValue(false);
      } else if (!display.includes('.')) {
        setDisplay(display + '.');
      }
    } else {
      // Numbers
      if (waitingForNewValue || display === '0' || display === 'Error') {
        setDisplay(btn);
        setWaitingForNewValue(false);
      } else {
        setDisplay(display + btn);
      }
    }
  };

  // Add a clear button handler for convenience, mapping it to clicking "C" if we had one, but we'll reset on 'Error' for now.

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden no-shadow transition-colors hover:border-gray-300">
      <div className="bg-gray-50 px-3 py-2 flex items-center justify-between border-b border-gray-200">
        <span className="font-extrabold text-[#3635B8] text-xs uppercase tracking-wider">Quick Calc</span>
        <button
           onClick={() => { setDisplay('0'); setPreviousValue(null); setOperator(null); setWaitingForNewValue(false); }}
           className="w-6 h-6 rounded bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
           title="Clear Calculator"
        >
          <PlusSquare className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="p-3">
        <div className="bg-gray-50 rounded-xl p-3 text-right mb-3 border border-gray-200">
          <div className="text-[10px] text-gray-400 font-bold uppercase mb-0.5">Result {operator && !waitingForNewValue && `(${operator})`}</div>
          <div className="text-2xl font-black text-gray-900 tracking-tight truncate" title={display}>
            {formatNumber(display)}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-1.5">
          {['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '-', '0', '.', '=', '+'].map((btn, i) => (
            <button
              key={i}
              onClick={() => handleButtonClick(btn)}
              className={`
                h-9 rounded-lg text-xs font-bold transition-all active:scale-95 flex items-center justify-center border
                ${btn === '=' ? 'bg-[#3635B8] border-[#3635B8] text-white hover:bg-blue-800' :
                  ['÷', '×', '-', '+'].includes(btn) ? 'bg-blue-50 border-blue-100 text-blue-700 hover:bg-blue-100' :
                  'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'}
                ${operator === btn && waitingForNewValue ? 'ring-2 ring-blue-400' : ''}
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
