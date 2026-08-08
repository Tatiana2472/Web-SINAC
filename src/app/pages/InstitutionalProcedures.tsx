import { useState, useEffect } from 'react';
import { FileText, ChevronRight, ChevronLeft, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Footer } from '../components/Footer';
import { Navigation } from '../components/Navigation';
import { proceduresData } from '../data/proceduresData';

export function InstitutionalProcedures() {
  const { language } = useLanguage();
  const isEnglish = language === 'EN';
  const ITEMS_PER_PAGE = 15;

  const getStr = (strObj?: {es: string, en: string}) => {
    if (!strObj) return '';
    return isEnglish ? (strObj.en || strObj.es) : strObj.es;
  };

  // Read category from URL hash on mount (e.g. #vida-silvestre)
  const getInitialCategory = () => {
    const hash = window.location.hash.replace('#', '');
    const found = proceduresData.categories.find(c => c.id === hash);
    return found ? found.id : proceduresData.categories[0].id;
  };

  const [activeCategoryId, setActiveCategoryId] = useState(getInitialCategory);
  const [currentPage, setCurrentPage] = useState(1);

  // When the user picks a category, save it in the URL hash with pushState
  // so the browser back button can restore it
  const handleCategoryChange = (id: string) => {
    setActiveCategoryId(id);
    setCurrentPage(1);
    // pushState adds a history entry; pressing Back will fire popstate
    window.history.pushState({ categoryId: id }, '', `#${id}`);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    // Write initial hash if not present
    if (!window.location.hash) {
      window.history.replaceState({ categoryId: activeCategoryId }, '', `#${activeCategoryId}`);
    }
    // Restore category when user presses browser Back / Forward
    const onPopState = (e: PopStateEvent) => {
      const id = e.state?.categoryId || window.location.hash.replace('#', '');
      const found = proceduresData.categories.find(c => c.id === id);
      if (found) {
        setActiveCategoryId(found.id);
        setCurrentPage(1);
        // Scroll to top of the page so the user sees the category from the start
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const activeCategory = proceduresData.categories.find(c => c.id === activeCategoryId) || proceduresData.categories[0];

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#333333] flex flex-col">
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-[#1E3A2B]/90 text-white/70 text-xs px-6 py-2">
        <div className="mx-auto max-w-7xl">
          <span>Inicio</span> <span className="mx-1">/</span>
          <span>Trámites</span> <span className="mx-1">/</span>
          <span className="text-white font-medium">{isEnglish ? 'Institutional Procedures' : 'Trámites Institucionales'}</span>
        </div>
      </div>

      {/* Page header */}
      <div className="bg-[#1E3A2B] text-white py-10">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#8fe8e5]">
            {isEnglish ? 'Institutional Procedures' : 'Trámites Institucionales'}
          </h1>
          <p className="mt-2 text-slate-300 text-sm max-w-3xl">{getStr(proceduresData.description)}</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 mx-auto max-w-7xl w-full px-6 py-10 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row gap-8 items-start">

          {/* SIDEBAR - exact style: green header + gray body */}
          <div className="w-full md:w-64 shrink-0">
            <div className="rounded-lg overflow-hidden shadow border border-gray-200 sticky top-24">
              {/* Green header */}
              <div className="bg-[#8cc33f] text-white font-bold text-sm px-4 py-3 text-center uppercase tracking-wide">
                {isEnglish ? 'Institutional Procedures' : 'Trámites Institucionales'}
              </div>
              {/* Gray list */}
              <ul className="bg-[#e8e8e8]">
                {proceduresData.categories.map((cat) => (
                  <li key={cat.id} className="border-b border-gray-300 last:border-b-0">
                    <button
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors flex items-center justify-between gap-2 ${
                        activeCategoryId === cat.id
                          ? 'bg-white text-[#1E3A2B] font-semibold border-l-4 border-l-[#8cc33f]'
                          : 'text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      <span>{getStr(cat.name)}</span>
                      {activeCategoryId === cat.id && (
                        <ChevronRight className="w-3 h-3 text-[#8cc33f] shrink-0" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 min-h-[400px]">
              <h2 className="text-2xl font-bold text-[#1E3A2B] mb-2">{getStr(activeCategory.name)}</h2>
              <p className="text-gray-500 text-sm mb-8 border-b border-gray-100 pb-6">{getStr(activeCategory.description)}</p>

              {activeCategory.procedures.length > 0 ? (
                <div className="space-y-0">
                  {/* Table header */}
                  <div className="grid grid-cols-[1fr_2fr] bg-[#1E3A2B] text-white text-xs font-bold uppercase rounded-t-lg overflow-hidden">
                    <div className="px-4 py-3">{isEnglish ? 'Procedure Name' : 'Nombre Trámite'}</div>
                    <div className="px-4 py-3 border-l border-white/20">{isEnglish ? 'Description' : 'Descripción'}</div>
                  </div>
                  {/* Table rows */}
                  {activeCategory.procedures.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE).map((proc, index) => (
                    <div
                      key={index}
                      className={`grid grid-cols-[1fr_2fr] border-b border-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-[#f0f9e8] transition-colors`}
                    >
                      <div className="px-4 py-4 border-r border-gray-200">
                        {proc.link ? (
                          <a
                            href={proc.link}
                            className="text-[#008cba] hover:text-[#006a8a] hover:underline font-medium text-sm flex items-start gap-1.5 group"
                          >
                            <span>{getStr(proc.name)}</span>
                            <ExternalLink className="w-3 h-3 mt-0.5 shrink-0 opacity-60 group-hover:opacity-100" />
                          </a>
                        ) : (
                          <span className="text-[#1E3A2B] font-medium text-sm">{getStr(proc.name)}</span>
                        )}
                      </div>
                      <div className="px-4 py-4">
                        <p className="text-gray-600 text-sm leading-relaxed">{getStr(proc.description)}</p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Pagination */}
                  {Math.ceil(activeCategory.procedures.length / ITEMS_PER_PAGE) > 1 && (
                    <div className="flex items-center justify-center gap-4 py-4 bg-gray-50 border border-t-0 border-gray-200">
                      <button 
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-1 text-gray-500 hover:text-[#1E3A2B] disabled:opacity-30 transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <span className="text-sm font-medium text-gray-600">
                        {(currentPage - 1) * ITEMS_PER_PAGE + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, activeCategory.procedures.length)}
                      </span>
                      <button 
                        onClick={() => setCurrentPage(p => Math.min(Math.ceil(activeCategory.procedures.length / ITEMS_PER_PAGE), p + 1))}
                        disabled={currentPage === Math.ceil(activeCategory.procedures.length / ITEMS_PER_PAGE)}
                        className="p-1 text-gray-500 hover:text-[#1E3A2B] disabled:opacity-30 transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}

                  <div className="rounded-b-lg overflow-hidden border border-t-0 border-gray-200 h-1 bg-[#8cc33f]" />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <FileText className="w-12 h-12 text-gray-300 mb-4" />
                  <p className="text-gray-400 text-sm">
                    {getStr(proceduresData.emptyMessage)} "{getStr(activeCategory.name)}".
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
