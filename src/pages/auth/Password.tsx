import { useState } from "react";
import { BASE_URL } from "../../lib/services/constant";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import TextInput, { InputType } from "../../lib/components/ui/TextInput";
import { VscLock } from "react-icons/vsc";
import Button from "../../lib/components/ui/Button";
import { ScaleSpinner } from "../../lib/components/ui/Loading";
import useAuthStore from "../../lib/store/userStore";

const PasswordSet = () => {
  const [isBusy, setIsBusy] = useState(false);
  const saveUser = useAuthStore((state) => state.saveUser);
  const { code } = useParams();
  const navigate = useNavigate();
  const hash = code?.split("&");
  const token = !!hash?.length ? hash[1]?.replace("token=", "") : "";
  const email = !!hash?.length ? hash[0]?.replace("email=", "") : "";
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });
  const submitAction = async (data: any) => {
    setIsBusy(true);
    const payload = {
      email: email,
      password: data.password,
    };
    try {
      const response = await fetch(`${BASE_URL}/user/password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result) {
        toast.success(result?.message);
        const payload = {
          token: result.token,
          name: `${result.user.fname} ${result.user.lname}`,
          email: result.user.email,
          phone: result.user.phone,
          image: result.user.photo,
          state: result.user.state,
          account: result.user.userType,
          id: result.user.id,
        };
        saveUser(payload);
        localStorage.setItem("rhs_token", result.token);
        toast.success("Login Success");
        setIsBusy(false);
        navigate('/user')
      }
    } catch (error: any) {
      setIsBusy(false);
      toast.error(error.message);
    }
  };
  return (
    <div>
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
                <p className="text-xl fw-600">Hello {email ? email : "..."}</p>
                <p className="mt-3 fs-500">
                  Please cretae a password for your account
                </p>
              </div>
              <div className="my-8 lg:mt-8 mb-5 mx-auto">
                <form onSubmit={handleSubmit(submitAction)}>
                  <div className=" grid  gap-4">
                    <Controller
                      name="password"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Password is required",
                        },
                        minLength: {
                          value: 6,
                          message: "Password is too short",
                        },
                      }}
                      render={({ field }) => (
                        <TextInput
                          label="Password"
                          labelClassName="text-[#000000B2] fw-500"
                          icon={<VscLock className="text-2xl mx-2 lg:mx-4" />}
                          placeholder="*********"
                          error={errors.password?.message}
                          type={InputType.password}
                          {...field}
                          ref={null}
                        />
                      )}
                    />
                    <Controller
                      name="confirm_password"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Please enter your password",
                        },
                        validate: (val) => {
                          if (watch("password") != val) {
                            return "Your passwords do no match";
                          }
                        },
                      }}
                      render={({ field }) => (
                        <TextInput
                          label="Confirm Password"
                          labelClassName="text-[#000000B2] fw-500"
                          icon={<VscLock className="text-2xl mx-2 lg:mx-4" />}
                          placeholder="*********"
                          error={errors.confirm_password?.message}
                          type={InputType.password}
                          {...field}
                          ref={null}
                        />
                      )}
                    />
                  </div>
                  <div className="mt-12">
                    <Button
                      title={
                        isBusy ? (
                          <ScaleSpinner size={14} color="white" />
                        ) : (
                          "Register"
                        )
                      }
                      disabled={!isValid}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordSet;
