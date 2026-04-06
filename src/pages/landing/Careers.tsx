import { BsClock } from "react-icons/bs";
import LandingLayout from "../../lib/components/layout/landing";
import { FaCheck, FaCircleCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";
import DownloadApp from "../../lib/components/landing/homepage/DownloadApp";

const CareersPage = () => {
  const data = [
    {
      name: "Set Your Own Rates",
      desc: "Control your earnings by setting competitive service rates that reflect your expertise.",
    },
    {
      name: "Steady Work Opportunities",
      desc: "Receive consistent job alerts straight to your phone, ensuring a constant flow of work from a thriving network.",
    },
    {
      name: "Real-Time Tracking",
      desc: "Our user-friendly app allows you to track job locations and customer information in real-time, ensuring efficient service and clear communication.",
    },
    {
      name: "Less Downtime",
      desc: "Never waste time searching for your next job. The ALLDRIVE SOS app seamlessly connects you with new requests while you're finishing current ones, maximizing your earning potential.",
    },
    {
      name: "Easy-to-Use App",
      desc: "Manage jobs, navigate to customer locations, and access all necessary information through our streamlined and intuitive app, making your workday effortless",
    },
    {
      name: "Flexible Schedule",
      desc: "Be your own boss and work on your terms. Our platform allows you to choose the jobs that fit your availability, giving you the freedom to manage your time effectively.",
    },
    {
      name: "Fair Compensation",
      desc: "Enjoy competitive rates with prompt payments to ensure you're rewarded for your skills and hustle.",
    },
  ];
  return (
    <>
      <LandingLayout>
        <div>
          <div className="h-[250px] lg:h-[300px]  bg-[url('https://res.cloudinary.com/greenmouse-tech/image/upload/v1705679269/rsh/Group_59_7_fv41oc.png')] bg-cover lg:bg-fit">
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
                <p className="text-4xl fw-700 mt-5">Join Us</p>
              </div>
            </div>
          </div>
          <div className="section">
            <div className="box">
              <div className="border-b border-[#172748]">
                <p className="fw-600 text-xl lg:text-3xl">
                  Be a Roadside Hero: Save Motorists & Earn with ALLDRIVE SOS
                </p>
                <div className="mt-2 lg:mt-6 w-6/12 lg:w-1/12 border-2 border-[#172748]"></div>
              </div>
              <div className="mt-5">
                <p>
                  Join the ALLDRIVE SOS team and become part of a growing
                  network of nationwide roadside assistance providers. As a
                  technician on our platform, you'll have the opportunity to
                  help motorists in need while enjoying numerous benefits:
                </p>
                <div className="mt-4 lg:mt-10 grid lg:grid-cols-2 gap-5 lg:gap-7">
                  {data.map((item) => (
                    <div className="flex gap-x-3">
                      <div className="w-5 lg:w-6 h-5 lg:h-6 mt-2 lg:mt-[4px] circle place-center bg-pri">
                        <FaCheck className="text-ter fs-300 lg:fs-500" />
                      </div>
                      <div className="w-[90%]">
                        <p className="fw-600 lg:text-lg">{item.name}</p>
                        <p className="fs-400 lg:fs-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 lg:flex gap-8 lg:mt-16">
                <div className="lg:w-6/12 relative">
                  <img
                    src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1722434847/rsh/Gemini_Generated_Image_a5w19ea5w19ea5w1_pu9ydi.jpg"
                    alt="image"
                    className="w-full max-h-[470px] top-0 absolute object-cover rounded-2xl"
                  />
                </div>
                <div className="mt-5 flex flex-col lg:mt-0 lg:w-6/12">
                  <p className="text-xl lg:text-3xl fw-600">
                    Join AllDrive SOS and Expand Your Business Today!
                  </p>
                  <p className="mt-3 lg:mt-6">
                    Joining the AllDrive SOS network is easy, free, and
                    rewarding. Join our community of top-notch roadside
                    technicians and expand your reach nationwide! We partner
                    only with registered and reputable Service Providers who
                    meet the following requirements:
                  </p>
                  <div className="my-8 lg:my-8 flex gap-x-4">
                    <div>
                      <FaCircleCheck className="text-[#172748] text-xl mt-[5px]" />
                    </div>
                    <div>
                      <p className="fs-800 fw-700 text-[#172748]">
                        Requirements to Join as a Service Provider (Technician)
                      </p>
                      <div className="my-8">
                        <div className="w-full flex gap-3">
                          <div className="w-5 lg:w-6 h-5 lg:h-6 mt-2 lg:mt-[4px] circle place-center bg-pri">
                            <FaCheck className="text-ter fs-300 lg:fs-500" />
                          </div>
                          <span className="fs-700 fw-700 mt-1">
                            Business Requirements
                          </span>
                        </div>
                        <div className="mt-3 w-full">
                          <ul
                            className="flex flex-col gap-5"
                            style={{ listStyle: "circle" }}
                          >
                            <li>
                              <span className="fw-700">Legal Registration</span>
                              : Your business must be legally registered,
                              holding all necessary state or federal licenses to
                              provide the specific roadside services you offer.
                            </li>
                            <li>
                              <span className="fw-700">
                                Proof of Registration
                              </span>
                              : Submit proof of business registration after you
                              sign up on the platform
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="my-8">
                        <div className="w-full flex gap-3">
                          <div className="w-5 lg:w-6 h-5 lg:h-6 mt-2 lg:mt-[4px] circle place-center bg-pri">
                            <FaCheck className="text-ter fs-300 lg:fs-500" />
                          </div>
                          <span className="fs-700 fw-700 mt-1">
                            Insurance Requirements
                          </span>
                        </div>
                        <div className="mt-3 w-full">
                          <ul
                            className="flex flex-col gap-3"
                            style={{ listStyle: "circle" }}
                          >
                            <li>
                              <span className="fw-700">
                                Certificate of Insurance
                              </span>
                              : Hold active Commercial General Liability and
                              Commercial Automobile Insurance from a reputable
                              insurance company with an A- or better rating from
                              <a
                                href="https://web.ambest.com/home"
                                target="_blank"
                              >
                                {" "}
                                <span className="underline">A.M. BEST</span>
                              </a>
                              <ul
                                className="md:mx-6 flex flex-col gap-3 my-3"
                                style={{ listStyle: "disc" }}
                              >
                                <li>
                                  <span className="fw-700">
                                    For roadside/soft services
                                  </span>
                                  :
                                  <ul
                                    className="md:mx-9 mx-3 flex flex-col gap-3 my-2"
                                    style={{ listStyle: "disc" }}
                                  >
                                    <li>
                                      <span className="fw-500">
                                        Commercial General Liability Insurance:
                                        Minimum $1,000,000
                                      </span>
                                    </li>
                                    <li>
                                      <span className="fw-500">
                                        Commercial Automobile Insurance: Minimum
                                        $1,000,000
                                      </span>
                                    </li>
                                  </ul>
                                </li>

                                <li>
                                  <span className="fw-700">
                                    Towing Services
                                  </span>
                                  :
                                  <ul
                                    className="md:mx-9 mx-3 flex flex-col gap-3 mt-2"
                                    style={{ listStyle: "disc" }}
                                  >
                                    <li>
                                      <span className="fw-500">
                                        On-Hook Insurance: Minimum $100,000
                                      </span>
                                    </li>
                                    <li>
                                      <span className="fw-500">
                                        Garage Keepers Legal Liability Insurance
                                        (if you provide storage services):
                                        Minimum $100,000
                                      </span>
                                    </li>
                                  </ul>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <span className="fw-700">Additional Insured</span>
                              : ALLDRIVE SOS LLC must be included as an
                              additional insured on both your Commercial General
                              Liability and Commercial Automobile insurance
                              policies.
                            </li>
                            <li>
                              <span className="fw-700">Proof of Insurance</span>
                              : Submit a certificate of insurance that satisfies
                              the requirements above.
                            </li>
                            <li>
                              <span className="fw-700">Policy Renewal</span>:
                              When your insurance policies are renewed, you must
                              provide ALLDRIVE SOS LLC with an updated
                              certificate of insurance. You can do this by
                              logging into your account and updating your KYC
                              information under the "Settings" tab.
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="-mt-6 mb-7">
                    You can easily submit your required documents (Business
                    Registration and Certificate of Insurance) directly from
                    your user dashboard after signing up on our website or
                    mobile app. AllDrive SOS values quality, safety, and
                    compliance to ensure every roadside experience meets high
                    standards. Join us in delivering dependable, professional
                    roadside assistance!
                  </div>
                  <div className="pt-5">
                    <Link
                      to="/auth/register"
                      className="text-white fw-600 rounded-3xl px-6 py-3 whitespace-nowrap bg-[#172748]"
                    >
                      Sign Up as a Service Provider &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="section">
            <div className="box flex justify-center">
              <div className="flex flex-col lg:mt-0 lg:w-10/12">
                <p className="text-xl lg:text-3xl fw-600">
                  Don't Let Requirements Hold You Back: Join AllDrive SOS with
                  Our Help
                </p>
                <p className="text-lg mt-5">
                  <b>
                    Can't meet the requirements to join AllDrive SOS directly?
                  </b>
                  {"  "}
                  Don't worry! Our Help Center can help you connect with an
                  existing Service Provider. This way, you can still benefit
                  from being part of our network.
                </p>
              </div>
            </div>
          </div>

          <DownloadApp />
        </div>
      </LandingLayout>
    </>
  );
};

export default CareersPage;
