import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CLINIC_CONFIG } from '../config/clinicData';
import { MapPin, Phone, Clock, Navigation, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const LocationSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const mapCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([detailsRef.current, mapCardRef.current], { opacity: 1, y: 0 });
        return;
      }

      if (detailsRef.current && mapCardRef.current) {
        gsap.fromTo(
          [detailsRef.current, mapCardRef.current],
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
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
      id="location"
      ref={sectionRef}
      className="w-full px-4 sm:px-6 lg:px-12 py-20 lg:py-28 bg-[#F7F7FC] relative"
      aria-label="Sanctuary Location and Contact"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-12 lg:gap-16">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#5e50ae]" />
            <span className="font-['Space_Mono'] text-xs text-[#5e50ae] uppercase tracking-widest font-semibold">
              SANCTUARY &amp; REACH
            </span>
          </div>
          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#171A36] uppercase tracking-tight">
            Find White Pearl.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Clinic Details List */}
          <div ref={detailsRef} className="lg:col-span-5 flex flex-col gap-6">
            {/* Address */}
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-[#D9DCE8] shadow-sm hover:border-[#A99BFF]/50 transition-colors">
              <MapPin className="w-6 h-6 text-[#5e50ae] shrink-0 mt-1" />
              <div className="flex flex-col">
                <span className="font-['Space_Mono'] text-xs text-[#5e50ae] uppercase font-bold tracking-wider">
                  CLINIC ADDRESS
                </span>
                <p className="font-['Space_Grotesk'] text-lg font-bold text-[#171A36] mt-1">
                  {CLINIC_CONFIG.name}
                </p>
                <p className="font-['Inter'] text-sm text-[#46464d] mt-1 leading-relaxed">
                  {CLINIC_CONFIG.contact.address.line1},<br />
                  {CLINIC_CONFIG.contact.address.line2},<br />
                  {CLINIC_CONFIG.contact.address.city}, {CLINIC_CONFIG.contact.address.state}{' '}
                  {CLINIC_CONFIG.contact.address.postalCode}
                </p>
              </div>
            </div>

            {/* Direct Phone */}
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-[#D9DCE8] shadow-sm hover:border-[#A99BFF]/50 transition-colors">
              <Phone className="w-6 h-6 text-[#5e50ae] shrink-0 mt-1" />
              <div className="flex flex-col">
                <span className="font-['Space_Mono'] text-xs text-[#5e50ae] uppercase font-bold tracking-wider">
                  TELEPHONE DIRECT
                </span>
                <a
                  href={`tel:${CLINIC_CONFIG.contact.phone.replace(/\s+/g, '')}`}
                  className="font-['Space_Mono'] text-2xl font-bold text-[#171A36] hover:text-[#5e50ae] transition-colors mt-1"
                >
                  {CLINIC_CONFIG.contact.phone}
                </a>
                <span className="font-['Inter'] text-xs text-[#46464d] mt-0.5">
                  Click to speak directly with clinic front-desk
                </span>
              </div>
            </div>

            {/* Consultation Hours */}
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-[#D9DCE8] shadow-sm hover:border-[#A99BFF]/50 transition-colors">
              <Clock className="w-6 h-6 text-[#5e50ae] shrink-0 mt-1" />
              <div className="flex flex-col">
                <span className="font-['Space_Mono'] text-xs text-[#5e50ae] uppercase font-bold tracking-wider">
                  CONSULTATION HOURS
                </span>
                <p className="font-['Inter'] text-sm sm:text-base font-semibold text-[#171A36] mt-1">
                  Monday – Saturday: 10:00 AM – 8:00 PM
                </p>
                <span className="font-['Inter'] text-xs text-[#46464d] mt-0.5">
                  Sunday: By prior consultation / appointment
                </span>
              </div>
            </div>

            {/* Direct Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={CLINIC_CONFIG.contact.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#171A36] text-white text-xs sm:text-sm font-semibold hover:shadow-[0_0_24px_rgba(94,80,174,0.4)] transition-all"
              >
                <Navigation className="w-4 h-4 text-[#BCEBFF]" />
                <span>Get Directions</span>
              </a>

              <a
                href={`tel:${CLINIC_CONFIG.contact.phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-[#171A36] text-xs sm:text-sm font-semibold border border-[#D9DCE8] shadow-sm hover:bg-[#F3F3F8] transition-all"
              >
                <Phone className="w-4 h-4 text-[#5e50ae]" />
                <span>Click to Call</span>
              </a>
            </div>
          </div>

          {/* Styled Interactive Map Viewport */}
          <div ref={mapCardRef} className="lg:col-span-7">
            <div className="relative w-full h-[400px] sm:h-[460px] rounded-3xl overflow-hidden shadow-xl border border-[#D9DCE8] bg-[#171A36] group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_B9adQMzbUGDp0ZVDCN_1dH37spaJOCpfwskixSStUbol9X0Xzms4Jam1hVJLsQTbNPQhEI_cRKMNMzzEeBWbJP8xtIAFZYW-a2ZimAQMvAyh5S99z19f0JgFrHtEDxVWDaEYE9JMnJiGCvFdj9qU9oPPG4Cv5EDfE0ZKpG2M1A3_SAQnRTQABiveFftcPhyxqBuw9r9zk7eaSizyKe0K8tpnn-5bT41d_5k7XqltrNGh4CLrg4n_"
                alt="Map location overview for White Pearl Dental Clinic in Raysan, Gandhinagar"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                referrerPolicy="no-referrer"
              />

              <div
                className="absolute inset-0 bg-gradient-to-t from-[#171A36]/80 via-transparent to-transparent pointer-events-none"
                aria-hidden="true"
              />

              {/* Map Floating Card */}
              <div className="absolute top-4 left-4 right-4 sm:right-auto sm:max-w-xs p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white/40 shadow-lg">
                <span className="font-['Space_Mono'] text-[11px] text-[#5e50ae] uppercase font-bold block">
                  LANDMARK DESTINATION
                </span>
                <p className="font-['Space_Grotesk'] text-sm font-bold text-[#171A36] mt-0.5">
                  Opposite Petrol Pump, Sarthak Heaven
                </p>
                <p className="font-['Inter'] text-xs text-[#46464d] mt-0.5">
                  TP–PDPU Cross Road Corridor
                </p>
              </div>

              {/* Bottom Strip */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white/40 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#5e50ae] animate-pulse" />
                  <span className="font-['Space_Mono'] text-xs text-[#171A36] font-bold">
                    PDPU CROSS ROAD · EASY PARKING AVAILABLE
                  </span>
                </div>
                <a
                  href={CLINIC_CONFIG.contact.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-['Space_Mono'] text-xs text-[#5e50ae] hover:underline font-bold inline-flex items-center gap-1"
                >
                  <span>Open Full Map</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
