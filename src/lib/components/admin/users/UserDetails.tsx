import { FC } from "react";
import ProfileAvatar from "../../ui/ProfileAvatar";
import { UserItemType } from "../../../types/auth";
import { FormatStatus, formatPhoneNumber } from "../../../utils";
import dayjs from "dayjs";
import { MdLocationPin } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { Button, Tooltip } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { format_time } from "../../../../utils/utils";

interface Props {
  data: UserItemType;
}
const UserDetailsIndex: FC<Props> = ({ data }) => {
  const navigate = useNavigate();
  const { lname, fname, email, createdAt, phone, isSuspended } = data;
  const requests = data?.serviceRequests;

  const colors: string[] = [
    "border-purple-500",
    "border-blue-500",
    "border-yellow-500",
    "border-pink-500",
    "border-orange-500",
  ];
  const active = data.isActive;

  const userStatus = () => {
    if (isSuspended) {
      return FormatStatus["Inactive"];
    }
    if (active) {
      return FormatStatus["active"];
    }
    return FormatStatus["Inactive"];
  };

  return (
    <div>
      <div className="bg-primary text-white p-4 rounded-lg">
        <div className="lg:flex items-center justify-between">
          <div className="lg:flex items-center gap-x-4">
            <ProfileAvatar
              url={""}
              name={`${fname} ${lname}`}
              size={90}
              font={25}
            />
            <div>
              <p className="fw-600">{`${fname} ${lname}`}</p>
              <p className="fw-500">{formatPhoneNumber(phone)}</p>
              <p>{email}</p>
            </div>
          </div>
          <div>
            <p className="mb-2 ">{format_time(createdAt)}</p>
            {userStatus()}
          </div>
        </div>
      </div>
      <div className="border border-gray-400 rounded-lg mt-6 p-4">
        <p className="fw-600">Service Requests</p>
        <div className="mt-6">
          {!!requests?.length &&
            requests.map((item: any, index: number) => {
              const colorIndex = index % colors.length;
              const color = colors[colorIndex];
              return (
                <div
                  key={index}
                  className={`border-l-[8px] relative flex items-center justify-between ${color}  p-3 mb-5`}
                >
                  <div>
                    <p className="fw-600">{item.serviceName}</p>
                    <p>{item.requestNote}</p>
                    <p className="my-1 fs-500 flex gap-x-2 items-center">
                      <MdLocationPin className="text-sm text-gray-500" />
                      {item.location}
                    </p>
                    <p className=" fs-300 fw-600 text-primary">
                      {dayjs(item.createdAt).format(
                        "hh:mma dddd DD, MMMM YYYY",
                      )}
                    </p>
                  </div>
                  <div className="">
                    <div className="flex justify-end gap-x-3 ">
                      <Tooltip content="View Service Details">
                        <Button
                          className="m-0 p-0 shadow-none hover:shadow-none bg-transparent text-black"
                          onClick={() =>
                            navigate(`/admin/services/${item.serviceRequestId}`)
                          }
                        >
                          <TbListDetails className="text-3xl" />
                        </Button>
                      </Tooltip>
                    </div>
                    <div className="">
                      {
                        FormatStatus[
                          item.serviceRequestStatus as keyof typeof FormatStatus
                        ]
                      }
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default UserDetailsIndex;
