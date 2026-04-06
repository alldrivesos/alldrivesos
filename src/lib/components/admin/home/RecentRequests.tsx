import { FaRegUser } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { MdOutlineLocationOn } from "react-icons/md";
import { FC } from "react";
import { IoTimeOutline } from "react-icons/io5";
import dayjs from "dayjs";
import { Link, useNavigate } from "react-router-dom";
import { format_time } from "../../../../utils/utils";

interface Props {
  request: any[];
}
const RecentRequests: FC<Props> = ({ request }) => {
  const colors: string[] = [
    "border-purple-500",
    "border-blue-500",
    "border-yellow-500",
    "border-pink-500",
    "border-orange-500",
  ];
  const nav = useNavigate();

  return (
    <>
      <div className="w-full rounded-xl">
        <div className="bg-primary text-white rounded-t-xl px-4 py-4">
          <p className="text-lg fw-600">Pending Requests</p>
        </div>
        <div className="p-4 bg-white rounded-b-xl">
          {request.length &&
            request.map((item, index) => {
              const colorIndex = index % colors.length;
              const color = colors[colorIndex];
              return (
                <div
                  onClick={() => {
                    const to = "/admin/services/" + item.id;
                    console.log(item);
                    nav(to);
                  }}
                  className={`border-l-[5px] ${color} grid gap-1 cursor-pointer pl-2 py-2 mb-3 bg-gray-50 hover:scale-105 duration-100`}
                >
                  <div className="flex items-center gap-x-2">
                    <FaRegUser className="text-gray-500 shrink-0" />
                    <p className="fs-500">{item.user?.name}</p>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <GrTransaction className="text-gray-500 shrink-0" />
                    <p className="text-primary fw-600">{item?.service?.name}</p>
                  </div>
                  <div className="flex items-start gap-x-2">
                    <MdOutlineLocationOn className="text-gray-500 shrink-0 text-lg relative top-1" />
                    <p className="fw-500 fs-500">{item?.location}</p>
                  </div>
                  <div className="flex items-start gap-x-2">
                    <IoTimeOutline className="text-gray-500 shrink-0 text-lg relative top-[2px]" />
                    <p className="fw-500 fs-500">
                      {format_time(item?.createdAt)}
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

export default RecentRequests;
