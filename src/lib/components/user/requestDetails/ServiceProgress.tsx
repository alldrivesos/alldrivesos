import { FC, useEffect } from "react";
import useDialog from "../../../hooks/useDialog";
import { FormatStatus } from "../../../utils";
import { RiExchangeDollarLine, RiLightbulbFlashFill } from "react-icons/ri";
import { FaCarCrash } from "react-icons/fa";
import { GiAutoRepair } from "react-icons/gi";
import { FaCarOn } from "react-icons/fa6";
import ActionModal from "./ActionModal";

interface Props {
  id: string;
  status: string;
  query: string;
  refetch: () => void;
}
const ServiceProgress: FC<Props> = ({ id, status, query, refetch }) => {
  const { Dialog, setShowModal } = useDialog();
  const formatStatusWidth = {
    pending: "w-[35%]",
    ongoing: "w-[70%]",
    fulfilled: "w-[85%]",
    completed: "w-[100%]",
  };
  useEffect(() => {}, []);
  return (
    <div>
      <div className="bg-white shadow mt-6 rounded-lg p-4">
        <div>
          <div className="flex justify-between">
            <p className="fw-500 flex items-center gap-x-1 text-lg">
              <span className="block w-4 h-4 circle bg-primary"></span> Service
              Progress
            </p>
            {/*{JSON.stringify(status)}*/}
            {(status === "fulfilled" ||
              status === "ongoing" ||
              status === "pending") && (
              <p
                className="fw-600 underline cursor-pointer flex gap-x-2"
                onClick={() => setShowModal(true)}
              >
                <RiLightbulbFlashFill className="text-orange-500 text-2xl" />
                Actions
              </p>
            )}
          </div>
        </div>
        <div>
          <div className="flex mt-6 items-ceter gap-x-3">
            <p className="fw-600 opacity-90 lg:text-lg">Current Status:</p>
            {status === "pending"
              ? FormatStatus["approved"]
              : FormatStatus[status as keyof typeof FormatStatus]}
          </div>
        </div>
        <div className="relative my-7">
          <div className="flex relative z-10 justify-between">
            <div
              className={`w-12 h-12 lg:w-16 lg:h-16 circle bg-orange-500 place-center`}
            >
              <p className="fw-700 text-lg">
                <FaCarCrash className="text-lg lg:text-3xl" />
              </p>
            </div>
            <div
              className={`w-12 h-12 lg:w-16 lg:h-16 circle bg-orange-500 place-center`}
            >
              <p className="fw-700 text-lg">
                <RiExchangeDollarLine className="text-lg lg:text-3xl" />
              </p>
            </div>
            <div
              className={`w-12 h-12 lg:w-16 lg:h-16 circle place-center ${
                status === "ongoing" ||
                status === "completed" ||
                status === "fulfilled"
                  ? "bg-orange-500"
                  : "bg-gray-400"
              }`}
            >
              <p className="fw-700 text-lg">
                <GiAutoRepair className="text-lg lg:text-3xl" />
              </p>
            </div>
            <div
              className={`w-12 h-12 lg:w-16 lg:h-16 circle place-center ${
                status === "completed" ? "bg-orange-500" : "bg-gray-400"
              }`}
            >
              <p className="fw-700 text-lg">
                <FaCarOn className="text-lg lg:text-3xl" />
              </p>
            </div>
          </div>
          <div
            className={`absolute left-0 top-[19px] lg:top-[27px] h-2 w-[98%] bg-gray-800 rounded-full`}
          >
            <div
              className={`${
                formatStatusWidth[status as keyof typeof formatStatusWidth]
              } bg-orange-500 h-full`}
            ></div>
          </div>
        </div>
        <div className="">
          {query && (
            <div className="bg-red-100 p-4 rounded">
              <p className="fw-600 mb-1">Query:</p>
              <p className="fw-500">{query}</p>
            </div>
          )}
        </div>
      </div>
      <Dialog title="" size="xl">
        <ActionModal
          refetch={refetch}
          id={`${id}`}
          status={status}
          close={() => setShowModal(false)}
        />
      </Dialog>
    </div>
  );
};

export default ServiceProgress;
