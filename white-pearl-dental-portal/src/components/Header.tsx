import React, { useState, useEffect } from 'react';
import { CLINIC_CONFIG } from '../config/clinicData';
import { Menu, X, Phone, Calendar, ArrowRight } from 'lucide-react';

interface HeaderProps {
  onOpenConsultation: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenConsultation }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Philosophy', href: '#philosophy' },
    { label: 'Treatments', href: '#services' },
    { label: 'Smile Care', href: '#featured-care' },
    { label: 'Restorative', href: '#implants' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Location', href: '#location' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 pointer-events-none px-4 sm:px-6 lg:px-12 ${
          isScrolled ? 'pt-2' : 'pt-4'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-5 sm:px-6 rounded-2xl bg-white/85 backdrop-blur-xl border border-[#D9DCE8]/80 shadow-[0_20px_40px_-15px_rgba(169,155,255,0.18),0_0_15px_0_rgba(188,235,255,0.25)] pointer-events-auto">
          {/* Brand Logo & Wordmark */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A99BFF] rounded-lg p-1"
            aria-label="White Pearl Dental Clinic Home"
          >
            <div className="relative w-10 h-10 rounded-xl bg-[#171A36] flex items-center justify-center p-1.5 shadow-sm group-hover:scale-105 transition-transform duration-300">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1s3DE4AUWJeKuQkI_K3N5fUdi_8y5Ie6M3xfOURtjhGtgU2w_OwWCbgbDTfXGsk-j7gO6JSMH15GievBKIxVQGkuS_hDZC35xrWGQC-IgmxX8u7FmzRIE2mgOIfrK0dECivdDnAgueFrBif7QolocNmfEgfESppS0GVcc8ie3OFyzL3_CTJlUjV4xSlCe6SKnCXoxTRyUdLlUdFuON9vfREaCvpLvkV_6dfUJcS8S5tDCGSEtnNW6"
                alt="White Pearl Logo"
                className="w-full h-full object-contain filter brightness-110"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-['Michroma'] text-base sm:text-lg text-[#171A36] tracking-tight leading-none group-hover:text-[#5e50ae] transition-colors">
                WHITE PEARL
              </span>
              <span className="font-['Space_Mono'] text-[10px] text-[#5e50ae] font-bold tracking-widest uppercase mt-0.5">
                DENTAL CLINIC · RAYSAN
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-1 xl:gap-2 px-3 py-1.5 rounded-xl bg-[#F7F7FC]/90 border border-[#D9DCE8]/50"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-3 py-1.5 text-xs xl:text-sm font-medium text-[#46464d] hover:text-[#171A36] hover:bg-white rounded-lg transition-all whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            {/* Quick Call Button */}
            <a
              href={`tel:${CLINIC_CONFIG.contact.phone.replace(/\s+/g, '')}`}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-[#171A36] hover:bg-[#F3F3F8] border border-[#D9DCE8] transition-all"
              aria-label={`Call White Pearl at ${CLINIC_CONFIG.contact.phone}`}
            >
              <Phone className="w-3.5 h-3.5 text-[#5e50ae]" />
              <span className="font-['Space_Mono']">{CLINIC_CONFIG.contact.phone}</span>
            </a>

            {/* Primary Consultation Button */}
            <button
              onClick={onOpenConsultation}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-[#171A36] text-white text-xs sm:text-sm font-semibold hover:shadow-[0_0_24px_rgba(169,155,255,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Calendar className="w-4 h-4 text-[#BCEBFF]" />
              <span className="whitespace-nowrap">Book Consultation</span>
            </button>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#171A36] hover:bg-[#F3F3F8] border border-[#D9DCE8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A99BFF]"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="fixed inset-0 z-40 lg:hidden flex flex-col justify-between bg-[#171A36]/95 backdrop-blur-2xl text-white p-6 pt-28 animate-fadeIn"
        >
          <div className="flex flex-col gap-3 max-w-md mx-auto w-full">
            <div className="pb-3 border-b border-white/10 flex items-center justify-between">
              <span className="font-['Space_Mono'] text-xs text-[#BCEBFF] uppercase tracking-wider">
                NAVIGATION MATRIX
              </span>
              <span className="text-xs text-white/50">Press ESC to close</span>
            </div>

            <nav className="flex flex-col gap-1.5 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="px-4 py-3 text-lg font-['Space_Grotesk'] font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-all flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-[#A99BFF]" />
                </a>
              ))}
            </nav>
          </div>

          {/* Mobile Bottom Contact Strip */}
          <div className="max-w-md mx-auto w-full border-t border-white/10 pt-6 flex flex-col gap-3">
            <a
              href={`tel:${CLINIC_CONFIG.contact.phone.replace(/\s+/g, '')}`}
              className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-white/10 text-white font-medium hover:bg-white/15 transition-all text-sm"
            >
              <Phone className="w-4 h-4 text-[#BCEBFF]" />
              <span>Call Clinic: {CLINIC_CONFIG.contact.phone}</span>
            </a>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full py-3.5 rounded-xl bg-[#A99BFF] text-[#171A36] font-bold text-center hover:bg-white transition-all shadow-lg text-sm"
            >
              Request Consultation Now
            </button>
            <p className="text-center font-['Space_Mono'] text-[11px] text-white/50 mt-1">
              Raysan, Gandhinagar · Open Mon 10:00 AM
            </p>
          </div>
        </div>
      )}
    </>
  );
};
