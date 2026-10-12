import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { CLINIC_CONFIG } from '../config/clinicData';
import { Star, ShieldCheck, ArrowRight, Calendar, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onOpenConsultation: () => void;
  onExploreTreatments: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenConsultation,
  onExploreTreatments,
}) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sphereCardRef = useRef<HTMLDivElement>(null);
  const sphereImgRef = useRef<HTMLImageElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const reputationRef = useRef<HTMLDivElement>(null);
  const orbitalRingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scope GSAP animations cleanly with cleanup
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        // Immediate clean display for reduced motion
        gsap.set(
          [
            headlineRef.current,
            sphereCardRef.current,
            copyRef.current,
            ctaGroupRef.current,
            reputationRef.current,
          ],
          { opacity: 1, y: 0, scale: 1 }
        );
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Reveal the headline
      if (headlineRef.current) {
        tl.fromTo(
          headlineRef.current,
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.9 }
        );
      }

      // 2. Scale the pearl visual into position
      if (sphereCardRef.current) {
        tl.fromTo(
          sphereCardRef.current,
          { opacity: 0, scale: 0.94, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 1.0 },
          '-=0.7'
        );
      }

      // 3. Fade and translate supporting copy
      if (copyRef.current) {
        tl.fromTo(
          copyRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.6'
        );
      }

      // 4. Stagger CTA entrances
      if (ctaGroupRef.current) {
        tl.fromTo(
          ctaGroupRef.current.children,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 },
          '-=0.5'
        );
      }

      // 5. Reveal reputation indicator
      if (reputationRef.current) {
        tl.fromTo(
          reputationRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.4'
        );
      }

      // 6. Restrained subtle levitation on the 3D pearl sphere
      if (sphereImgRef.current) {
        gsap.to(sphereImgRef.current, {
          y: -10,
          rotation: 1.2,
          duration: 4.5,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      }

      // Subtle slow rotation on orbital glow rings
      if (orbitalRingRef.current) {
        gsap.to(orbitalRingRef.current, {
          rotation: 360,
          duration: 35,
          ease: 'none',
          repeat: -1,
        });
      }
    }, heroRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative w-full overflow-hidden px-4 sm:px-6 lg:px-12 pt-28 pb-16 lg:pt-36 lg:pb-24 bg-[#F7F7FC]"
      aria-label="Hero Introduction"
    >
      {/* Prismatic Ambient Background Glows */}
      <div
        className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-[#A99BFF]/25 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/4 right-0 w-[30rem] h-[30rem] rounded-full bg-[#BCEBFF]/35 blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        {/* Left Column: Typographic & Action Engine */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6 lg:gap-7">
          {/* Eyebrow & Chapter Index */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#D9DCE8] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#5e50ae] animate-pulse" />
              <span className="font-['Space_Mono'] text-xs font-semibold text-[#46464d] uppercase tracking-wider">
                {CLINIC_CONFIG.eyebrow}
              </span>
            </div>
            <span className="font-['Space_Mono'] text-[11px] text-[#5e50ae] font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-[#e5deff]/70 border border-[#A99BFF]/30">
              01 / DISCOVER
            </span>
          </div>

          {/* Master Headline */}
          <h1
            ref={headlineRef}
            className="font-['Michroma'] text-3xl sm:text-5xl lg:text-[54px] text-[#171A36] uppercase leading-[1.12] tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Your Smile, in a New Light.
          </h1>

          {/* Supporting Copy */}
          <p
            ref={copyRef}
            className="font-['Inter'] text-base sm:text-lg text-[#46464d] max-w-xl leading-relaxed"
          >
            Explore dental care options, understand your choices, and take an informed next step toward your oral health with serene clinical artistry and laser diagnostic mastery.
          </p>

          {/* Dual CTAs */}
          <div
            ref={ctaGroupRef}
            className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto"
          >
            <button
              onClick={onExploreTreatments}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#171A36] text-white text-sm font-semibold hover:shadow-[0_0_28px_rgba(94,80,174,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Explore Treatments</span>
              <ArrowRight className="w-4 h-4 text-[#A99BFF]" />
            </button>

            <button
              onClick={onOpenConsultation}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white/90 text-[#171A36] text-sm font-semibold border border-[#D9DCE8] shadow-sm backdrop-blur-md hover:bg-[#F3F3F8] hover:border-[#A99BFF]/60 transition-all"
            >
              <Calendar className="w-4 h-4 text-[#5e50ae]" />
              <span>Request Consultation</span>
            </button>
          </div>

          {/* Reputation Indicator Badge */}
          <div
            ref={reputationRef}
            className="flex flex-wrap items-center gap-4 pt-3 border-t border-[#D9DCE8]/60 w-full"
          >
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white border border-[#D9DCE8] shadow-sm backdrop-blur-md">
              <div className="flex text-amber-500" aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-['Space_Grotesk'] text-base text-[#171A36] font-bold">
                5.0
              </span>
              <span className="font-['Space_Mono'] text-xs text-[#46464d]">
                · 19 Google reviews
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-['Space_Mono'] text-[#46464d] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#5e50ae]" />
              <span>CLARITY · CARE · CONFIDENCE</span>
            </div>
          </div>
        </div>

        {/* Right Column: Bespoke 3D Pearl Sphere Artwork */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          {/* Frosted Decorative Frame Backplate */}
          <div
            ref={sphereCardRef}
            className="relative w-full aspect-square max-w-md rounded-3xl bg-white/70 p-4 shadow-[0_20px_45px_-15px_rgba(169,155,255,0.22),0_0_20px_0_rgba(188,235,255,0.28)] border border-[#D9DCE8]/80 backdrop-blur-xl group"
          >
            {/* Orbital Rings Background */}
            <div
              ref={orbitalRingRef}
              className="absolute -inset-4 rounded-full border border-dashed border-[#A99BFF]/30 pointer-events-none"
              aria-hidden="true"
            />

            {/* Main Visual Image Container */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#171A36] flex items-center justify-center shadow-inner">
              <img
                ref={sphereImgRef}
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQqqiL3Isj6LxyXrp0RV6CwG-RtdN2TLxROelF29fGP31-fnRAW_C43G4AJYglmJAXKf-xT2VUIY2kgTEqhdZ3QjOydB97FQ0wXcmH0BvNvmDsgLQxT-bBkrhLKLvXKW9A3vU9e08otI2nk0Zo5Ig2gEI1i-1wImE7Bvec0-hV1nh4O2ffap6G9yAigph7r2ItYMVrQVDiz0eNtkFD0dop04qB3SAoR4YMKU_xAcHRroIqObzF6Ilm"
                alt="A luminous translucent pearl sphere sculpture levitating gracefully in an architectural futuristic midnight blue gallery with iridescent specular reflections"
                className="w-full h-full object-cover transition-transform duration-700 select-none pointer-events-none"
                referrerPolicy="no-referrer"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#171A36]/80 via-transparent to-transparent pointer-events-none"
                aria-hidden="true"
              />

              {/* Metadata Overlays */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white pointer-events-none">
                <span className="font-['Space_Mono'] text-[11px] text-[#BCEBFF] tracking-wider">
                  LAT 23.1672° N · LON 72.6391° E
                </span>
                <span className="font-['Space_Mono'] text-[10px] text-white uppercase px-2 py-0.5 rounded bg-white/20 backdrop-blur-md border border-white/20">
                  RAYSAN CORE
                </span>
              </div>
            </div>

            {/* Micro Floating Decorative Badge */}
            <div className="absolute -top-3 -right-3 px-3 py-1.5 rounded-xl bg-white border border-[#D9DCE8] shadow-md flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#5e50ae] animate-ping" />
              <span className="font-['Space_Mono'] text-[11px] text-[#171A36] font-bold">
                LIVE CONSULTATIONS
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
