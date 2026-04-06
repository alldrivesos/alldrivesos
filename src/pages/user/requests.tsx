import { Button } from "@material-tailwind/react";
import Tabs from "../../lib/components/ui/Tabs";
import RequestList from "../../lib/components/user/requests/RequestList";
import { useNavigate } from "react-router-dom";
import RequestListWithout from "../../lib/components/user/requests/RequestWithout";

const UserRequests = () => {
  const nav = useNavigate();
  const tabs = [
    {
      title: <p>Pending</p>,
      content: (
        //@ts-ignore
        <RequestListWithout
          action={(item) => {
            return (
              <>
                {/*//@ts-ignore*/}
                <Button
                  onClick={() => {
                    nav(
                      `/user/new-request/complete/${item.serviceName}/quotes/${item.serviceRequestId}`,
                    );
                  }}
                >
                  Complete
                </Button>
              </>
            );
          }}
        />
      ),
    },
    ,
    {
      title: <p>Processing</p>,
      content: <RequestList status="Pending" paymentStatus="Paid" />,
    },
    {
      title: <p>Ongoing</p>,
      content: <RequestList status="Ongoing" paymentStatus="Paid" />,
    },
    {
      title: <p>UnPaid</p>,
      content: (
        <RequestList
          status="Pending"
          paymentStatus="Pending"
          action={(item) => {
            return (
              <Button
                onClick={() => {
                  nav(`/user/new-request/complete/${item}`);
                }}
              >
                Pay Now
              </Button>
            );
          }}
        />
      ),
    },
    {
      title: <p>Fulfilled</p>,
      content: <RequestList status="fulfilled" paymentStatus="Paid" />,
    },
    {
      title: <p>Completed</p>,
      content: <RequestList status="completed" paymentStatus="Paid" />,
    },
  ];
  return (
    <>
      <div className="bg-white p-2 lg:p-6 rounded-lg shadow min-h-[80vh]">
        <Tabs tabs={tabs} type="charts" />
      </div>
    </>
  );
};

export default UserRequests;
