import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CLINIC_CONFIG, TreatmentService } from '../config/clinicData';
import { SmileLightSlider } from './SmileLightSlider';
import { Sparkles, Shield, ArrowRight, Info, Eye } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface DentalServicesSectionProps {
  onSelectService: (service: TreatmentService) => void;
  onBookService: (serviceId: string) => void;
}

export const DentalServicesSection: React.FC<DentalServicesSectionProps> = ({
  onSelectService,
  onBookService,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const mainFeatureRef = useRef<HTMLDivElement>(null);
  const sideCardsRef = useRef<HTMLDivElement>(null);
  const bottomGridRef = useRef<HTMLDivElement>(null);
  const advisoryRef = useRef<HTMLDivElement>(null);

  const [showInteractiveSlider, setShowInteractiveSlider] = useState<boolean>(false);

  // Quick lookup helper
  const getService = (id: string): TreatmentService | undefined =>
    CLINIC_CONFIG.verifiedServices.find((s) => s.id === id);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          [
            headerRef.current,
            mainFeatureRef.current,
            sideCardsRef.current,
            bottomGridRef.current,
            advisoryRef.current,
          ],
          { opacity: 1, y: 0 }
        );
        return;
      }

      // Header reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 24 },
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

      // Asymmetrical bento panels entrance
      if (mainFeatureRef.current && sideCardsRef.current) {
        gsap.fromTo(
          [mainFeatureRef.current, sideCardsRef.current],
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: mainFeatureRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Bottom cards reveal
      if (bottomGridRef.current && advisoryRef.current) {
        gsap.fromTo(
          [bottomGridRef.current, advisoryRef.current],
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bottomGridRef.current,
              start: 'top 85%',
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

  const cosmeticService = getService('cosmetic');
  const checkupService = getService('checkup');
  const whiteningService = getService('whitening');

  return (
    <section
      id="services"
      ref={sectionRef}
      className="w-full px-4 sm:px-6 lg:px-12 py-20 lg:py-28 bg-[#F7F7FC] relative"
      aria-label="Dental Services Discovery"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-12 lg:gap-16">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#5e50ae]" />
              <span className="font-['Space_Mono'] text-xs text-[#5e50ae] uppercase tracking-widest font-semibold">
                DENTAL CARE
              </span>
            </div>
            <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#171A36] uppercase tracking-tight">
              Explore Your Options.
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="font-['Inter'] text-sm sm:text-base text-[#46464d] max-w-md">
              Personalized solutions designed around your physiology. We combine gentle hand techniques with precision digital radiography.
            </p>
            <button
              onClick={() => setShowInteractiveSlider(!showInteractiveSlider)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#D9DCE8] text-xs font-semibold text-[#171A36] shadow-sm hover:bg-[#F3F3F8] transition-all whitespace-nowrap"
            >
              <Eye className="w-3.5 h-3.5 text-[#5e50ae]" />
              <span>{showInteractiveSlider ? 'Hide Comparison' : 'Smile Light Slider'}</span>
            </button>
          </div>
        </div>

        {/* Optional Interactive Slider Drawer */}
        {showInteractiveSlider && (
          <div className="p-6 rounded-3xl bg-white border border-[#D9DCE8] shadow-lg animate-fadeIn">
            <SmileLightSlider />
          </div>
        )}

        {/* Asymmetrical Bento-Style Services Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Module 1: Large Image-Led Feature (Cosmetic Dentistry) */}
          <div
            ref={mainFeatureRef}
            className="lg:col-span-7 rounded-3xl bg-white p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-[#D9DCE8]/80 flex flex-col justify-between group"
          >
            <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden mb-6 bg-[#171A36]">
              <img
                src={cosmeticService?.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvcWgxzR4Q5Wyx-HpAtoDBfsl_OPjQPIlAi7WuhrfCmLDp_2dhzbz2PAztVf1BJ34nt8i-jQYmMnagDo6mxO0dhThZOYD2BMKFjWrIQKP6qCEEEOkpP_pLgMpqirxeFC5fb60nbosvwp6-8B-ErVO-kSTiwrvetey4B0q_1gRa__HmGr5F8y_PzpPmQUT4mZbYFZv3VxQQ3kvOCTdmJ142tdhGUEYPo-_yrNZQBSGTjtX4I3C6Obn3'}
                alt="Radiant confident smile aesthetics"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4">
                <span className="font-['Space_Mono'] text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg bg-white/90 text-[#171A36] shadow-sm backdrop-blur-md border border-white/40">
                  SIGNATURE EXPERTISE
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[#171A36]">
                  Cosmetic Dentistry &amp; Smile Aesthetics
                </h3>
                <Sparkles className="w-6 h-6 text-[#5e50ae] shrink-0" />
              </div>

              <p className="font-['Inter'] text-sm sm:text-base text-[#46464d] leading-relaxed">
                Comprehensive aesthetic evaluation tailored to your facial proportions. From custom veneers to smile line realignment, explore restorative techniques that prioritize tooth longevity and natural pearlescent harmony.
              </p>

              <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#D9DCE8]/60">
                <span className="font-['Space_Mono'] text-xs text-[#5e50ae] uppercase font-semibold">
                  CUSTOM DIGITAL MOCKUPS AVAILABLE
                </span>
                <div className="flex items-center gap-3">
                  {cosmeticService && (
                    <button
                      onClick={() => onSelectService(cosmeticService)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#46464d] hover:text-[#171A36] px-3 py-1.5 rounded-lg bg-[#F7F7FC] border border-[#D9DCE8] transition-colors"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>
                  )}
                  <button
                    onClick={() => onBookService('cosmetic')}
                    className="inline-flex items-center gap-1 font-['Inter'] text-sm text-[#171A36] font-bold hover:text-[#5e50ae] transition-colors"
                  >
                    <span>Enquire</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Module 2: Split-Screen Treatment Panel (Preventive & Whitening) */}
          <div
            ref={sideCardsRef}
            className="lg:col-span-5 flex flex-col gap-6 justify-between"
          >
            {/* Dental Check-ups & Preventive Diagnostics */}
            <div className="rounded-3xl bg-white p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 border border-[#D9DCE8]/80 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-['Space_Mono'] text-xs text-[#46464d] uppercase font-semibold">
                    PREVENTIVE SUITE
                  </span>
                  <Shield className="w-5 h-5 text-[#5e50ae]" />
                </div>
                <h3 className="font-['Space_Grotesk'] text-xl font-bold text-[#171A36] mb-2">
                  Dental Check-ups &amp; Preventive Diagnostics
                </h3>
                <p className="font-['Inter'] text-sm text-[#46464d] leading-relaxed mb-4">
                  Thorough intra-oral camera examinations, periodontal indexing, and low-radiation digital imaging to spot minor concerns before they necessitate invasive treatments.
                </p>
              </div>

              <div className="h-36 w-full rounded-2xl overflow-hidden relative bg-[#171A36] mb-4">
                <img
                  src={checkupService?.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFRv8eXIXEVrRYqoSKpRoVTF0kYMkNh8G6grRutfN_ivsgRXEuIXhh5NXRnL42NHOFQbmY2W390A-5tKlXlIxuiRX8cj2SHX0LTnlR9gv0MkryJiOKLWNqca862d_0BNUrg_4icERtEjb_JiGrsEqQ_xtKEQmWpj7eizXSqqBcwP1h70Lgxc9_LDsHRqGj1O5s8jFI-yVcpyzpQqoFNp4k0uF15UkdP45FqXb_5PIuY0Y4sb-IdVRe'}
                  alt="Modern serene dental clinic interior"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#D9DCE8]/60">
                <button
                  onClick={() => checkupService && onSelectService(checkupService)}
                  className="text-xs text-[#46464d] hover:text-[#171A36] font-medium"
                >
                  View Diagnostic Protocol
                </button>
                <button
                  onClick={() => onBookService('checkup')}
                  className="text-xs font-bold text-[#171A36] hover:text-[#5e50ae] inline-flex items-center gap-1"
                >
                  <span>Book Check-up</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Teeth Whitening & Enamel Care */}
            <div className="rounded-3xl bg-white p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 border border-[#D9DCE8]/80 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-['Space_Mono'] text-xs text-[#46464d] uppercase font-semibold">
                    LUMINOUS ENAMEL
                  </span>
                  <Sparkles className="w-5 h-5 text-[#5e50ae]" />
                </div>
                <h3 className="font-['Space_Grotesk'] text-xl font-bold text-[#171A36] mb-2">
                  Teeth Whitening &amp; Enamel Care
                </h3>
                <p className="font-['Inter'] text-sm text-[#46464d] leading-relaxed">
                  In-office desensitized light-activated whitening therapies paired with enamel remineralization protocols for a visibly brighter, resilient luster.
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#D9DCE8]/60">
                <button
                  onClick={() => whiteningService && onSelectService(whiteningService)}
                  className="text-xs text-[#46464d] hover:text-[#171A36] font-medium"
                >
                  Shade Guide Details
                </button>
                <button
                  onClick={() => onBookService('whitening')}
                  className="text-xs font-bold text-[#171A36] hover:text-[#5e50ae] inline-flex items-center gap-1"
                >
                  <span>Enquire Whitening</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Module 3: Compact Editorial Services Rail & Module 4: Translucent Advisory Notice */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* 3 Numbered Modules */}
          <div
            ref={bottomGridRef}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            <div
              onClick={() => onBookService('bonding')}
              className="p-5 rounded-2xl bg-white border border-[#D9DCE8] shadow-sm hover:border-[#A99BFF] hover:shadow-md transition-all cursor-pointer group"
            >
              <span className="font-['Space_Mono'] text-xs text-[#5e50ae] font-bold block mb-1">
                01 / RESTORE
              </span>
              <h4 className="font-['Space_Grotesk'] text-base font-bold text-[#171A36] group-hover:text-[#5e50ae] transition-colors">
                Composite Bonding
              </h4>
              <p className="font-['Inter'] text-xs text-[#46464d] mt-2 leading-relaxed">
                Seamless edge repairs and micro-gap closures shaped in a single comfortable session.
              </p>
            </div>

            <div
              onClick={() => onBookService('restorative')}
              className="p-5 rounded-2xl bg-white border border-[#D9DCE8] shadow-sm hover:border-[#A99BFF] hover:shadow-md transition-all cursor-pointer group"
            >
              <span className="font-['Space_Mono'] text-xs text-[#5e50ae] font-bold block mb-1">
                02 / STRUCTURE
              </span>
              <h4 className="font-['Space_Grotesk'] text-base font-bold text-[#171A36] group-hover:text-[#5e50ae] transition-colors">
                Restorative Solutions
              </h4>
              <p className="font-['Inter'] text-xs text-[#46464d] mt-2 leading-relaxed">
                Tooth-colored inlays, onlays, and biocompatible ceramic crowns engineered for chewing durability.
              </p>
            </div>

            <div
              onClick={() => onBookService('checkup')}
              className="p-5 rounded-2xl bg-white border border-[#D9DCE8] shadow-sm hover:border-[#A99BFF] hover:shadow-md transition-all cursor-pointer group"
            >
              <span className="font-['Space_Mono'] text-xs text-[#5e50ae] font-bold block mb-1">
                03 / WELLNESS
              </span>
              <h4 className="font-['Space_Grotesk'] text-base font-bold text-[#171A36] group-hover:text-[#5e50ae] transition-colors">
                Routine Hygiene
              </h4>
              <p className="font-['Inter'] text-xs text-[#46464d] mt-2 leading-relaxed">
                Ultrasonic tartar removal and therapeutic polishing sessions for long-term gum health.
              </p>
            </div>
          </div>

          {/* Module 4: Translucent Advisory Notice */}
          <div
            ref={advisoryRef}
            className="lg:col-span-5 p-5 rounded-2xl bg-[#e5deff]/40 border border-[#A99BFF]/35 backdrop-blur-md flex items-start gap-3.5 shadow-sm"
          >
            <Shield className="w-5 h-5 text-[#5e50ae] shrink-0 mt-0.5" />
            <div className="flex flex-col">
              <span className="font-['Space_Mono'] text-xs text-[#171A36] uppercase font-bold tracking-wider">
                CLINICAL ADVISORY
              </span>
              <p className="font-['Inter'] text-xs sm:text-sm text-[#1a1c1f] mt-1 leading-relaxed">
                All dental procedures undergo strict clinical assessment by licensed practitioners prior to treatment initiation. Treatment options are tailored to patient anatomical eligibility.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
