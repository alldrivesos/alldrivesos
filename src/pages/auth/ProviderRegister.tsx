import { Link } from "react-router-dom";
import ProviderRegisterForm from "../../lib/components/auth/ProviderRegisterForm";

const ProviderRegister = () => {
  return (
    <>
      <div className="bg-primary lg:min-h-screen py-12 ">
        <div className="w-full h-full bg-login">
          <div className="box h-full place-center">
            <div className="lg:w-7/12 mx-auto bg-white lg:px-16 p-6">
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
                <p className="text-xl fw-600">Create a Company Account</p>
                <p className="mt-3 fs-500">
                  Fill in your credentials to create an account on this platform
                </p>
              </div>
              <div className="my-8 lg:mt-8 mb-5 mx-auto">
                <ProviderRegisterForm />
              </div>
              <div>
                <p className="fs-500">
                  Already registered?{" "}
                  <Link
                    to={"/auth/login"}
                    className="underline fw-500 text-primary"
                  >
                    Go to login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProviderRegister;
