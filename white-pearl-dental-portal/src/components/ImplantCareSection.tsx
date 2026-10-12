import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageSquare, Scan, Network, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ImplantCareSectionProps {
  onBookImplantCare: () => void;
}

export const ImplantCareSection: React.FC<ImplantCareSectionProps> = ({
  onBookImplantCare,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const stagesRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([stagesRef.current, bannerRef.current], { opacity: 1, y: 0 });
        return;
      }

      if (stagesRef.current) {
        gsap.fromTo(
          stagesRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.18,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: stagesRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (bannerRef.current) {
        gsap.fromTo(
          bannerRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bannerRef.current,
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

  return (
    <section
      id="implants"
      ref={sectionRef}
      className="w-full bg-[#171A36] text-white px-4 sm:px-6 lg:px-12 py-20 lg:py-28 relative overflow-hidden"
      aria-label="Restorative and Implant-Care Feature"
    >
      {/* Prismatic Glow Halo */}
      <div
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#5e50ae]/25 blur-[130px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-[#BCEBFF]/10 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto flex flex-col gap-12 lg:gap-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-['Space_Mono'] text-xs text-[#BCEBFF] uppercase tracking-widest font-semibold block mb-2">
              RESTORATIVE DENTAL CARE
            </span>
            <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl lg:text-[42px] font-bold text-white uppercase leading-tight tracking-tight max-w-xl">
              Understand Your Tooth-Replacement Options.
            </h2>
          </div>
          <p className="font-['Inter'] text-sm sm:text-base text-white/75 max-w-md leading-relaxed">
            Explore available tooth-replacement options and discuss the assessment, treatment planning, and follow-up considerations relevant to your needs.
          </p>
        </div>

        {/* 3 Structured Consultation Stages Grid */}
        <div
          ref={stagesRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {/* Stage 1 */}
          <div className="p-7 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col justify-between hover:bg-white/10 hover:border-[#A99BFF]/40 transition-all duration-300 group">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="font-['Space_Mono'] text-xs text-[#BCEBFF] font-bold tracking-widest">
                  STAGE 01
                </span>
                <MessageSquare className="w-5 h-5 text-[#A99BFF] group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white mb-2">
                Consultation
              </h3>
              <p className="font-['Inter'] text-sm text-white/70 leading-relaxed">
                Discuss your aesthetic expectations, chewing comfort goals, previous restorations, and medical history in complete privacy.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-white/10">
              <span className="font-['Space_Mono'] text-xs text-[#A99BFF] uppercase tracking-wider block">
                FOUNDATION MAPPING
              </span>
            </div>
          </div>

          {/* Stage 2 */}
          <div className="p-7 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col justify-between hover:bg-white/10 hover:border-[#A99BFF]/40 transition-all duration-300 group">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="font-['Space_Mono'] text-xs text-[#BCEBFF] font-bold tracking-widest">
                  STAGE 02
                </span>
                <Scan className="w-5 h-5 text-[#A99BFF] group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white mb-2">
                Assessment
              </h3>
              <p className="font-['Inter'] text-sm text-white/70 leading-relaxed">
                Understand bone density parameters, soft tissue mapping, and 3D digital imaging protocols essential for durable implant placement.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-white/10">
              <span className="font-['Space_Mono'] text-xs text-[#A99BFF] uppercase tracking-wider block">
                ANATOMICAL VERIFICATION
              </span>
            </div>
          </div>

          {/* Stage 3 */}
          <div className="p-7 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col justify-between hover:bg-white/10 hover:border-[#A99BFF]/40 transition-all duration-300 group">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="font-['Space_Mono'] text-xs text-[#BCEBFF] font-bold tracking-widest">
                  STAGE 03
                </span>
                <Network className="w-5 h-5 text-[#A99BFF] group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white mb-2">
                Treatment Planning
              </h3>
              <p className="font-['Inter'] text-sm text-white/70 leading-relaxed">
                Review customized ceramic options, surgical precision guides, and sequential milestone timelines with your dental surgeon.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-white/10">
              <span className="font-['Space_Mono'] text-xs text-[#A99BFF] uppercase tracking-wider block">
                PERSONALIZED BLUEPRINT
              </span>
            </div>
          </div>
        </div>

        {/* Conceptual Art Banner & Direct CTA */}
        <div
          ref={bannerRef}
          className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/15 backdrop-blur-xl flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl"
        >
          <div className="flex items-center gap-5 w-full lg:w-auto">
            <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-white/20 bg-[#171A36]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0uiGasprvyxa_xQl_Eob9uarcFIrHqZTjndcZaD6Lf1AEiC7RYDdGNMPtnueI3aTyeTTXa2vgoMAlON_wXjYDvfb4W2gvhItm2EWjO5_E9-N2NIoGbp6M4H5XTn3duac4tyWNtgVS5pTMU9q7dT5TYTlaxHDr_SErotjWbRh64cOjikIQ1NUnD0naHMjxDx0lfEWVXoZ9yUK3P-f-7_4vuVdN6pEZ3msi-pE3OBd04pCcNf3JfiAX"
                alt="Abstract pearl artwork depicting mathematical perfection"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <h4 className="font-['Space_Grotesk'] text-lg sm:text-xl font-bold text-white">
                Curious About Restorative Replacements?
              </h4>
              <p className="font-['Inter'] text-xs sm:text-sm text-white/70 mt-0.5">
                Schedule a restorative discussion to evaluate single implants, bridges, or full-arch rehabilitation.
              </p>
            </div>
          </div>

          <button
            onClick={onBookImplantCare}
            className="w-full lg:w-auto shrink-0 px-7 py-3.5 rounded-xl bg-[#5e50ae] text-white font-['Inter'] text-sm font-semibold hover:bg-[#A99BFF] hover:text-[#171A36] hover:shadow-[0_0_24px_rgba(169,155,255,0.5)] transition-all flex items-center justify-center gap-2"
          >
            <span>Enquire About Treatment</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
