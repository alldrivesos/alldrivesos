import AdminPendingService from "../../lib/components/admin/services/RequestList";
import AdminOngoingService from "../../lib/components/admin/services/OngoingList";
import Tabs from "../../lib/components/ui/Tabs";
import AdminProcessingService from "../../lib/components/admin/services/ProcessingList";
import { Tooltip } from "@material-tailwind/react";
import { FaCircleInfo } from "react-icons/fa6";

const AdminRequests = () => {
  const tab = [
    {
      title: (
        <div className="relative w-full">
          Pending
          <Tooltip
            className="bg-[#E5944C]"
            content={
              <div className="my-2">
                User just made a service request but has not made payment
              </div>
            }
            placement="bottom"
          >
            <div className="absolute top-1 left-[260px]">
              <FaCircleInfo className="cursor-pointer" />
            </div>
          </Tooltip>
        </div>
      ),
      content: <AdminPendingService />,
    },
    {
      title: (
        <div className="relative w-full">
          Processing Requests
          <Tooltip
            className="bg-[#E5944C]"
            content={
              <div className="my-2">
                User has made payment and is waiting for service personnel to
                accept
              </div>
            }
            placement="bottom"
          >
            <div className="absolute top-1 left-[260px]">
              <FaCircleInfo className="cursor-pointer" />
            </div>
          </Tooltip>
        </div>
      ),
      content: <AdminProcessingService />,
    },
    {
      title: (
        <div className="relative w-full">
          Ongoing Request
          <Tooltip
            className="bg-[#E5944C]"
            content={
              <div className="my-2">
                The service personnel have accepted the request and the service
                is ongoing.
              </div>
            }
            placement="bottom"
          >
            <div className="absolute top-1 left-[260px]">
              <FaCircleInfo className="cursor-pointer" />
            </div>
          </Tooltip>
        </div>
      ),
      content: <AdminOngoingService />,
    },
  ];
  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow min-h-[80vh]">
        <p className="fw-600 text-xl">Service Requests</p>
        <div className="mt-5 lg:mt-10">
          <Tabs tabs={tab} type="charts" />
        </div>
      </div>
    </>
  );
};

export default AdminRequests;
