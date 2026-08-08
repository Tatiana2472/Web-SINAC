import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle2, Ban } from 'lucide-react';

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

export function Recommendations() {
  const { language } = useLanguage();
  const isEnglish = language === 'EN';

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#27C5D8] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1E3A2B] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
      
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-[#27C5D8]/10 border border-[#27C5D8]/20 rounded-full text-[#27C5D8] text-sm font-medium mb-4">
            {isEnglish ? 'Important Information' : 'Información Importante'}
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1E3A2B] mb-4">
            {isEnglish ? 'Recommendations for your visit' : 'Recomendaciones para su visita'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {isEnglish 
              ? 'To ensure a safe experience and protect our natural environment, please follow these guidelines during your stay.' 
              : 'Para garantizar una experiencia segura y proteger nuestro entorno natural, le solicitamos seguir estas indicaciones durante su estancia.'}
          </p>
        </motion.div>

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recommendationsList.map((rec, index) => {
              const Icon = rec.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors"
                >
                  <div className={`mt-1 flex-shrink-0 ${rec.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className="text-lg text-gray-700 font-medium">
                    {isEnglish ? rec.textEN : rec.textES}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
