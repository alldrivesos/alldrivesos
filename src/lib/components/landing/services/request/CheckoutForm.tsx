import { Button } from "@material-tailwind/react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { FC } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { confirmPay } from "../../../../services/api/serviceApi";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import useRequestStore from "../../../../store/serviceStore";
import { useServiceSec } from "../../../../../pages/user/components/request-comps/service-sec";
import { useProfileSec } from "../../../../../pages/user/components/request-comps/profile-sec";
import { useDriver } from "../../../../../pages/user/new-request";

interface Props {
  prev: () => void;
  secret_key: string;
}
const CheckoutForm: FC<Props> = ({ prev }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { id } = useParams();
  const clear = useRequestStore((state) => state.clearRequest);
  const [service, setService] = useServiceSec();
  const [profile, setProfile] = useProfileSec();
  const [_, setDriver] = useDriver();
  const confirmPayment = async (secret: string | null) => {
    const payload = {
      clientSecret: secret,
    };
    await confirmPay(payload)
      .then((res) => {
        toast.success(res.message);
        // setService(null);
        setDriver(null);
        setProfile(null);
        navigate(`/success/${id}`);
        clear();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const handleSubmit = async (event: any) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    console.log(elements);

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "https://alldrivesos.com/",
      },
      redirect: "if_required",
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      confirmPayment(result.paymentIntent.client_secret);
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <div className="mt-16 flex justify-between">
        <Button onClick={prev} className="btn-feel flex gap-x-2 items-center">
          <FaArrowLeftLong /> Prev
        </Button>
        <Button type={"submit"} className="btn-feel flex gap-x-2 items-center">
          Next <FaArrowRightLong />
        </Button>
      </div>
    </form>
  );
};

export default CheckoutForm;
