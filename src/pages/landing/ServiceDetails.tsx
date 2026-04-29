import { useNavigate, useParams } from "react-router-dom";
import LandingLayout from "../../lib/components/layout/landing";
import { TbArrowBackUpDouble } from "react-icons/tb";
import { FaCheck } from "react-icons/fa";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const PROVIDER = {
  "@type": "LocalBusiness",
  name: "Roadside Heroes",
  url: "https://www.roadsideheroes.ng",
};

const AREA_SERVED = [
  { "@type": "AdministrativeArea", name: "MaryLand" },
  { "@type": "AdministrativeArea", name: "Virginia" },
  { "@type": "AdministrativeArea", name: "Washington" },
];

// Shared content for SEO-rich pages
const PLATFORM_BENEFITS = [
  "No membership required",
  "No insurance needed",
  "Pay only when you need help",
  "Real-time technician tracking",
];

const WHY_BENEFITS = [
  "No subscriptions or hidden fees",
  "Competitive quotes from local technicians",
  "Fast response times",
  "On-demand service (24/7 availability)",
  "Track your technician in real time",
];

const SEO_HOW_IT_WORKS = [
  {
    step: "01",
    title: "Request Service",
    desc: "Enter your location and service details",
  },
  {
    step: "02",
    title: "Get Quotes",
    desc: "Nearby technicians send competitive pricing",
  },
  {
    step: "03",
    title: "Choose & Track",
    desc: "Pick a technician and track their arrival in real time",
  },
];

// Standard HOW_IT_WORKS for non-SEO services
const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Request the Service",
    desc: "Tap the button below, fill in your location and vehicle details in under a minute.",
  },
  {
    step: "02",
    title: "We Dispatch a Technician",
    desc: "The nearest available expert is assigned and on their way to you right away.",
  },
  {
    step: "03",
    title: "Get Back on the Road",
    desc: "Your technician arrives, handles the issue, and gets you moving again — fast.",
  },
];

type SeoContent = {
  title: string;
  intro: string;
  searchSection: {
    heading: string;
    keywords: string[];
    text: string;
  };
  extraSection?: {
    heading: string;
    intro: string;
    items: string[];
    footer: string;
  };
  whenToUse: {
    heading: string;
    situations: string[];
    footer: string;
  };
  offersSection?: {
    heading: string;
    intro: string;
    offers: string[];
    footer: string;
  };
  areaSection: {
    heading: string;
    areas: { region: string; cities: string }[];
    footer: string;
  };
  whySection: {
    heading: string;
    intro?: string;
    footer: string;
  };
  cta: {
    heading: string;
    text: string;
    buttonLabel: string;
  };
};

type ServiceData = {
  id: string;
  name: string;
  icon: string;
  image?: string;
  serviceType: string;
  tagline: string;
  description: string;
  features: string[];
  seo?: SeoContent;
};

const DMV_AREAS = [
  {
    region: "Maryland",
    cities: "Baltimore, Silver Spring, Rockville, Columbia, Gaithersburg",
  },
  {
    region: "Washington DC",
    cities: "Downtown, Capitol Hill, Northwest, Northeast",
  },
  {
    region: "Virginia",
    cities: "Arlington, Alexandria, Fairfax, Tysons, Reston",
  },
];

const services: ServiceData[] = [
  {
    id: "a9087c16-a32d-4778-ab0b-ed8a4b67ac6f",
    name: "Tire Pump",
    icon: "https://res.cloudinary.com/yhomi1996/image/upload/v1729086038/iren1aynqfudfb6jqdgc.png",
    image: "/services/tire_pump.png",
    serviceType: "Tire Inflation",
    tagline: "Back to the right pressure — wherever you are.",
    description:
      "Running on low tire pressure is dangerous and hard on your fuel economy. Our mobile tire pump service dispatches a trained technician straight to your location — roadside, car park, or driveway — with a professional-grade compressor and digital pressure gauge. We inflate all four tires to your vehicle's correct specification and do a quick visual inspection before we leave, so you pull away confident and safe.",
    features: [
      "On-site inflation — no petrol station required",
      "Digital pressure gauge calibrated to manufacturer spec",
      "All four tires checked and balanced",
      "Quick visual inspection included",
      "Available 24/7 across Maryland, Virginia & Washington",
    ],
    seo: {
      title:
        "Tire Pump Service Near You | Mobile Tire Inflation | AllDrive SOS",
      intro:
        "A low tire can slow you down or leave you stuck. AllDrive SOS helps you quickly connect with nearby roadside technicians who provide mobile tire pump service at your location. Skip the search and delays. Request service, receive competitive quotes, and choose a technician who can get you moving again.",
      searchSection: {
        heading: "Mobile Tire Inflation Made Simple",
        keywords: [
          "tire pump service near me",
          "mobile tire inflation",
          "roadside air for tires",
        ],
        text: "If you're searching for tire pump service near me, mobile tire inflation, or roadside air for tires, AllDrive SOS gives you a faster way to get help. Technicians in our network can come to your location to restore safe tire pressure — whether you're at home, work, or on the roadside.",
      },
      whenToUse: {
        heading: "When to Request Tire Pump Service",
        situations: [
          "Tire pressure warning light comes on",
          "A tire loses air overnight",
          "A slow leak makes driving unsafe",
          "Your vehicle needs air before moving",
          "You're stuck without access to a pump",
        ],
        footer:
          "Instead of risking damage, request mobile tire inflation and get help where you are.",
      },
      offersSection: {
        heading: "Emergency Tire Pump & Roadside Air Service",
        intro:
          "When tire pressure drops unexpectedly, fast help matters. AllDrive SOS connects you with technicians who offer:",
        offers: [
          "Emergency tire pump service",
          "Roadside tire inflation",
          "Mobile air for low or flat tires",
        ],
        footer:
          "You can request help anytime and get connected with someone nearby who is ready to respond.",
      },
      areaSection: {
        heading: "Tire Pump Service in Maryland, DC, and Virginia",
        areas: DMV_AREAS,
        footer:
          "If you need tire air near you, you can quickly find available technicians in your area.",
      },
      whySection: {
        heading: "Why Use AllDrive SOS",
        footer:
          "You get control, speed, and transparent pricing — without the hassle.",
      },
      cta: {
        heading: "Request Tire Pump Service Now",
        text: "Don't wait or risk driving on a low tire. Request tire pump service through AllDrive SOS and connect with nearby technicians in minutes. Compare quotes, choose your provider, and track their arrival — all in one place.",
        buttonLabel: "Request Tire Pump Service",
      },
    },
  },
  {
    id: "1800ae3f-be16-49e9-b056-9c30a9414a2c",
    name: "Mobile Motorcycle Repair",
    icon: "https://res.cloudinary.com/yhomi1996/image/upload/v1731593805/d7qujx3dnt8l9zbf6gfp.png",
    image: "/services/mobile_mechanic.png",
    serviceType: "Motorcycle Repair",
    tagline: "Your bike breaks down — our tech shows up.",
    description:
      "A broken-down motorcycle in  traffic or on a long stretch of highway is stressful and potentially dangerous. Our mobile motorcycle technicians come fully equipped to your location to diagnose and fix the most common mechanical and electrical faults on the spot. From chain issues and punctures to electrical failures and carburetor problems, we carry the tools and spare parts to get you back riding without the expense or wait of a tow.",
    features: [
      "On-site diagnosis for mechanical and electrical faults",
      "Common spare parts carried on every visit",
      "Chain, brake, and tyre checks",
      "Experienced technicians across all bike types",
      "Faster and cheaper than a tow",
    ],
  },
  {
    id: "25cc0925-b325-4721-801b-3b983361fce8",
    name: "Battery Installation",
    icon: "https://res.cloudinary.com/yhomi1996/image/upload/v1729085889/udkfzjvsq8ggkxr91rhp.png",
    image: "/services/battery_installation.png",
    serviceType: "Car Battery Replacement",
    tagline: "New battery. Installed at your location.",
    description:
      "A dead battery can disrupt your entire day — whether you're at home, at work, or stranded in a parking lot. AllDrive SOS connects motorists with independent, vetted mobile technicians who can deliver and install a replacement battery at your location. Instead of arranging towing or searching for help, you simply submit a request and a nearby technician is dispatched to assist you directly.",
    features: [
      "On-site battery testing and diagnostics",
      "Delivery and installation of a replacement battery",
      "Battery terminal cleaning and inspection",
      "Electrical system start-up checks",
      "Compatibility support for most vehicle types",
    ],
    seo: {
      title: "Mobile Battery Installation Near You | AllDrive SOS",
      intro:
        "A dead battery can stop your day instantly. AllDrive SOS connects you with nearby mobile technicians who deliver and install a replacement battery at your location — no tow, no waiting at a shop. Submit a request, get competitive quotes, and choose a provider who can respond fast.",
      searchSection: {
        heading: "On-Site Car Battery Replacement — Anywhere You Are",
        keywords: [
          "mobile battery installation service",
          "emergency car battery replacement near me",
          "on-site battery installation",
          "mobile vehicle battery replacement USA",
          "same day car battery installation",
          "battery delivery and installation at home",
        ],
        text: "If you're searching for mobile battery installation or emergency car battery replacement near me, AllDrive SOS gives you a faster way to get help. Technicians in our network can come to your location, test your battery, and install a compatible replacement on the spot.",
      },
      whenToUse: {
        heading: "When to Request Battery Installation",
        situations: [
          "Vehicle won't start due to a dead or failing battery",
          "Battery is too old or damaged to hold a charge",
          "Roadside breakdown caused by battery failure",
          "Need same-day battery replacement at home or work",
          "Stranded in a parking lot without tools",
          "Emergency battery failure during travel",
        ],
        footer:
          "Instead of arranging a tow, request mobile battery installation and get help where you are.",
      },
      offersSection: {
        heading: "Emergency Battery Replacement Service",
        intro:
          "When your battery dies unexpectedly, time matters. AllDrive SOS connects you with technicians who offer:",
        offers: [
          "On-site battery testing and diagnostics",
          "Delivery and installation of a replacement battery",
          "Battery terminal cleaning and inspection",
          "Fast alternative to towing or jump-starts",
        ],
        footer:
          "You can request help anytime and get connected with someone nearby who is ready to respond.",
      },
      areaSection: {
        heading: "Battery Installation Service in Maryland, DC, and Virginia",
        areas: DMV_AREAS,
        footer:
          "If you need emergency battery replacement near you, you can quickly find available technicians in your area.",
      },
      whySection: {
        heading: "Why Use AllDrive SOS",
        footer:
          "You get fast, on-site battery help without unnecessary towing delays or shop wait times.",
      },
      cta: {
        heading: "Request Battery Installation Now",
        text: "Don't let a dead battery ruin your day. Request mobile battery installation through AllDrive SOS and connect with nearby technicians in minutes. Compare quotes, choose your provider, and track their arrival — all in one place.",
        buttonLabel: "Request Battery Installation",
      },
    },
  },
  {
    id: "45404df6-0695-45bf-8e37-4f824f28b551",
    name: "Winch-Out Rescue",
    icon: "https://res.cloudinary.com/yhomi1996/image/upload/v1731593865/yelayvxsehv0aurvnlux.png",
    image: "/services/winch_out.png",
    serviceType: "Vehicle Recovery",
    tagline: "Stuck in the mud? We'll pull you free.",
    description:
      "Whether you've veered off-road, sunk into soft sand, or dropped a wheel into a ditch, our winch-out rescue team arrives with heavy-duty recovery equipment to extract your vehicle safely. We use controlled winching techniques that protect your drivetrain and bodywork throughout the recovery, so your car comes out in the same condition it went in — just on solid ground.",
    features: [
      "Heavy-duty winching equipment on every callout",
      "Safe extraction from mud, sand, ditches, and embankments",
      "Drivetrain and body protection protocols",
      "Experienced recovery operators",
      "Suitable for cars, SUVs, and light trucks",
    ],
  },
  {
    id: "e2502deb-a9d0-4c8f-bb8f-577bba12cdca",
    name: "Tire Change",
    icon: "https://res.cloudinary.com/yhomi1996/image/upload/v1729085774/ympmhkckun00z982oqvo.png",
    image: "/services/tire_change.png",
    serviceType: "Flat Tire Repair",
    tagline: "Flat tire, fast fix — right where you are.",
    description:
      "A flat tire can stop your day instantly — whether you're at home, at work, or stranded on the roadside. AllDrive SOS is a nationwide platform that connects motorists with independent, vetted roadside technicians who can assist with tire changes at your location — no tow needed, no long wait.",
    features: [
      "On-site tire change using your spare tire",
      "Removal of flat or damaged tire",
      "Installation and tightening of replacement tire",
      "Basic tire safety and pressure check",
      "Lug nut inspection and wheel safety check",
    ],
    seo: {
      title: "Mobile Tire Change Service Near You | Flat Tire Help | AllDrive SOS",
      intro:
        "A flat tire can stop your day instantly. AllDrive SOS connects you with nearby roadside technicians who provide on-site tire change service at your location. Skip searching for help — request service, receive competitive quotes, and choose a technician who can get you moving again.",
      searchSection: {
        heading: "Flat Tire Help — Right Where You Are",
        keywords: [
          "mobile tire change service near me",
          "flat tire roadside assistance nationwide",
          "emergency tire replacement at home or roadside",
          "on-site tire change service USA",
          "24/7 flat tire help roadside service",
          "mobile tire repair and replacement service",
        ],
        text: "If you're searching for mobile tire change service near me, flat tire roadside assistance, or emergency tire replacement, AllDrive SOS gives you a faster way to get help. Technicians in our network can come to your location and swap your flat for your spare — wherever you are.",
      },
      whenToUse: {
        heading: "When to Request Tire Change Service",
        situations: [
          "Flat or blown-out tire on the highway",
          "Tire damaged in a parking lot",
          "No tools available to change the spare",
          "Unsafe roadside conditions make DIY difficult",
          "Emergency roadside breakdown",
          "Unexpected tire failure during travel",
        ],
        footer:
          "Instead of struggling on the roadside, request mobile tire change service and get help where you are.",
      },
      offersSection: {
        heading: "On-Site Flat Tire Assistance",
        intro:
          "When a flat tire strikes, fast help matters. AllDrive SOS connects you with technicians who offer:",
        offers: [
          "On-site tire change using your spare",
          "Flat or damaged tire removal",
          "Tire safety and pressure check",
          "Lug nut and wheel safety inspection",
        ],
        footer:
          "You can request help anytime and get connected with someone nearby ready to respond.",
      },
      areaSection: {
        heading: "Tire Change Service in Maryland, DC, and Virginia",
        areas: DMV_AREAS,
        footer:
          "If you need flat tire help near you, you can quickly find available technicians in your area.",
      },
      whySection: {
        heading: "Why Use AllDrive SOS",
        footer:
          "You stay safe and in control while getting the tire help you need — without unnecessary delays.",
      },
      cta: {
        heading: "Request Tire Change Service Now",
        text: "Don't stay stranded on the roadside. Request mobile tire change service through AllDrive SOS and connect with nearby technicians in minutes. Compare quotes, choose your provider, and track their arrival — all in one place.",
        buttonLabel: "Request Tire Change Service",
      },
    },
  },
  {
    id: "bbe6e2f8-c3e3-4bca-80be-b6cc0b206e49",
    name: "Fuel Delivery",
    icon: "https://res.cloudinary.com/yhomi1996/image/upload/v1729083628/cwdzhsmxftjrp2zjb5g1.png",
    image: "/services/vehicle_fliud_top.png",
    serviceType: "Emergency Fuel Delivery",
    tagline: "Out of fuel? We'll bring enough to get you moving.",
    description:
      "Running dry on a  expressway or in gridlock traffic can be more than an inconvenience — it can be dangerous. Our emergency fuel delivery service brings enough petrol or diesel to your exact location to get you to the nearest filling station. We use safe, approved containers and spill-free delivery equipment, so there's no mess and no risk.",
    features: [
      "Emergency petrol and diesel delivery",
      "Delivered directly to your location — road or car park",
      "Spill-free, safe delivery equipment",
      "Enough fuel to reach the nearest filling station",
      "Available around the clock",
    ],
    seo: {
      title: "Emergency Fuel Delivery Near You | AllDrive SOS",
      intro:
        "Running out of gas can leave you stranded at the worst time. AllDrive SOS helps you quickly connect with nearby roadside technicians who provide emergency fuel delivery to your location. No need to search or call multiple providers. Submit a request, receive competitive quotes, and choose a technician who can deliver fuel and get you back on the road.",
      searchSection: {
        heading: "Fuel Delivery Service Near You — Fast & On-Demand",
        keywords: [
          "emergency fuel delivery near me",
          "out of gas service near me",
          "gas delivery near me",
          "roadside fuel delivery",
          "mobile fuel delivery service",
        ],
        text: "AllDrive SOS gives you a faster way to find help. Technicians in our network can deliver fuel directly to your location so you can continue your trip without delay.",
      },
      whenToUse: {
        heading: "When to Request Emergency Fuel Delivery",
        situations: [
          "You run out of gas on the road",
          "The fuel gauge is inaccurate or drops suddenly",
          "You're stranded far from a gas station",
          "It's unsafe to leave your vehicle",
          "You need fast roadside assistance at night or in traffic",
        ],
        footer:
          "Instead of risking your safety or wasting time, request fuel delivery and get help where you are.",
      },
      offersSection: {
        heading: "Out of Gas Roadside Assistance",
        intro:
          "Being stuck without fuel is more than an inconvenience — it can disrupt your entire day. AllDrive SOS connects you with technicians who offer:",
        offers: [
          "Emergency fuel delivery",
          "Roadside gas delivery",
          "On-demand out of gas service",
          "Mobile fuel assistance",
        ],
        footer:
          "You can request help anytime and get connected with someone nearby who can respond quickly.",
      },
      areaSection: {
        heading: "Fuel Delivery in Maryland, DC, and Virginia",
        areas: DMV_AREAS,
        footer:
          "If you need gas delivery near you, you can quickly connect with available technicians in your area.",
      },
      whySection: {
        heading: "Why Use AllDrive SOS for Fuel Delivery",
        footer:
          "You stay in control while getting the help you need without unnecessary delays.",
      },
      cta: {
        heading: "Request Fuel Delivery Now",
        text: "Don't stay stranded or risk walking to a gas station. Request emergency fuel delivery through AllDrive SOS and connect with nearby technicians in minutes. Compare quotes, choose a provider, and track their arrival — all in one place.",
        buttonLabel: "Request Fuel Delivery Service",
      },
    },
  },
  {
    id: "f285a589-2abd-4f2f-a07b-636f11c86475",
    name: "Mobile Mechanic",
    icon: "https://res.cloudinary.com/yhomi1996/image/upload/v1729082772/ig7gzibb4wzi2vhg5rm1.png",
    image: "/services/mobile_mechanic.png",
    serviceType: "Mobile Auto Repair",
    tagline: "The garage comes to you.",
    description:
      "Skip the queue, the tow truck, and the half-day sitting in a waiting room. Our certified mobile mechanics come to your home, office, or breakdown location fully equipped to handle a wide range of repairs on the spot. Armed with professional diagnostic tools and a comprehensive set of parts, they can tackle engine faults, brake jobs, suspension issues, belt replacements, and more — saving you time and the cost of a garage visit.",
    features: [
      "OBD diagnostic scan and fault code reading",
      "Engine, brakes, suspension, and belt repairs",
      "Certified and experienced mechanics",
      "Professional tools and parts on every callout",
      "No garage visit or tow truck needed",
    ],
  },
  {
    id: "a0e0b7df-00b8-4f92-93dc-bce6568be673",
    name: "Emergency Towing",
    icon: "https://res.cloudinary.com/yhomi1996/image/upload/v1729082904/wmduv4nc2gufe5vmz7uf.png",
    image: "/services/towing_service.png",
    serviceType: "Vehicle Towing",
    tagline: "When it can't be fixed on the spot, we move it safely.",
    description:
      "Some breakdowns can't be resolved at the roadside. When your vehicle needs to go to a workshop, our emergency towing team responds quickly with the right equipment to move your car, SUV, or motorcycle without damage. We offer flatbed towing for low-clearance and all-wheel-drive vehicles as well as hook towing for standard cars, transporting to any garage or destination of your choice.",
    features: [
      "Flatbed towing for low-clearance and AWD vehicles",
      "Hook towing for standard cars",
      "Handles cars, SUVs, pickups, and motorcycles",
      "Transport to any destination — your choice of garage",
      "Rapid response to minimise roadside wait",
    ],
    seo: {
      title:
        "Emergency Towing Near You | 24/7 Tow Truck Service | AllDrive SOS",
      intro:
        "Vehicle breakdowns can happen anytime. AllDrive SOS helps you quickly connect with nearby towing professionals who provide emergency towing and roadside assistance at your location. Skip the stress of searching for a tow truck. Request service, receive competitive quotes, and choose a provider who can respond fast.",
      searchSection: {
        heading: "Find a Tow Truck Near You — Fast",
        keywords: [
          "tow truck near me",
          "emergency towing near me",
          "24/7 towing service",
          "roadside towing service",
          "cheap towing near me",
        ],
        text: "AllDrive SOS gives you a faster way to connect with available towing professionals nearby. Whether your vehicle breaks down at home, on the road, or in a parking lot, help is just a request away.",
      },
      whenToUse: {
        heading: "When You Need Emergency Towing",
        situations: [
          "Your car won't start or move",
          "Engine or transmission failure",
          "Flat tire or damage prevents driving",
          "Battery or mechanical issues leave the vehicle immobile",
          "After a breakdown in traffic or unsafe conditions",
        ],
        footer:
          "Instead of waiting or guessing who to call, request emergency towing and connect with help nearby.",
      },
      offersSection: {
        heading: "24/7 Roadside Towing Assistance",
        intro:
          "Breakdowns don't follow a schedule. That's why AllDrive SOS helps you connect with towing professionals who offer:",
        offers: [
          "Emergency towing service",
          "24/7 tow truck availability",
          "Local and short-distance towing",
          "Roadside vehicle removal",
          "On-demand towing assistance",
        ],
        footer:
          "You can request service anytime and get connected with providers ready to respond.",
      },
      areaSection: {
        heading: "Towing Services in Maryland, DC, and Virginia",
        areas: DMV_AREAS,
        footer:
          "Whether you need emergency towing in Baltimore, 24/7 towing in Bethesda, or a tow truck in Rockville, you can find nearby providers quickly.",
      },
      whySection: {
        heading: "Why Use AllDrive SOS",
        footer: "You stay in control while getting help when it matters most.",
      },
      cta: {
        heading: "Request Emergency Towing Now",
        text: "Don't stay stranded or risk further damage to your vehicle. Request emergency towing through AllDrive SOS and connect with nearby towing professionals in minutes. Compare quotes, choose your provider, and track their arrival — all in one place.",
        buttonLabel: "Request Tow Truck Service",
      },
    },
  },
  {
    id: "5e436f4b-b633-4b22-8f44-79f3e98f04f6",
    name: "Vehicle Lockout",
    icon: "https://res.cloudinary.com/yhomi1996/image/upload/v1729085715/sphhnylfbo6regoj9cik.png",
    image: "/services/vehicle_lockout_service.png",
    serviceType: "Lockout Assistance",
    tagline: "Locked out? We'll get you back in — fast.",
    description:
      "Whether you're locked out of your car at home, at work, in a parking lot, or stranded roadside, AllDrive SOS connects you with independent roadside technicians who can assist with vehicle lockout service at your location — without searching multiple companies or waiting long hours.",
    features: [
      "On-site vehicle lockout assistance",
      "Non-damaging door unlocking methods",
      "Emergency roadside access support",
      "Safety-first vehicle entry techniques",
      "Works on most makes and models",
    ],
    seo: {
      title: "Vehicle Lockout Service Near You | Locked Out of Car Help | AllDrive SOS",
      intro:
        "Locked out of your vehicle? AllDrive SOS helps you quickly connect with independent roadside assistance providers who can get you back in — without damaging your car. Request service, receive competitive quotes, and choose a provider near you.",
      searchSection: {
        heading: "Fast Vehicle Lockout Help — Wherever You Are",
        keywords: [
          "vehicle lockout service near me",
          "car lockout assistance USA",
          "emergency vehicle lockout service",
          "24/7 car lockout help near me",
          "roadside lockout service nationwide",
          "locked out of car help USA",
        ],
        text: "If you're searching for vehicle lockout service near me, car lockout assistance, or emergency lockout help, AllDrive SOS gives you a faster way to connect with nearby professionals. Help is just a request away — wherever you're stranded.",
      },
      whenToUse: {
        heading: "When to Request Vehicle Lockout Service",
        situations: [
          "Keys are locked inside the vehicle",
          "Key fob is left inside the trunk or cabin",
          "Doors automatically locked after exiting",
          "Lost or misplaced car keys during travel",
          "Emergency roadside lockout situations",
          "Unexpected vehicle access issues at home or work",
        ],
        footer:
          "Instead of breaking in and risking damage, request professional lockout assistance and get help where you are.",
      },
      offersSection: {
        heading: "Emergency Car Lockout Assistance",
        intro:
          "Being locked out is stressful — fast help matters. AllDrive SOS connects you with technicians who offer:",
        offers: [
          "On-site vehicle lockout assistance",
          "Non-damaging door unlocking methods",
          "Keys-in-car retrieval",
          "Emergency roadside access support",
        ],
        footer:
          "You can request help anytime and get connected with someone nearby ready to respond.",
      },
      areaSection: {
        heading: "Vehicle Lockout Service in Maryland, DC, and Virginia",
        areas: DMV_AREAS,
        footer:
          "If you need car lockout help near you, you can quickly find available technicians in your area.",
      },
      whySection: {
        heading: "Why Use AllDrive SOS",
        footer:
          "You get quick access to professional lockout help without risking damage to your vehicle.",
      },
      cta: {
        heading: "Request Lockout Assistance Now",
        text: "Don't try to force your way in and risk damaging your vehicle. Request vehicle lockout service through AllDrive SOS and connect with nearby professionals in minutes. Compare quotes, choose your provider, and track their arrival — all in one place.",
        buttonLabel: "Request Lockout Service",
      },
    },
  },
  {
    id: "fffad1bf-97dc-44c5-a314-52b2862d9688",
    name: "Accident Cleanup",
    icon: "https://res.cloudinary.com/yhomi1996/image/upload/v1733489567/i0izsv6nj0agwhzzha4r.png",
    image: "/services/accident_cleanup_service.png",
    serviceType: "Post-Accident Cleanup",
    tagline: "We handle the aftermath so you don't have to.",
    description:
      "After a collision or roadway incident, debris, fluids, and damaged vehicle parts can create serious safety hazards. AllDrive SOS connects drivers with independent roadside assistance providers who can respond quickly and handle accident cleanup — so you can focus on what matters while they take care of the scene.",
    features: [
      "On-site accident cleanup assistance",
      "Removal of vehicle debris and hazards",
      "Fluid spill containment and cleanup",
      "Coordination with towing services as needed",
      "Safe scene management to protect other road users",
    ],
    seo: {
      title: "Accident Cleanup Service Near You | Roadside Debris Removal | AllDrive SOS",
      intro:
        "After a vehicle collision or roadway incident, debris and fluid spills create dangerous conditions. AllDrive SOS helps you quickly connect with independent providers who can assist with accident cleanup at your location. Request service and get connected with nearby help fast.",
      searchSection: {
        heading: "Accident Cleanup Help — Fast Response Nationwide",
        keywords: [
          "accident cleanup service near me",
          "roadside accident cleanup USA",
          "emergency vehicle accident cleanup",
          "mobile accident cleanup service",
          "24/7 accident cleanup roadside assistance",
          "car accident debris cleanup service",
        ],
        text: "If you're searching for accident cleanup service near me or emergency roadside debris removal, AllDrive SOS gives you a faster way to connect with nearby cleanup professionals. Get help where you are — without making multiple calls.",
      },
      whenToUse: {
        heading: "When to Request Accident Cleanup Service",
        situations: [
          "A vehicle collision leaves debris on the roadway",
          "Fluids or damaged parts create unsafe driving conditions",
          "Minor accidents require roadside cleanup assistance",
          "Parking lot or residential vehicle accidents occur",
          "Emergency roadside breakdowns after an accident",
          "Unexpected vehicle failure causing roadway hazards",
        ],
        footer:
          "Instead of leaving a dangerous scene unattended, request accident cleanup and connect with help nearby.",
      },
      offersSection: {
        heading: "On-Site Roadside Accident Cleanup",
        intro:
          "After an accident, quick action keeps everyone safe. AllDrive SOS connects you with providers who offer:",
        offers: [
          "Glass, debris, and wreckage removal",
          "Fluid spill containment and cleanup",
          "Roadway safety inspection",
          "Coordination with towing services",
        ],
        footer:
          "You can request help anytime and get connected with someone nearby ready to respond.",
      },
      areaSection: {
        heading: "Accident Cleanup Service in Maryland, DC, and Virginia",
        areas: DMV_AREAS,
        footer:
          "If you need accident cleanup near you, you can quickly find available providers in your area.",
      },
      whySection: {
        heading: "Why Use AllDrive SOS",
        footer:
          "You get fast, professional scene management — without searching multiple providers while dealing with a stressful situation.",
      },
      cta: {
        heading: "Request Accident Cleanup Now",
        text: "Don't leave a dangerous scene unmanaged. Request accident cleanup service through AllDrive SOS and connect with nearby providers in minutes. Compare quotes, choose your provider, and track their arrival — all in one place.",
        buttonLabel: "Request Accident Cleanup",
      },
    },
  },
  {
    id: "b3c6048d-5cc1-42b6-bc5e-703e5e8f231d",
    name: "Exotic Car Transport",
    icon: "https://res.cloudinary.com/yhomi1996/image/upload/v1731593833/sc9bzi0ulizxlarybayf.png",
    image: "/services/exotic_car_transport.png",
    serviceType: "Luxury Vehicle Transport",
    tagline: "White-glove transport for vehicles that deserve it.",
    description:
      "High-performance and luxury vehicles require a level of care that standard towing simply can't provide. Our exotic car transport service uses enclosed flatbed carriers with low-clearance loading ramps, soft tie-down straps, and fully insured handling to move your supercar, sports car, or vintage vehicle without a mark.",
    features: [
      "Enclosed flatbed transport to protect from road debris",
      "Low-clearance loading ramps for supercars",
      "Soft strapping — no metal contact with the vehicle",
      "Fully insured end-to-end",
      "Available for inter-city transport",
    ],
    seo: {
      title:
        "Exotic Car Transport Near You | Luxury & Enclosed Vehicle Shipping | AllDrive SOS",
      intro:
        "Moving a high-value vehicle requires more than standard towing. AllDrive SOS connects you with nearby transport professionals who specialize in exotic, luxury, and low-clearance vehicle transport. Whether your car breaks down or needs careful relocation, you can request service, receive competitive quotes, and choose a provider equipped to handle your vehicle properly.",
      searchSection: {
        heading: "Exotic & Luxury Car Transport — On Demand",
        keywords: [
          "exotic car transport near me",
          "luxury car transport near me",
          "enclosed car transport Maryland",
          "high-end car shipping",
          "low clearance vehicle transport",
        ],
        text: "AllDrive SOS helps you quickly connect with professionals who understand how to handle specialty vehicles. From Lamborghinis and Ferraris to custom and collector cars, you can request safe, professional transport at your location.",
      },
      whenToUse: {
        heading: "When to Use Exotic Car Transport",
        situations: [
          "A high-end vehicle breaks down",
          "The car has low ground clearance",
          "Safe relocation is needed without driving",
          "Transporting a collector or performance vehicle",
          "Extra protection is required during transport",
        ],
        footer:
          "Instead of risking damage, request specialized transport designed for premium vehicles.",
      },
      offersSection: {
        heading: "Enclosed & High-End Vehicle Transport Options",
        intro:
          "Through AllDrive SOS, you can connect with professionals offering:",
        offers: [
          "Enclosed car transport (maximum protection)",
          "Low-clearance vehicle loading",
          "Exotic and luxury car towing",
          "Collector and performance vehicle transport",
          "Short-distance and long-distance transport",
        ],
        footer:
          "These services are designed to protect vehicles with custom finishes, sensitive suspension, and high value.",
      },
      areaSection: {
        heading: "Exotic Car Transport in Maryland, DC, and Virginia",
        areas: DMV_AREAS,
        footer:
          "Whether you need exotic car transport in Baltimore, luxury car transport in Silver Spring, or enclosed car transport in Maryland, you can find nearby providers quickly.",
      },
      whySection: {
        heading: "Why Use AllDrive SOS",
        footer:
          "You get access to the right equipment and expertise without the hassle of searching manually.",
      },
      cta: {
        heading: "Request Exotic Car Transport Now",
        text: "Your vehicle deserves the right handling. Request exotic car transport through AllDrive SOS and connect with nearby professionals in minutes. Compare quotes, choose your provider, and track the service — all in one place.",
        buttonLabel: "Request Exotic Car Transport",
      },
    },
  },
  {
    id: "cf6a9ab4-2f0d-4bed-9d83-cd8f8d47c1da",
    name: "Vehicle Fluid Top-Up",
    icon: "https://res.cloudinary.com/yhomi1996/image/upload/v1731593765/bpu7wwljkndkax5adshl.png",
    image: "/services/vehicle_fliud_top.png",
    serviceType: "Fluid Replenishment",
    tagline: "Keep your engine healthy — wherever you are.",
    description:
      "Low fluids are one of the most overlooked causes of roadside breakdowns and engine damage. Our fluid top-up service dispatches a technician to check and replenish all essential vehicle fluids at your location — engine oil, coolant, brake fluid, power steering fluid, and windshield washer fluid.",
    features: [
      "Engine oil, coolant, and brake fluid replenishment",
      "Power steering and windshield washer fluid top-up",
      "Fluid level check and visual leak inspection",
      "Quality, manufacturer-compatible fluids",
      "Recommendations provided after each check",
    ],
    seo: {
      title:
        "Vehicle Fluid Top-Up Near You | Emergency Roadside Fluid Service | AllDrive SOS",
      intro:
        "Low vehicle fluids can quickly turn a normal drive into a breakdown risk. AllDrive SOS helps drivers connect with nearby roadside technicians who provide on-location vehicle fluid top-up services — anytime, anywhere. Instead of searching multiple providers while stranded, request help through one platform and get connected with available roadside professionals near you.",
      searchSection: {
        heading: "Roadside Fluid Top-Up Service Near You",
        keywords: [
          "fluid top-up near me",
          "coolant refill service near me",
          "emergency fluid refill",
          "engine oil top up roadside",
          "roadside fluid service near me",
          "car overheating help near me",
        ],
        text: "AllDrive SOS simplifies the process by helping you request roadside assistance and connect with technicians who can assist on location. Whether you're stuck in traffic, at home, or in a parking lot, help can come to you.",
      },
      extraSection: {
        heading: "Fluids That May Need Immediate Attention",
        intro:
          "Modern vehicles rely on several essential fluids for safe operation. Low levels can lead to overheating, braking issues, or engine damage. Roadside technicians may assist with:",
        items: [
          "Coolant / radiator fluid refill",
          "Engine oil top-up",
          "Brake fluid check",
          "Power steering fluid refill",
          "Windshield washer fluid refill",
          "Emergency vehicle fluid inspection",
        ],
        footer:
          "If warning lights appear or your engine temperature rises, requesting roadside assistance quickly can help prevent further problems.",
      },
      whenToUse: {
        heading: "Common Situations That Require Fluid Top-Up",
        situations: [
          "Engine temperature suddenly increases",
          "Dashboard warning lights appear",
          "Vehicle performance drops unexpectedly",
          "A slow leak causes fluid loss",
          "Preventive maintenance is urgently needed before driving",
        ],
        footer:
          "Instead of risking damage by continuing to drive, you can request assistance and connect with nearby help quickly.",
      },
      areaSection: {
        heading: "24/7 Vehicle Fluid Assistance in Maryland, DC & Virginia",
        areas: [
          {
            region: "Maryland",
            cities:
              "Baltimore • Silver Spring • Rockville • Columbia • Bethesda • Gaithersburg",
          },
          {
            region: "Washington DC",
            cities:
              "Downtown DC • Capitol Hill • Northwest • Northeast • Southwest DC",
          },
          {
            region: "Northern Virginia",
            cities:
              "Arlington • Alexandria • Fairfax • Tysons • Reston • Falls Church",
          },
        ],
        footer:
          "Whether you need a coolant top-up in Silver Spring, engine fluid service in Rockville, or roadside fluid assistance in Columbia, nearby help can be requested in minutes.",
      },
      whySection: {
        heading: "Why Drivers Choose AllDrive SOS",
        intro:
          "Roadside problems are stressful. We focus on making assistance easier to access.",
        footer:
          "Our goal is simple: help drivers reach nearby roadside technicians faster.",
      },
      cta: {
        heading: "Request Roadside Fluid Top-Up Now",
        text: "Driving with low fluids can cause costly vehicle damage or unsafe conditions. Request assistance through AllDrive SOS and connect with roadside professionals who can help restore essential fluid levels near your location.",
        buttonLabel: "Request Vehicle Fluid Service",
      },
    },
  },
  {
    id: "fb36f088-f84d-42a3-a751-fff3d75b305e",
    name: "Mobile Detailing",
    icon: "https://res.cloudinary.com/yhomi1996/image/upload/v1731593650/qavw42ybym3ebxt7ntwi.png",
    image: "/services/mobile_detailing_service.png",
    serviceType: "Auto Detailing",
    tagline: "Showroom finish. Delivered to your doorstep.",
    description:
      "Why take your car to a detailing shop when we can bring the full service to you? Our mobile detailing team arrives at your home or office with all the equipment needed to restore your vehicle's interior and exterior to a pristine condition.",
    features: [
      "Exterior hand wash, clay bar, and protective wax",
      "Interior deep vacuum and surface wipe-down",
      "Upholstery cleaning and odour treatment",
      "Dashboard, console, and trim conditioning",
      "Engine bay cleaning available on request",
    ],
  },
  {
    id: "cd97fff5-07f4-48bd-967f-45bffefa2a63",
    name: "Jump Start",
    icon: "https://res.cloudinary.com/yhomi1996/image/upload/v1729086237/clmsvsrvecz2wtde4zdq.png",
    image: "/services/jump_start_service.png",
    serviceType: "Battery Jump Start",
    tagline: "Dead battery? We'll get you started in minutes.",
    description:
      "A dead battery at the wrong time is one of the most frustrating breakdowns there is — especially when there's no one nearby to help. Our jump start service dispatches a technician with a professional-grade battery booster pack to safely start your vehicle without the risk of voltage spikes that can damage modern car electronics.",
    features: [
      "Safe jump start using a professional booster pack — not jump leads",
      "No voltage spike risk to onboard electronics",
      "Battery health check performed after start",
      "Honest assessment of whether replacement is needed",
      "Available 24/7 across all service areas",
    ],
    seo: {
      title:
        "Jump Start Service Near You | Dead Battery Roadside Assistance | AllDrive SOS",
      intro:
        "A dead battery can stop your day instantly. AllDrive SOS helps you connect with nearby roadside technicians who provide fast jump start service at your location. No need to search or call around. Request help, receive competitive quotes, and choose a technician who can get your vehicle running again.",
      searchSection: {
        heading: "Fast Car Jump Start Near You",
        keywords: [
          "jump start service near me",
          "car won't start battery",
          "dead battery jump start",
          "emergency jump start near me",
          "roadside battery jump service",
        ],
        text: "AllDrive SOS gives you a quick way to request help and connect with technicians nearby. Whether you're at home, work, a parking garage, or on the roadside, you can get assistance without delays.",
      },
      whenToUse: {
        heading: "When to Request a Jump Start",
        situations: [
          "Car won't start due to a dead battery",
          "Lights or electronics left on overnight",
          "Weak battery during cold or hot weather",
          "Vehicle sitting unused for long periods",
          "Sudden battery failure while parked",
        ],
        footer:
          "Instead of waiting or asking for help from strangers, request a jump start and get connected with a nearby technician.",
      },
      offersSection: {
        heading: "Emergency Jump Start & Battery Help",
        intro:
          "When your vehicle won't start, time matters. AllDrive SOS connects you with technicians who offer:",
        offers: [
          "Emergency jump start service",
          "Roadside battery assistance",
          "On-demand car jump start",
          "Quick response for no-start situations",
        ],
        footer:
          "You can request help anytime and get connected with someone ready to assist.",
      },
      areaSection: {
        heading: "Jump Start Service in Maryland, DC, and Virginia",
        areas: DMV_AREAS,
        footer:
          "If you need a jump start near you, you can quickly find available technicians in your area.",
      },
      whySection: {
        heading: "Why Use AllDrive SOS",
        footer:
          "You get quick access to help without unnecessary delays or commitments.",
      },
      cta: {
        heading: "Request Jump Start Service Now",
        text: "Don't stay stuck with a dead battery. Request jump start service through AllDrive SOS and connect with nearby technicians in minutes. Compare quotes, choose your provider, and track their arrival — all in one place.",
        buttonLabel: "Request Jump Start Service",
      },
    },
  },
];

export default function ServiceDetails() {
  const { name } = useParams();
  const navigate = useNavigate();
  const decoded_name = decodeURIComponent(name ?? "");
  const toSlug = (s: string) => s.trim().toLowerCase().replace(/\s+/g, "-");
  const service = services.find((s) => toSlug(s.name) === decoded_name.toLowerCase());

  const schema = service
    ? {
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.name,
        serviceType: service.serviceType,
        provider: PROVIDER,
        areaServed: AREA_SERVED,
        description: service.description,
      }
    : null;

  if (!service) {
    return (
      <LandingLayout>
        <div className="min-h-screen place-center">
          <div className="text-center">
            <p className="text-xl fw-600">Service not found. {decoded_name}</p>
            <button
              onClick={() => navigate("/all-services")}
              className="btn-feel mt-6 flex items-center gap-x-2 mx-auto bg-[#C97833] text-white px-6 py-2"
            >
              Back to All Services <HiOutlineArrowNarrowRight />
            </button>
          </div>
        </div>
      </LandingLayout>
    );
  }

  if (service.seo) {
    const s = service.seo;
    return (
      <LandingLayout>
        {schema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        )}

        {/* Hero */}
        <div className="bg-[#172748] text-white">
          <div className="box py-16 lg:py-24">
            <button
              onClick={() => navigate("/all-services")}
              className="flex items-center gap-x-1 fw-500 fs-400 text-[#FEB470] mb-8 hover:underline"
            >
              <TbArrowBackUpDouble /> All Services
            </button>
            <div className="lg:flex items-center gap-x-12">
              <div className="lg:w-7/12">
                <span className="text-[#E4B080] border border-[#E4B080] px-3 py-[4px] rounded-[100px] fs-300">
                  {service.serviceType}
                </span>
                <h1 className="text-2xl lg:text-4xl fw-700 mt-5 leading-snug">
                  {s.title}
                </h1>
                <p className="mt-5 fs-500 text-gray-300 leading-relaxed">
                  {s.intro}
                </p>
                <div className="mt-6 grid gap-2">
                  {PLATFORM_BENEFITS.map((b, i) => (
                    <div key={i} className="flex items-center gap-x-2 fs-500">
                      <FaCheck className="text-[#FEB470] flex-shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => navigate(`/request/${service.id}`)}
                  className="btn-feel mt-8 flex items-center gap-x-3 bg-[#C97833] text-white px-6 py-3 fs-500 fw-600"
                >
                  {s.cta.buttonLabel} <HiOutlineArrowNarrowRight />
                </button>
              </div>
              <div className="lg:w-5/12 flex justify-center mt-10 lg:mt-0">
                {service.image ? (
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full max-h-[360px] rounded-2xl object-cover"
                  />
                ) : (
                  <div className="w-44 h-44 lg:w-56 lg:h-56 rounded-full bg-white/10 place-center">
                    <img
                      src={service.icon}
                      alt={service.name}
                      className="w-24 lg:w-32"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Search / Keyword Section */}
        <div className="section bg-[#F8F8F8]">
          <div className="box">
            <h2 className="text-2xl lg:text-3xl fw-700 mb-4">
              {s.searchSection.heading}
            </h2>
            <div className="flex flex-wrap gap-2 mb-5">
              {s.searchSection.keywords.map((kw, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-white new-shade rounded-full fs-300 fw-500 text-gray-600"
                >
                  {kw}
                </span>
              ))}
            </div>
            <p className="fs-500 text-gray-600 lg:w-8/12">
              {s.searchSection.text}
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="section bg-white">
          <div className="box">
            <h2 className="text-center fw-700 text-2xl lg:text-3xl">
              How AllDrive SOS Works
            </h2>
            <p className="text-center fs-500 text-gray-500 mt-2">
              Getting help is simple — no waiting, no calling around.
            </p>
            <div className="grid lg:grid-cols-3 gap-8 mt-12">
              {SEO_HOW_IT_WORKS.map((step) => (
                <div
                  key={step.step}
                  className="new-shade bg-[#F8F8F8] rounded-[13px] p-8"
                >
                  <p className="text-4xl fw-700 text-[#FEB470]">{step.step}</p>
                  <p className="fw-600 text-lg mt-4">{step.title}</p>
                  <p className="fs-400 text-gray-500 mt-2">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Extra Section (optional — e.g. Fluid Top-Up) */}
        {s.extraSection && (
          <div className="section bg-[#F8F8F8]">
            <div className="box">
              <h2 className="text-2xl lg:text-3xl fw-700 mb-3">
                {s.extraSection.heading}
              </h2>
              <p className="fs-500 text-gray-600 mb-6">
                {s.extraSection.intro}
              </p>
              <div className="grid md:grid-cols-2 gap-4 lg:w-8/12">
                {s.extraSection.items.map((item, i) => (
                  <div key={i} className="flex gap-x-3 items-start">
                    <div className="w-5 h-5 mt-[3px] circle place-center bg-[#C97833] flex-shrink-0">
                      <FaCheck className="text-white fs-100" />
                    </div>
                    <p className="fw-500 fs-500">{item}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 fs-500 text-gray-500 lg:w-8/12">
                {s.extraSection.footer}
              </p>
            </div>
          </div>
        )}

        {/* When to Use */}
        <div
          className={`section ${s.extraSection ? "bg-white" : "bg-[#F8F8F8]"}`}
        >
          <div className="box lg:flex gap-x-16 items-start">
            <div className="lg:w-6/12">
              <h2 className="text-2xl lg:text-3xl fw-700 mb-6">
                {s.whenToUse.heading}
              </h2>
              <div className="grid gap-4">
                {s.whenToUse.situations.map((situation, i) => (
                  <div key={i} className="flex gap-x-3 items-start">
                    <div className="w-5 h-5 mt-[3px] circle place-center bg-[#172748] flex-shrink-0">
                      <FaCheck className="text-white fs-100" />
                    </div>
                    <p className="fw-500 fs-500">{situation}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 fs-500 text-gray-500">{s.whenToUse.footer}</p>
            </div>

            {/* Offers Section (right column if present) */}
            {s.offersSection && (
              <div className="lg:w-6/12 mt-10 lg:mt-0">
                <h2 className="text-2xl lg:text-3xl fw-700 mb-3">
                  {s.offersSection.heading}
                </h2>
                <p className="fs-500 text-gray-600 mb-5">
                  {s.offersSection.intro}
                </p>
                <div className="grid gap-3">
                  {s.offersSection.offers.map((offer, i) => (
                    <div key={i} className="flex gap-x-3 items-start">
                      <div className="w-5 h-5 mt-[3px] circle place-center bg-[#C97833] flex-shrink-0">
                        <FaCheck className="text-white fs-100" />
                      </div>
                      <p className="fw-500 fs-500">{offer}</p>
                    </div>
                  ))}
                </div>
                {s.offersSection.footer && (
                  <p className="mt-5 fs-500 text-gray-500">
                    {s.offersSection.footer}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Area Section */}
        <div className="section bg-[#172748] text-white">
          <div className="box">
            <h2 className="text-2xl lg:text-3xl fw-700 mb-8">
              {s.areaSection.heading}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {s.areaSection.areas.map((area, i) => (
                <div key={i}>
                  <p className="fw-700 text-[#FEB470] mb-2">{area.region}</p>
                  <p className="fs-400 text-gray-300">{area.cities}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 fs-500 text-gray-300">{s.areaSection.footer}</p>
          </div>
        </div>

        {/* Why AllDrive SOS */}
        <div className="section bg-[#F8F8F8]">
          <div className="box lg:flex gap-x-16 items-start">
            <div className="lg:w-5/12">
              <h2 className="text-2xl lg:text-3xl fw-700 mb-3">
                {s.whySection.heading}
              </h2>
              {s.whySection.intro && (
                <p className="fs-500 text-gray-600 mb-5">
                  {s.whySection.intro}
                </p>
              )}
            </div>
            <div className="lg:w-7/12 mt-6 lg:mt-0">
              <div className="grid gap-4">
                {WHY_BENEFITS.map((b, i) => (
                  <div key={i} className="flex gap-x-3 items-start">
                    <div className="w-5 h-5 mt-[3px] circle place-center bg-[#C97833] flex-shrink-0">
                      <FaCheck className="text-white fs-100" />
                    </div>
                    <p className="fw-500 fs-500">{b}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 fs-500 text-gray-500">{s.whySection.footer}</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="section bg-[#C97833] text-white">
          <div className="box text-center">
            <h2 className="text-2xl lg:text-4xl fw-700">{s.cta.heading}</h2>
            <p className="mt-4 fs-500 lg:w-7/12 mx-auto text-white/90 leading-relaxed">
              {s.cta.text}
            </p>
            <button
              onClick={() => navigate(`/request/${service.id}`)}
              className="btn-feel mt-8 inline-flex items-center gap-x-3 bg-[#172748] text-white px-8 py-3 fs-500 fw-600"
            >
              {s.cta.buttonLabel} <HiOutlineArrowNarrowRight />
            </button>
          </div>
        </div>
      </LandingLayout>
    );
  }

  // Default layout for services without SEO content
  return (
    <LandingLayout>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}

      {/* Hero */}
      <div className="bg-[#172748] text-white">
        <div className="box py-16 lg:py-24">
          <button
            onClick={() => navigate("/all-services")}
            className="flex items-center gap-x-1 fw-500 fs-400 text-[#FEB470] mb-8 hover:underline"
          >
            <TbArrowBackUpDouble /> All Services
          </button>
          <div className="lg:flex items-center gap-x-12">
            <div className="lg:w-7/12">
              <span className="text-[#E4B080] border border-[#E4B080] px-3 py-[4px] rounded-[100px] fs-300">
                {service.serviceType}
              </span>
              <h1 className="text-3xl lg:text-5xl fw-700 mt-5">
                {service.name}
              </h1>
              <p className="mt-4 fs-500 lg:fs-600 text-gray-300">
                {service.tagline}
              </p>
              <button
                onClick={() => navigate(`/request/${service.id}`)}
                className="btn-feel mt-8 flex items-center gap-x-3 bg-[#C97833] text-white px-6 py-3 fs-500 fw-600"
              >
                Request This Service <HiOutlineArrowNarrowRight />
              </button>
            </div>
            <div className="lg:w-5/12 flex justify-center mt-10 lg:mt-0">
              {service.image ? (
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full max-h-[360px] rounded-2xl object-cover"
                />
              ) : (
                <div className="w-44 h-44 lg:w-56 lg:h-56 rounded-full bg-white/10 place-center">
                  <img
                    src={service.icon}
                    alt={service.name}
                    className="w-24 lg:w-32"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* About + Features */}
      <div className="section bg-[#F8F8F8]">
        <div className="box">
          <div className="lg:flex gap-x-16 items-start">
            <div className="lg:w-6/12">
              <span className="text-[#C97833] fw-600 fs-400 uppercase tracking-wider">
                About This Service
              </span>
              <p className="text-2xl lg:text-3xl fw-700 mt-3 mb-5">
                What We Do For You
              </p>
              <p className="text-gray-600 fs-500 leading-relaxed">
                {service.description}
              </p>
            </div>
            <div className="lg:w-6/12 mt-10 lg:mt-0">
              <p className="fw-700 text-lg mb-6">What's Included</p>
              <div className="grid gap-4">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex gap-x-4 items-start">
                    <div className="w-5 h-5 mt-[3px] circle place-center bg-[#C97833] flex-shrink-0">
                      <FaCheck className="text-white fs-100" />
                    </div>
                    <p className="fw-500 fs-500">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="section bg-white">
        <div className="box">
          <p className="text-center fw-700 text-2xl lg:text-3xl">
            How It Works
          </p>
          <p className="text-center fs-500 text-gray-500 mt-2">
            Getting help is simple — three steps and you're sorted.
          </p>
          <div className="grid lg:grid-cols-3 gap-8 mt-12">
            {HOW_IT_WORKS.map((step) => (
              <div
                key={step.step}
                className="new-shade bg-[#F8F8F8] rounded-[13px] p-8"
              >
                <p className="text-4xl fw-700 text-[#FEB470]">{step.step}</p>
                <p className="fw-600 text-lg mt-4">{step.title}</p>
                <p className="fs-400 text-gray-500 mt-2">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="section bg-[#C97833] text-white">
        <div className="box text-center">
          <p className="text-2xl lg:text-4xl fw-700">
            Need {service.name} Right Now?
          </p>
          <p className="mt-3 fs-500 lg:w-6/12 mx-auto text-white/80">
            Our technicians are on standby across Maryland, Virginia,
            Washington. Request help in under a minute.
          </p>
          <button
            onClick={() => navigate(`/request/${service.id}`)}
            className="btn-feel mt-8 inline-flex items-center gap-x-3 bg-[#172748] text-white px-8 py-3 fs-500 fw-600"
          >
            Request {service.name} <HiOutlineArrowNarrowRight />
          </button>
        </div>
      </div>
    </LandingLayout>
  );
}
