import ApprovedRequests from "../../lib/components/provider/payout/approvedRequest";
import DisapprovedRequests from "../../lib/components/provider/payout/disapprovedRequest";
import StaffPayoutRequest from "../../lib/components/provider/payout/staffPayoutRequest";
import Tabs from "../../lib/components/ui/Tabs";

const StaffPayouts = () => {
  const payTabs = [
    {
      title: <p>Payout Requests</p>,
      content: <StaffPayoutRequest />,
    },
    {
      title: <p>Approved Payouts</p>,
      content: <ApprovedRequests />,
    },
    {
      title: <p>Disapproved Payouts</p>,
      content: <DisapprovedRequests />,
    },
  ];
  return (
    <div className="bg-white p-6 rounded-lg shadow min-h-[80vh]">
      <div>
        <p className="fw-600 text-lg lg:text-2xl">Staff Payouts</p>
      </div>
      <div className="mt-5">
        <Tabs tabs={payTabs} type="charts" />
      </div>
    </div>
  );
};

export default StaffPayouts;
