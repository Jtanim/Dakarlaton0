import React from 'react';
import { X } from 'lucide-react';
import { GccSalaryTrends } from './GccSalaryTrends';

interface SalaryTrendsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SalaryTrendsModal: React.FC<SalaryTrendsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-stone-200 flex flex-col relative">
        {/* Modal Header Bar */}
        <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#5925DC]" />
            <span className="font-serif font-bold text-base sm:text-lg text-[#1F104F]">
              2026 GCC Salary & Talent Benchmarks
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-8 overflow-y-auto flex-1 bg-white">
          <GccSalaryTrends />
        </div>
      </div>
    </div>
  );
};
