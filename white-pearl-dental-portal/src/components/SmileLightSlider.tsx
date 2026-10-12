import React, { useState, useRef, useCallback } from 'react';
import { Sparkles } from 'lucide-react';

export const SmileLightSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedPercentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(clampedPercentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex items-center justify-between text-xs font-['Space_Mono'] text-[#46464d]">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#5e50ae]" />
          <span className="uppercase font-semibold text-[#171A36]">
            SMILE LIGHT LUSTER EXPLORER
          </span>
        </div>
        <span>Drag slider to compare enamel luminance</span>
      </div>

      <div
        ref={containerRef}
        className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden cursor-ew-resize select-none border border-[#D9DCE8] shadow-md bg-[#171A36]"
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        tabIndex={0}
        role="slider"
        aria-label="Smile Luster Comparison Slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(sliderPosition)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') {
            setSliderPosition((prev) => Math.max(0, prev - 5));
          } else if (e.key === 'ArrowRight') {
            setSliderPosition((prev) => Math.min(100, prev + 5));
          }
        }}
      >
        {/* Layer 1: Enhanced Luminous Aesthetic (Right / After) */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvcWgxzR4Q5Wyx-HpAtoDBfsl_OPjQPIlAi7WuhrfCmLDp_2dhzbz2PAztVf1BJ34nt8i-jQYmMnagDo6mxO0dhThZOYD2BMKFjWrIQKP6qCEEEOkpP_pLgMpqirxeFC5fb60nbosvwp6-8B-ErVO-kSTiwrvetey4B0q_1gRa__HmGr5F8y_PzpPmQUT4mZbYFZv3VxQQ3kvOCTdmJ142tdhGUEYPo-_yrNZQBSGTjtX4I3C6Obn3"
            alt="Luminous refined smile aesthetic after clinical alignment and whitening"
            className="w-full h-full object-cover filter brightness-105 contrast-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 right-4 px-3 py-1 rounded-lg bg-[#171A36]/80 text-[#BCEBFF] font-['Space_Mono'] text-xs font-semibold backdrop-blur-md border border-white/20">
            PEARLESCENT LUSTER
          </div>
        </div>

        {/* Layer 2: Natural Baseline (Left / Before), clipped by slider percentage */}
        <div
          className="absolute inset-0 h-full overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="relative w-full h-full" style={{ width: containerRef.current?.clientWidth || '100%' }}>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvcWgxzR4Q5Wyx-HpAtoDBfsl_OPjQPIlAi7WuhrfCmLDp_2dhzbz2PAztVf1BJ34nt8i-jQYmMnagDo6mxO0dhThZOYD2BMKFjWrIQKP6qCEEEOkpP_pLgMpqirxeFC5fb60nbosvwp6-8B-ErVO-kSTiwrvetey4B0q_1gRa__HmGr5F8y_PzpPmQUT4mZbYFZv3VxQQ3kvOCTdmJ142tdhGUEYPo-_yrNZQBSGTjtX4I3C6Obn3"
              alt="Baseline dental presentation before clinical shade optimization"
              className="w-full h-full object-cover filter saturate-75 brightness-90 contrast-95 sepia-[0.15]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-black/60 text-white font-['Space_Mono'] text-xs font-semibold backdrop-blur-md border border-white/20">
              BASELINE DIAGNOSTIC
            </div>
          </div>
        </div>

        {/* Glowing Splitter Line & Frosted Spherical Handle */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-[#A99BFF] pointer-events-none"
          style={{
            left: `${sliderPosition}%`,
            boxShadow: '0 0 12px #A99BFF, 0 0 24px #BCEBFF',
          }}
        >
          {/* Spherical Handle */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white/90 border-2 border-[#A99BFF] shadow-[0_0_15px_rgba(169,155,255,0.6)] backdrop-blur-md flex items-center justify-center pointer-events-auto">
            <div className="flex items-center gap-0.5 text-[#171A36]">
              <span className="text-[10px] font-bold">◀</span>
              <span className="text-[10px] font-bold">▶</span>
            </div>
          </div>
        </div>
      </div>
      <p className="font-['Inter'] text-xs text-[#46464d] text-center italic">
        Interactive visualization demonstrating optical light transmission principles under clinical shade remineralization.
      </p>
    </div>
  );
};
