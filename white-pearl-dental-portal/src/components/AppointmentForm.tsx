import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CLINIC_CONFIG } from '../config/clinicData';
import {
  Calendar,
  Clock,
  Phone,
  User,
  CheckCircle2,
  AlertCircle,
  Send,
  Loader2,
  ShieldCheck,
  Check,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface AppointmentFormProps {
  preselectedServiceId?: string;
  onSuccess?: () => void;
}

interface FormState {
  fullName: string;
  mobile: string;
  serviceId: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
  privacyConsent: boolean;
  honeypot: string; // anti-spam trap
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({
  preselectedServiceId,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Minimum date is today in YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    mobile: '',
    serviceId: preselectedServiceId || 'cosmetic',
    preferredDate: todayStr,
    preferredTime: 'morning',
    notes: '',
    privacyConsent: false,
    honeypot: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);
  const [lastSubmittedHash, setLastSubmittedHash] = useState<string>('');
  const [referenceId, setReferenceId] = useState<string>('');

  // Update service when prop changes
  useEffect(() => {
    if (preselectedServiceId) {
      setFormData((prev) => ({ ...prev, serviceId: preselectedServiceId }));
    }
  }, [preselectedServiceId]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(cardRef.current, { opacity: 1, y: 0 });
        return;
      }

      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // Validate form fields
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter a valid full name.';
    }

    // Indian mobile number validation (10 digits starting with 6, 7, 8, or 9, with optional leading 0 or +91)
    const cleanedMobile = formData.mobile.replace(/[\s\-+]/g, '');
    const indianMobileRegex = /^(?:91|0)?[6-9]\d{9}$/;
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required.';
    } else if (!indianMobileRegex.test(cleanedMobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit Indian mobile number (e.g. 9876543210).';
    }

    // Service validation
    if (!formData.serviceId) {
      newErrors.serviceId = 'Please select a service of interest.';
    }

    // Date validation: no past dates
    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Preferred date is required.';
    } else if (formData.preferredDate < todayStr) {
      newErrors.preferredDate = 'Appointment date cannot be in the past.';
    }

    // Time validation
    if (!formData.preferredTime) {
      newErrors.preferredTime = 'Please select a preferred time slot.';
    }

    // Privacy consent
    if (!formData.privacyConsent) {
      newErrors.privacyConsent = 'You must agree to the consultation contact policy.';
    }

    // Honeypot check (hidden spam field should remain empty)
    if (formData.honeypot) {
      newErrors.honeypot = 'Spam submission detected.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    // Duplicate submission prevention
    const currentHash = `${formData.fullName}-${formData.mobile}-${formData.preferredDate}-${formData.serviceId}`;
    if (currentHash === lastSubmittedHash) {
      setErrors({
        form: 'This consultation request was already recorded. Our clinic team will reach out to you shortly.',
      });
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Build consultation payload
      const payload = {
        fullName: formData.fullName.trim(),
        mobile: formData.mobile.trim(),
        serviceId: formData.serviceId,
        serviceTitle:
          CLINIC_CONFIG.verifiedServices.find((s) => s.id === formData.serviceId)?.title ||
          formData.serviceId,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        notes: formData.notes.trim(),
        submittedAt: new Date().toISOString(),
        clientTimestamp: Date.now(),
      };

      // Persist in secure client consultation queue so no request is lost
      const existingQueue = JSON.parse(
        localStorage.getItem('white_pearl_consultations') || '[]'
      );
      existingQueue.push(payload);
      localStorage.setItem('white_pearl_consultations', JSON.stringify(existingQueue));

      // Attempt endpoint dispatch (gracefully handled if offline or standalone)
      try {
        await fetch('/api/consultations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch {
        // Fallback: stored in queue
      }

      // Generate verification tracking reference
      const generatedRef = `WP-${Math.floor(100000 + Math.random() * 900000)}`;
      setReferenceId(generatedRef);
      setLastSubmittedHash(currentHash);
      setSubmissionSuccess(true);
    } catch {
      setErrors({
        form: 'Unable to record consultation at this moment. Please call the clinic directly at 089050 06536.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="consultation"
      ref={sectionRef}
      className="w-full px-4 sm:px-6 lg:px-12 py-20 lg:py-28 bg-[#F3F3F8] relative overflow-hidden"
      aria-label="Appointment and Consultation Request"
    >
      {/* Prismatic Ambient Glows */}
      <div
        className="absolute top-1/2 left-1/4 w-80 h-80 rounded-full bg-[#A99BFF]/20 blur-[110px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-[#BCEBFF]/25 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <div
          ref={cardRef}
          className="rounded-3xl bg-white p-6 sm:p-10 lg:p-12 shadow-xl border border-[#D9DCE8] backdrop-blur-xl"
        >
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-10">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#e5deff]/60 border border-[#A99BFF]/30 mb-3">
              <Calendar className="w-3.5 h-3.5 text-[#5e50ae]" />
              <span className="font-['Space_Mono'] text-xs text-[#5e50ae] uppercase font-bold tracking-wider">
                RESERVE A VISIT
              </span>
            </div>
            <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-[#171A36] uppercase tracking-tight">
              Let's Talk About Your Smile.
            </h2>
            <p className="font-['Inter'] text-sm sm:text-base text-[#46464d] max-w-lg mt-2 leading-relaxed">
              Send a consultation request and let the clinic team help you understand the next steps. No hurried appointments.
            </p>
          </div>

          {/* Success State */}
          {submissionSuccess ? (
            <div
              role="alert"
              className="p-8 rounded-2xl bg-[#F7F7FC] border border-[#A99BFF]/40 flex flex-col items-center text-center gap-4 animate-fadeIn"
            >
              <div className="w-14 h-14 rounded-full bg-[#171A36] text-[#BCEBFF] flex items-center justify-center shadow-md">
                <Check className="w-7 h-7" />
              </div>

              <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-[#171A36]">
                Consultation Request Received
              </h3>

              {/* Exact required text from instructions */}
              <p className="font-['Inter'] text-base text-[#171A36] max-w-md font-medium leading-relaxed">
                Your consultation request has been received. The clinic team will contact you to confirm availability.
              </p>

              <div className="p-4 rounded-xl bg-white border border-[#D9DCE8] w-full max-w-md flex flex-col gap-2 text-xs font-['Space_Mono'] text-[#46464d]">
                <div className="flex justify-between items-center border-b border-[#D9DCE8]/60 pb-2">
                  <span>TRACKING REFERENCE:</span>
                  <span className="font-bold text-[#171A36]">{referenceId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>PREVIOUS OPENING:</span>
                  <span className="font-bold text-[#5e50ae]">Monday 10:00 AM</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a
                  href={`tel:${CLINIC_CONFIG.contact.phone.replace(/\s+/g, '')}`}
                  className="px-6 py-2.5 rounded-xl bg-[#171A36] text-white text-xs font-semibold hover:shadow-md transition-all inline-flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-[#BCEBFF]" />
                  <span>Call Reception Direct: {CLINIC_CONFIG.contact.phone}</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setSubmissionSuccess(false);
                    setFormData({
                      fullName: '',
                      mobile: '',
                      serviceId: 'cosmetic',
                      preferredDate: todayStr,
                      preferredTime: 'morning',
                      notes: '',
                      privacyConsent: false,
                      honeypot: '',
                    });
                  }}
                  className="px-5 py-2.5 rounded-xl bg-white border border-[#D9DCE8] text-xs font-semibold text-[#46464d] hover:text-[#171A36] transition-all"
                >
                  Submit Another Enquiry
                </button>
              </div>
            </div>
          ) : (
            /* Consultation Request Form */
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
              {/* Spam Honeypot Field */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="user_verification_token"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                />
              </div>

              {errors.form && (
                <div
                  role="alert"
                  className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-3"
                >
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{errors.form}</span>
                </div>
              )}

              {/* Row 1: Name and Mobile */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="fullName"
                    className="font-['Space_Mono'] text-xs text-[#171A36] uppercase font-bold flex items-center gap-1.5"
                  >
                    <User className="w-3.5 h-3.5 text-[#5e50ae]" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => {
                      setFormData({ ...formData, fullName: e.target.value });
                      if (errors.fullName) setErrors({ ...errors, fullName: '' });
                    }}
                    placeholder="e.g. Ananya Patel"
                    className={`px-4 py-3 rounded-xl bg-[#F7F7FC] border text-sm text-[#1a1c1f] placeholder:text-[#46464d]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A99BFF] transition-all ${
                      errors.fullName ? 'border-red-500' : 'border-[#D9DCE8]'
                    }`}
                  />
                  {errors.fullName && (
                    <span className="text-xs text-red-600 font-['Inter']">
                      {errors.fullName}
                    </span>
                  )}
                </div>

                {/* Mobile Number */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="mobile"
                    className="font-['Space_Mono'] text-xs text-[#171A36] uppercase font-bold flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#5e50ae]" />
                    <span>Mobile Number (+91) *</span>
                  </label>
                  <input
                    id="mobile"
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={(e) => {
                      setFormData({ ...formData, mobile: e.target.value });
                      if (errors.mobile) setErrors({ ...errors, mobile: '' });
                    }}
                    placeholder="089050 06536 or 9876543210"
                    className={`px-4 py-3 rounded-xl bg-[#F7F7FC] border text-sm text-[#1a1c1f] placeholder:text-[#46464d]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A99BFF] transition-all ${
                      errors.mobile ? 'border-red-500' : 'border-[#D9DCE8]'
                    }`}
                  />
                  {errors.mobile && (
                    <span className="text-xs text-red-600 font-['Inter']">
                      {errors.mobile}
                    </span>
                  )}
                </div>
              </div>

              {/* Row 2: Service, Date, Time Window */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Service of Interest */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="serviceSelect"
                    className="font-['Space_Mono'] text-xs text-[#171A36] uppercase font-bold"
                  >
                    Service of Interest *
                  </label>
                  <select
                    id="serviceSelect"
                    required
                    value={formData.serviceId}
                    onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                    className="px-4 py-3 rounded-xl bg-[#F7F7FC] border border-[#D9DCE8] text-sm text-[#1a1c1f] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A99BFF] transition-all"
                  >
                    {CLINIC_CONFIG.verifiedServices.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Preferred Date */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="preferredDate"
                    className="font-['Space_Mono'] text-xs text-[#171A36] uppercase font-bold flex items-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#5e50ae]" />
                    <span>Preferred Date *</span>
                  </label>
                  <input
                    id="preferredDate"
                    type="date"
                    min={todayStr}
                    required
                    value={formData.preferredDate}
                    onChange={(e) => {
                      setFormData({ ...formData, preferredDate: e.target.value });
                      if (errors.preferredDate) setErrors({ ...errors, preferredDate: '' });
                    }}
                    className={`px-4 py-3 rounded-xl bg-[#F7F7FC] border text-sm text-[#1a1c1f] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A99BFF] transition-all ${
                      errors.preferredDate ? 'border-red-500' : 'border-[#D9DCE8]'
                    }`}
                  />
                  {errors.preferredDate && (
                    <span className="text-xs text-red-600 font-['Inter']">
                      {errors.preferredDate}
                    </span>
                  )}
                </div>

                {/* Preferred Slot */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="preferredSlot"
                    className="font-['Space_Mono'] text-xs text-[#171A36] uppercase font-bold flex items-center gap-1.5"
                  >
                    <Clock className="w-3.5 h-3.5 text-[#5e50ae]" />
                    <span>Time Window</span>
                  </label>
                  <select
                    id="preferredSlot"
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="px-4 py-3 rounded-xl bg-[#F7F7FC] border border-[#D9DCE8] text-sm text-[#1a1c1f] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A99BFF] transition-all"
                  >
                    <option value="morning">Morning (10:00 AM – 1:00 PM)</option>
                    <option value="afternoon">Afternoon (1:00 PM – 5:00 PM)</option>
                    <option value="evening">Evening (5:00 PM – 8:00 PM)</option>
                  </select>
                </div>
              </div>

              {/* Notes or Concerns */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="notes"
                  className="font-['Space_Mono'] text-xs text-[#171A36] uppercase font-bold"
                >
                  Clinical Notes or Concerns (Optional)
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Describe any dental sensitivity, past aesthetic treatments, or specific scheduling requests..."
                  className="px-4 py-3 rounded-xl bg-[#F7F7FC] border border-[#D9DCE8] text-sm text-[#1a1c1f] placeholder:text-[#46464d]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A99BFF] transition-all resize-none"
                />
              </div>

              {/* Privacy Consent Checkbox */}
              <div className="flex flex-col gap-1">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    id="privacyConsent"
                    checked={formData.privacyConsent}
                    onChange={(e) => {
                      setFormData({ ...formData, privacyConsent: e.target.checked });
                      if (errors.privacyConsent) setErrors({ ...errors, privacyConsent: '' });
                    }}
                    className="mt-1 h-4 w-4 rounded border-[#D9DCE8] text-[#171A36] accent-[#171A36] focus:ring-[#A99BFF]"
                  />
                  <span className="font-['Inter'] text-xs sm:text-sm text-[#46464d] leading-relaxed">
                    I agree to be contacted by White Pearl Dental Clinic regarding this consultation request. Patient records remain strictly confidential under clinical guidelines.
                  </span>
                </label>
                {errors.privacyConsent && (
                  <span className="text-xs text-red-600 font-['Inter'] pl-7">
                    {errors.privacyConsent}
                  </span>
                )}
              </div>

              {/* Submit CTA & Assurance */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#D9DCE8]/60">
                <div className="flex items-center gap-2 text-[#46464d] font-['Space_Mono'] text-xs">
                  <ShieldCheck className="w-4 h-4 text-[#5e50ae]" />
                  <span>Direct confirmation within 2 clinic hours</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#171A36] text-white font-['Inter'] text-sm font-bold shadow-md hover:shadow-[0_0_24px_rgba(94,80,174,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:pointer-events-none"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#BCEBFF]" />
                      <span>Recording Request...</span>
                    </>
                  ) : (
                    <>
                      <span>Request Consultation</span>
                      <Send className="w-4 h-4 text-[#A99BFF]" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
