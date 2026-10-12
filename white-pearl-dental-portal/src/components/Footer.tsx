import React, { useState } from 'react';
import { CLINIC_CONFIG } from '../config/clinicData';
import { Shield, Phone, MapPin, CheckCircle2, X } from 'lucide-react';

export const Footer: React.FC = () => {
  const [activePolicyModal, setActivePolicyModal] = useState<string | null>(null);

  const policyContent: Record<string, { title: string; content: string }> = {
    privacy: {
      title: 'Patient Privacy Policy',
      content:
        'White Pearl Dental Clinic respects patient confidentiality. Personal health details, contact phone numbers, diagnostic radiographs, and treatment plans collected through consultation forms are strictly used for clinical care coordination and are never shared or sold to third-party commercial marketing entities.',
    },
    terms: {
      title: 'Terms of Clinical Consultation',
      content:
        'Submitting a consultation request communicates patient preferences to our reception desk. Appointments become officially scheduled once confirmed by phone with our clinic coordinator based on operating capacity.',
    },
    sterilization: {
      title: 'Class-B Sterilization Protocol',
      content:
        'Our clinic operates medical-grade Class-B fractional vacuum autoclaves adhering to stringent NABH safety guidelines. All dental handpieces and surgical instruments undergo continuous biological spore testing and sealed pouching before each treatment session.',
    },
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <footer className="w-full bg-[#171A36] text-white py-16 lg:py-20 border-t border-white/10 relative overflow-hidden">
        {/* Prismatic Bottom Glow */}
        <div
          className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[36rem] h-36 rounded-full bg-[#A99BFF]/15 blur-[120px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 pb-14 border-b border-white/10">
            {/* Col 1: Brand & Clinical Authority */}
            <div className="md:col-span-5 flex flex-col items-start gap-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center p-1.5 shadow-sm">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1s3DE4AUWJeKuQkI_K3N5fUdi_8y5Ie6M3xfOURtjhGtgU2w_OwWCbgbDTfXGsk-j7gO6JSMH15GievBKIxVQGkuS_hDZC35xrWGQC-IgmxX8u7FmzRIE2mgOIfrK0dECivdDnAgueFrBif7QolocNmfEgfESppS0GVcc8ie3OFyzL3_CTJlUjV4xSlCe6SKnCXoxTRyUdLlUdFuON9vfREaCvpLvkV_6dfUJcS8S5tDCGSEtnNW6"
                    alt="White Pearl Logo Emblem"
                    className="w-full h-full object-contain filter brightness-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-['Michroma'] text-lg text-white leading-none tracking-tight">
                    WHITE PEARL
                  </span>
                  <span className="font-['Space_Mono'] text-[10px] text-[#BCEBFF] uppercase tracking-widest mt-0.5 font-bold">
                    DENTAL CLINIC · RAYSAN
                  </span>
                </div>
              </div>

              <p className="font-['Inter'] text-sm text-white/70 max-w-sm leading-relaxed">
                A New Light on Your Smile. Balancing clinical authority with architectural aesthetic serenity, delivering advanced laser diagnostics and master dental artistry in Gandhinagar.
              </p>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-['Space_Mono'] text-[#BCEBFF]">
                <Shield className="w-4 h-4 text-[#A99BFF]" />
                <span>NABH Accredited &amp; Certified Facility</span>
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="md:col-span-2 flex flex-col gap-3">
              <span className="font-['Space_Mono'] text-xs text-[#BCEBFF] uppercase tracking-wider font-bold">
                Navigation
              </span>
              <nav className="flex flex-col gap-2 font-['Inter'] text-sm text-white/70">
                <a
                  href="#philosophy"
                  onClick={(e) => handleNavClick(e, 'philosophy')}
                  className="hover:text-white transition-colors"
                >
                  Philosophy
                </a>
                <a
                  href="#services"
                  onClick={(e) => handleNavClick(e, 'services')}
                  className="hover:text-white transition-colors"
                >
                  Treatments
                </a>
                <a
                  href="#featured-care"
                  onClick={(e) => handleNavClick(e, 'featured-care')}
                  className="hover:text-white transition-colors"
                >
                  Smile Care
                </a>
                <a
                  href="#implants"
                  onClick={(e) => handleNavClick(e, 'implants')}
                  className="hover:text-white transition-colors"
                >
                  Restorative Care
                </a>
                <a
                  href="#consultation"
                  onClick={(e) => handleNavClick(e, 'consultation')}
                  className="hover:text-white transition-colors"
                >
                  Book Visit
                </a>
                <a
                  href="#location"
                  onClick={(e) => handleNavClick(e, 'location')}
                  className="hover:text-white transition-colors"
                >
                  Location
                </a>
              </nav>
            </div>

            {/* Col 3: Sanctuary & Contact */}
            <div className="md:col-span-3 flex flex-col gap-3">
              <span className="font-['Space_Mono'] text-xs text-[#BCEBFF] uppercase tracking-wider font-bold">
                Sanctuary &amp; Contact
              </span>
              <div className="flex flex-col gap-2 font-['Inter'] text-sm text-white/70">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#A99BFF] shrink-0 mt-0.5" />
                  <span>
                    10/11 Sarthak Heaven, Petrol Pump,<br />
                    TP–PDPU Cross Road, Raysan,<br />
                    Gandhinagar, Gujarat 382426
                  </span>
                </p>

                <p className="flex items-center gap-2 pt-1 font-['Space_Mono'] text-white">
                  <Phone className="w-4 h-4 text-[#BCEBFF] shrink-0" />
                  <a
                    href={`tel:${CLINIC_CONFIG.contact.phone.replace(/\s+/g, '')}`}
                    className="hover:text-[#A99BFF] transition-colors font-bold"
                  >
                    T: {CLINIC_CONFIG.contact.phone}
                  </a>
                </p>

                <div className="mt-2 flex items-center gap-2 text-xs font-['Space_Mono'] text-[#BCEBFF]">
                  <span className="w-2 h-2 rounded-full bg-[#A99BFF] animate-pulse" />
                  <span>Accepting New Patient Consultations</span>
                </div>
              </div>
            </div>

            {/* Col 4: Assurance & Policies */}
            <div className="md:col-span-2 flex flex-col gap-3">
              <span className="font-['Space_Mono'] text-xs text-[#BCEBFF] uppercase tracking-wider font-bold">
                Assurance
              </span>
              <div className="flex flex-col gap-2 font-['Inter'] text-sm text-white/70">
                <button
                  type="button"
                  onClick={() => setActivePolicyModal('privacy')}
                  className="text-left hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
                <button
                  type="button"
                  onClick={() => setActivePolicyModal('terms')}
                  className="text-left hover:text-white transition-colors"
                >
                  Terms of Use
                </button>
                <button
                  type="button"
                  onClick={() => setActivePolicyModal('sterilization')}
                  className="text-left hover:text-white transition-colors"
                >
                  Sterilization Protocol
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-['Space_Mono'] text-white/60">
            <div>
              © 2025–2026 White Pearl Dental Clinic. All rights reserved.
            </div>
            <div className="text-white/50 text-center sm:text-right">
              Luminous Architectural Futurism · Clinical Excellence
            </div>
          </div>
        </div>
      </footer>

      {/* Policy Information Modal */}
      {activePolicyModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn"
          onClick={() => setActivePolicyModal(null)}
        >
          <div
            className="relative w-full max-w-lg bg-white text-[#171A36] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#D9DCE8]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePolicyModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-[#46464d] hover:bg-[#F3F3F8] transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-3 text-[#5e50ae]">
              <CheckCircle2 className="w-5 h-5" />
              <h3 className="font-['Space_Grotesk'] text-xl font-bold">
                {policyContent[activePolicyModal]?.title}
              </h3>
            </div>
            <p className="font-['Inter'] text-sm text-[#46464d] leading-relaxed">
              {policyContent[activePolicyModal]?.content}
            </p>
            <div className="mt-6 pt-4 border-t border-[#D9DCE8] flex justify-end">
              <button
                onClick={() => setActivePolicyModal(null)}
                className="px-5 py-2 rounded-xl bg-[#171A36] text-white text-xs font-semibold hover:bg-[#5e50ae] transition-colors"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
