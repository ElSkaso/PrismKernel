import React, { useState, useEffect } from 'react';
import { Pyramid, RefreshCw, Plus, Tag, Layers } from 'lucide-react';

import { Category, Domain, CustomTagsState } from './types';
import { IMAGE_CATEGORIES, APP_CATEGORIES, FREE_CATEGORIES } from './constants';
import { CategorySection } from './components/CategorySection';
import { CreateCategoryModal } from './components/CreateCategoryModal';
import { OutputDisplay } from './components/OutputDisplay';

export default function App() {
  const [subject, setSubject] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<Domain>('image');
  
  // State for Image Domain
  const [imageCategories, setImageCategories] = useState<Category[]>(IMAGE_CATEGORIES);
  const [imageSelectedTags, setImageSelectedTags] = useState<Set<string>>(new Set());
  const [imageCustomTags, setImageCustomTags] = useState<CustomTagsState>({}); 

  // State for App Domain
  const [appCategories, setAppCategories] = useState<Category[]>(APP_CATEGORIES);
  const [appSelectedTags, setAppSelectedTags] = useState<Set<string>>(new Set());
  const [appCustomTags, setAppCustomTags] = useState<CustomTagsState>({});

  // State for Free Domain
  const [freeCategories, setFreeCategories] = useState<Category[]>(FREE_CATEGORIES);
  const [freeSelectedTags, setFreeSelectedTags] = useState<Set<string>>(new Set());
  const [freeCustomTags, setFreeCustomTags] = useState<CustomTagsState>({});

  const [generatedPrompt, setGeneratedPrompt] = useState('');
  
  // UI State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  
  // Derived Active State
  const currentCategories = selectedDomain === 'image' ? imageCategories : selectedDomain === 'app' ? appCategories : freeCategories;
  const currentSelectedTags = selectedDomain === 'image' ? imageSelectedTags : selectedDomain === 'app' ? appSelectedTags : freeSelectedTags;
  const currentCustomTags = selectedDomain === 'image' ? imageCustomTags : selectedDomain === 'app' ? appCustomTags : freeCustomTags;

  const toggleOption = (option: string) => {
    const newTags = new Set(currentSelectedTags);
    if (newTags.has(option)) {
      newTags.delete(option);
    } else {
      newTags.add(option);
    }
    
    if (selectedDomain === 'image') setImageSelectedTags(newTags);
    else if (selectedDomain === 'app') setAppSelectedTags(newTags);
    else setFreeSelectedTags(newTags);
  };

  const addCustomTag = (categoryId: string, tag: string) => {
    const setter = selectedDomain === 'image' ? setImageCustomTags : selectedDomain === 'app' ? setAppCustomTags : setFreeCustomTags;
    setter(prev => {
        const current = prev[categoryId] || [];
        if (current.includes(tag)) return prev;
        return { ...prev, [categoryId]: [tag, ...current] };
    });
  };

  const removeCustomTag = (categoryId: string, tag: string) => {
    const setter = selectedDomain === 'image' ? setImageCustomTags : selectedDomain === 'app' ? setAppCustomTags : setFreeCustomTags;
    setter(prev => {
        const current = prev[categoryId] || [];
        return { ...prev, [categoryId]: current.filter(t => t !== tag) };
    });
  };

  const createCategory = (name: string) => {
    const newId = `custom-${Date.now()}`;
    const newCategory: Category = {
      id: newId,
      label: name,
      icon: <Tag className="w-5 h-5" />,
      color: 'text-indigo-400',
      options: []
    };

    if (selectedDomain === 'image') {
        setImageCategories(prev => [...prev, newCategory]);
    } else if (selectedDomain === 'app') {
        setAppCategories(prev => [...prev, newCategory]);
    } else {
        setFreeCategories(prev => [...prev, newCategory]);
    }
  };

  const clearAll = () => {
    setSubject('');
    // Only clear current domain
    if (selectedDomain === 'image') {
        setImageSelectedTags(new Set());
        setImageCustomTags({});
        setImageCategories(IMAGE_CATEGORIES);
    } else if (selectedDomain === 'app') {
        setAppSelectedTags(new Set());
        setAppCustomTags({});
        setAppCategories(APP_CATEGORIES);
    } else {
        setFreeSelectedTags(new Set());
        setFreeCustomTags({});
        setFreeCategories(FREE_CATEGORIES);
    }
  };

  // Generate prompt whenever state changes
  useEffect(() => {
    const getCategoryTags = (catId: string) => {
        const category = currentCategories.find(c => c.id === catId);
        if (!category) return '';
        const custom = currentCustomTags[catId] || [];
        const selectedDefault = category.options.filter(opt => currentSelectedTags.has(opt));
        return Array.from(new Set([...custom, ...selectedDefault])).join(' · ');
    };

    const sVal = subject.trim() ? subject.trim() : 'Untitled';
    
    const getLabelKey = (label: string) => {
        // Image Keys
        if (label.includes('Subject')) return 'S';
        if (label.includes('Artist')) return 'A';
        if (label.includes('Epoch')) return 'E';
        if (label.includes('Realism')) return 'R';
        if (label.includes('Lighting')) return 'L';
        if (label.includes('Camera')) return 'C';
        if (label.includes('Vibe')) return 'V';
        
        // App Keys
        if (label.includes('Toolkit')) return 'U';
        if (label.includes('Type')) return 'T';
        if (label.includes('Features')) return 'K'; // Key Features
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
        ...currentCategories.map(cat => ({
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
    
    // Domain specific kernel Header
    const kernelTitle = selectedDomain === 'image' ? 'SAERLCV KERNEL' : selectedDomain === 'app' ? 'APP-GEN KERNEL' : 'FREE KERNEL';
    
    const finalDisplayString = `///▙▖▙▖▞▞▙▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂
▛///▞ ${kernelTitle} ::
//▞▞〔${headerLabels}〕
${bodyLines}
:: ∎
${selectedDomain === 'image' ? '--v 6.0' : ''}`;

    setGeneratedPrompt(finalDisplayString);

  }, [subject, currentSelectedTags, currentCustomTags, currentCategories, selectedDomain]);

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
                /// KERNEL.PROMPT.GENERATOR :: {selectedDomain.toUpperCase()}.MODE
                </p>
              </div>
              
              <button 
                onClick={clearAll}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                RESET SYSTEM
              </button>
          </div>

          {/* Domain Tabs */}
          <div className="flex p-1 bg-slate-900 rounded-xl border border-slate-800">
             <button
               onClick={() => setSelectedDomain('image')}
               className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${selectedDomain === 'image' ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
             >
               IMAGE
             </button>
             <button
               onClick={() => setSelectedDomain('app')}
               className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${selectedDomain === 'app' ? 'bg-amber-800 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-500 hover:text-slate-300'}`}
             >
               APP UI
             </button>
             <button
               onClick={() => setSelectedDomain('free')}
               className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${selectedDomain === 'free' ? 'bg-emerald-800 text-white shadow-lg shadow-fuchsia-500/20' : 'text-slate-500 hover:text-slate-300'}`}
             >
               FREE
             </button>
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
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder={
                        selectedDomain === 'image' ? "Enter core subject..." : 
                        selectedDomain === 'app' ? "Enter app concept (e.g. 'Yoga Tracker')..." : 
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
        {currentCategories.length === 0 ? (
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
            {currentCategories.map((category) => (
              <CategorySection
                key={category.id}
                category={category}
                selectedOptions={currentSelectedTags}
                customTags={currentCustomTags}
                onAddCustomTag={addCustomTag}
                onRemoveCustomTag={removeCustomTag}
                toggleOption={toggleOption}
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
            onCreate={createCategory} 
        />

      </div>
    </div>
  );
}