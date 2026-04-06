import React, { useEffect } from "react";
import { Stepper, Step, Typography } from "@material-tailwind/react";
import { FaCar, FaRegUser } from "react-icons/fa";
import { BsBank2 } from "react-icons/bs";
import GeneralInfo from "./GeneralInfo";
import ServiceInfo from "./ServiceInfo";
import BankInfo from "./BankInfo";
import { useQuery } from "@tanstack/react-query";
import { getKyc } from "../../../../services/api/kycApi";
import useKycStore from "../../../../store/kycStore";

const KycIndex = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
  const kyc = useKycStore((state) => state.kyc);
  const saveKyc = useKycStore((state) => state.saveKyc);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
  const { data, isLoading } = useQuery({
    queryKey: ["getKyc"],
    queryFn: getKyc,
  });

  useEffect(() => {
    if (data?.data) {
      saveKyc({
        ...data.data,
        business_phone_number: data.data.business_phone,
        device_ip: kyc.device_ip,
      });
    }
  }, [data]);

  return (
    <div className="w-full  py-4">
      <div className="px-2 lg:px-16">
        <Stepper
          activeStep={activeStep}
          isLastStep={(value) => setIsLastStep(value)}
          isFirstStep={(value) => setIsFirstStep(value)}
        >
          <Step onClick={() => setActiveStep(0)}>
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
                Organization Information
              </Typography>
            </div>
          </Step>
          <Step onClick={() => setActiveStep(1)}>
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
                Director's Information
              </Typography>
            </div>
          </Step>
          <Step onClick={() => setActiveStep(2)}>
            <BsBank2 className="h-5 w-5" />
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
                Bank Infomation
              </Typography>
            </div>
          </Step>
        </Stepper>
      </div>
      {!isLoading && data && (
        <div className="mt-24 lg:px-4">
          {activeStep === 0 && (
            <GeneralInfo
              next={handleNext}
              prevKyc={data?.data}
              isLoading={isLoading}
            />
          )}
          {activeStep === 1 && (
            <ServiceInfo
              prev={handlePrev}
              prevKyc={data?.data}
              next={handleNext}
            />
          )}
          {activeStep === 2 && <BankInfo prev={handlePrev} />}
        </div>
      )}
    </div>
  );
};

export default KycIndex;
