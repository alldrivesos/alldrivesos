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
  { "@type": "AdministrativeArea", name: "Lagos" },
  { "@type": "AdministrativeArea", name: "Abuja" },
  { "@type": "AdministrativeArea", name: "Port Harcourt" },
];

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

const services = [
  {
    id: "a9087c16-a32d-4778-ab0b-ed8a4b67ac6f",
    name: "Tire Pump",
    icon: "https://res.cloudinary.com/yhomi1996/image/upload/v1729086038/iren1aynqfudfb6jqdgc.png",
    serviceType: "Tire Inflation",
    tagline: "Back to the right pressure — wherever you are.",
    description:
      "Running on low tire pressure is dangerous and hard on your fuel economy. Our mobile tire pump service dispatches a trained technician straight to your location — roadside, car park, or driveway — with a professional-grade compressor and digital pressure gauge. We inflate all four tires to your vehicle's correct specification and do a quick visual inspection before we leave, so you pull away confident and safe.",
    features: [
      "On-site inflation — no petrol station required",
      "Digital pressure gauge calibrated to manufacturer spec",
      "All four tires checked and balanced",
      "Quick visual inspection included",
      "Available 24/7 across Lagos, Abuja & Port Harcourt",
    ],
  },
  {
    id: "1800ae3f-be16-49e9-b056-9c30a9414a2c",
    name: "Mobile Motorcycle Repair",
    icon: "https://res.cloudinary.com/yhomi1996/image/upload/v1731593805/d7qujx3dnt8l9zbf6gfp.png",
    serviceType: "Motorcycle Repair",
    tagline: "Your bike breaks down — our tech shows up.",
    description:
      "A broken-down motorcycle in Lagos traffic or on a long stretch of highway is stressful and potentially dangerous. Our mobile motorcycle technicians come fully equipped to your location to diagnose and fix the most common mechanical and electrical faults on the spot. From chain issues and punctures to electrical failures and carburetor problems, we carry the tools and spare parts to get you back riding without the expense or wait of a tow.",
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
    serviceType: "Car Battery Replacement",
    tagline: "New battery. Installed at your door.",
    description:
      "A flat battery often strikes without warning — especially in the heat of a Nigerian afternoon. Rather than calling a tow or hunting for a mechanic, we deliver and install a compatible replacement battery directly at your location. Our technician tests your existing battery to confirm it's beyond recovery, then swaps in the right battery for your vehicle and verifies the charging system is healthy before leaving you to drive on.",
    features: [
      "Battery test and diagnosis on-site",
      "Wide range of battery brands and sizes in stock",
      "Professional installation at your location",
      "Charging system check post-installation",
      "Old battery safely disposed of",
    ],
  },
  {
    id: "45404df6-0695-45bf-8e37-4f824f28b551",
    name: "Winch-Out Rescue",
    icon: "https://res.cloudinary.com/yhomi1996/image/upload/v1731593865/yelayvxsehv0aurvnlux.png",
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
    serviceType: "Flat Tire Repair",
    tagline: "Flat tire, fast fix — right where you are.",
    description:
      "A flat tire at the side of a busy road is one of the most common — and most avoidable — delays on Nigerian roads. Our roadside tire change technicians arrive with all the equipment needed to swap your damaged tire for your spare quickly, safely, and without causing further damage to your alloys or wheel studs. We set up proper warning signals, torque your wheel nuts to spec, and check your spare's pressure before calling it done.",
    features: [
      "Rapid flat tire replacement at your location",
      "Warning signs and safe setup on busy roads",
      "Alloy-safe wheel removal tools",
      "Wheel nut torque verified to manufacturer spec",
      "Spare tire pressure checked before departure",
    ],
  },
  {
    id: "bbe6e2f8-c3e3-4bca-80be-b6cc0b206e49",
    name: "Fuel Delivery",
    icon: "https://res.cloudinary.com/yhomi1996/image/upload/v1729083628/cwdzhsmxftjrp2zjb5g1.png",
    serviceType: "Emergency Fuel Delivery",
    tagline: "Out of fuel? We'll bring enough to get you moving.",
    description:
      "Running dry on a Nigerian expressway or in gridlock traffic can be more than an inconvenience — it can be dangerous. Our emergency fuel delivery service brings enough petrol or diesel to your exact location to get you to the nearest filling station. We use safe, approved containers and spill-free delivery equipment, so there's no mess and no risk. No need to call a mechanic, push your car, or wait for a friend.",
    features: [
      "Emergency petrol and diesel delivery",
      "Delivered directly to your location — road or car park",
      "Spill-free, safe delivery equipment",
      "Enough fuel to reach the nearest filling station",
      "Available around the clock",
    ],
  },
  {
    id: "f285a589-2abd-4f2f-a07b-636f11c86475",
    name: "Mobile Mechanic",
    icon: "https://res.cloudinary.com/yhomi1996/image/upload/v1729082772/ig7gzibb4wzi2vhg5rm1.png",
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
  },
  {
    id: "5e436f4b-b633-4b22-8f44-79f3e98f04f6",
    name: "Vehicle Lockout",
    icon: "https://res.cloudinary.com/yhomi1996/image/upload/v1729085715/sphhnylfbo6regoj9cik.png",
    serviceType: "Lockout Assistance",
    tagline: "Keys locked inside? We'll get you back in.",
    description:
      "It happens to everyone at some point — keys left on the seat, door clicks shut, and you're locked out. Our lockout specialists are trained in non-destructive entry techniques that open most vehicles without any damage to the lock, door frame, or window. Whether your keys are inside, broken in the lock, or you've lost them entirely, we'll assess the situation and get you back behind the wheel as quickly as possible.",
    features: [
      "Non-destructive entry — no damage to locks or doors",
      "Keys-in-car retrieval for all vehicle types",
      "Broken key extraction",
      "Works on most makes and models",
      "Fast response time across service areas",
    ],
  },
  {
    id: "fffad1bf-97dc-44c5-a314-52b2862d9688",
    name: "Accident Cleanup",
    icon: "https://res.cloudinary.com/yhomi1996/image/upload/v1733489567/i0izsv6nj0agwhzzha4r.png",
    serviceType: "Post-Accident Cleanup",
    tagline: "We handle the aftermath so you don't have to.",
    description:
      "After a collision, the scene can be hazardous to other road users and distressing to deal with alone. Our post-accident cleanup team arrives promptly to contain fluid spills, remove glass and debris, and restore safe road conditions. We work efficiently and professionally, coordinating with towing if the vehicle needs to be moved, so you can focus on what matters while we take care of the scene.",
    features: [
      "Glass, debris, and wreckage removal",
      "Fluid spill containment and clean-up",
      "Coordination with towing services as needed",
      "Safe scene management to protect other road users",
      "Prompt, professional, and discreet",
    ],
  },
  {
    id: "b3c6048d-5cc1-42b6-bc5e-703e5e8f231d",
    name: "Exotic Car Transport",
    icon: "https://res.cloudinary.com/yhomi1996/image/upload/v1731593833/sc9bzi0ulizxlarybayf.png",
    serviceType: "Luxury Vehicle Transport",
    tagline: "White-glove transport for vehicles that deserve it.",
    description:
      "High-performance and luxury vehicles require a level of care that standard towing simply can't provide. Our exotic car transport service uses enclosed flatbed carriers with low-clearance loading ramps, soft tie-down straps, and fully insured handling to move your supercar, sports car, or vintage vehicle without a mark. Whether you're moving between cities or transporting for a show or sale, we treat every car as if it's our own.",
    features: [
      "Enclosed flatbed transport to protect from road debris",
      "Low-clearance loading ramps for supercars",
      "Soft strapping — no metal contact with the vehicle",
      "Fully insured end-to-end",
      "Available for inter-city transport",
    ],
  },
  {
    id: "cf6a9ab4-2f0d-4bed-9d83-cd8f8d47c1da",
    name: "Vehicle Fluid Top-Up",
    icon: "https://res.cloudinary.com/yhomi1996/image/upload/v1731593765/bpu7wwljkndkax5adshl.png",
    serviceType: "Fluid Replenishment",
    tagline: "Keep your engine healthy — wherever you are.",
    description:
      "Low fluids are one of the most overlooked causes of roadside breakdowns and engine damage. Our fluid top-up service dispatches a technician to check and replenish all essential vehicle fluids at your location — engine oil, coolant, brake fluid, power steering fluid, and windshield washer fluid. We use quality, manufacturer-compatible fluids and give you a quick rundown of what we found, so you're informed as well as topped up.",
    features: [
      "Engine oil, coolant, and brake fluid replenishment",
      "Power steering and windshield washer fluid top-up",
      "Fluid level check and visual leak inspection",
      "Quality, manufacturer-compatible fluids",
      "Recommendations provided after each check",
    ],
  },
  {
    id: "fb36f088-f84d-42a3-a751-fff3d75b305e",
    name: "Mobile Detailing",
    icon: "https://res.cloudinary.com/yhomi1996/image/upload/v1731593650/qavw42ybym3ebxt7ntwi.png",
    serviceType: "Auto Detailing",
    tagline: "Showroom finish. Delivered to your doorstep.",
    description:
      "Why take your car to a detailing shop when we can bring the full service to you? Our mobile detailing team arrives at your home or office with all the equipment needed to restore your vehicle's interior and exterior to a pristine condition. From a thorough hand wash, clay bar treatment, and protective wax to deep interior vacuuming, upholstery cleaning, and dashboard conditioning — we cover every inch of your vehicle with care.",
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
    serviceType: "Battery Jump Start",
    tagline: "Dead battery? We'll get you started in minutes.",
    description:
      "A dead battery at the wrong time is one of the most frustrating breakdowns there is — especially when there's no one nearby to help. Our jump start service dispatches a technician with a professional-grade battery booster pack to safely start your vehicle without the risk of voltage spikes that can damage modern car electronics. After the start, we run a battery health check and advise whether a replacement is likely needed soon.",
    features: [
      "Safe jump start using a professional booster pack — not jump leads",
      "No voltage spike risk to onboard electronics",
      "Battery health check performed after start",
      "Honest assessment of whether replacement is needed",
      "Available 24/7 across all service areas",
    ],
  },
];

export default function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const service = services.find((s) => s.id === id);

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
            <p className="text-xl fw-600">Service not found.</p>
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
              <div className="w-44 h-44 lg:w-56 lg:h-56 rounded-full bg-white/10 place-center">
                <img
                  src={service.icon}
                  alt={service.name}
                  className="w-24 lg:w-32"
                />
              </div>
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
            Our technicians are on standby across Lagos, Abuja, and Port
            Harcourt. Request help in under a minute.
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
