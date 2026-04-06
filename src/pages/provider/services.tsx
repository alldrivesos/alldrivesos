import Tabs from "../../lib/components/ui/Tabs";
import RenderedServices from "../../lib/components/provider/requests/RenderedList";
import { FaCircleInfo } from "react-icons/fa6";
import { Tooltip } from "@material-tailwind/react";

const ProviderServices = () => {
  const tabs = [
    {
      title: (
        <div className="relative w-full">
          <p>Processing Service</p>
          <Tooltip
            className="bg-[#E5944C]"
            content={
              <div className="my-2">
                User(s) have completed payment and are waiting for service
                personnel to accept.
              </div>
            }
            placement="bottom"
          >
            <div className="absolute top-1 left-[300px]">
              <FaCircleInfo className="cursor-pointer" />
            </div>
          </Tooltip>
        </div>
      ),
      content: <RenderedServices status={"pending"} />,
    },
    {
      title: (
        <div className="relative w-full">
          <p>Ongoing Service</p>
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
      content: <RenderedServices status="ongoing" />,
    },
    {
      title: (
        <div className="relative w-full">
          <p>Fulfilled Service</p>
          <Tooltip
            className="bg-[#E5944C]"
            content={
              <div className="my-2">
                Service personnel have marked service as completed but the user
                has not
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
      content: <RenderedServices status="fulfilled" />,
    },
  ];
  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow min-h-[80vh]">
        <div className="mt-5">
          <Tabs tabs={tabs} type="charts" />
        </div>
      </div>
    </>
  );
};

export default ProviderServices;
