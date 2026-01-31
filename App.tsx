import React, { useState, useEffect, useReducer } from 'react';
import { Pyramid, RefreshCw, Plus, Tag, Layers } from 'lucide-react';

import { Category, Domain, AppState, Action } from './types';
import { IMAGE_CATEGORIES, APP_CATEGORIES, FREE_CATEGORIES } from './constants';
import { CategorySection } from './components/CategorySection';
import { CreateCategoryModal } from './components/CreateCategoryModal';
import { OutputDisplay } from './components/OutputDisplay';

const initialState: AppState = {
  selectedDomain: 'image',
  subject: '',
  image: {
    categories: IMAGE_CATEGORIES,
    selectedTags: new Set(),
    customTags: {}
  },
  app: {
    categories: APP_CATEGORIES,
    selectedTags: new Set(),
    customTags: {}
  },
  free: {
    categories: FREE_CATEGORIES,
    selectedTags: new Set(),
    customTags: {}
  }
};

function appReducer(state: AppState, action: Action): AppState {
  const domain = state.selectedDomain;
  const currentDomainState = state[domain];

  switch (action.type) {
    case 'SET_DOMAIN':
      return { ...state, selectedDomain: action.domain };
    
    case 'SET_SUBJECT':
      return { ...state, subject: action.subject };

    case 'TOGGLE_TAG': {
      const newTags = new Set(currentDomainState.selectedTags);
      if (newTags.has(action.option)) {
        newTags.delete(action.option);
      } else {
        newTags.add(action.option);
      }
      return {
        ...state,
        [domain]: { ...currentDomainState, selectedTags: newTags }
      };
    }

    case 'ADD_CUSTOM_TAG': {
      const current = currentDomainState.customTags[action.categoryId] || [];
      if (current.includes(action.tag)) return state;
      return {
        ...state,
        [domain]: {
          ...currentDomainState,
          customTags: {
            ...currentDomainState.customTags,
            [action.categoryId]: [action.tag, ...current]
          }
        }
      };
    }

    case 'REMOVE_CUSTOM_TAG': {
      const current = currentDomainState.customTags[action.categoryId] || [];
      return {
        ...state,
        [domain]: {
          ...currentDomainState,
          customTags: {
            ...currentDomainState.customTags,
            [action.categoryId]: current.filter(t => t !== action.tag)
          }
        }
      };
    }

    case 'CREATE_CATEGORY': {
      const newCategory: Category = {
        id: `custom-${Date.now()}`,
        label: action.name,
        icon: action.icon,
        color: 'text-indigo-400',
        options: []
      };
      return {
        ...state,
        [domain]: {
          ...currentDomainState,
          categories: [...currentDomainState.categories, newCategory]
        }
      };
    }

    case 'RESET_DOMAIN': {
      const defaultCategories = 
        domain === 'image' ? IMAGE_CATEGORIES : 
        domain === 'app' ? APP_CATEGORIES : 
        FREE_CATEGORIES;
      
      return {
        ...state,
        subject: '',
        [domain]: {
          categories: defaultCategories,
          selectedTags: new Set(),
          customTags: {}
        }
      };
    }

    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const currentDomainState = state[state.selectedDomain];

  // Generate prompt whenever state changes
  useEffect(() => {
    const getCategoryTags = (catId: string) => {
        const category = currentDomainState.categories.find(c => c.id === catId);
        if (!category) return '';
        const custom = currentDomainState.customTags[catId] || [];
        const selectedDefault = category.options.filter(opt => currentDomainState.selectedTags.has(opt));
        return Array.from(new Set([...custom, ...selectedDefault])).join(' · ');
    };

    const sVal = state.subject.trim() ? state.subject.trim() : 'Untitled';
    
    const getLabelKey = (label: string) => {
        if (label.includes('Subject')) return 'S';
        if (label.includes('Artist')) return 'A';
        if (label.includes('Epoch')) return 'E';
        if (label.includes('Realism')) return 'R';
        if (label.includes('Lighting')) return 'L';
        if (label.includes('Camera')) return 'C';
        if (label.includes('Vibe')) return 'V';
        if (label.includes('Toolkit')) return 'U';
        if (label.includes('Type')) return 'T';
        if (label.includes('Features')) return 'K';
        if (label.includes('Typography')) return 'F';
        if (label.includes('Shapes')) return 'S';
        if (label.includes('Iconography')) return 'I';
        if (label.includes('Color')) return 'C';
        if (label.includes('Layout')) return 'L';
        if (label.includes('Interaction')) return 'N';
        return label.charAt(0).toUpperCase();
    };

    const activeParts = [
        { key: 'S', label: 'Subject', value: sVal },
        ...currentDomainState.categories.map(cat => ({
            key: getLabelKey(cat.label),
            label: cat.label.split('&')[0].trim(),
            value: getCategoryTags(cat.id)
        }))
    ].filter(p => p.value && p.value.length > 0);

    if (activeParts.length === 0) {
        setGeneratedPrompt('');
        return;
    }

    const headerLabels = activeParts.map(p => p.label).join(' · ');
    const bodyLines = activeParts.map(p => `${p.key}:: ${p.value}`).join('\n');
    
    const kernelTitle = 
      state.selectedDomain === 'image' ? 'SAERLCV KERNEL' : 
      state.selectedDomain === 'app' ? 'APP-GEN KERNEL' : 
      'FREE KERNEL';
    
    const finalDisplayString = `///▙▖▙▖▞▞▙▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂
▛///▞ ${kernelTitle} ::
//▞▞〔${headerLabels}〕
${bodyLines}
:: ∎
${state.selectedDomain === 'image' ? '--v 6.0' : ''}`;

    setGeneratedPrompt(finalDisplayString);

  }, [state, currentDomainState]);

  const copyToClipboard = () => {
    if (!generatedPrompt) return;
    navigator.clipboard.writeText(generatedPrompt).catch(err => {
        console.error('Failed to copy: ', err);
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8 font-sans selection:bg-purple-500/30 pb-20">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col items-start gap-4 border-b border-slate-800 pb-6">
          <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                    <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-2 rounded-lg text-slate-950 shadow-lg shadow-orange-500/20">
                        <Pyramid size={28} strokeWidth={2.5} />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-500">
                    KERNEL<span className="text-slate-700">PRISM</span>
                    </h1>
                </div>
                <p className="text-slate-500 font-mono text-sm max-w-md">
                /// KERNEL.PROMPT.GENERATOR :: {state.selectedDomain.toUpperCase()}.MODE
                </p>
              </div>
              
              <button 
                onClick={() => dispatch({ type: 'RESET_DOMAIN' })}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                RESET SYSTEM
              </button>
          </div>

          {/* Domain Tabs */}
          <div className="flex p-1 bg-slate-900 rounded-xl border border-slate-800">
             {(['image', 'app', 'free'] as Domain[]).map((d) => (
               <button
                 key={d}
                 onClick={() => dispatch({ type: 'SET_DOMAIN', domain: d })}
                 className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                   state.selectedDomain === d 
                     ? d === 'image' ? 'bg-slate-800 text-white shadow-lg' :
                       d === 'app' ? 'bg-amber-800 text-white shadow-lg' :
                       'bg-emerald-800 text-white shadow-lg'
                     : 'text-slate-500 hover:text-slate-300'
                 }`}
               >
                 {d.toUpperCase()}
               </button>
             ))}
          </div>
        </header>

        {/* Main Input + Add Category Button */}
        <div className="flex gap-2">
            <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Layers className="h-5 w-5 text-slate-500" />
                </div>
                <input
                    type="text"
                    value={state.subject}
                    onChange={(e) => dispatch({ type: 'SET_SUBJECT', subject: e.target.value })}
                    placeholder={
                        state.selectedDomain === 'image' ? "Enter core subject..." : 
                        state.selectedDomain === 'app' ? "Enter app concept (e.g. 'Yoga Tracker')..." : 
                        "Enter subject..."
                    }
                    className="w-full bg-slate-900/50 border border-slate-700 text-slate-100 text-lg rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 block transition-all shadow-inner placeholder:text-slate-600"
                />
            </div>
            <button
                onClick={() => setIsCategoryModalOpen(true)}
                title="Create New Category"
                className="w-16 shrink-0 rounded-2xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-all shadow-lg active:scale-95"
            >
                <Plus size={24} />
            </button>
        </div>

        {/* Categories Grid or Empty State */}
        {currentDomainState.categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-slate-800 rounded-2xl bg-slate-900/20 text-center">
             <div className="p-4 rounded-2xl bg-slate-900 mb-5 shadow-xl shadow-black/20 border border-slate-800">
                <Layers className="w-10 h-10 text-slate-600" />
             </div>
             <p className="text-large text-slate-500 mb-2">No Categories Configured</p>
             <p className="text-sm text-slate-500 leading-relaxed">
               Create a new category to start building your free-form prompt.
             </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
            {currentDomainState.categories.map((category) => (
              <CategorySection
                key={category.id}
                category={category}
                selectedOptions={currentDomainState.selectedTags}
                customTags={currentDomainState.customTags}
                onAddCustomTag={(catId, tag) => dispatch({ type: 'ADD_CUSTOM_TAG', categoryId: catId, tag })}
                onRemoveCustomTag={(catId, tag) => dispatch({ type: 'REMOVE_CUSTOM_TAG', categoryId: catId, tag })}
                toggleOption={(opt) => dispatch({ type: 'TOGGLE_TAG', option: opt })}
              />
            ))}
          </div>
        )}

        {/* Output Area */}
        <div className="sticky bottom-4 z-10">
            <OutputDisplay 
              prompt={generatedPrompt} 
              onCopy={copyToClipboard}
            />
        </div>

        {/* Footer Decor */}
        <div className="flex justify-center pt-8 opacity-30">
            <div className="flex gap-4 font-mono text-xs tracking-widest text-slate-500">
                <span>P:: PURPOSE</span>
                <span>R:: RULES</span>
                <span>I:: IDENTITY</span>
                <span>S:: STRUCTURE</span>
                <span>M:: MOTION</span>
            </div>
        </div>

        {/* Modals */}
        <CreateCategoryModal 
            isOpen={isCategoryModalOpen} 
            onClose={() => setIsCategoryModalOpen(false)} 
            onCreate={(name) => dispatch({ type: 'CREATE_CATEGORY', name, icon: <Tag className="w-5 h-5" /> })} 
        />

      </div>
    </div>
  );
}
