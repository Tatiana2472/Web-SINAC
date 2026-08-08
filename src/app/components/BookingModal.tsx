import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Users, CreditCard, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { dbService } from '../../services/dbService';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  parkName?: string;
}

export function BookingModal({ isOpen, onClose, parkName }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const { language } = useLanguage();
  const isEnglish = language === 'EN';
  const effectiveParkName = parkName || (isEnglish ? 'Volcán Tenorio National Park' : 'Parque Nacional Volcán Tenorio');
  const [formData, setFormData] = useState({
    date: '',
    visitors: '2',
    name: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const sendBookingEmail = async () => {
    const recipient = formData.email.trim();
    const subject = isEnglish
      ? `New reservation request for ${effectiveParkName}`
      : `Nueva solicitud de reserva para ${effectiveParkName}`;
      
    let formattedDate = formData.date;
    if (formData.date) {
      const [year, month, day] = formData.date.split('-');
      formattedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day)).toLocaleDateString(isEnglish ? 'en-US' : 'es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          [isEnglish ? 'Name' : 'Nombre']: formData.name,
          [isEnglish ? 'Phone' : 'Teléfono']: formData.phone,
          [isEnglish ? 'Email' : 'Correo']: recipient,
          [isEnglish ? 'Park' : 'Parque']: effectiveParkName,
          [isEnglish ? 'Date' : 'Fecha']: formattedDate,
          [isEnglish ? 'Visitors' : 'Visitantes']: formData.visitors,
          _subject: subject,
          _template: 'box',
          _captcha: 'false',
        }),
      });

      if (!response.ok) {
        throw new Error('The email service did not accept the request.');
      }
    } catch {
      const fallbackBody = `${isEnglish ? 'Name' : 'Nombre'}: ${formData.name}\n${isEnglish ? 'Phone' : 'Teléfono'}: ${formData.phone}\n${isEnglish ? 'Date' : 'Fecha'}: ${formattedDate}\n${isEnglish ? 'Visitors' : 'Visitantes'}: ${formData.visitors}`;
      window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(fallbackBody)}`;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setIsSubmitting(true);

    try {
      // Guardar en la Base de Datos
      await dbService.createReservation({
        parque_id: parkName || 'pn-volcan-tenorio',
        nombre_visitante: formData.name,
        email_visitante: formData.email,
        telefono_visitante: formData.phone,
        cantidad_visitantes: parseInt(formData.visitors, 10) || 1,
        fecha_visita: formData.date,
      });

      // Enviar correo de notificación
      await sendBookingEmail();

      setIsSubmitting(false);
      setIsSuccess(true);

      setTimeout(() => {
        onClose();
        setStep(1);
        setIsSuccess(false);
        setFormData({ date: '', visitors: '2', name: '', email: '', phone: '' });
      }, 3000);
    } catch {
      setIsSubmitting(false);
      setSubmitError(isEnglish ? 'We saved your reservation in the DB, but could not send the email notification.' : 'Se guardó la reservación en la Base de Datos, pero no se pudo enviar el correo de notificación.');
    }
  };

  const isDateValid = () => {
    if (!formData.date) return false;
    const today = new Date().toISOString().split('T')[0];
    return formData.date >= today;
  };

  const isNameValid = () => {
    return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\-']{2,}$/.test(formData.name.trim());
  };

  const isEmailValid = () => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
              <div>
                <h2 className="text-2xl font-bold text-[#1E3A2B]">{isEnglish ? 'Plan your visit' : 'Planifique su visita'}</h2>
                <p className="text-gray-600 text-sm mt-1">{effectiveParkName}</p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="flex items-center space-x-4 mb-8">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center flex-1">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                          step >= s
                            ? 'bg-[#27C5D8] text-white'
                            : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {step > s ? <Check className="w-5 h-5" /> : s}
                      </div>
                      {s < 3 && (
                        <div
                          className={`flex-1 h-1 mx-2 transition-colors ${
                            step > s ? 'bg-[#27C5D8]' : 'bg-gray-200'
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-sm font-medium text-[#1E3A2B] mb-2">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        {isEnglish ? 'Visit date' : 'Fecha de visita'}
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27C5D8] focus:border-transparent ${formData.date && !isDateValid() ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {formData.date && !isDateValid() && (
                        <p className="text-red-500 text-xs mt-1">
                          {isEnglish ? 'Please select a valid future date.' : 'Por favor seleccione una fecha futura válida.'}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#1E3A2B] mb-2">
                        <Users className="w-4 h-4 inline mr-2" />
                        {isEnglish ? 'Number of visitors' : 'Número de visitantes'}
                      </label>
                      <select
                        name="visitors"
                        value={formData.visitors}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27C5D8] focus:border-transparent"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? (isEnglish ? 'person' : 'persona') : isEnglish ? 'people' : 'personas'}
                          </option>
                        ))}
                        <option value="10+">{isEnglish ? 'More than 10 people' : 'Más de 10 personas'}</option>
                      </select>
                    </div>

                    <div className="bg-[#F5F5F5] rounded-lg p-4 space-y-4">
                      <div>
                        <h4 className="font-bold text-[#1E3A2B] text-sm mb-2">{isEnglish ? 'Schedule & Capacity' : 'Horario y Capacidad'}</h4>
                        <ul className="text-sm text-gray-600 space-y-1 list-disc pl-4">
                          <li>{isEnglish ? 'Open daily (Monday to Sunday)' : 'Abierto todos los días (Lunes a Domingo)'}</li>
                          <li>{isEnglish ? 'Entry: 08:00 am - 02:00 pm. Closes at 04:00 pm' : 'Ingreso: 08:00 am a 02:00 pm. Cierre a las 04:00 pm'}</li>
                          <li>{isEnglish ? 'Max capacity: 1200 people/day' : 'Capacidad de carga: 1200 personas por día'}</li>
                          <li>{isEnglish ? 'Max 500 people simultaneously on the trail' : 'Máximo 500 personas simultáneamente en el sendero'}</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-bold text-[#1E3A2B] text-sm mb-2">{isEnglish ? 'Entry Fees (IVA included)' : 'Tarifas de ingreso (IVA incluido)'}</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                          <div>{isEnglish ? 'Nationals/Residents:' : 'Nacionales/Residentes:'}</div>
                          <div className="font-medium text-right">¢904</div>
                          <div>{isEnglish ? 'Nat. Children:' : 'Niños(as) nacionales:'}</div>
                          <div className="font-medium text-right">¢565</div>
                          <div>{isEnglish ? 'Non-residents:' : 'No residentes:'}</div>
                          <div className="font-medium text-right">$13.56</div>
                          <div>{isEnglish ? 'Non-res. Children:' : 'Niños(as) no res.:'}</div>
                          <div className="font-medium text-right">$5.65</div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          * {isEnglish ? 'Seniors (nationals/residents) and children under 2 enter free.' : 'Adulto mayor nacional/residente y menores de 2 años ingresan gratis.'}
                        </p>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 p-3 rounded-md text-sm text-blue-800">
                        {isEnglish ? 'Official ticket purchases must be made through: ' : 'La compra oficial de entradas es a través de: '}
                        <br />
                        <a href="https://serviciosenlinea.sinac.go.cr" className="font-bold underline text-blue-900 block mt-1">
                          serviciosenlinea.sinac.go.cr
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-[#1E3A2B] mb-2">
                        {isEnglish ? 'Full name' : 'Nombre completo'}
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder={isEnglish ? 'John Smith' : 'Juan Pérez'}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27C5D8] focus:border-transparent ${formData.name && !isNameValid() ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {formData.name && !isNameValid() && (
                        <p className="text-red-500 text-xs mt-1">
                          {isEnglish ? 'Please enter a valid name (letters only).' : 'Por favor ingrese un nombre válido (solo letras).'}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#1E3A2B] mb-2">
                        {isEnglish ? 'Email address' : 'Correo electrónico'}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder={isEnglish ? 'john@example.com' : 'juan@example.com'}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27C5D8] focus:border-transparent ${formData.email && !isEmailValid() ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {formData.email && !isEmailValid() && (
                        <p className="text-red-500 text-xs mt-1">
                          {isEnglish ? 'Please enter a valid email address.' : 'Por favor ingrese un correo electrónico válido.'}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#1E3A2B] mb-2">
                        {isEnglish ? 'Phone' : 'Teléfono'}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder={isEnglish ? '+1 555 123 4567' : '+506 8888-8888'}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27C5D8] focus:border-transparent"
                      />
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="bg-gradient-to-br from-[#27C5D8]/10 to-[#1E3A2B]/10 rounded-lg p-6 space-y-4">
                      <h3 className="font-bold text-[#1E3A2B] text-lg mb-4">{isEnglish ? 'Booking summary' : 'Resumen de reserva'}</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">{isEnglish ? 'Park' : 'Parque'}</span>
                          <span className="font-medium text-[#1E3A2B]">{effectiveParkName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">{isEnglish ? 'Date' : 'Fecha'}</span>
                          <span className="font-medium text-[#1E3A2B]">
                            {new Date(formData.date).toLocaleDateString(isEnglish ? 'en-US' : 'es-ES', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">{isEnglish ? 'Visitors' : 'Visitantes'}</span>
                          <span className="font-medium text-[#1E3A2B]">{formData.visitors}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">{isEnglish ? 'Name' : 'Nombre'}</span>
                          <span className="font-medium text-[#1E3A2B]">{formData.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Email</span>
                          <span className="font-medium text-[#1E3A2B]">{formData.email}</span>
                        </div>
                        <div className="border-t border-gray-300 pt-3">
                          <span className="text-xs text-gray-500">
                            {isEnglish 
                              ? 'Note: Total cost depends on visitor categories (nationals, non-residents, etc.)' 
                              : 'Nota: El costo total dependerá de las categorías de los visitantes (nacionales, no residentes, etc.)'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-sm text-yellow-800">
                        <strong>{isEnglish ? 'Note:' : 'Nota:'}</strong> {isEnglish ? 'This is a demo booking. In the final version, it would process payment and send confirmation by email.' : 'Esta es una reserva de demostración. En la versión final, procesaría el pago y enviaría confirmación por email.'}
                      </p>
                    </div>
                  </motion.div>
                )}

                {submitError && (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {submitError}
                  </div>
                )}

                <div className="flex items-center space-x-3 pt-4">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                    >
                      {isEnglish ? 'Previous' : 'Anterior'}
                    </button>
                  )}

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step + 1)}
                      disabled={
                        (step === 1 && (!isDateValid() || !formData.visitors)) ||
                        (step === 2 && (!isNameValid() || !isEmailValid() || !formData.phone))
                      }
                      className="flex-1 px-6 py-3 bg-[#27C5D8] text-white rounded-lg font-medium hover:bg-[#1fa5b5] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      {isEnglish ? 'Next' : 'Siguiente'}
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-6 py-3 bg-[#27C5D8] text-white rounded-lg font-medium hover:bg-[#1fa5b5] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>{isEnglish ? 'Processing...' : 'Procesando...'}</span>
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-5 h-5" />
                          <span>{isEnglish ? 'Confirm booking' : 'Confirmar reserva'}</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-12 text-center"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-[#1E3A2B] mb-2">{isEnglish ? 'Booking confirmed!' : '¡Reserva confirmada!'}</h3>
                <p className="text-gray-600 mb-4">
                  {isEnglish
                    ? `We sent the confirmation to ${formData.email}`
                    : `Hemos enviado la confirmación a ${formData.email}`}
                </p>
                <p className="text-sm text-gray-500">
                  {isEnglish
                    ? 'You will receive a QR code to present on the day of your visit'
                    : 'Recibirás un código QR para presentar el día de tu visita'}
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
