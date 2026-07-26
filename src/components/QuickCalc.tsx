import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';

const QuickCalc: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const formatNumber = (numStr: string) => {
    if (numStr === 'Error') return numStr;
    const numericValue = Number(numStr);
    if (!Number.isFinite(numericValue)) return numStr;
    return numericValue.toLocaleString('en-IN', { maximumFractionDigits: 8 });
  };

  const calculate = (a: number, b: number, op: string) => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case 'x': return a * b;
      case '/': return b === 0 ? NaN : a / b;
      default: return b;
    }
  };

  const clearCalculator = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperator(null);
    setWaitingForNewValue(false);
  };

  const handleButtonClick = (btn: string) => {
    if (['+', '-', 'x', '/'].includes(btn)) {
      if (operator && !waitingForNewValue && previousValue !== null) {
        const result = calculate(previousValue, Number(display), operator);
        if (!Number.isFinite(result)) {
          clearCalculator();
          setDisplay('Error');
          return;
        }
        setDisplay(String(result));
        setPreviousValue(result);
      } else {
        setPreviousValue(Number(display));
      }
      setOperator(btn);
      setWaitingForNewValue(true);
      return;
    }

    if (btn === '=') {
      if (operator && previousValue !== null) {
        const result = calculate(previousValue, Number(display), operator);
        if (!Number.isFinite(result)) {
          clearCalculator();
          setDisplay('Error');
        } else {
          setDisplay(String(result));
          setPreviousValue(null);
          setOperator(null);
          setWaitingForNewValue(true);
        }
      }
      return;
    }

    if (btn === '.') {
      if (waitingForNewValue) {
        setDisplay('0.');
        setWaitingForNewValue(false);
      } else if (!display.includes('.')) {
        setDisplay(`${display}.`);
      }
      return;
    }

    if (waitingForNewValue || display === '0' || display === 'Error') {
      setDisplay(btn);
      setWaitingForNewValue(false);
    } else {
      setDisplay(`${display}${btn}`);
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-800 bg-gray-950 smooth-control hover:border-gray-700">
      <div className="flex items-center justify-between border-b border-gray-800 bg-gray-900 px-3 py-2">
        <span className="eyebrow text-[#f4510b]">Quick Calc</span>
        <button
          onClick={clearCalculator}
          className="flex h-6 w-6 items-center justify-center rounded-md bg-orange-600 text-white smooth-control hover:bg-orange-700"
          title="Clear calculator"
          aria-label="Clear calculator"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="p-3">
        <div className="mb-3 rounded-lg border border-gray-800 bg-gray-900 p-3 text-right">
          <div className="mb-0.5 text-[11px] font-semibold uppercase text-gray-400">Result {operator && !waitingForNewValue && `(${operator})`}</div>
          <div className="truncate text-2xl font-semibold text-white" title={display}>
            {formatNumber(display)}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-1.5">
          {['7', '8', '9', '/', '4', '5', '6', 'x', '1', '2', '3', '-', '0', '.', '=', '+'].map((btn) => (
            <button
              key={btn}
              onClick={() => handleButtonClick(btn)}
              className={`
                flex h-9 items-center justify-center rounded-lg border text-xs font-semibold smooth-control active:scale-95
                ${btn === '=' ? 'bg-[#f4510b] border-[#f4510b] text-white hover:bg-orange-800' :
                ['/', 'x', '-', '+'].includes(btn) ? 'bg-orange-500/10 border-orange-100 text-orange-400 hover:bg-orange-500/20' :
                  'bg-gray-950 border-gray-800 text-gray-200 hover:bg-gray-900 hover:border-gray-700'}
                ${operator === btn && waitingForNewValue ? 'ring-2 ring-orange-400' : ''}
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
