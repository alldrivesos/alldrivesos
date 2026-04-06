import { SiFacebook, SiLinkedin, SiTwitter } from "react-icons/si";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { subscribeNews } from "../../../../services/api/routineApi";

export const socials = [
  {
    name: "twitter",
    to: "https://x.com/AlldriveSOS",
    icon: <SiTwitter className="lg:text-3xl text-xl" />,
  },
  {
    name: "facebook",
    to: "https://www.facebook.com/AllDriveSOS",
    icon: <SiFacebook className="lg:text-3xl text-xl" />,
  },
  {
    name: "instagram",
    to: "https://www.instagram.com/alldrivesos",
    icon: <BiLogoInstagramAlt className="lg:text-4xl text-xl" />,
  },
  {
    name: "linkedin",
    to: "https://www.linkedin.com/in/alldrivesos",
    icon: <SiLinkedin className="lg:text-3xl text-xl" />,
  },
];

const Footer = () => {
  const date = new Date();
  const [email, setEmail] = useState("");
  const validateEmail = (email: string): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };
  const handleSubmit = async () => {
    if (validateEmail(email)) {
      const payload = {
        email: email,
      };
      await subscribeNews(payload)
        .then((res) => {
          toast.success(res.message);
          setEmail("");
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } else {
      toast.error("Invalid Email");
    }
  };
  // return <></>;
  return (
    <div className="bg-[#172748] ">
      <div className="box text-white">
        <div className="lg:pt-20 py-12 lg:grid lg:grid-cols-6">
          <div className="col-span-2">
            <img
              src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1706192917/rsh/Group_48097864_1_mopmlj.png"
              alt="logo"
              className="w-8/12 lg:w-6/12"
            />
            <div className="lg:w-10/12 mt-4">
              <p className="fs-500">
                Download ALLDRIVE SOS, the free app that connects you to
                roadside assistance providers nationwide. Get help fast for flat
                tires, dead batteries, lockouts & more - 24/7, anywhere in the
                US.
              </p>
            </div>
            <div className="lg:pl-0">
              {/* <p className="fs-500">+0 123 456 7890</p>
              <p className="mt-3 fs-500 ">N0 1 Company physical address, Country. Earth</p> */}
              <ul className="flex gap-x-5 lg:gap-x-4 mt-8">
                {socials.map((item, i) => (
                  <li className="text-white cursor-pointer" key={i}>
                    <a href={item.to} target="_blank" rel="noopener noreferrer">
                      {item.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <p className="fw-600 mb-4 mt-10 lg:mt-0">Company</p>
            <ul className="grid gap-6 fs-500">
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/faqs"}>FAQs</Link>
              </li>
              <li>
                <Link to={"/join-us"}>Join Us</Link>
              </li>
              {/*<li>
                <Link to={"/request"}>Request a Service</Link>
              </li>*/}
              <li>
                <Link to={"/all-services"}>Request a Services</Link>
              </li>
              <li>
                <Link to={"/auth/register"}>Signup as a Provider</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="fw-600 mb-4 mt-10 lg:mt-0">Legal</p>
            <ul className="grid gap-6 fs-500">
              <li>
                <Link to={"/terms"}>Terms of Service</Link>
              </li>
              <li>
                <Link to={"/privacy"}>Privacy Policy</Link>
              </li>
              <li>
                {/*<Link to={"/payment-settlement"}>Payment Settlement</Link>*/}
              </li>
            </ul>
          </div>
          <div>
            <p className="fw-600 mb-4 mt-10 lg:mt-0">Support</p>
            <ul className="grid gap-6 fs-500">
              <li>
                <Link to={"/request"}>Get Help</Link>
              </li>
              <li>
                <Link to={"/contact"}>Contact Us</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="fw-600 mt-10 lg:mt-0">Subscribe to Newsletter</p>
            <p className="mt-3 fs-400">
              Don't miss out! Receive updates from us.
            </p>
            <div className="mt-4 border rounded-[10px] flex bg-white">
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="rounded-l-[10px] text-black fs-500 pl-2 border-none outline-none w-full"
              />
              <button
                onClick={handleSubmit}
                className="p-3 rounded-[10px] bg-[#FEB470] text-black fw-500"
              >
                Join
              </button>
            </div>
          </div>
        </div>
        <div className="pt-6 border-t border-gray-500">
          <p className="text-center pb-4 fs-500 text-white">
            Copyright © {date.getFullYear()} ALLDRIVE SOS. All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
