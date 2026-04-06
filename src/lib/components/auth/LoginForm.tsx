import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import TextInput, { InputType } from "../ui/TextInput";
import { AiOutlineMail } from "react-icons/ai";
import { VscLock } from "react-icons/vsc";
import Button from "../ui/Button";
import { ScaleSpinner } from "../ui/Loading";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userLogin } from "../../services/api/authApi";
import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../../store/userStore";
import useModal from "../../hooks/useModal";
import AccontNotVerified from "./AccontNotVerified";
import { removeSpace } from "../../utils";
import { apiClient } from "../../services/api/serviceApi";
import { useTempUser } from "../../../pages/auth/UserSignUp";

const LoginForm = () => {
  const [isBusy, setIsBusy] = useState(false);
  const navigate = useNavigate();
  const saveUser = useAuthStore((state) => state.saveUser);
  const [user, setUser] = useTempUser();
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const mutation = useMutation({
    mutationFn: async () => {
      let resp = await apiClient.post("/user/login/v2", {
        email: getValues("email"),
        password: getValues("password"),
      });
      return resp.data;
    },
    onSuccess: (data) => {
      const payload = {
        token: data.token,
        name: data.user.name,
        email: data.user.email,
        phone: data.user.phone,
        image: data.user.photo,
        state: data.user.state,
        account: data.user.userType,
        id: data.user.id,
        charge: data.user.serviceCharge,
      };
      saveUser(payload);
      localStorage.setItem("rhs_token", data.token);
      if (data.user.userType === "private_client") {
        saveUser({
          token: data.token,
          email: data.user.email,
          phone: data.user.phone,
          image: data.user.photo,
          state: data.user.state,
          account: data.user.userType,
          id: data.user.id,
          name: `${removeSpace(data?.user?.fname)} ${removeSpace(
            data?.user?.lname,
          )}`,
        });
        navigate("/user");
        toast.success("Login Success");
      } else if (data?.user?.userType === "professional") {
        navigate("/provider");
        toast.success("Login Success");
      } else {
        toast.info("This account is mobile-only. Please use our app");
      }
    },
    onError: (error: any) => {
      if (error.status == 403) {
        setUser(error.response.data);
        toast.error(error.response.data.message);
        navigate("/auth/verify/user", {
          viewTransition: true,
        });
        return console.log(error.response.data);
      }
      // return console.log(error.status);
      toast.error(error.response.data.message);
      if (error.response.data.message === "Please Verify account") {
        setShowModal(true);
      }
      setIsBusy(false);
    },
  });
  const onSubmit = (data: any) => {
    setIsBusy(true);
    mutation.mutate(data);
  };
  // Account not verified modal
  const { Modal, setShowModal } = useModal();
  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Controller
              name="email"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please enter your email",
                },
              }}
              render={({ field }) => (
                <TextInput
                  label="Email"
                  labelClassName="text-[#000000B2] fw-500"
                  icon={<AiOutlineMail className="text-2xl mx-2 lg:mx-4" />}
                  placeholder="name@domain.com"
                  error={errors.email?.message}
                  type={InputType.email}
                  {...field}
                  ref={null}
                />
              )}
            />
          </div>
          <div className="mt-6 relative">
            <Link
              to="/auth/forget"
              className="absolute top-0 right-0 fw-500 fs-400"
            >
              Forgot Password?
            </Link>
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
          </div>
          <div className="mt-12">
            <Button
              title={
                mutation.isPending ? (
                  <ScaleSpinner size={14} color="white" />
                ) : (
                  "Login"
                )
              }
              disabled={!isValid || mutation.isPending}
            />
          </div>
        </form>
      </div>
      <Modal size="sm" title="">
        <AccontNotVerified email={getValues("email")} />
      </Modal>
    </>
  );
};

export default LoginForm;
