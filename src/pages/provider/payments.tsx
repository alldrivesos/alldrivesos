import PaymentList from "../../lib/components/provider/payments/paymentList";
import WithdrawalList from "../../lib/components/provider/payments/withdrawalList";
import Tabs from "../../lib/components/ui/Tabs";

const ProviderPayments = () => {
  const payTabs = [
    {
      title: <p>Service Payment</p>,
      content: <PaymentList />,
    },
    {
      title: <p>Withdrawal</p>,
      content: <WithdrawalList />,
    },
  ];
  return (
    <div className="bg-white p-6 rounded-lg shadow min-h-[80vh]">
      <div className="mt-5">
        <Tabs tabs={payTabs} type="charts" />
      </div>
    </div>
  );
};

export default ProviderPayments;
