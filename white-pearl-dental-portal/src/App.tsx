import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { IntroductionSection } from './components/IntroductionSection';
import { DentalServicesSection } from './components/DentalServicesSection';
import { FeaturedCareSection } from './components/FeaturedCareSection';
import { ImplantCareSection } from './components/ImplantCareSection';
import { ReviewsSection } from './components/ReviewsSection';
import { AppointmentForm } from './components/AppointmentForm';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { ServiceModal } from './components/ServiceModal';
import { TreatmentService, CLINIC_CONFIG } from './config/clinicData';

export function App() {
  const [selectedService, setSelectedService] = useState<TreatmentService | null>(null);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string>('cosmetic');

  const scrollToConsultation = (serviceId?: string) => {
    if (serviceId) {
      setPreselectedServiceId(serviceId);
    }
    const formElement = document.getElementById('consultation');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const servicesElement = document.getElementById('services');
    if (servicesElement) {
      servicesElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7FC] text-[#1a1c1f] flex flex-col selection:bg-[#A99BFF]/30 selection:text-[#171A36]">
      {/* 1. Floating Navigation Header */}
      <Header onOpenConsultation={() => scrollToConsultation()} />

      <main className="flex-1 w-full flex flex-col">
        {/* 2. Pearl-Inspired Hero */}
        <HeroSection
          onOpenConsultation={() => scrollToConsultation()}
          onExploreTreatments={scrollToServices}
        />

        {/* 3. The White Pearl Approach (Introduction / Philosophy) */}
        <IntroductionSection />

        {/* 4. Dental-Services Discovery */}
        <DentalServicesSection
          onSelectService={(service) => setSelectedService(service)}
          onBookService={(serviceId) => scrollToConsultation(serviceId)}
        />

        {/* 5. Featured Care Section (Understand, Explore, Plan) */}
        <FeaturedCareSection
          onOpenConsultation={() => scrollToConsultation()}
        />

        {/* 6. Restorative and Implant-Care Feature */}
        <ImplantCareSection
          onBookImplantCare={() => scrollToConsultation('implants')}
        />

        {/* 7. Google Reviews (5.0 ★ · 19 Google reviews) */}
        <ReviewsSection />

        {/* 8. Appointment Form */}
        <AppointmentForm preselectedServiceId={preselectedServiceId} />

        {/* 9. Location and Contact */}
        <LocationSection />
      </main>

      {/* 10. Footer */}
      <Footer />

      {/* Clinical Service Detail Modal */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onBookService={(serviceId) => scrollToConsultation(serviceId)}
      />
    </div>
  );
}

export default App;
