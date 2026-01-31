import React, { useState } from 'react';
import { 
  Copy, Check, Aperture, ChevronDown, ChevronUp 
} from 'lucide-react';

interface OutputDisplayProps {
  prompt: string;
  onCopy: () => void;
}

export const OutputDisplay: React.FC<OutputDisplayProps> = ({ 
  prompt, 
  onCopy, 
}) => {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div className="relative group mt-8 transition-all duration-300 ease-in-out">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 rounded-2xl opacity-75 blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
      
      <div className="relative bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div 
          onClick={toggleExpand}
          className="flex justify-between items-center p-4 bg-slate-900/50 cursor-pointer hover:bg-slate-800/50 transition-colors"
        >
          <div className="flex items-center gap-3">
             <div className="p-1 rounded-md bg-slate-800 text-slate-400 hover:text-white transition-colors">
               {isExpanded ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
             </div>
             <div className="flex items-center gap-2 text-slate-400 text-sm font-mono uppercase tracking-widest select-none">
                <Aperture className="w-4 h-4" />
                <span className="hidden sm:inline">Output</span>
                <span className="sm:hidden">Output</span>
             </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className={`
                flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold transition-all
                ${copied 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                  : 'bg-slate-700 hover:bg-slate-600 text-white shadow-lg'
                }
              `}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? 'COPIED' : 'COPY'}</span>
            </button>
          </div>
        </div>
        
        {/* Collapsible Content Area */}
        {isExpanded && (
          <div className="px-6 pb-6 pt-2 animate-in slide-in-from-top-2 duration-300">
             <div className="pt-4 border-t border-slate-800/50">
                <div className="font-mono text-slate-300 text-sm md:text-base leading-relaxed break-words min-h-[100px] whitespace-pre-wrap">
                  {prompt || <span className="text-slate-600 italic">Start by entering a subject and selecting chips above...</span>}
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};