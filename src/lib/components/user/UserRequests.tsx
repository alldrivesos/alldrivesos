import { BiBell } from "react-icons/bi";
import RecentRequests from "./requests/RecentRequests";

const UserRequests = () => {
  return (
    <>
      <div className="p-6 text-black">
        <div className="flex justify-between items-center">
          <div>
            <p className="fs-700 fw-600">Recent Requests</p>
          </div>
          <div className="relative cursor-pointer">
            <p className="w-4 h-4 circle bg-[#B3561B] absolute -top-1 right-0"></p>
            <BiBell className="text-3xl" />
          </div>
        </div>
        <div className="h-[calc(100vh_-_80px)] overflow-y-auto scroll-pro">
            <RecentRequests/>
        </div>
      </div>
    </>
  );
};

export default UserRequests;
