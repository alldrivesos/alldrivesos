import RefundIndex from "../../lib/components/provider/refund";

const RefundRequests = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow min-h-[80vh]">
      <p className="fw-600 text-xl">User Refunds</p>
      <div className="mt-5 lg:mt-10">
        <RefundIndex />
      </div>
    </div>
  );
};

export default RefundRequests;
