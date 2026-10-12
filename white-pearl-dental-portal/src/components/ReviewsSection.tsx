import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CLINIC_CONFIG } from '../config/clinicData';
import { Star, ExternalLink, ShieldCheck, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const ReviewsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

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
          { opacity: 0, y: 35 },
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

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className="w-full px-4 sm:px-6 lg:px-12 py-20 lg:py-28 bg-[#F7F7FC] relative"
      aria-label="Google Business Reviews and Reputation"
    >
      <div className="max-w-7xl mx-auto">
        <div
          ref={cardRef}
          className="rounded-3xl bg-white p-8 sm:p-12 shadow-xl border border-[#D9DCE8] flex flex-col lg:flex-row items-stretch justify-between gap-10 lg:gap-14"
        >
          {/* Score Column */}
          <div className="flex flex-col items-start justify-between gap-6 max-w-sm shrink-0 border-b lg:border-b-0 lg:border-r border-[#D9DCE8]/80 pb-8 lg:pb-0 lg:pr-10">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-1.5 text-amber-500" aria-label="5 stars rating">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <div className="flex items-baseline gap-2">
                <span className="font-['Space_Grotesk'] text-5xl sm:text-6xl font-bold text-[#171A36] leading-none">
                  5.0
                </span>
                <span className="font-['Inter'] text-lg text-[#46464d]">
                  / 5.0
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs font-['Space_Mono'] font-bold text-[#46464d] uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-[#5e50ae]" />
                <span>19 GOOGLE BUSINESS REVIEWS · VERIFIED</span>
              </div>

              <p className="font-['Inter'] text-xs sm:text-sm text-[#46464d] leading-relaxed">
                Consistently rated 5.0 stars by patients across Raysan and Gandhinagar for patient-first transparency and clinical hygiene.
              </p>
            </div>

            <a
              href="https://maps.google.com/?q=White+Pearl+Dental+Clinic+Raysan+Gandhinagar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#F3F3F8] hover:bg-[#171A36] text-[#171A36] hover:text-white font-['Inter'] text-xs font-semibold border border-[#D9DCE8] transition-all duration-200"
            >
              <span>Read on Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Testimonial Stream */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full items-stretch">
            {CLINIC_CONFIG.reviews.slice(0, 2).map((review) => (
              <div
                key={review.id}
                className="p-6 rounded-2xl bg-[#F7F7FC] border border-[#D9DCE8]/80 flex flex-col justify-between hover:border-[#A99BFF]/60 transition-colors"
              >
                <div>
                  <Quote className="w-6 h-6 text-[#A99BFF] mb-3 opacity-60" />
                  <p className="font-['Inter'] text-sm sm:text-base text-[#1a1c1f] italic leading-relaxed">
                    "{review.snippet}"
                  </p>
                </div>

                <div className="flex items-center justify-between pt-6 mt-6 border-t border-[#D9DCE8]/60">
                  <div className="flex flex-col">
                    <span className="font-['Space_Grotesk'] text-sm font-bold text-[#171A36]">
                      {review.author}
                    </span>
                    <span className="font-['Inter'] text-xs text-[#46464d]">
                      {review.relation}
                    </span>
                  </div>
                  <span className="font-['Space_Mono'] text-[10px] text-[#5e50ae] font-bold px-2 py-0.5 rounded bg-white border border-[#A99BFF]/30">
                    VERIFIED PATIENT
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
