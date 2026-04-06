import { MdCrisisAlert } from "react-icons/md";
import { RxOpenInNewWindow } from "react-icons/rx";
import { NotifyItem } from "../../../types/routine";
import { FC } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useNavigate } from "react-router-dom";
dayjs.extend(relativeTime);

interface Props {
  recentNotify: NotifyItem[];
}
const Alerts: FC<Props> = ({ recentNotify }) => {
  const navigate = useNavigate();
  const colors: string[] = [
    "border-purple-500",
    "border-blue-500",
    "border-yellow-500",
    "border-pink-500",
    "border-orange-500",
  ];
  return (
    <>
      <div className="bg-white rounded shadow p-5 mb-6">
        <div className="flex items-center gap-x-2">
          <MdCrisisAlert className="text-lg" />
          <p className="fs-700 fw-600">Recent Requests</p>
        </div>
        <div className="mt-6">
          {!!recentNotify.length &&
            recentNotify.map((item, index) => {
              const colorIndex = index % colors.length;
              const color = colors[colorIndex];
              return (
                <div
                  className={`border-l-[5px] lg:flex justify-between relative ${color} rounded-l-md p-2 pb-2 lg:p-3 mb-5`}
                >
                  <div>
                    <div className="flex gap-x-2 items-center">
                      <p className="fw-600">Service Requests</p>
                      <RxOpenInNewWindow
                        className="cursor-pointer"
                        onClick={() => navigate("/user/requests")}
                      />
                    </div>
                    <p className="mt-1 lg:mt-0">{item.message}</p>
                  </div>
                  <div>
                    <p className="fs-300 fw-600 text-primary ">
                      {dayjs(item.createdAt).fromNow()}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Alerts;
