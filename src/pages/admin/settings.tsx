import { useState } from "react";
import MyProfileSettings from "../../lib/components/admin/settings/MyProfile";
import SecuritySetting from "../../lib/components/admin/settings/Security";
import AdminRates from "../../lib/components/admin/settings/AdminRates";
import PayoutSettings from "../../lib/components/admin/settings/Payouts";
import AdminCharges from "../../lib/components/admin/settings/AdminCharges";
// import AdminCharges from "../../lib/components/admin/settings/AdminCharges";

const AdminSettings = () => {
  const [active, setActive] = useState(1);
  const handleActive = (val: number) => {
    setActive(val);
  };
  return (
    <>
      <div className="text-black lg:p-5">
        <p className="fw-500 lg:text-xl pl-1">Account Settings</p>
        <div className="w-full bg-white mt-4 rounded-[12px] p-6">
          <div className="flex gap-x-4">
            <div className="w-[17%] lg:min-h-[60vh] bg-gray-100 rounded p-2 lg:p-4">
              <ul className="grid gap-4 mt-2">
                <li
                  className={`cursor-pointer px-4 py-2  whitespace-nowrap rounded-lg hover:scale-105 duration-100 ${
                    active === 1 && "bg-white fw-600"
                  }`}
                  onClick={() => handleActive(1)}
                >
                  My Profile
                </li>
                <li
                  className={`cursor-pointer px-4 py-2  whitespace-nowrap rounded-lg hover:scale-105 duration-100 hover:bg-white ${
                    active === 2 && "bg-white fw-600"
                  }`}
                  onClick={() => handleActive(2)}
                >
                  Security
                </li>
                {/*<li
                  className={`cursor-pointer px-4 py-2  whitespace-nowrap rounded-lg hover:scale-105 duration-100 hover:bg-white ${
                    active === 3 && "bg-white fw-600"
                  }`}
                  onClick={() => handleActive(3)}
                >
                  Rates
                </li>*/}
                <li
                  className={`cursor-pointer px-4 py-2  whitespace-nowrap rounded-lg hover:scale-105 duration-100 hover:bg-white ${
                    active === 4 && "bg-white fw-600"
                  }`}
                  onClick={() => handleActive(4)}
                >
                  Payout
                </li>
                <li
                  className={`cursor-pointer px-4 py-2  whitespace-nowrap rounded-lg hover:scale-105 duration-100 hover:bg-white ${
                    active === 4 && "bg-white fw-600"
                  }`}
                  onClick={() => handleActive(5)}
                >
                  Charges
                </li>
              </ul>
            </div>
            <div className="w-[83%]">
              {active === 1 && <MyProfileSettings />}
              {active === 2 && <SecuritySetting />}
              {/*{active === 3 && <AdminRates />}*/}
              {active === 4 && <PayoutSettings />}
              {active === 5 && <AdminCharges />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSettings;
