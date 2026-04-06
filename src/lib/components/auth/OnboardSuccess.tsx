import happy from "../../../assets/happystate.gif";
import { useNavigate } from "react-router-dom";

const OnboardSuccess = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/auth/login");
  };

  return (
    <>
      <div className="px-3 pb-6">
        <img src={happy} alt="check" className="w-6/12 mx-auto" />
        <p className="text-center text-black fw-600 text-lg lg:text-xl">
          Registration Successful !!
        </p>
        <div className="mt-5">
          <p className="text-center">
            Thanks for signing up. Welcome to our community. We are happy to
            have you on board.
          </p>
          <p className="text-base text-gray-700">
            You can proceed to download and install the app from the{" "}
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              App Store
            </a>{" "}
            or{" "}
            <a
              href="https://play.google.com/store/apps/details?id=com.alldrivesos.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              Google Play Store
            </a>
            , then log in to complete your KYC and start receiving service
            requests from clients.
          </p>
          <div className="mt-6 text-center">
            <button
              onClick={handleLoginRedirect}
              className="px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Proceed to Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnboardSuccess;
