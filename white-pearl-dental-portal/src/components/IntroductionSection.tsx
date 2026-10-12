import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Clock, Microscope, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const IntroductionSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const visualCardRef = useRef<HTMLDivElement>(null);
  const connectorLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          [headingRef.current, textRef.current, metricsRef.current, visualCardRef.current],
          { opacity: 1, y: 0 }
        );
        return;
      }

      // Animate fine ice-blue connector line
      if (connectorLineRef.current) {
        gsap.fromTo(
          connectorLineRef.current,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Reveal the heading and text in short sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      if (headingRef.current) {
        tl.fromTo(
          headingRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
        );
      }

      if (textRef.current) {
        tl.fromTo(
          textRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
          '-=0.5'
        );
      }

      if (metricsRef.current) {
        tl.fromTo(
          metricsRef.current.children,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' },
          '-=0.4'
        );
      }

      if (visualCardRef.current) {
        tl.fromTo(
          visualCardRef.current,
          { opacity: 0, scale: 0.95, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: 'power3.out' },
          '-=0.6'
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="w-full bg-[#171A36] text-white px-4 sm:px-6 lg:px-12 py-20 lg:py-28 relative overflow-hidden"
      aria-label="Philosophy and Approach"
    >
      {/* Decorative Radial Backdrop */}
      <div
        className="absolute inset-0 bg-radial from-[#5e50ae]/15 via-transparent to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-[#A99BFF]/10 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto flex flex-col gap-10 lg:gap-14 relative z-10">
        {/* Fine Ice-Blue Connector Line */}
        <div
          ref={connectorLineRef}
          className="w-full h-[1px] bg-gradient-to-r from-[#BCEBFF]/80 via-[#A99BFF]/40 to-transparent"
          aria-hidden="true"
        />

        {/* Section Header: Eyebrow & Chapter Index */}
        <div className="flex items-center justify-between text-xs font-['Space_Mono']">
          <div className="flex items-center gap-2 text-[#e5deff]">
            <span className="w-2 h-2 rounded-full bg-[#BCEBFF]" />
            <span className="uppercase tracking-widest font-semibold">
              THE WHITE PEARL APPROACH
            </span>
          </div>
          <span className="text-[#BCEBFF] uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/10">
            02 / PHILOSOPHY
          </span>
        </div>

        {/* Two-Column Master Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Vision & Trust Benchmarks */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <h2
              ref={headingRef}
              className="font-['Space_Grotesk'] text-3xl sm:text-4xl lg:text-[44px] font-bold text-white uppercase leading-tight tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Clarity is the Beginning of Confidence.
            </h2>

            <p
              ref={textRef}
              className="font-['Inter'] text-base sm:text-lg text-white/80 max-w-xl leading-relaxed"
            >
              Understanding your dental concerns and available treatment options can help you make informed decisions about your oral health. We reject rushed procedures in favor of thoughtful, transparent clinical mastery.
            </p>

            {/* Standard Metrics Cards */}
            <div
              ref={metricsRef}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4"
            >
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-['Space_Grotesk'] text-3xl font-bold text-[#BCEBFF]">
                    100%
                  </span>
                  <Shield className="w-5 h-5 text-[#A99BFF]" />
                </div>
                <p className="font-['Inter'] text-sm text-white/70 leading-relaxed">
                  Sterile class-B autoclaved standards adhering to international NABH safety criteria.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-['Space_Grotesk'] text-3xl font-bold text-[#A99BFF]">
                    01 : 01
                  </span>
                  <Clock className="w-5 h-5 text-[#BCEBFF]" />
                </div>
                <p className="font-['Inter'] text-sm text-white/70 leading-relaxed">
                  Dedicated time blocks ensuring every diagnostic concern is completely mapped.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Diagnostic Architecture Accent Frame */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div
              ref={visualCardRef}
              className="relative w-full max-w-md rounded-3xl bg-white/10 p-5 shadow-2xl border border-white/15 backdrop-blur-xl flex flex-col gap-4"
            >
              <div className="flex items-center justify-between text-white/70">
                <span className="font-['Space_Mono'] text-xs uppercase tracking-wider font-semibold">
                  DIAGNOSTIC ARCHITECTURE
                </span>
                <Microscope className="w-4 h-4 text-[#BCEBFF]" />
              </div>

              <div className="w-full h-56 sm:h-64 rounded-2xl overflow-hidden relative group">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAozxYC0n6OLOTlP9VvA5P1MFvlVrOdF9wyN0mJoGCiO2GPn4lTSzY6uMnNEL4oFn-7stTaJF2CCc8l3RBD1xS1d2dfseriRN9z8rUZPHOoKumTzeAPAE_1htT2CBMpA40aFl1E4jPim4tGJ1vjNep1YyZ57t1te3o1N3rTyF9ObfTUAreAjzQ2Azm9SBo-SoU4jchvoo-kElIdJI0BD_pb87yrluRtLTdX_ihYWtSTJminvGF0TMGM"
                  alt="An ethereal close up of a luminous mother-of-pearl architectural sphere suspended in pristine soft lighting"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#171A36]/70 via-transparent to-transparent pointer-events-none"
                  aria-hidden="true"
                />
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-white/10">
                <div className="flex items-center gap-2 text-[#BCEBFF] text-xs font-['Space_Mono']">
                  <CheckCircle2 className="w-4 h-4 text-[#A99BFF]" />
                  <span className="uppercase tracking-wider">EVIDENCE-BASED CARE MODEL</span>
                </div>
                <span className="font-['Space_Mono'] text-[11px] text-white/40">
                  REF 02-PHIL
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
