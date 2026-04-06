import { BsClock } from "react-icons/bs";
import LandingLayout from "../../lib/components/layout/landing";
import { FaCheck } from "react-icons/fa6";
import Button from "../../lib/components/ui/Button";
import { useNavigate } from "react-router-dom";

const DeleteAccount = () => {
    const navigate = useNavigate()
  return (
    <>
      <LandingLayout>
        <div>
          <div className="h-[250px] lg:h-[300px] bg-[url('https://res.cloudinary.com/greenmouse-tech/image/upload/v1721831093/rsh/Group_59_1_vxlzah.png')] bg-cover bg-center lg:bg-fit">
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
                <p className="text-3xl fw-700 mt-4">Delete Account</p>
              </div>
            </div>
          </div>
          <div className="section">
            <div className="box lg:pb-6">
              <div>
                <p className="text-xl fw-600">DELETE ACCOUNT</p>
                <div className="mt-3">
                  <p>
                    We&apos;re sorry to see you go! Deleting your account will
                    permanently remove all your data and cannot be undone. If
                    you are sure you want to proceed, please confirm your
                    decision by clicking the button beow
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-lg fw-500 text-[#1C1C1C]">
                  Are you sure you want to delete your account?
                </p>
                <p className="mt-3">Important</p>
                <div className="mt-3">
                  <ul className="grid gap-3">
                    <li className="flex gap-x-1">
                      <div className="w-[15px] h-[15px] mt-[6px] p-[2px] circle bg-[#172748] place-center shink-0">
                        <FaCheck className="text-white" />
                      </div>
                      <p>
                        All your data, including personal information, settings
                        and saved preference, will be permanently deleted.
                      </p>
                    </li>
                    <li className="flex gap-x-1">
                      <div className="w-[15px] h-[15px] mt-[6px] p-[2px] circle bg-[#172748] place-center shink-0">
                        <FaCheck className="text-white" />
                      </div>
                      <p>
                        You will no longer be able to access any service
                        associated with your account.
                      </p>
                    </li>
                    <li className="flex gap-x-1">
                      <div className="w-[15px] h-[15px] mt-[6px] p-[2px] circle bg-[#172748] place-center shink-0">
                        <FaCheck className="text-white" />
                      </div>
                      <p>This action is irreversible.</p>
                    </li>
                  </ul>
                  <p className="mt-3">
                    If you need help or have any concerns, please Contact our
                    support team.
                  </p>
                </div>
                <div className="mt-12">
                  <Button
                    title={"Delete Account"}
                    onClick={() => navigate('/user/settings')}
                    altClassName="btn-primary bg-[#172748] rounded-full px-8 lg:px-16 py-3"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="lg:py-0 section bg-[#EBEDEF]">
            <div className="box">
              <div className="lg:flex items-center flex-row-reverse">
                <div className="lg:w-5/12">
                  <img
                    src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1721832209/rsh/Rectangle_irq6fh.png"
                    alt="mobile"
                    className="w-full"
                  />
                </div>
                <div className="lg:w-7/12">
                  <div>
                    <p className="text-xl fw-600">
                      STEPS TO DELETE YOUR ACCOUNT ON MOBILE APP AS A CLIENT OR
                      DRIVER
                    </p>
                  </div>
                  <div className="mt-6 lg:mt-8">
                    <ul className="grid gap-3 lg:gap-5">
                      <li className="flex gap-x-1">
                        <div className="w-[15px] h-[15px] mt-[6px] p-[2px] circle bg-[#172748] place-center shink-0">
                          <FaCheck className="text-white" />
                        </div>
                        <p>
                          Launch the app and login as a Client or a Driver using
                          the valid credentials of the account that you want to
                          delete.
                        </p>
                      </li>
                      <li className="flex gap-x-1">
                        <div className="w-[15px] h-[15px] mt-[6px] p-[2px] circle bg-[#172748] place-center shink-0">
                          <FaCheck className="text-white" />
                        </div>
                        <p>{`Click “More” menu > Settings > Delete Account`}</p>
                      </li>
                      <li className="flex gap-x-1">
                        <div className="w-[15px] h-[15px] mt-[6px] p-[2px] circle bg-[#172748] place-center shink-0">
                          <FaCheck className="text-white" />
                        </div>
                        <p>
                          Read the results of deleting your account and confirm
                          deletion by clicking the “Delete My Account” button.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LandingLayout>
    </>
  );
};

export default DeleteAccount;
