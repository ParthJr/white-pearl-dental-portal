import React, { useEffect } from 'react';
import { TreatmentService } from '../config/clinicData';
import { X, CheckCircle, ShieldAlert, Calendar, ArrowRight } from 'lucide-react';

interface ServiceModalProps {
  service: TreatmentService | null;
  onClose: () => void;
  onBookService: (serviceId: string) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  onClose,
  onBookService,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (service) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [service, onClose]);

  if (!service) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#171A36]/75 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#D9DCE8] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Visual Image */}
        <div className="relative w-full h-52 sm:h-60 bg-[#171A36] overflow-hidden shrink-0">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover filter brightness-95"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white hover:bg-black/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A99BFF]"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title on Image */}
          <div className="absolute bottom-4 left-6 right-6">
            <span className="font-['Space_Mono'] text-xs font-bold text-[#BCEBFF] uppercase tracking-wider block mb-1">
              {service.category} {service.badge && `· ${service.badge}`}
            </span>
            <h3
              id="service-modal-title"
              className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-white leading-tight"
            >
              {service.title}
            </h3>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex flex-col gap-6">
          <div>
            <h4 className="font-['Space_Mono'] text-xs font-semibold text-[#5e50ae] uppercase tracking-wider mb-2">
              CLINICAL OVERVIEW
            </h4>
            <p className="font-['Inter'] text-sm sm:text-base text-[#46464d] leading-relaxed">
              {service.description}
            </p>
          </div>

          <div>
            <h4 className="font-['Space_Mono'] text-xs font-semibold text-[#5e50ae] uppercase tracking-wider mb-3">
              WHAT THIS INVOLVES
            </h4>
            <div className="grid grid-cols-1 gap-2.5">
              {service.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-[#F7F7FC] border border-[#D9DCE8]/60 text-sm font-['Inter'] text-[#1a1c1f]"
                >
                  <CheckCircle className="w-4 h-4 text-[#5e50ae] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {service.advisoryNote && (
            <div className="p-4 rounded-xl bg-[#BCEBFF]/20 border border-[#BCEBFF]/50 flex items-start gap-3 text-xs font-['Inter'] text-[#171A36]">
              <ShieldAlert className="w-4 h-4 text-[#5e50ae] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold uppercase font-['Space_Mono']">
                  Clinical Notice:{' '}
                </span>
                <span>{service.advisoryNote}</span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="p-6 border-t border-[#D9DCE8] bg-[#F7F7FC] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[#D9DCE8] text-[#171A36] text-sm font-medium hover:bg-white transition-colors"
          >
            Close Details
          </button>
          <button
            onClick={() => {
              onBookService(service.id);
              onClose();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#171A36] text-white text-sm font-semibold hover:shadow-[0_0_20px_rgba(94,80,174,0.4)] flex items-center justify-center gap-2 transition-all"
          >
            <Calendar className="w-4 h-4 text-[#BCEBFF]" />
            <span>Request Consultation for This Care</span>
            <ArrowRight className="w-4 h-4 text-[#A99BFF]" />
          </button>
        </div>
      </div>
    </div>
  );
};
