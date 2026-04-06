import { Link } from "react-router-dom";
import google from "../../assets/google.svg";
import apple from "../../assets/apple.svg";

const DownloadApp = () => {
  return (
    <div className="section pt-0">
      <div className="box">
        <div className="lg:h-[400px] rounded-[20px] lg:rounded-[50px] overflow-hidden lg:flex bg-[#172748]">
          <div className="lg:w-6/12 pt-6 lg:pt-0 flex h-full items-center">
            <div className="text-white p-6 lg:pl-12">
              <p className="fw-600 text-2xl">
                Download the AllDrive SOS Mobile App
              </p>
              <p className="mt-6">
                Join thousands of satisfied users already experiencing seamless
                services with the AllDrive SOS mobile application. Click the
                link below to download the app and access our roadside rescue
                services!
              </p>
              <div className="flex gap-x-4 mt-6">
                <Link
                  to={
                    "https://play.google.com/store/apps/details?id=com.alldrivesos.app"
                  }
                >
                  <img
                    src={google}
                    alt="google_link"
                    className="w-[150px] h-[50px] object-cover rounded-lg"
                  />
                </Link>
                <Link to={"https://apps.apple.com/app/id6503254909"}>
                  <img
                    src={apple}
                    alt="apple_link"
                    className="w-[150px] h-[50px] object-cover rounded-lg"
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="lg:w-6/12 flex justify-center">
            <img
              src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1721654271/rsh/Alldrive_SOS_App_1_k80apl.jpg"
              alt="app-download"
              className="w-9/12 lg:w-auto h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadApp;
