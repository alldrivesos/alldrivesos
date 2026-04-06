import { BsClock } from "react-icons/bs";
import RequestForm from "../../lib/components/landing/services/RequestForm";
import LandingLayout from "../../lib/components/layout/landing";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCategories } from "../../lib/services/api/serviceApi";
import { ServiceCatItem } from "../../lib/types/service";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useRequestStore from "../../lib/store/serviceStore";
import { RiDeleteBin5Fill } from "react-icons/ri";
import DownloadApp from "../../lib/components/landing/homepage/DownloadApp";
import useAuthStore from "../../lib/store/userStore";
import { useDriver } from "../user/new-request";
import AdminLoginForm from "../../lib/components/auth/AdminLoginForm";

const RequestPage = () => {
  const user = useAuthStore((state) => state.user.name.trim());
  const { id } = useParams();
  const nav = useNavigate();
  useEffect(() => {
    if (user) {
      nav("/user/services");
    }
  }, [user]);
  // return <div className="bg-brown-800 min-h-screen"></div>;
  //
  return (
    <LandingLayout>
      <>
        <div className="bg-primary h-screen">
          <div className="w-full h-full bg-login">
            <div className="box h-full place-center">
              {/*<div className="lg:w-[550px] mx-auto bg-white lg:px-16 p-6">
              <Link to="/">
                <img
                  src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1706192916/rsh/Group_48097863_txmkbr.png"
                  alt="logo"
                  className="w-60 mx-auto my-6"
                  width={400}
                  height={80}
                />
              </Link>
              <div className="mt-6 lg:mt-6">
                <p className="text-xl fw-600">Admin Login</p>
                <p className="mt-3 fs-500">
                  Fill in your credentials to login to your dashboard
                </p>
              </div>
              <div className="my-8 lg:mt-8 mb-5 mx-auto">
                <AdminLoginForm />
              </div>
            </div>*/}

              <>
                <div className="min-h-screen  grid place-items-center p-4 bg-primary">
                  {/*<img
                    src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1706192916/rsh/Group_48097863_txmkbr.png"
                    alt="logo"
                    className="w-60 mx-auto my-6"
                    width={400}
                    height={80}
                  />*/}
                  <div className="flex flex-col items-center justify-center p-8 max-w-lg w-full bg-white rounded-xl shadow-2xl border border-gray-100">
                    <h2 className="text-3xl font-extrabold mb-3 text-gray-800 text-center">
                      Ready to Get Back on the Road?
                    </h2>
                    <p className="text-lg mb-8 text-gray-600 text-center">
                      Log in or create an account to quickly submit your service
                      request.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                      <button
                        className="bg-primary hover:bg-amber-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg w-full sm:w-auto"
                        onClick={() => {
                          nav("/auth/login");
                        }}
                      >
                        Login
                      </button>
                      <button
                        className="border-2 border-amber-400 text-amber-600 font-semibold py-3 px-8 rounded-lg hover:bg-amber-50 transition-colors duration-300 w-full sm:w-auto"
                        onClick={() => {
                          nav("/auth/register/user");
                        }}
                      >
                        Register
                      </button>
                    </div>
                  </div>
                </div>
              </>
            </div>
          </div>
        </div>
      </>
    </LandingLayout>
  );
  return (
    <>
      <div className="min-h-screen  grid place-items-center p-4 bg-primary">
        {/*<img
            src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1706192916/rsh/Group_48097863_txmkbr.png"
            alt="logo"
            className="w-60 mx-auto my-6"
            width={400}
            height={80}
          />*/}
        <div className="flex flex-col items-center justify-center p-8 max-w-lg w-full bg-white rounded-xl shadow-2xl border border-gray-100">
          <h2 className="text-3xl font-extrabold mb-3 text-gray-800 text-center">
            Ready to Get Back on the Road?
          </h2>
          <p className="text-lg mb-8 text-gray-600 text-center">
            Log in or create an account to quickly submit your service request.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <button
              className="bg-primary hover:bg-amber-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg w-full sm:w-auto"
              onClick={() => {
                nav("/auth/login");
              }}
            >
              Login
            </button>
            <button
              className="border-2 border-amber-400 text-amber-600 font-semibold py-3 px-8 rounded-lg hover:bg-amber-50 transition-colors duration-300 w-full sm:w-auto"
              onClick={() => {
                nav("/auth/register/user");
              }}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestPage;
