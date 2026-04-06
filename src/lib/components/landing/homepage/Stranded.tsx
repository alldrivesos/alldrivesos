import { FaCheck } from "react-icons/fa";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";

const Stranded = () => {
  const data = [
    {
      name: "24/7 Availability",
      desc: "Our network of technicians is ready to assist you anytime, anywhere.",
    },
    {
      name: "Fast Response Time",
      desc: "Our efficient dispatch system ensures help arrives promptly.",
    },
    {
      name: "Transparent Pricing",
      desc: "Know the cost upfront with no hidden fees or surprises.",
    },
    {
      name: "Real-Time Tracking",
      desc: "Track your technician's arrival in real-time for peace of mind.",
    },
    {
      name: "Comprehensive Services",
      desc: (
        <p>
          From towing to tire changes, fuel delivery to battery jumps, we've got
          you covered. See our growing{" "}
          <Link to={"/request"} className="text-[#FEB470] fw-500">
            list of services
          </Link>
        </p>
      ),
    },
  ];
  const data2 = [
    {
      name: "Steady Work Opportunities",
      desc: "Join a thriving network and receive consistent job offers",
    },
    {
      name: "Flexible Schedule",
      desc: "Work on your terms and at your convenience.",
    },
    {
      name: "Fair Compensation",
      desc: "Set your own rates and receive prompt payment for your services.",
    },
    {
      name: "Supportive Community",
      desc: "Be part of a network that values your skills and professionalism.",
    },
    {
      name: "Easy-to-Use App",
      desc: "Streamlined job management and navigation to provide the best service possible.",
    },
  ];
  return (
    <>
      <div className="section bg-[#172748] text-white">
        <div className="box">
          <div className="lg:flex items-center flex-row-reverse">
            <div className="lg:w-6/12 flex justify-center">
              <img
                src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1704969535/rsh/Rectangle_26_p5iqak.png"
                alt="stranded-img"
                className="w-full lg:w-10/12"
              />
            </div>
            <div className="lg:w-6/12 mt-8 lg:mt-0">
              <span className="text-[#E4B080] border border-[#E4B080] px-2 py-[4px] rounded-[100px] fs-300">
                Who We Are
              </span>
              <div className="mt-6">
                <p className="text-xl lg:text-3xl fw-600">
                  Your Roadside Lifeline
                </p>
                <p className="my-5 mb-6 fs-400 lg:fs-500">
                  In moments of distress on the road, peace of mind is just a
                  tap away with ALLDRIVE SOS. We connect motorists in need with
                  a nationwide network of expert roadside technicians, ensuring
                  help is always nearby. Whether you're stranded with a flat
                  tire, a dead battery, a vehicle lockout, or an empty gas tank,
                  ALLDRIVE SOS is here to get you back on your journey swiftly
                  and safely.
                </p>
              </div>
              <div className="grid gap-3 lg:gap-4">
                <p className="fw-500 text-lg">Benefits for Motorists</p>
                {data.map((item) => (
                  <div className="flex gap-x-3">
                    <div className="w-4 lg:w-5 h-4 lg:h-5 mt-2 lg:mt-[4px] circle place-center bg-pri">
                      <FaCheck className="text-ter fs-100 lg:fs-200" />
                    </div>
                    <div className="w-[90%]">
                      <p className="fw-600">{item.name}</p>
                      <p className="fs-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="md:flex mt-8 lg:mt-10 gap-x-5">
                <Link
                  to={"/request"}
                  className="btn-feel flex w-6/12 md:w-auto items-center gap-x-4 fs-500 !fw-600 bg-[#C97833] text-white px-4 py-2"
                >
                  Get Help <HiOutlineArrowNarrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section bg-[#C97833] text-white">
        <div className="box">
          <div className="lg:flex items-center mt-8 lg:mt-2">
            <div className="lg:w-6/12">
              <img
                src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1722434847/rsh/Gemini_Generated_Image_kana84kana84kana_rpcmr8.jpg"
                alt="stranded-img"
                className="lg:w-10/12 rounded-2xl"
              />
            </div>
            <div className="lg:w-6/12 mt-8 lg:mt-0">
              <div className="grid gap-3 lg:gap-4">
                <p className="fw-500 text-2xl">Benefits for Technicians</p>
                {data2.map((item) => (
                  <div className="flex gap-x-3 mt-2">
                    <div className="w-5 lg:w-6 h-5 lg:h-6 mt-2 lg:mt-[4px] circle place-center bg-white shadow-lg">
                      <FaCheck className="text-[#E5944C] fs-300 lg:fs-500" />
                    </div>
                    <div className="w-[90%]">
                      <p className="fw-600 lg:text-lg">{item.name}</p>
                      <p className="fs-400 lg:fs-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="md:flex mt-8 lg:mt-10 gap-x-5">
                <Link
                  to={"/auth/register"}
                  className="btn-feel flex mt-6 lg:mt-0 w-11/12 md:w-auto  items-center gap-x-4 fs-500 !fw-600 bg-[#172748] text-white px-4 py-2"
                >
                  Sign Up as a Service Provider <HiOutlineArrowNarrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stranded;
