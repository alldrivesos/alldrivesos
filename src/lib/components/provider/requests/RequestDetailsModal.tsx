import { FC } from "react";
import { ServiceRequestItem2 } from "../../../types/service";
import dayjs from "dayjs";
import { MdLocationPin, MdOutlineStickyNote2 } from "react-icons/md";
import { FaCar } from "react-icons/fa6";
import { est_day } from "../../admin/services/RequestList";

interface Props {
  item: ServiceRequestItem2 | undefined;
}
const RequestDetailsModal: FC<Props> = ({ item }) => {
  return (
    <div className="text-black">
      <div>
        <p className="fw-600 lg:text-lg">{item?.name}</p>
        <p>
          Requested at{" "}
          {est_day(item.createdAt)
            .tz("America/New_York")
            .format("hh:mma dddd DD, MMMM YYYY")}
        </p>
      </div>
      <div>
        <p className="my-1 fs-500 flex gap-x-2 items-center">
          <MdLocationPin className="text-lg text-gray-500" />
          {item?.location}
        </p>
        <p className="my-1 fs-500 flex gap-x-2 items-center">
          <MdOutlineStickyNote2 className="text-lg text-gray-500" />
          {item?.requestNote}
        </p>
        <div className="bg-light p-2 rounded mt-2">
          <p className="my-1 fs-500 flex gap-x-2 items-center fw-600 text-gray-600">
            <FaCar className="text-lg text-gray-500" />
            Car Details
          </p>
          <div className="grid gap-3 lg:grid-cols-2 mt-2">
            <p>
              Make:{" "}
              <span className="fw-500 text-gray-700">{item?.vehicleMake}</span>
            </p>
            <p>
              Model: <span className="fw-500 text-gray-700">{item?.model}</span>
            </p>
            <p>
              Year:{" "}
              <span className="fw-500 text-gray-700">{item?.vehicleYear}</span>
            </p>
            <p>
              Color: <span className="fw-500 text-gray-700">{item?.color}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetailsModal;
