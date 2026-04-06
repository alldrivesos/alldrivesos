import { useNavigate, useParams } from "react-router-dom";
import LandingLayout from "../../lib/components/layout/landing";
import { TbArrowBackUpDouble } from "react-icons/tb";

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

const services = [
  {
    id: "a9087c16-a32d-4778-ab0b-ed8a4b67ac6f",
    name: "Tire Pump",
    icon: "https://res.cloudinary.com/yhomi1996/image/upload/v1729086038/iren1aynqfudfb6jqdgc.png",
    serviceType: "Tire Inflation",
    description:
      "Need a quick tire top-up? Our mobile tire pump service comes to you wherever you are, inflating your tires to the correct pressure so you can get back on the road safely.",
    features: [
      "Fast on-site tire inflation",
      "Digital pressure gauge for accuracy",
      "Available 24/7 across service areas",
      "No need to locate a petrol station",
    ],
  },
  {
    id: "1800ae3f-be16-49e9-b056-9c30a9414a2c",
    name: "Mobile Motorcycle Repair",
    icon: "https://res.cloudinary.com/yhomi1996/image/upload/v1731593805/d7qujx3dnt8l9zbf6gfp.png",
    serviceType: "Motorcycle Repair",
    description:
      "Stranded on your bike? Our skilled technicians come to your location to diagnose and repair common motorcycle issues, getting you back on the road without the hassle of a tow.",
    features: [
      "On-site diagnosis and repair",
      "Covers common mechanical and electrical faults",
      "Tools and spare parts carried on-site",
      "Experienced motorcycle technicians",
    ],
  },
  {
    id: "25cc0925-b325-4721-801b-3b983361fce8",
    name: "Battery Installation",
    icon: "https://res.cloudinary.com/yhomi1996/image/upload/v1729085889/udkfzjvsq8ggkxr91rhp.png",
    serviceType: "Car Battery Replacement",
    description:
      "Dead battery? We deliver and install a new battery at your location. Our technicians test your old battery and swap in a compatible replacement so you're driving again in minutes.",
    features: [
      "Battery testing and diagnosis",
      "Wide range of battery brands and sizes",
      "Professional installation at your location",
      "Old battery disposal handled",
    ],
  },
  {
    id: "45404df6-0695-45bf-8e37-4f824f28b551",
    name: "Winch-Out Rescue",
    icon: "https://res.cloudinary.com/yhomi1996/image/upload/v1731593865/yelayvxsehv0aurvnlux.png",
    serviceType: "Vehicle Recovery",
    description:
      "Stuck in mud, sand, or a ditch? Our winch-out rescue service uses professional-grade equipment to safely pull your vehicle free without causing additional damage.",
    features: [
      "Heavy-duty winching equipment",
      "Safe extraction from mud, sand, and ditches",
      "Experienced recovery operators",
      "Suitable for cars, SUVs, and light trucks",
    ],
  },
  {
    id: "e2502deb-a9d0-4c8f-bb8f-577bba12cdca",
    name: "Tire Change",
    icon: "https://res.cloudinary.com/yhomi1996/image/upload/v1729085774/ympmhkckun00z982oqvo.png",
    serviceType: "Flat Tire Repair",
    description:
      "Got a flat? Our roadside tire change service swaps your damaged tire with your spare quickly and safely, so you can continue your journey without delay.",
    features: [
      "Fast flat tire replacement",
      "Safe roadside setup with warning equipment",
      "Spare tire check included",
      "Wheel nut torque verified",
    ],
  },
  {
    id: "bbe6e2f8-c3e3-4bca-80be-b6cc0b206e49",
    name: "Fuel Delivery",
    icon: "https://res.cloudinary.com/yhomi1996/image/upload/v1729083628/cwdzhsmxftjrp2zjb5g1.png",
    serviceType: "Emergency Fuel Delivery",
    description:
      "Ran out of fuel unexpectedly? We deliver enough fuel to your location to get you to the nearest filling station. Fast, convenient, and available around the clock.",
    features: [
      "Emergency fuel delivery to your location",
      "Petrol and diesel available",
      "Enough fuel to reach the nearest station",
      "Safe and spill-free delivery",
    ],
  },
  {
    id: "f285a589-2abd-4f2f-a07b-636f11c86475",
    name: "Mobile Mechanic",
    icon: "https://res.cloudinary.com/yhomi1996/image/upload/v1729082772/ig7gzibb4wzi2vhg5rm1.png",
    serviceType: "Mobile Auto Repair",
    description:
      "Skip the garage queue. Our mobile mechanics come to your home, office, or roadside location to diagnose and fix a wide range of vehicle issues on the spot.",
    features: [
      "Comprehensive on-site vehicle diagnostics",
      "Repairs for engine, brakes, suspension, and more",
      "Certified and experienced mechanics",
      "No garage visit required",
    ],
  },
  {
    id: "a0e0b7df-00b8-4f92-93dc-bce6568be673",
    name: "Emergency Towing",
    icon: "https://res.cloudinary.com/yhomi1996/image/upload/v1729082904/wmduv4nc2gufe5vmz7uf.png",
    serviceType: "Vehicle Towing",
    description:
      "When your vehicle can't be repaired on-site, our emergency towing service safely transports it to your preferred mechanic or garage with minimal wait time.",
    features: [
      "Flatbed and hook towing available",
      "Handles cars, SUVs, and motorcycles",
      "Safe transport to any destination",
      "Rapid response times",
    ],
  },
  {
    id: "5e436f4b-b633-4b22-8f44-79f3e98f04f6",
    name: "Vehicle Lockout",
    icon: "https://res.cloudinary.com/yhomi1996/image/upload/v1729085715/sphhnylfbo6regoj9cik.png",
    serviceType: "Lockout Assistance",
    description:
      "Locked your keys inside the car? Our lockout specialists arrive quickly to get you back into your vehicle safely and without damaging your locks or door.",
    features: [
      "Non-destructive entry techniques",
      "Keys-in-car and broken key extraction",
      "Fast response time",
      "Works on most vehicle makes and models",
    ],
  },
  {
    id: "fffad1bf-97dc-44c5-a314-52b2862d9688",
    name: "Accident Cleanup",
    icon: "https://res.cloudinary.com/yhomi1996/image/upload/v1733489567/i0izsv6nj0agwhzzha4r.png",
    serviceType: "Post-Accident Cleanup",
    description:
      "After an accident, safety comes first. Our team provides prompt scene cleanup and debris removal to restore safe road conditions and help you deal with the aftermath efficiently.",
    features: [
      "Glass and debris removal",
      "Fluid spill containment",
      "Coordination with towing if needed",
      "Prompt and professional response",
    ],
  },
  {
    id: "b3c6048d-5cc1-42b6-bc5e-703e5e8f231d",
    name: "Exotic Car Transport",
    icon: "https://res.cloudinary.com/yhomi1996/image/upload/v1731593833/sc9bzi0ulizxlarybayf.png",
    serviceType: "Luxury Vehicle Transport",
    description:
      "Your exotic or luxury vehicle deserves special care. We provide enclosed, low-clearance transport to move high-value vehicles without a scratch, anywhere you need.",
    features: [
      "Enclosed flatbed transport",
      "Low-clearance loading for supercars",
      "White-glove handling",
      "Fully insured transport",
    ],
  },
  {
    id: "cf6a9ab4-2f0d-4bed-9d83-cd8f8d47c1da",
    name: "Vehicle Fluid Top-Up",
    icon: "https://res.cloudinary.com/yhomi1996/image/upload/v1731593765/bpu7wwljkndkax5adshl.png",
    serviceType: "Fluid Replenishment",
    description:
      "Low on engine oil, coolant, brake fluid, or windshield washer fluid? Our mobile service tops up all essential vehicle fluids at your location, keeping your car running smoothly.",
    features: [
      "Engine oil, coolant, and brake fluid top-ups",
      "Windshield washer fluid refill",
      "Fluid level check and recommendations",
      "Quality fluids used",
    ],
  },
  {
    id: "fb36f088-f84d-42a3-a751-fff3d75b305e",
    name: "Mobile Detailing",
    icon: "https://res.cloudinary.com/yhomi1996/image/upload/v1731593650/qavw42ybym3ebxt7ntwi.png",
    serviceType: "Auto Detailing",
    description:
      "Bring the car wash to you. Our mobile detailing team provides thorough interior and exterior cleaning, polishing, and protection services at your home or office.",
    features: [
      "Interior vacuuming and wipe-down",
      "Exterior hand wash and wax",
      "Upholstery cleaning",
      "Engine bay cleaning available",
    ],
  },
  {
    id: "cd97fff5-07f4-48bd-967f-45bffefa2a63",
    name: "Jump Start",
    icon: "https://res.cloudinary.com/yhomi1996/image/upload/v1729086237/clmsvsrvecz2wtde4zdq.png",
    serviceType: "Battery Jump Start",
    description:
      "Dead battery and no one around to help? Our jump start service sends a technician to your location to safely jump-start your vehicle and get you moving again fast.",
    features: [
      "Safe jump start using professional equipment",
      "Battery health check after start",
      "Advice on whether replacement is needed",
      "Available 24/7",
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
              className="mt-4 btn btn-primary"
            >
              Back to All Services
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

      <div className="bg-primary">
        <div className="bg-primary box py-20 text-white">
          <h1 className="text-2xl lg:text-4xl fw-700">{service.name}</h1>
          <p className="mt-2 fs-400 fw-500">{service.serviceType}</p>
        </div>
      </div>

      <div className="min-h-screen section bg-[#F8F8F8]">
        <div className="box">
          <button
            onClick={() => navigate("/all-services")}
            className="flex items-center fw-600 border-b border-black gap-x-1 mb-8"
          >
            <TbArrowBackUpDouble /> Back to All Services
          </button>

          <div className="bg-white rounded-[13px] new-shade p-8 lg:flex gap-x-12 items-start">
            <div className="flex-shrink-0 mb-6 lg:mb-0">
              <img
                src={service.icon}
                alt={service.name}
                className="w-32 mx-auto"
              />
            </div>

            <div>
              <h2 className="text-2xl fw-700 mb-4">{service.name}</h2>
              <p className="text-gray-600 fw-400 mb-6">{service.description}</p>

              <h3 className="fw-600 mb-3">What's included</h3>
              <ul className="space-y-2">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-x-2 text-gray-700">
                    <span className="text-primary fw-700 mt-[2px]">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => navigate(`/request/${service.id}`)}
                className="mt-8 btn btn-primary px-8"
              >
                Request This Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}
