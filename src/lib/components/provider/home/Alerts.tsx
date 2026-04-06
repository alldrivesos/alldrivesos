import { MdCrisisAlert } from "react-icons/md";
import { NotifyItem } from "../../../types/routine";
import { FC } from "react";
import dayjs from "dayjs";

interface Props {
  data: NotifyItem[];
}
const Alerts: FC<Props> = ({ data }) => {
  const colors: string[] = [
    "border-purple-500",
    "border-blue-500",
    "border-yellow-500",
    "border-pink-500",
    "border-orange-500",
  ];
  const getTitle = (msg: string) => {
    if (msg.includes("payout") || msg.includes("transferred")) {
      return "Payout Update";
    } else if (msg.includes("driver")) {
      return "Service Update";
    } else if (msg.includes("driver")) {
      return "KYC Update";
    } else if (msg.includes("joined")) {
      return "Staff Update";
    } else return "Service Alert";
  };
  return (
    <>
      <div className="bg-white rounded shadow p-5 mb-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-2">
            <MdCrisisAlert className="text-lg" />
            <p className="fs-700 fw-600">Alerts</p>
          </div>
          <div>
            {/* <IoExpand className="text-xl cursor-pointer hover:scale-110 duration-100"/> */}
          </div>
        </div>
        <div className="mt-6">
          {!!data?.length &&
            data.map((item, index) => {
              const colorIndex = index % colors.length;
              const color = colors[colorIndex];
              return (
                <div
                  className={`border-l-[5px] relative ${color} rounded-l-md p-3 mb-5`}
                >
                  <p className="fw-600 pt-5 lg:pt-0">
                    {getTitle(item.message)}
                  </p>
                  <p>{item.message}</p>
                  <p className="absolute fs-300 top-2 fw-600 text-gray-600 lg:text-primary right-2">
                    {dayjs(item.createdAt).format("hh:mm MMMM d, YYYY")}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Alerts;
