import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Ban } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface RecommendationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const recommendationsList = [
  { textES: 'Se recomienda el uso de ropa y calzado cómodo.', textEN: 'Comfortable clothing and footwear are recommended.', icon: CheckCircle2, color: 'text-green-500' },
  { textES: 'No se permite el ingreso de plásticos de un solo uso.', textEN: 'Single-use plastics are not allowed.', icon: Ban, color: 'text-red-500' },
  { textES: 'No se permite el ingreso de mascotas.', textEN: 'Pets are not allowed.', icon: Ban, color: 'text-red-500' },
  { textES: 'No se permite ingresar al río.', textEN: 'Entering the river is not allowed.', icon: Ban, color: 'text-red-500' },
  { textES: 'No se permite el ingreso de drones.', textEN: 'Drones are not allowed.', icon: Ban, color: 'text-red-500' },
  { textES: 'Prohibido el ingreso de bebidas alcohólicas.', textEN: 'Alcoholic beverages are prohibited.', icon: Ban, color: 'text-red-500' },
  { textES: 'Prohibido fumar.', textEN: 'Smoking is prohibited.', icon: Ban, color: 'text-red-500' },
  { textES: 'Mantenerse siempre en el sendero.', textEN: 'Always stay on the trail.', icon: CheckCircle2, color: 'text-green-500' },
];

export function RecommendationsModal({ isOpen, onClose }: RecommendationsModalProps) {
  const { language } = useLanguage();
  const isEnglish = language === 'EN';

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
          className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="relative p-6 sm:p-8 bg-[#1E3A2B] text-white">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              {isEnglish ? 'Recommendations for your visit' : 'Recomendaciones para su visita'}
            </h2>
            <p className="text-white/80 text-sm sm:text-base pr-8">
              {isEnglish
                ? 'To ensure a safe experience and protect our natural environment, please follow these guidelines.'
                : 'Para garantizar una experiencia segura y proteger nuestro entorno natural, le solicitamos seguir estas indicaciones.'}
            </p>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-1 gap-4">
              {recommendationsList.map((rec, index) => {
                const Icon = rec.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100"
                  >
                    <div className={`mt-0.5 flex-shrink-0 ${rec.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <p className="text-gray-700 font-medium">
                      {isEnglish ? rec.textEN : rec.textES}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
          
          {/* Footer */}
          <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-[#27C5D8] text-white rounded-xl font-medium hover:bg-[#1fa5b5] transition-colors"
            >
              {isEnglish ? 'Understood' : 'Entendido'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
