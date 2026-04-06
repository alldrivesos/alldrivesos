import { useState } from "react";
import { CarIcon, UserIcon, SettingsIcon } from "lucide-react";
import { BiMapPin } from "react-icons/bi";

export default function NewRequest() {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, title: <CarIcon />, description: "Vehicle Make" },
    { id: 2, title: <UserIcon />, description: "User Details" },
    { id: 3, title: <SettingsIcon />, description: "Service Options" },
    {
      id: 4,
      title: <BiMapPin size={24} />,
      description: "Technicians Available",
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex flex-col items-center ${
              step.id === currentStep ? "text-primary" : "text-gray-500"
            }`}
            onClick={() => setCurrentStep(step.id)}
          >
            <div
              className={`rounded-full p-3 mb-2 flex items-center justify-center border-2 ${
                step.id === currentStep
                  ? "bg-primary border-primary text-white"
                  : "border-gray-300 bg-white"
              }`}
            >
              {step.title}
            </div>
            <p className="text-sm font-medium">{step.description}</p>
            {step.id !== steps.length && (
              <div
                className={`flex-grow border-t-2 mt-5 w-full ${
                  step.id < currentStep ? "border-primary" : "border-gray-300"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 p-6 border rounded-lg shadow-sm">
        {/* Content for the current step will go here */}
        <p>Content for Step {currentStep}</p>
      </div>
    </div>
  );
}
