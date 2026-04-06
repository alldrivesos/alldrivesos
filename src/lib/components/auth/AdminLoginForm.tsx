import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import TextInput, { InputType } from "../ui/TextInput";
import { AiOutlineMail } from "react-icons/ai";
import { VscLock } from "react-icons/vsc";
import Button from "../ui/Button";
import { ScaleSpinner } from "../ui/Loading";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { adminLogin } from "../../services/api/authApi";
import { toast } from "react-toastify";
import useAuthStore from "../../store/userStore";

const AdminLoginForm = () => {
  const [isBusy, setIsBusy] = useState(false);
  const navigate = useNavigate()
  const saveUser = useAuthStore((state) => state.saveUser)
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const mutation = useMutation({
    mutationFn: adminLogin,
    onSuccess: (data) => {
      const payload = {
        token: data.token,
        name: data.user.name,
        email: data.user.email,
        phone: data.user.phone,
        image: "",
        state: data.user.state,
        account: data.user.userType,
        id: data.user.id
      };
      saveUser(payload)
      localStorage.setItem('rhs_token', data.token)
      toast.success("Login Success");
      navigate('/admin')
      setIsBusy(false);
    },
    onError: (error:any) => {
      toast.error(error.response.data.message);
      setIsBusy(false);
    },
  });
  const onSubmit = (data: any) => {
    setIsBusy(true);
    mutation.mutate(data);
  };
  return (
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
            title={isBusy ? <ScaleSpinner size={14} color="white" /> : "Login"}
            disabled={!isValid}
          />
        </div>
      </form>
    </div>
  );
};

export default AdminLoginForm;
