import { BsClock } from "react-icons/bs";
import LandingLayout from "../../lib/components/layout/landing";

const CookiePage = () => {
  return (
    <>
      <LandingLayout>
        <div>
          <div className="h-44 bg-policy">
            <div className="box h-full flex items-center">
              <div>
                <div className="flex">
                  <div className="border-2 flex items-center gap-2 text-white px-3 py-2 rounded-[100px] border-[#FEB470]">
                    <BsClock className="text-[#FEB470] text-[14px]" />
                    <p className="fs-200 md:fs-300 lg:fs-400 fw-500 text-white">
                      Available 24/7 for emergency road service
                    </p>
                  </div>
                </div>
                <p className="text-3xl fw-700 mt-4">
                  Terms and Conditions
                </p>
              </div>
            </div>
          </div>
          <div className="section">
            <div className="box">
                <div></div>
            </div>
          </div>
        </div>
      </LandingLayout>
    </>
  );
};

export default CookiePage;
