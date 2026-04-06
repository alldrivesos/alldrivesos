import { Link } from "react-router-dom";
import LoginForm from "../../lib/components/auth/LoginForm";

const UserLogin = () => {
  return (
    <>
      <div className="bg-primary h-screen">
        <div className="w-full h-full bg-login">
          <div className="box h-full place-center">
            <div className="lg:w-[550px] mx-auto bg-white lg:px-16 p-6">
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
                <p className="text-xl fw-600">Account Login</p>
                <p className="mt-3 fs-500">
                  Fill in your credentials to login to your dashboard
                </p>
              </div>
              <div className="my-8 lg:mt-8 mb-5 mx-auto">
                <LoginForm />
              </div>
              <div>
                <p className="fs-500">
                  Not yet registered?{" "}
                  <Link
                    to={"/auth/register/user"}
                    className="underline fw-500 text-primary"
                  >
                    Register now
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

export default UserLogin;
