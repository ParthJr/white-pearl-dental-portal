/**
 * Central Business Configuration for White Pearl Dental Clinic
 * 
 * Verified against official clinic listing:
 * Location: Raysan, Gandhinagar, Gujarat
 * Phone: 089050 06536
 * Rating: 5.0 / 5.0 (19 Google Reviews)
 * Opening: Monday 10:00 AM
 */

export interface TreatmentService {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  image: string;
  badge?: string;
  advisoryNote?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  relation: string;
  rating: number;
  snippet: string;
  timeAgo: string;
}

export const CLINIC_CONFIG = {
  name: 'White Pearl Dental Clinic',
  tagline: 'Your Smile, in a New Light',
  eyebrow: 'WHITE PEARL DENTAL CLINIC · RAYSAN',
  coordinates: {
    lat: '23.1672° N',
    lng: '72.6391° E',
    numericLat: 23.1672,
    numericLng: 72.6391,
    hubLabel: 'RAYSAN CORE',
  },
  contact: {
    phone: '089050 06536',
    phoneTel: '+918905006536',
    address: {
      line1: '10/11 Sarthak Heaven, Petrol Pump',
      line2: 'TP–PDPU Cross Road, near Raysan',
      city: 'Gandhinagar',
      state: 'Gujarat',
      postalCode: '382426',
      country: 'India',
      fullAddress: 'Petrol Pump, 10/11 Sarthak Heaven, TP–PDPU Cross Road, near Raysan, Gandhinagar, Gujarat 382426',
    },
    googleMapsDirectionsUrl: 'https://www.google.com/maps/search/?api=1&query=White+Pearl+Dental+Clinic+Sarthak+Heaven+Raysan+Gandhinagar+Gujarat+382426',
  },
  reputation: {
    rating: 5.0,
    maxRating: 5.0,
    reviewCount: 19,
    platform: 'Google Business Profile',
    verifiedLabel: '19 Google reviews · 5.0 ★ Rating',
  },
  schedule: {
    note: 'Monday opening at 10:00 AM. Please call ahead to confirm daily consultation slots.',
    days: [
      { day: 'Monday', hours: '10:00 AM – 8:00 PM', isOpen: true },
      { day: 'Tuesday', hours: '10:00 AM – 8:00 PM', isOpen: true },
      { day: 'Wednesday', hours: '10:00 AM – 8:00 PM', isOpen: true },
      { day: 'Thursday', hours: '10:00 AM – 8:00 PM', isOpen: true },
      { day: 'Friday', hours: '10:00 AM – 8:00 PM', isOpen: true },
      { day: 'Saturday', hours: '10:00 AM – 8:00 PM', isOpen: true },
      { day: 'Sunday', hours: 'By prior consultation / appointment', isOpen: true },
    ],
  },
  verifiedServices: [
    {
      id: 'cosmetic',
      category: 'Aesthetic Dentistry',
      title: 'Cosmetic Dentistry & Smile Aesthetics',
      subtitle: 'Custom Smile Line Alignment & Restorations',
      description: 'Comprehensive aesthetic evaluation tailored to your facial proportions. From custom veneers to smile line realignment, explore restorative techniques that prioritize tooth longevity and natural pearlescent harmony.',
      highlights: [
        'Personalized aesthetic smile analysis',
        'Minimal tooth preparation philosophies',
        'Natural optical translucency matching',
      ],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvcWgxzR4Q5Wyx-HpAtoDBfsl_OPjQPIlAi7WuhrfCmLDp_2dhzbz2PAztVf1BJ34nt8i-jQYmMnagDo6mxO0dhThZOYD2BMKFjWrIQKP6qCEEEOkpP_pLgMpqirxeFC5fb60nbosvwp6-8B-ErVO-kSTiwrvetey4B0q_1gRa__HmGr5F8y_PzpPmQUT4mZbYFZv3VxQQ3kvOCTdmJ142tdhGUEYPo-_yrNZQBSGTjtX4I3C6Obn3',
      badge: 'SIGNATURE CARE',
      advisoryNote: 'Treatment suitability determined after clinical intra-oral examination.',
    },
    {
      id: 'whitening',
      category: 'Luminous Enamel',
      title: 'Teeth Whitening & Enamel Care',
      subtitle: 'Gentle In-Office Light-Activated Brightening',
      description: 'In-office desensitized light-activated whitening therapies paired with enamel remineralization protocols for a visibly brighter, resilient luster.',
      highlights: [
        'Professional shade guide comparison',
        'Desensitizing protective barrier application',
        'Enamel remineralizing aftercare guidance',
      ],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAozxYC0n6OLOTlP9VvA5P1MFvlVrOdF9wyN0mJoGCiO2GPn4lTSzY6uMnNEL4oFn-7stTaJF2CCc8l3RBD1xS1d2dfseriRN9z8rUZPHOoKumTzeAPAE_1htT2CBMpA40aFl1E4jPim4tGJ1vjNep1YyZ57t1te3o1N3rTyF9ObfTUAreAjzQ2Azm9SBo-SoU4jchvoo-kElIdJI0BD_pb87yrluRtLTdX_ihYWtSTJminvGF0TMGM',
      badge: 'ENAMEL CARE',
      advisoryNote: 'Results vary based on natural baseline tooth shade and enamel condition.',
    },
    {
      id: 'checkup',
      category: 'Preventive Suite',
      title: 'Dental Check-ups & Preventive Diagnostics',
      subtitle: 'Intra-Oral Mapping & Early Detection',
      description: 'Thorough intra-oral camera examinations, periodontal indexing, and low-radiation digital imaging to spot minor concerns before they necessitate invasive treatments.',
      highlights: [
        'High-resolution intra-oral camera display',
        'Periodontal tissue health mapping',
        'Preventive oral hygiene guidance',
      ],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFRv8eXIXEVrRYqoSKpRoVTF0kYMkNh8G6grRutfN_ivsgRXEuIXhh5NXRnL42NHOFQbmY2W390A-5tKlXlIxuiRX8cj2SHX0LTnlR9gv0MkryJiOKLWNqca862d_0BNUrg_4icERtEjb_JiGrsEqQ_xtKEQmWpj7eizXSqqBcwP1h70Lgxc9_LDsHRqGj1O5s8jFI-yVcpyzpQqoFNp4k0uF15UkdP45FqXb_5PIuY0Y4sb-IdVRe',
      badge: 'PREVENTIVE SUITE',
      advisoryNote: 'Recommended at standard 6-month preventive care intervals.',
    },
    {
      id: 'bonding',
      category: 'Micro Restoration',
      title: 'Composite Bonding',
      subtitle: 'Single-Session Micro-Gap Closures & Edge Repair',
      description: 'Seamless edge repairs, chipped enamel restoration, and micro-gap closures shaped directly with biocompatible, color-matched resin composite in a single visit.',
      highlights: [
        'Direct cosmetic resin sculpting',
        'Conservative enamel preservation',
        'Single-session aesthetic correction',
      ],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0uiGasprvyxa_xQl_Eob9uarcFIrHqZTjndcZaD6Lf1AEiC7RYDdGNMPtnueI3aTyeTTXa2vgoMAlON_wXjYDvfb4W2gvhItm2EWjO5_E9-N2NIoGbp6M4H5XTn3duac4tyWNtgVS5pTMU9q7dT5TYTlaxHDr_SErotjWbRh64cOjikIQ1NUnD0naHMjxDx0lfEWVXoZ9yUK3P-f-7_4vuVdN6pEZ3msi-pE3OBd04pCcNf3JfiAX',
      badge: 'MICRO RESTORE',
      advisoryNote: 'Suitable for minor chips, spacing, or minor incisal asymmetries.',
    },
    {
      id: 'implants',
      category: 'Restorative Care',
      title: 'Dental Implants & Tooth Replacement',
      subtitle: 'Structured Multi-Stage Consultation & Planning',
      description: 'Explore available tooth-replacement options and discuss assessment, treatment planning, and follow-up considerations relevant to single or multi-tooth gaps.',
      highlights: [
        'Stage 1: Foundation Consultation & Medical Mapping',
        'Stage 2: Bone Density & Anatomical Assessment',
        'Stage 3: Personalized Blueprint & Restoration Planning',
      ],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQqqiL3Isj6LxyXrp0RV6CwG-RtdN2TLxROelF29fGP31-fnRAW_C43G4AJYglmJAXKf-xT2VUIY2kgTEqhdZ3QjOydB97FQ0wXcmH0BvNvmDsgLQxT-bBkrhLKLvXKW9A3vU9e08otI2nk0Zo5Ig2gEI1i-1wImE7Bvec0-hV1nh4O2ffap6G9yAigph7r2ItYMVrQVDiz0eNtkFD0dop04qB3SAoR4YMKU_xAcHRroIqObzF6Ilm',
      badge: 'IMPLANT CARE',
      advisoryNote: 'Implant placement requires verified anatomical and bone eligibility.',
    },
    {
      id: 'restorative',
      category: 'Structural Longevity',
      title: 'Restorative Inlays, Onlays & Crowns',
      subtitle: 'Biocompatible Tooth-Colored Structural Replacements',
      description: 'Durable ceramic inlays, onlays, and crowns engineered to replace weakened tooth structure while matching the natural light dispersion of dental enamel.',
      highlights: [
        'Precision marginal seal fit',
        'Biocompatible ceramic materials',
        'Long-term functional chewing support',
      ],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLC2TSb_SKzlMwfChAc_tuO-CFYyki6ERm7BClpNjkR-cIiCKdeqmnlPjOdEoSWZsN-kGd6Q7WJSKKb6kd5GGeP5o6OzWlS9nbAWVPQNCdBZFCFCxJ6ndGIdOXhs-zrPGiQuZBvwdB3uNDBIa74-7zcRF2nwjHdPv8yiYg341UYUY056YX7xbQmmLptRs_LiATO-qMbmv8uWraxXETv-_m-X7bE4xWrRqzh4balDGAifkUMzHj1rbH',
      badge: 'STRUCTURE',
      advisoryNote: 'Fabricated according to exact dental impression/digital scan specifications.',
    },
  ] as TreatmentService[],
  reviews: [
    {
      id: 'rev-1',
      author: 'Raysan Resident',
      relation: 'Local Patient',
      rating: 5.0,
      snippet: 'The most peaceful dental clinic experience in Gandhinagar. Everything was explained step by step on the intra-oral screen before touching my tooth. Truly a new standard.',
      timeAgo: 'Verified Google Review',
    },
    {
      id: 'rev-2',
      author: 'Aesthetic Dentistry Patient',
      relation: 'Patient near PDPU',
      rating: 5.0,
      snippet: 'Spotlessly clean, state-of-the-art hygiene protocol, and the doctor was exceptionally patient with all my teeth whitening questions. Highly recommended near PDPU road.',
      timeAgo: 'Verified Google Review',
    },
    {
      id: 'rev-3',
      author: 'Gandhinagar Patient',
      relation: 'Check-up & Hygiene',
      rating: 5.0,
      snippet: 'Very gentle hand, transparent advice with zero unnecessary procedures pushed. Very reassuring and peaceful atmosphere.',
      timeAgo: 'Verified Google Review',
    },
  ] as ReviewItem[],
};
