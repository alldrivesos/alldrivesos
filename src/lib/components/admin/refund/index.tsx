import Tabs from "../../ui/Tabs";
import RefundApprovedRequest from "./approvedRequest";
import RefundDisapprovedRequest from "./disapprovedRequest";
import RefundPendingRequest from "./pendingRequest";

const RefundIndex = () => {
  const refundTabs = [
    {
      title: <>Pending</>,
      content: <RefundPendingRequest/>,
    },
    {
      title: <>Approved</>,
      content: <RefundApprovedRequest/>,
    },
    {
      title: <>Declined</>,
      content: <RefundDisapprovedRequest/>,
    },
  ];
  return (
    <div>
      <Tabs tabs={refundTabs} type="charts" />
    </div>
  );
};

export default RefundIndex;
