import ApprovedRequests from "../../lib/components/admin/technician-payouts/approvedRequest";
// import DisapprovedRequests from "../../lib/components/admin/technician-payouts/disapprovedRequest";
import StaffPayoutRequest from "../../lib/components/admin/technician-payouts/staffPayoutRequest";
import Tabs from "../../lib/components/ui/Tabs";

export default function TechniciansPayout() {
  const payTabs = [
    {
      title: <p>Payout Requests</p>,
      content: <StaffPayoutRequest />,
    },
    {
      title: <p>Approved Payouts</p>,
      content: <ApprovedRequests />,
    },
    // {
    //   title: <p>Disapproved Payouts</p>,
    //   content: <DisapprovedRequests />,
    // },
  ];
  return (
    <div className="bg-white p-6 rounded-lg shadow min-h-[80vh]">
      <h2 className="py-2 text-xl font-bold">Technicians Payout</h2>
      <div className="mt-5">
        <Tabs tabs={payTabs} type="charts" />
      </div>
    </div>
  );
}
