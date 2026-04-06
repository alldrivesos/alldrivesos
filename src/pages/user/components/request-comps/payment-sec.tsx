import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../../lib/services/api/serviceApi";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { PAYMENT_KEY } from "../../../../lib/services/constant";
import CheckoutForm from "../../../../lib/components/landing/services/request/CheckoutForm";
import { useDriver } from "../../new-request";

interface PaymentDataV1 {
  id: string;
  serviceRequestId: string;
  driverQuoteId: string;
  amount: number;
  companyCharge: number;
  charge: number;
  tax: number;
  userId: string;
  f: string;
  paymentRef: string;
  status: string;
  driverChargeForAdmin: number;
  remitted: null | any;
  createdAt: string;
  updatedAt: string;
  clientSecret: string;
  items?: { description: string; amount: number }[]; // Added for V1
}

interface PaymentDataV2 {
  id: string;
  serviceRequestId: string;
  driverQuoteId: string;
  amount: number;
  amount_breakdown: {
    tax_amount: number;
    service_amount: number;
    subtotal: number;
  };
  client_secret: string;
  currency: string;
  status: string;
  created: number;
  items?: { description: string; amount: number }[]; // Added for V2
}

type PaymentData = PaymentDataV1 | PaymentDataV2;

interface PaymentResponse {
  success: boolean;
  message: string;
  data: PaymentData;
}

export default function PaymentSection() {
  const [driver] = useDriver();
  const driverId = driver?.id;

  const client_secret = useQuery<PaymentResponse>({
    queryKey: ["client_secret", driverId],
    queryFn: async () => {
      const response = await apiClient.post(
        "/service-quote/pay-selected-quote/" + driverId,
      );
      return response.data;
    },
    enabled: !!driverId,
  });

  if (!driverId) return null;
  if (client_secret.isLoading)
    return (
      <div className="flex items-center justify-center p-6 bg-white rounded-xl shadow-sm border border-gray-200">
        <svg
          className="animate-spin h-5 w-5 mr-3 text-blue-500"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Loading payment details...
      </div>
    );
  if (client_secret.isError)
    return (
      <div className="p-6 bg-white rounded-xl shadow-sm border border-red-300 text-red-700">
        <h2 className="text-xl font-semibold mb-2">Payment Error</h2>
        <p>There was an error loading the payment details. Please try again.</p>
      </div>
    );

  const data = client_secret.data?.data;
  if (!data)
    return (
      <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 text-gray-700">
        No payment data available.
      </div>
    );

  const getClientSecret = (data?: PaymentData): string => {
    // console.log(data);
    // if ("amount_breakdown" in data) {
    //   return data.client_secret;
    // }
    return data?.clientSecret || data?.client_secret;
  };

  const formatCurrency = (amount: number, currency: string = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  const currency = "amount_breakdown" in data ? data.currency : "USD";

  return (
    <div className="font-sans p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Confirm Your Payment
      </h2>

      <div className="mb-8 border-b border-gray-200 pb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Order Summary
        </h3>
        <div className="space-y-3 text-gray-700">
          {data.items && data.items.length > 0 && (
            <>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Items
              </h4>
              {data.items.map((item, index) => (
                <Row
                  key={index}
                  label={item.description}
                  value={formatCurrency(item.amount, currency)}
                />
              ))}
              <div className="border-t border-gray-200 my-3"></div>
            </>
          )}

          {"amount_breakdown" in data ? (
            <>
              <Row
                label="Amount"
                value={formatCurrency(data.amount_breakdown.subtotal)}
                isSubtotal
              />
              <Row
                label="Charge: Processing Fee"
                value={formatCurrency(data.amount_breakdown.service_amount)}
              />
              <Row
                label="Tax"
                value={formatCurrency(
                  data.amount_breakdown.tax_amount,
                  data.currency,
                )}
              />
              <div className="pt-4 border-t border-gray-300 mt-4">
                <Row
                  label="Total Amount"
                  value={formatCurrency(data.amount, data.currency)}
                  isTotal
                />
              </div>
            </>
          ) : (
            <>
              <Row
                label="Subtotal"
                value={formatCurrency(data.amount, currency)} // Assuming 'amount' is subtotal for V1 if no items
                isSubtotal
              />
              <Row
                label="Charge: Processing Fee"
                value={formatCurrency(data.charge)}
              />
              <Row label="Tax" value={formatCurrency(data.tax)} />
              <div className="pt-4 border-t border-gray-300 mt-4">
                <Row
                  label="Total Amount"
                  value={formatCurrency(data.amount + data.tax)} // Assuming total is amount + tax for V1
                  isTotal
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Stripe Checkout */}
      {client_secret.isFetching ? (
        <div className="flex items-center justify-center p-4 text-lg font-medium text-gray-600">
          <svg
            className="animate-spin h-5 w-5 mr-3 text-blue-500"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Preparing payment gateway...
        </div>
      ) : (
        !client_secret.isError && (
          <Checkout clientSecret={getClientSecret(data)} />
        )
      )}
    </div>
  );
}

function Row({
  label,
  value,
  isTotal = false,
  isSubtotal = false,
}: {
  label: string;
  value: string | number;
  isTotal?: boolean;
  isSubtotal?: boolean;
}) {
  const labelClasses = `font-medium ${isTotal ? "text-lg text-gray-900" : isSubtotal ? "text-base text-gray-800" : "text-gray-700"}`;
  const valueClasses = `font-semibold ${isTotal ? "text-lg text-gray-900" : isSubtotal ? "text-base text-gray-800" : "text-gray-700"}`;

  return (
    <div className="flex justify-between items-center py-1">
      <span className={labelClasses}>{label}</span>
      <span className={valueClasses}>{value}</span>
    </div>
  );
}

const Checkout = (props: { clientSecret: string }) => {
  const stripePromise = loadStripe(PAYMENT_KEY);
  const options = { clientSecret: props.clientSecret };

  return (
    <div className="mt-8 p-6 border border-gray-200 rounded-lg bg-gray-50">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Complete Your Payment
      </h3>
      {props.clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm prev={() => {}} secret_key={props.clientSecret} />
        </Elements>
      )}
      {!props.clientSecret && (
        <div className="text-red-500 text-sm">
          Payment gateway could not be initialized. Please try again.
        </div>
      )}
    </div>
  );
};
