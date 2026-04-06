import { useEffect, useState } from "react";
import ServiceSection, {
  useServiceSec,
} from "./components/request-comps/service-sec";
import { List, User, Check } from "lucide-react";
import { BsCash } from "react-icons/bs";
import ProviderLists from "./components/request-comps/provider-list";
import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai";
import { useParams } from "react-router-dom";
import ProfileSection, {
  useProfileSec,
} from "./components/request-comps/profile-sec";
import PaymentSection from "./components/request-comps/payment-sec";
import { Quote } from "../../lib/components/landing/services/new-request/forms/components/all-quotes";
const selected_driver_atom = atomWithStorage<Quote | null>(
  "selected_driver",
  JSON.parse(localStorage.getItem("selected_driver")) || null,
);
export const useDriver = () => {
  const [driver, setDriver] = useAtom(selected_driver_atom);
  return [driver, setDriver] as const;
};

const SERVICES_OBJECT = {
  "a0e0b7df-00b8-4f92-93dc-bce6568be673": "Motorcycle Towing",
  "a9087c16-a32d-4778-ab0b-ed8a4b67ac6f": "Tire-Pump",
  "b3c6048d-5cc1-42b6-bc5e-703e5e8f231d": "Exotic Car Transport",
  "cd97fff5-07f4-48bd-967f-45bffefa2a63": "Jump-Starts",
  "25cc0925-b325-4721-801b-3b983361fce8": "Battery Installation",
  "e2502deb-a9d0-4c8f-bb8f-577bba12cdca": "Flat Tire Assistance",
  "5e436f4b-b633-4b22-8f44-79f3e98f04f6": "Vehicle Lockout",
  "bbe6e2f8-c3e3-4bca-80be-b6cc0b206e49": "Fuel Delivery",
  "cf6a9ab4-2f0d-4bed-9d83-cd8f8d47c1da": "Vehicle Fluid Top-Up",
  "45404df6-0695-45bf-8e37-4f824f28b551": "Winch-Out Rescue",
  "fb36f088-f84d-42a3-a751-fff3d75b305e": "Mobile Detailing",
  "f285a589-2abd-4f2f-a07b-636f11c86475": "Mobile Mechanic",
  "1800ae3f-be16-49e9-b056-9c30a9414a2c": "Mobile Motorcycle Repair",
  "fffad1bf-97dc-44c5-a314-52b2862d9688": "Accident Cleanup",
};

const steps = [
  {
    step: 1,
    title: "Service Information",
    Icon: User,
  },
  {
    step: 2,
    title: "Personal Information",
    Icon: User,
  },
  {
    step: 3,
    title: "Provider Lists",
    Icon: List,
  },
  {
    step: 4,
    title: "Payment Information",
    Icon: BsCash,
  },
];
const current_service_id_atom = atomWithStorage<string | null>(
  "current_service_id",
  null,
);
export const useCurrentId = () => {
  const [currentId, setCurrentId] = useAtom(current_service_id_atom);
  return [currentId, setCurrentId] as const;
};
export default function NewRequests() {
  const [step, setStep] = useState<number>(0);
  const [service, setService] = useServiceSec();

  const { id } = useParams();
  const [currentId] = useCurrentId();
  const reset = () => {
    setStep(0);
    setService(null);
    setProfile(null);
    setDriver(null);
  };
  useEffect(() => {
    if (currentId === null) return;

    if (id !== currentId) {
      reset();
    }
  }, [id, currentId]);
  const [profile, setProfile] = useProfileSec();
  const [driver, setDriver] = useDriver();
  useEffect(() => {
    if (!service) {
      console.log("No service selected");
    }
    if (service) {
      console.log("Service selected");
    }
    if (service && step < 1) {
      setStep(1);
    }
    if (profile && step < 2) {
      setStep(2);
    }
    if (!service && step > 0) {
      setStep(0);
    }
    if (driver && step < 3) {
      setStep(3);
    }
  }, [service, step, profile]);
  const next = () => {
    setStep(step + 1);
  };

  const current_step = step + 1;
  const progressWidth = ((current_step - 1) / (steps.length - 1)) * 100;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative mb-12">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full h-1 bg-gray-200" />
        </div>
        <div className="absolute inset-0 flex items-center">
          <div
            className="h-1 bg-primary transition-all duration-500"
            style={{ width: `${progressWidth}%` }}
          />
        </div>
        <div className="relative flex justify-between">
          {steps.map((item) => {
            const isCompleted = item.step < current_step;
            const isCurrent = item.step === current_step;

            return (
              <button
                key={item.step}
                // onClick={() => setStep(item.step - 1)}
                className="flex flex-col items-center gap-2 z-10"
              >
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors ${
                    isCompleted
                      ? "bg-green-500"
                      : isCurrent
                        ? "bg-primary ring-4 ring-primary/20"
                        : "bg-white border-2 border-gray-300"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5 text-white" />
                  ) : (
                    <item.Icon
                      className={`h-5 w-5 ${
                        isCompleted
                          ? "text-white"
                          : isCurrent
                            ? "text-white"
                            : "text-gray-400"
                      }`}
                    />
                  )}
                </div>
                <span
                  className={`text-sm font-medium ${
                    isCompleted || isCurrent ? "text-primary" : "text-gray-500"
                  }`}
                >
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex justify-end mb-8 items-center">
        <div className="py-2 text-xl font-bold mr-auto">
          {SERVICES_OBJECT[id]}
        </div>
        <button
          onClick={reset}
          className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
        >
          Reset Form
        </button>
      </div>
      <div className="mt-8">
        {step === 0 && <ServiceSection next={next} />}
        {step === 1 && <ProfileSection next={next} />}
        {step === 2 && <ProviderLists next={next} />}
        {step === 3 && <PaymentSection next={next} />}
      </div>
    </div>
  );
}
