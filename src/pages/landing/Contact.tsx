import { BsClock } from "react-icons/bs";
import LandingLayout from "../../lib/components/layout/landing";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { GiRotaryPhone } from "react-icons/gi";
import ContactForm from "../../lib/components/landing/contact/ContactForm";
import MapComponent from "../../lib/components/landing/contact/Maps";
import DownloadApp from "../../lib/components/landing/homepage/DownloadApp";

const ContactUsPage = () => {
  return (
    <>
      <LandingLayout>
        <div>
          <div className="h-[250px] lg:h-[300px] bg-[url('https://res.cloudinary.com/greenmouse-tech/image/upload/v1705679269/rsh/Group_59_6_dxdlui.png')] bg-cover bg-right lg:bg-fit">
            <div className="box h-full text-white flex items-center">
              <div>
                <div className="flex">
                  <div className="border-2 flex items-center gap-2 text-white px-3 py-2 rounded-[100px] border-[#FEB470]">
                    <BsClock className="text-[#FEB470] text-[14px]" />
                    <p className="fs-200 md:fs-300 lg:fs-400 fw-500 text-[#FEB470]">
                      Available 24/7 for emergency road service
                    </p>
                  </div>
                </div>
                <p className="text-3xl fw-700 mt-4">Contact Us</p>
              </div>
            </div>
          </div>
          <div className="section">
            <div className="box lg:pb-6">
              <div className="grid lg:grid-cols-3 gap-24  lg:gap-24 pt-24">
                <div className="relative text-center box-shade p-5 pt-12">
                  <p className="fw-600">Our Coverage</p>
                  <p className="mt-4 fs-400">
                    ALLDRIVE SOS offers nationwide roadside assistance,
                    providing help in all 50 US states and territories.
                  </p>
                  <div className="absolute -top-12 left-0 w-full flex justify-center">
                    <div className="w-[76px] h-[76px] place-center bg-[#172748]">
                      <FaLocationDot className="text-[#FEB470] text-4xl" />
                    </div>
                  </div>
                </div>
                <div className="relative text-center box-shade p-5 pt-12">
                  <p className="fw-600">Email Address</p>
                  <p className="mt-4 fs-500">support@alldrivesos.com</p>
                  <div className="absolute -top-12 left-0 w-full flex justify-center">
                    <div className="w-[76px] h-[76px] place-center bg-[#172748]">
                      <MdEmail className="text-[#FEB470] text-4xl" />
                    </div>
                  </div>
                </div>
                <div className="relative text-center box-shade p-5 pt-12">
                  <p className="fw-600">Hotlines</p>
                  <p className="mt-4 fs-500"> +(410) 849-9222‬</p>
                  <div className="absolute -top-12 left-0 w-full flex justify-center">
                    <div className="w-[76px] h-[76px] place-center bg-[#172748]">
                      <GiRotaryPhone className="text-[#FEB470] text-4xl" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="section bg-[#EBEDEF]">
            <div className="box">
              <div className="lg:flex lg:gap-16 flex-row-reverse">
                <div className="lg:w-6/12 bg-white p-6 rounded-[16px]">
                  <ContactForm />
                </div>
                <div className="lg:w-6/12 mt-12 lg:mt-0">
                  <p className="text-xl lg:text-4xl fw-600">
                    Reach Out to Us Directly
                  </p>
                  <p className="mt-2 lg:w-10/12">
                    Fill in the form with the appropriate fields to send us a
                    message directly and we will get back to immediately.
                  </p>
                  <div className="w-full h-[350px] mt-5 shadow-lg">
                    <MapComponent />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-8 lg:pt-16">
            <DownloadApp />
          </div>
        </div>
      </LandingLayout>
    </>
  );
};

export default ContactUsPage;
