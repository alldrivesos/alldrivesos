import { FC, useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  Menu,
  Button,
  MenuItem,
  MenuList,
  MenuHandler,
} from "@material-tailwind/react";
import { NotifyItem } from "../../../types/routine";
import { toast } from "react-toastify";
import { markAsRead } from "../../../services/api/notifyApi";
import { useMutation } from "@tanstack/react-query";
import CurveLoader from "../../ui/loader/curveLoader/CurveLoader";
import EmptyState from "../../ui/EmptyState";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link, useNavigate } from "react-router-dom";
dayjs.extend(relativeTime);
interface Notify extends NotifyItem {
  notificationType: "SERVICE_REQUEST" | string;
  notificationId: string;
}
interface Props {
  status: string;
  data: Notify[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}
const NotifyList: FC<Props> = ({ status, data, isLoading, refetch }) => {
  const [notify, setNotify] = useState<NotifyItem[]>([]);
  const nav = useNavigate();
  useEffect(() => {
    if (status === "unread") {
      const filtered = data?.filter((where) => !where.isRead);
      setNotify(filtered);
    } else setNotify(data);
  }, [status, data]);

  const markRead = useMutation({
    mutationFn: markAsRead,
    mutationKey: ["markRead"],
  });
  const MarkNotify = async (item: string) => {
    markRead.mutateAsync(item, {
      onSuccess: (data) => {
        toast.success(data.message);
        refetch();
      },
      onError: () => {
        toast.error("Something went wrong");
      },
    });
  };
  return (
    <>
      <div>
        {isLoading && (
          <div className="py-12 flex justify-center items-center text-black">
            <div>
              <div className="flex place-center">
                <CurveLoader />
              </div>
              <p className="text-center mt-5 fw-500">
                Fetching Notifications...
              </p>
            </div>
          </div>
        )}
        {notify && !notify.length && (
          <div>
            <EmptyState msg="You have not received any notification." />
          </div>
        )}
        <div className="grid gap-4">
          {notify &&
            !!notify.length &&
            notify.map((item: Notify, i: number) => (
              <div
                onClick={() => {
                  if (item.notificationType == "SERVICE_REQUEST") {
                    if (window.location.pathname.includes("/user/notify")) {
                      return nav("/user/requests/" + item.notificationId);
                    }
                    return nav("/provider/services/" + item.notificationId);
                  }
                }}
                key={i}
                className={`bg-primary p-3 rounded-[15px] text-white flex items-center justify-between hover:scale-105 duration-100 ${
                  !item.isRead && `border-[3px] border-blue-400`
                }`}
              >
                <div className="flex items-center gap-x-2">
                  {item.message.includes("signed") ? (
                    <img
                      src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1705678152/rsh/gnup_eusaot.jpg"
                      alt="alt"
                      className="w-12 h-12 circle"
                    />
                  ) : (
                    <img
                      src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1705678152/rsh/gnup_eusaot.jpg"
                      alt="alt"
                      className="w-12 h-12 circle"
                    />
                  )}
                  <div>
                    <p className="">{item.message}</p>
                    <p className="text-[14px] text-[#808080]">
                      {dayjs(item.createdAt).fromNow()}
                    </p>
                  </div>
                </div>
                <div>
                  <Menu placement="bottom-end">
                    <MenuHandler>
                      <Button className="bg-transparent px-0 mx-0 hover:shadow-none text-md flex items-center font-normal shadow-none text-white capitalize">
                        <BsThreeDotsVertical className="text-xl" />
                      </Button>
                    </MenuHandler>
                    <MenuList className="bg-[#0D0D0D]">
                      <MenuItem
                        className="my-1 fw-500 text-white bg-primary pt-1"
                        onClick={() => MarkNotify(item.id)}
                      >
                        Mark as read
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default NotifyList;
