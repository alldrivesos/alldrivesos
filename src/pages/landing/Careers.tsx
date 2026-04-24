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
                          <p className="mb-3">
                            All independent service providers must maintain
                            active insurance coverage meeting the requirements
                            below at all times while providing services.
                          </p>
                          <ul
                            className="flex flex-col gap-5"
                            style={{ listStyle: "circle" }}
                          >
                            <li>
                              <span className="fw-700">
                                1. Certificate of Insurance (COI)
                              </span>
                              <p className="mt-1">
                                Service providers must maintain insurance issued
                                by an insurer rated A- or better by{" "}
                                <a
                                  href="https://web.ambest.com/home"
                                  target="_blank"
                                  className="underline"
                                >
                                  A.M. Best
                                </a>{" "}
                                and submit a valid Certificate of Insurance
                                (COI) prior to activation on the platform.
                              </p>
                            </li>

                            <li>
                              <span className="fw-700">
                                2. Required Coverage — Roadside / Soft Services
                              </span>
                              <p className="mt-1 text-sm text-gray-600">
                                Includes jump starts, lockouts, tire changes,
                                fuel delivery, battery installation, minor
                                roadside assistance.
                              </p>
                              <ul
                                className="md:mx-6 mx-3 flex flex-col gap-2 mt-2"
                                style={{ listStyle: "disc" }}
                              >
                                <li>
                                  <span className="fw-700">
                                    Commercial General Liability (CGL)
                                  </span>
                                  <ul
                                    className="md:mx-6 mx-3 flex flex-col gap-1 mt-1"
                                    style={{ listStyle: "disc" }}
                                  >
                                    <li>Minimum: $1,000,000 per occurrence</li>
                                    <li>$2,000,000 aggregate recommended</li>
                                  </ul>
                                </li>
                                <li>
                                  <span className="fw-700">
                                    Commercial Automobile Liability
                                  </span>
                                  <ul
                                    className="md:mx-6 mx-3 flex flex-col gap-1 mt-1"
                                    style={{ listStyle: "disc" }}
                                  >
                                    <li>
                                      Minimum: $1,000,000 combined single limit
                                    </li>
                                    <li>
                                      Applies to owned, hired, and non-owned
                                      vehicles
                                    </li>
                                  </ul>
                                </li>
                              </ul>
                            </li>

                            <li>
                              <span className="fw-700">
                                3. Required Coverage — Towing Providers
                              </span>
                              <ul
                                className="md:mx-6 mx-3 flex flex-col gap-2 mt-2"
                                style={{ listStyle: "disc" }}
                              >
                                <li>
                                  <span className="fw-700">
                                    Commercial General Liability
                                  </span>
                                  : Minimum $1,000,000 per occurrence
                                </li>
                                <li>
                                  <span className="fw-700">
                                    Commercial Automobile Liability
                                  </span>
                                  : Minimum $1,000,000 combined single limit
                                </li>
                                <li>
                                  <span className="fw-700">
                                    On-Hook Coverage
                                  </span>
                                  : Minimum $100,000 per vehicle
                                </li>
                                <li>
                                  <span className="fw-700">
                                    Garage Keepers Legal Liability
                                  </span>{" "}
                                  (Required if vehicles are stored, held
                                  overnight, or transported to yards): Minimum
                                  $100,000
                                </li>
                              </ul>
                            </li>

                            <li>
                              <span className="fw-700">
                                4. Additional Insured Requirement
                              </span>
                              <p className="mt-1">
                                ALLDRIVE SOS LLC must be listed as Additional
                                Insured and Primary and Non-Contributory on both
                                your Commercial General Liability and Commercial
                                Automobile policies.
                              </p>
                            </li>

                            <li>
                              <span className="fw-700">
                                5. Waiver of Subrogation
                              </span>
                              <p className="mt-1">
                                Policies must include a Waiver of Subrogation in
                                favor of ALLDRIVE SOS LLC — your insurance
                                company agrees not to pursue legal action against
                                AllDrive SOS LLC to recover claim payments made
                                under your policy.
                              </p>
                            </li>

                            <li>
                              <span className="fw-700">
                                6. Policy Cancellation / Material Change Notice
                              </span>
                              <p className="mt-1">
                                Insurance carriers must provide at least 30
                                days' written notice to ALLDRIVE SOS LLC prior
                                to cancellation, non-renewal, or material
                                coverage change.
                              </p>
                            </li>

                            <li>
                              <span className="fw-700">
                                7. Proof of Insurance
                              </span>
                              <p className="mt-1">
                                Providers must upload a valid Certificate of
                                Insurance through their AllDrive SOS account
                                prior to accepting service requests. AllDrive
                                SOS reserves the right to verify coverage
                                directly with insurers and suspend accounts with
                                expired or insufficient insurance.
                              </p>
                            </li>

                            <li>
                              <span className="fw-700">
                                8. Policy Renewal Requirement
                              </span>
                              <p className="mt-1">
                                Service providers must maintain continuous
                                coverage. Updated Certificates of Insurance must
                                be uploaded upon renewal via{" "}
                                <span className="fw-500">
                                  Account → Settings → KYC Information
                                </span>
                                . Failure to maintain active insurance may
                                result in immediate suspension or removal from
                                the platform.
                              </p>
                            </li>

                            <li>
                              <span className="fw-700">
                                9. Umbrella / Excess Liability Insurance
                                (Recommended)
                              </span>
                              <p className="mt-1">
                                Service providers are strongly encouraged to
                                maintain Umbrella or Excess Liability Insurance
                                with limits of at least $1,000,000, providing
                                additional coverage above primary policy limits.
                              </p>
                            </li>
                          </ul>

                          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-md">
                            <p className="fw-700 text-[#172748]">
                              Need to Upgrade Your Insurance to Meet AllDrive
                              SOS Requirements?
                            </p>
                            <p className="mt-2">
                              Download our official Insurance Requirements
                              document and send it directly to your insurance
                              agent to request the necessary endorsements.
                            </p>
                            <a
                              href="https://docs.google.com/document/d/1zVSn3YEdjNBz-_ph0Y0n0EiHEHh04KqL/edit"
                              target="_blank"
                              className="inline-block mt-3 text-blue-700 underline fw-500"
                            >
                              Download the AllDrive SOS Insurance Requirements
                              (.DOCX)
                            </a>
                            <p className="mt-3 text-sm text-gray-500">
                              Disclaimer: AllDrive SOS LLC does not provide
                              insurance, legal, or financial advice; service
                              providers should consult their licensed insurance
                              professional to determine appropriate coverage.
                            </p>
                          </div>
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
