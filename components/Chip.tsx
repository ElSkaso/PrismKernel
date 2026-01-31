import React from 'react';
import { X } from 'lucide-react';

interface ChipProps {
  label: string;
  isSelected: boolean;
  onClick: (e: React.MouseEvent) => void;
}

export const Chip: React.FC<ChipProps> = ({ label, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={`
      px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-out
      border select-none whitespace-nowrap
      ${isSelected 
        ? `bg-slate-100 text-slate-900 border-slate-100 shadow-[0_0_15px_rgba(255,255,255,0.3)] scale-105` 
        : `bg-slate-800/50 text-slate-400 border-slate-700 hover:bg-slate-800 hover:border-slate-500 hover:text-slate-200`
      }
    `}
  >
    {label}
  </button>
);

interface CustomChipProps {
  label: string;
  onRemove: (e: React.MouseEvent) => void;
}

export const CustomChip: React.FC<CustomChipProps> = ({ label, onRemove }) => (
  <button
    onClick={onRemove}
    className="
      flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ease-out
      border select-none animate-in fade-in zoom-in-95 whitespace-nowrap
      bg-indigo-600 text-white border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)] 
      hover:bg-red-500 hover:border-red-500 hover:shadow-red-500/40 group
    "
  >
    {label}
    <div className="bg-indigo-500 group-hover:bg-red-600 rounded-full p-0.5 transition-colors">
        <X size={12} strokeWidth={3} />
    </div>
  </button>
);