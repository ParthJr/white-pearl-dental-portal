import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FeaturedCareSectionProps {
  onOpenConsultation: () => void;
}

export const FeaturedCareSection: React.FC<FeaturedCareSectionProps> = ({
  onOpenConsultation,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageColRef = useRef<HTMLDivElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const stepsListRef = useRef<HTMLDivElement>(null);

  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      number: '01',
      title: 'Understand',
      summary: 'Discuss your concerns and oral health needs during a relaxed, non-judgmental diagnostic session.',
      detail: 'We photograph and scan your teeth in high-resolution, reviewing the images together on screen so you see exactly what the dentist observes.',
    },
    {
      number: '02',
      title: 'Explore',
      summary: 'Learn about relevant options, durability metrics, aesthetic expectations, and financial considerations.',
      detail: 'Whether you are considering whitening, conservative bonding, or comprehensive aesthetic restorations, every path is transparently laid out.',
    },
    {
      number: '03',
      title: 'Plan',
      summary: 'Review structured recommendations, appointment phases, and clear maintenance steps at your own pace.',
      detail: 'No rush, no high-pressure tactics. Take your time to review the personalized care sequence and proceed only when fully comfortable.',
    },
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([imageColRef.current, textColRef.current, stepsListRef.current], {
          opacity: 1,
          y: 0,
        });
        return;
      }

      // Visual column slide in
      if (imageColRef.current) {
        gsap.fromTo(
          imageColRef.current,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Content column reveal
      if (textColRef.current) {
        gsap.fromTo(
          textColRef.current,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Staggered steps
      if (stepsListRef.current) {
        gsap.fromTo(
          stepsListRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: stepsListRef.current,
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
      id="featured-care"
      ref={sectionRef}
      className="w-full px-4 sm:px-6 lg:px-12 py-20 lg:py-28 bg-[#F3F3F8] relative overflow-hidden"
      aria-label="The Art of a Confident Smile"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Visual Column */}
        <div ref={imageColRef} className="lg:col-span-6 relative">
          <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/5] max-w-lg mx-auto bg-[#171A36] border border-[#D9DCE8]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLC2TSb_SKzlMwfChAc_tuO-CFYyki6ERm7BClpNjkR-cIiCKdeqmnlPjOdEoSWZsN-kGd6Q7WJSKKb6kd5GGeP5o6OzWlS9nbAWVPQNCdBZFCFCxJ6ndGIdOXhs-zrPGiQuZBvwdB3uNDBIa74-7zcRF2nwjHdPv8yiYg341UYUY056YX7xbQmmLptRs_LiATO-qMbmv8uWraxXETv-_m-X7bE4xWrRqzh4balDGAifkUMzHj1rbH"
              alt="An expressive close up portrait of a woman laughing naturally with healthy teeth celebrating effortless smile confidence"
              className="w-full h-full object-cover filter brightness-95"
              referrerPolicy="no-referrer"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#171A36]/80 via-transparent to-transparent pointer-events-none"
              aria-hidden="true"
            />

            {/* Philosophy Banner */}
            <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/85 border border-[#D9DCE8]/80 backdrop-blur-md shadow-lg">
              <span className="font-['Space_Mono'] text-xs text-[#5e50ae] uppercase font-bold tracking-wider block mb-1">
                PHILOSOPHY IN ACTION
              </span>
              <p className="font-['Space_Grotesk'] text-base sm:text-lg font-bold text-[#171A36] leading-snug">
                "The best dental care is the care you feel completely confident in choosing."
              </p>
            </div>
          </div>
        </div>

        {/* Content Column with Interactive Steps */}
        <div ref={textColRef} className="lg:col-span-6 flex flex-col gap-8">
          <div>
            <span className="font-['Space_Mono'] text-xs text-[#5e50ae] uppercase tracking-widest font-bold block mb-2">
              THE ART OF A CONFIDENT SMILE
            </span>
            <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#171A36] uppercase leading-tight tracking-tight">
              Care That Starts With You.
            </h2>
            <p className="font-['Inter'] text-sm sm:text-base text-[#46464d] mt-3 leading-relaxed">
              Every patient has different concerns. Discuss your priorities, understand the available options, and work with your dental professional to determine appropriate next steps.
            </p>
          </div>

          {/* 3 Numbered Interactive Steps */}
          <div ref={stepsListRef} className="flex flex-col gap-4">
            {steps.map((step, index) => {
              const isSelected = activeStep === index;
              return (
                <div
                  key={step.number}
                  onClick={() => setActiveStep(index)}
                  className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col gap-2 ${
                    isSelected
                      ? 'bg-white border-[#A99BFF] shadow-md ring-1 ring-[#A99BFF]/40'
                      : 'bg-white/80 border-[#D9DCE8] hover:bg-white hover:border-[#A99BFF]/60 shadow-sm'
                  }`}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isSelected}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setActiveStep(index);
                    }
                  }}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold transition-colors ${
                        isSelected ? 'text-[#5e50ae]' : 'text-[#46464d]'
                      }`}
                    >
                      {step.number}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-['Space_Grotesk'] text-lg sm:text-xl font-bold text-[#171A36]">
                          {step.title}
                        </h3>
                        {isSelected && (
                          <CheckCircle2 className="w-5 h-5 text-[#5e50ae]" />
                        )}
                      </div>
                      <p className="font-['Inter'] text-sm text-[#46464d] mt-1 leading-relaxed">
                        {step.summary}
                      </p>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="pl-11 pt-2 border-t border-[#D9DCE8]/60 text-xs sm:text-sm text-[#171A36] font-['Inter'] leading-relaxed animate-fadeIn">
                      {step.detail}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Consultation Bridge */}
          <div className="pt-2">
            <button
              onClick={onOpenConsultation}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#171A36] text-white text-sm font-semibold hover:shadow-[0_0_24px_rgba(94,80,174,0.4)] transition-all"
            >
              <span>Begin With Step 01: Understand</span>
              <ArrowRight className="w-4 h-4 text-[#A99BFF]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
