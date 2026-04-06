import { useState } from "react";
import SecuritySetting from "../../lib/components/admin/settings/Security";
import KycIndex from "../../lib/components/provider/settings/kyc";
import MyProfileSettings from "../../lib/components/provider/settings/MyProfile";
import ServicesAdded from "../../lib/components/provider/settings/Services";
import SmsSettings from "../../lib/components/user/settings/SmsSettings";
import AdminCharges from "../../lib/components/admin/settings/AdminCharges";

const ProviderSettings = () => {
  const [active, setActive] = useState(1);
  const handleActive = (val: number) => {
    setActive(val);
  };
  return (
    <>
      <div className="text-black lg:p-5">
        <p className="fw-500 lg:text-xl pl-1">Account Settings</p>
        <div className="w-full bg-white mt-4 rounded-[12px] p-2 lg:p-6">
          <div className="lg:flex gap-x-4">
            <div className="lg:w-[17%] bg-gray-100 rounded p-2 lg:p-4 lg:min-h-[400px]">
              <ul className="grid grid-cols-3 lg:grid-cols-1 gap-4 mt-2">
                <li
                  className={`cursor-pointer px-4 py-2  whitespace-nowrap rounded-lg hover:scale-105 duration-100 ${
                    active === 1 && "bg-white fw-600"
                  }`}
                  onClick={() => handleActive(1)}
                >
                  My Profile
                </li>
                <li
                  className={`cursor-pointer px-4 py-2  whitespace-nowrap rounded-lg hover:scale-105 duration-100 ${
                    active === 2 && "bg-white fw-600"
                  }`}
                  onClick={() => handleActive(2)}
                >
                  KYC
                </li>
                <li
                  className={`cursor-pointer px-4 py-2  whitespace-nowrap rounded-lg hover:scale-105 duration-100 ${
                    active === 3 && "bg-white fw-600"
                  }`}
                  onClick={() => handleActive(3)}
                >
                  Services
                </li>
                <li
                  className={`cursor-pointer px-4 py-2  whitespace-nowrap rounded-lg hover:scale-105 duration-100 hover:bg-white ${
                    active === 4 && "bg-white fw-600"
                  }`}
                  onClick={() => handleActive(4)}
                >
                  Security
                </li>
                <li
                  className={`cursor-pointer px-4 py-2  whitespace-nowrap rounded-lg hover:scale-105 duration-100 hover:bg-white ${
                    active === 5 && "bg-white fw-600"
                  }`}
                  onClick={() => handleActive(5)}
                >
                  SMS
                </li>
                {/*<li
                  className={`cursor-pointer px-4 py-2  whitespace-nowrap rounded-lg hover:scale-105 duration-100 hover:bg-white ${
                    active === 6 && "bg-white fw-600"
                  }`}
                  onClick={() => handleActive(6)}
                >
                  Charges
                </li>*/}
              </ul>
            </div>
            <div className="lg:w-[83%] pt-6 lg:pt-0">
              {active === 1 && <MyProfileSettings />}
              {active === 2 && <KycIndex />}
              {active === 3 && <ServicesAdded />}
              {active === 4 && <SecuritySetting />}
              {active === 5 && <SmsSettings />}
              {/*{active == 6 && <AdminCharges />}*/}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProviderSettings;
