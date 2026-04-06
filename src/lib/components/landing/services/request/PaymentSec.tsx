import { FC, useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { apiClient, initiatePay } from "../../../../services/api/serviceApi";
import useRequestStore from "../../../../store/serviceStore";
import { formatNumber } from "../../../../utils";
import { PAYMENT_KEY } from "../../../../services/constant";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useDriver } from "../../../../../pages/user/new-request";

interface Props {
  prev: () => void;
}
const stripePromise = loadStripe(PAYMENT_KEY);

const PaymentSec: FC<Props> = ({ prev }) => {
  const request = useRequestStore((state) => state.request);

  const [driver, setDriver] = useDriver();
  const [payDetails, setPayDetails] = useState<any>();

  // const [showStripe, setShowStripe] = useState(false)
  const getPayDetails = () => {
    initiatePay(request.qouteId).then((data) => {
      setPayDetails(data.data);
    });
  };
  useEffect(() => {
    if (!payDetails) {
      getPayDetails();
    }
  }, [request]);

  // return <>{JSON.stringify(driver.id)}</>;

  return (
    <>
      <div className="bg-gray-100 min-h-[450px] lg:p-10 lg:pb-20 p-4 pb-8 rounded-md">
        {driver && (
          <div className="grid gap-2 bg-primary text-white p-4 rounded mb-5">
            <div className="flex justify-between">
              <p className="fw-500">Service Fee:</p>
              <p className="fw-600 fs-700">${driver.quote}</p>
            </div>
            <div className="flex justify-between">
              <p className="fw-500">Processing Fee:</p>
              <p className="fw-600 fs-700">$ 0 </p>
            </div>
            {/*<div className="flex justify-between">
              <p className="fw-500">Tax:</p>
              <p className="fw-600 fs-700">
                $
                {formatNumber(payDetails?.amount_breakdown?.tax_amount) ||
                  formatNumber(payDetails?.tax)}
              </p>
            </div>*/}
            <div className="flex justify-between border-t-2 border-gray-300 pt-2">
              <p className="fw-500">Total:</p>
              <p className="fw-600 fs-700">${formatNumber(driver.quote)}</p>
            </div>
          </div>
        )}
        {/*{driver && (
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm prev={prev} secret_key={payDetails || ""} />
          </Elements>
        )}*/}
      </div>
    </>
  );
};

export default PaymentSec;
