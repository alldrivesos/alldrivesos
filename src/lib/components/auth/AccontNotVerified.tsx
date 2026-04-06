import { FC, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import fail from "../../../assets/error.gif";
import { toast } from "react-toastify";
import { resendCode } from "../../services/api/authApi";
import { BeatLoader } from "react-spinners";

interface Props {
  email: string;
}
const AccontNotVerified: FC<Props> = ({ email }) => {
    const [isLoading, setIsLoading] = useState(false)
  const resendTok = useMutation({
    mutationFn: resendCode,
  });
  const handleResend = () => {
    setIsLoading(true)
    const payload = {
      email: email,
      platform: "web",
    };
    resendTok.mutateAsync(payload, {
      onSuccess: () => {
        toast.success("Verification token has been sent to your mail");
        setIsLoading(false)
      },
      onError: () => {
        toast.error("Something went wrong");
        setIsLoading(false)
      },
    });
  };
  return (
    <>
      <div>
        <img src={fail} alt="check" className="w-3/12 mx-auto" />
        <p className="text-center text-black mt-5 fw-600 text-lg lg:text-xl">
          Accout confirmation Failed
        </p>
        <p
          onClick={handleResend}
          className="mt-4 fw-600 text-gray-500 text-center italics fs-300"
        >
          {isLoading? <BeatLoader size={12}/> : "Click to resend mail"}
        </p>
      </div>
    </>
  );
};

export default AccontNotVerified;
