import AdminServicePayment from "../../lib/components/admin/payments/servicePayment";
import AdminServicePayout from "../../lib/components/admin/payments/servicePayout";
import Tabs from "../../lib/components/ui/Tabs";

const AdminPayments = () => {
  const paymentTabs = [
    {
      title: <p>Service Payments</p>,
      content: <AdminServicePayment />,
    },
    {
      title: <p>Contractor Payout</p>,
      content: <AdminServicePayout />,
    },
  ];
  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow min-h-[80vh]">
        <Tabs tabs={paymentTabs} type="charts" />
      </div>
    </>
  );
};

export default AdminPayments;
