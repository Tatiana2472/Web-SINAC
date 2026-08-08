import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import logoSinac from '@/assets/Logo-SINAC.png';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string; // HTML or Markdown or just plain text with newlines
}

export function InfoModal({ isOpen, onClose, title, content }: InfoModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header with Logo */}
          <div className="relative p-6 sm:p-8 bg-[#1E3A2B] text-white flex flex-col items-center">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="bg-white p-3 rounded-xl mb-4 shadow-lg">
              <img 
                src={logoSinac} 
                alt="SINAC Logo" 
                className="h-16 object-contain" 
              />
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold text-center">
              {title}
            </h2>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar bg-gray-50">
            <div className="prose prose-lg max-w-none text-gray-700">
              {content.split('\n').map((paragraph, index) => {
                if (!paragraph.trim()) return <br key={index} />;
                if (paragraph.startsWith('- ')) {
                  return (
                    <li key={index} className="ml-4 mb-2 list-disc">
                      {paragraph.substring(2)}
                    </li>
                  );
                }
                if (paragraph.includes(':')) {
                  const firstColonIndex = paragraph.indexOf(':');
                  const titlePart = paragraph.substring(0, firstColonIndex + 1);
                  const restPart = paragraph.substring(firstColonIndex + 1);
                  
                  if (paragraph.length < 60 && restPart.trim() === '') {
                     return <strong key={index} className="block mt-4 mb-2 text-black">{paragraph}</strong>
                  }

                  return (
                    <p key={index} className="mb-4 leading-relaxed">
                      <strong className="text-black font-bold">{titlePart}</strong>
                      {restPart}
                    </p>
                  );
                }
                
                return (
                  <p key={index} className="mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </div>
          
          {/* Footer */}
          <div className="p-6 bg-white border-t border-gray-100 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-[#27C5D8] text-white rounded-xl font-medium hover:bg-[#1fa5b5] transition-colors"
            >
              Cerrar
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
