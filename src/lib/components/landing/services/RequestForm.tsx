import React, { FC, useEffect } from "react";
import { Stepper, Step, Typography } from "@material-tailwind/react";
import { FaCar, FaRegUser } from "react-icons/fa";
import { BsBank2 } from "react-icons/bs";
import PersonalSec from "./request/PersonalSec";
import ServiceSec from "./request/ServiceSec";
import PaymentSec from "./request/PaymentSec";
import { MdMiscellaneousServices } from "react-icons/md";
import ProviderList from "./request/ProviderList";
import useRequestStore from "../../../store/serviceStore";
import NewRequest from "./new-request/new-request";

interface Props {
  activeId: string;
  activeQuestion: string;
}
const RequestForm: FC<Props> = ({ activeId, activeQuestion }) => {
  // return <NewRequest />;
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
  const request = useRequestStore((state) => state.request);
  useEffect(() => {
    if (request.id) {
      setActiveStep(request.level + 1);
    }
  }, [request]);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  return (
    <div className="w-full p-2 py-6 lg:p-10 rounded-lg new-shade">
      <div className="px-2 lg:px-16">
        <Stepper
          activeStep={activeStep}
          isLastStep={(value) => setIsLastStep(value)}
          isFirstStep={(value) => setIsFirstStep(value)}
        >
          <Step>
            <FaRegUser className="h-5 w-5" />
            <div className="absolute -bottom-8 lg:-bottom-[4.5rem] w-max text-center">
              <Typography
                variant="h6"
                color={activeStep === 0 ? "blue-gray" : "gray"}
              >
                Step 1
              </Typography>
              <Typography
                color={activeStep === 0 ? "blue-gray" : "gray"}
                className="font-normal hidden lg:block"
              >
                Service Information
              </Typography>
            </div>
          </Step>
          <Step>
            <FaCar className="h-5 w-5" />
            <div className="absolute -bottom-8 lg:-bottom-[4.5rem] w-max text-center">
              <Typography
                variant="h6"
                color={activeStep === 1 ? "blue-gray" : "gray"}
              >
                Step 2
              </Typography>
              <Typography
                color={activeStep === 1 ? "blue-gray" : "gray"}
                className="font-normal hidden lg:block"
              >
                Profile Information
              </Typography>
            </div>
          </Step>
          <Step>
            <MdMiscellaneousServices className="h-5 w-5" />
            <div className="absolute -bottom-8 lg:-bottom-[4.5rem] w-max text-center">
              <Typography
                variant="h6"
                color={activeStep === 2 ? "blue-gray" : "gray"}
              >
                Step 3
              </Typography>
              <Typography
                color={activeStep === 2 ? "blue-gray" : "gray"}
                className="font-normal hidden lg:block"
              >
                Providers Available
              </Typography>
            </div>
          </Step>
          <Step>
            <BsBank2 className="h-5 w-5" />
            <div className="absolute -bottom-8 lg:-bottom-[4.5rem] w-max text-center">
              <Typography
                variant="h6"
                color={activeStep === 3 ? "blue-gray" : "gray"}
              >
                Step 4
              </Typography>
              <Typography
                color={activeStep === 3 ? "blue-gray" : "gray"}
                className="font-normal hidden lg:block"
              >
                Payment Confirmation
              </Typography>
            </div>
          </Step>
        </Stepper>
      </div>
      <div className="mt-24 lg:px-4">
        {activeStep === 0 && (
          <ServiceSec
            next={() => handleNext()}
            activeId={activeId}
            activeQuestion={activeQuestion}
          />
        )}
        {activeStep === 1 && (
          <PersonalSec prev={() => handlePrev()} next={() => handleNext()} />
        )}
        {activeStep === 2 && (
          <ProviderList prev={() => handlePrev()} next={() => handleNext()} />
        )}
        {activeStep === 3 && <PaymentSec prev={() => handlePrev()} />}
      </div>
    </div>
  );
};

export default RequestForm;
