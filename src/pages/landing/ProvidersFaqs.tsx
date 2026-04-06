import { BsClock } from "react-icons/bs";
import LandingLayout from "../../lib/components/layout/landing";
import DownloadApp from "../../lib/components/landing/homepage/DownloadApp";
import ProviderFaqList from "../../lib/components/landing/faqs/ProviderFaqList";

const ProvidersFaqPage = () => {
  return (
    <>
      <LandingLayout>
        <div>
          <div className="h-[250px] lg:h-[300px]  bg-[url('https://res.cloudinary.com/greenmouse-tech/image/upload/v1705590870/rsh/Group_59_3_ewquaq.png')] bg-fit">
            <div className="box h-full flex text-white items-center">
              <div>
                <div className="flex">
                  <div className="border-2 flex items-center gap-2 text-white px-3 py-2 rounded-[100px] border-[#FEB470]">
                    <BsClock className="text-[#FEB470] text-[14px]" />
                    <p className="fs-200 md:fs-300 lg:fs-400 fw-500 text-[#FEB470]">
                      Available 24/7 for emergency road service
                    </p>
                  </div>
                </div>
                <p className="text-3xl fw-700 mt-4">
                  Frequently Asked Questions
                </p>
              </div>
            </div>
          </div>
          <div className="section">
            <div className="box py-10">
              <div className="lg:w-11/12 mx-auto">
                <p className="text-lg lg:w-9/12 fw-500 mb-7">
                  Here is a detailed Frequently Asked Questions (FAQ) section
                  for Service Providers offering services on the AllDrive SOS
                  platform:
                </p>
                <ProviderFaqList />
                <p className="mt-10">
                  These FAQs provide detailed answers to questions that Service
                  Providers may have about offering services on the AllDrive SOS
                  platform. If there are additional queries, please reach out to
                  support for more information.
                </p>
              </div>
            </div>
          </div>
        </div>
        <DownloadApp />
      </LandingLayout>
    </>
  );
};

export default ProvidersFaqPage;
