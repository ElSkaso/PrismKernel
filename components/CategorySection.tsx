import React, { useState } from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import { Chip, CustomChip } from './Chip';
import { Category, CustomTagsState } from '../types';

interface SectionProps {
  category: Category;
  selectedOptions: Set<string>;
  customTags: CustomTagsState;
  onAddCustomTag: (categoryId: string, tag: string) => void;
  onRemoveCustomTag: (categoryId: string, tag: string) => void;
  toggleOption: (option: string) => void;
}

export const CategorySection: React.FC<SectionProps> = ({ 
  category, 
  selectedOptions, 
  toggleOption, 
  customTags, 
  onAddCustomTag, 
  onRemoveCustomTag 
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      onAddCustomTag(category.id, inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className={`
      mb-4 rounded-2xl border transition-all duration-300
      ${isExpanded 
        ? 'bg-slate-900/40 border-slate-700/50 p-4' 
        : 'bg-slate-900/20 border-slate-800/50 p-4 hover:border-slate-700/50'
      }
    `}>
      <div 
        className="flex items-center justify-between cursor-pointer group select-none"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-slate-800 ${category.color}`}>
            {category.icon}
          </div>
          <h3 className="text-lg font-semibold text-slate-200 tracking-wide group-hover:text-white transition-colors">
            {category.label}
          </h3>
          
          {/* Active Count Badge */}
          {!isExpanded && (
             (() => {
                const custom = customTags[category.id] || [];
                const activeCount = category.options.filter(o => selectedOptions.has(o)).length + custom.length;
                return activeCount > 0 ? (
                  <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-in zoom-in-50">
                    {activeCount}
                  </span>
                ) : null;
             })()
          )}
        </div>
        <div className={`p-1 rounded-full text-slate-500 hover:bg-slate-800 transition-all duration-300 ${isExpanded ? 'rotate-180 text-slate-200' : ''}`}>
            <ChevronDown size={20} />
        </div>
      </div>
      
      {/* Input Field - Always visible */}
      <div className="relative mt-4 mb-4 group animate-in slide-in-from-top-2 duration-300">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Plus className="h-4 w-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
          </div>
          <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Add custom ${category.label.toLowerCase()}...`}
              className="w-full bg-slate-950/50 border border-slate-700/50 text-slate-300 text-sm rounded-xl py-2.5 pl-9 pr-4 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 block transition-all placeholder:text-slate-600 hover:bg-slate-900/80 hover:border-slate-600"
          />
      </div>

      {/* Chips Container */}
      <div className={`
        flex flex-wrap gap-2 transition-all duration-500 ease-in-out mt-2 relative
        ${isExpanded 
          ? 'max-h-[1000px] opacity-100' 
          : 'max-h-[40px] overflow-hidden opacity-60'
        }
      `}>
        {/* Custom Tags */}
        {(customTags[category.id] || []).map((tag) => (
            <CustomChip 
                key={tag} 
                label={tag} 
                onRemove={(e) => {
                    e.stopPropagation();
                    onRemoveCustomTag(category.id, tag);
                }} 
            />
        ))}

        {/* Default Tags */}
        {category.options.map((option) => (
          <Chip
            key={option}
            label={option}
            isSelected={selectedOptions.has(option)}
            onClick={(e) => {
                e.stopPropagation();
                toggleOption(option);
            }}
          />
        ))}
        
        {/* Mask for collapsed state to indicate truncation */}
        {!isExpanded && (
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-950/20 to-transparent pointer-events-none" />
        )}
      </div>
    </div>
  );
};