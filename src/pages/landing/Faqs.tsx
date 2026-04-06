import { BsClock } from "react-icons/bs";
import LandingLayout from "../../lib/components/layout/landing";
import FaqList from "../../lib/components/landing/faqs/FaqList";
import DownloadApp from "../../lib/components/landing/homepage/DownloadApp";
import ProviderFaqList from "../../lib/components/landing/faqs/ProviderFaqList";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import FeaturedBlogPage from "./FeaturedBlog";

const FaqPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

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
          <div className="w-full flex gap-1">
            <div className="flex flex-col w-full px-20 lg:w-3/5">
              <div className="section">
                <div className="">
                  <div className="w-full">
                    <p className="text-2xl lg:w-9/12 font-bold mb-8">
                      Customers (Motorists)
                    </p>
                    <p className="text-lg w-full fw-500 mb-7">
                      We've got you covered, mile after mile! Here are some
                      frequently asked questions to help you get the most out of
                      AllDrive SOS:
                    </p>
                    <FaqList />
                    <p className="mt-10 text-lg fw-500">
                      We hope this helps! If you have any other questions, feel
                      free to contact our friendly customer support team. We're
                      always happy to assist you!
                    </p>
                  </div>
                </div>
              </div>

              <div className="section" id="provider-faqs">
                <div className="">
                  <div className="w-full">
                    <p className="text-2xl lg:w-9/12 font-bold mb-8">
                      Service Providers (Technicians).
                    </p>
                    <p className="text-lg w-full fw-500 mb-7">
                      Here is a detailed Frequently Asked Questions (FAQ)
                      section for Service Providers offering services on the
                      AllDrive SOS platform:
                    </p>
                    <ProviderFaqList />
                    <p className="mt-10 text-lg fw-500">
                      These FAQs provide detailed answers to questions that
                      Service Providers may have about offering services on the
                      AllDrive SOS platform. If there are additional queries,
                      please reach out to support for more information.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:flex hidden w-2/5">
              <FeaturedBlogPage />
            </div>
          </div>
        </div>
        <DownloadApp />
      </LandingLayout>
    </>
  );
};

export default FaqPage;
