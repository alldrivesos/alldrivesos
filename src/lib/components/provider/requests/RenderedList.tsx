import { Button, Tooltip } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { TbListDetails } from "react-icons/tb";
import { getPendingServices } from "../../../services/api/serviceApi";
import EmptyState from "../../ui/EmptyState";
import CurveLoader from "../../ui/loader/curveLoader/CurveLoader";
import { ServiceRequestItem2 } from "../../../types/service";
import { MdLocationPin } from "react-icons/md";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { est_day } from "../../admin/services/RequestList";
import { format_time } from "../../../../utils/utils";

interface Props {
  status: string;
}
const RenderedServices: FC<Props> = ({ status }) => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { isLoading, data } = useQuery({
    queryKey: ["getServices", status],
    queryFn: () => getPendingServices({ status: status, page: page }),
  });
  const colors: string[] = [
    "border-purple-500",
    "border-blue-500",
    "border-yellow-500",
    "border-pink-500",
    "border-orange-500",
  ];
  const count = data?.data?.total;
  const service = data?.data?.serviceRequests;

  const handleNext = () => {
    if (count > page * 10) {
      setPage(page + 1);
    } else {
      toast.info("This is the last page");
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    } else {
      toast.info("This is the first page");
    }
  };
  return (
    <>
      <div>
        {data && !service.length && (
          <div>
            <EmptyState msg="There's no completed service request" />
          </div>
        )}
        {isLoading && (
          <div className="py-12 flex justify-center items-center text-black">
            <div>
              <div className="place-center">
                <CurveLoader />
              </div>
              <p className="text-center mt-5 fw-500">
                Fetching Rendered Service...
              </p>
            </div>
          </div>
        )}
        {!isLoading &&
          !!service.length &&
          service.map((item: ServiceRequestItem2, index: number) => {
            const colorIndex = index % colors.length;
            const color = colors[colorIndex];
            return (
              <div
                key={index}
                className={`border-l-[8px] relative flex items-center justify-between ${color}  p-3 mb-5`}
              >
                <div>
                  <p className="fw-600">{item?.name}</p>
                  <p>{item.requestNote}</p>
                  <p className="my-1 fs-500 flex gap-x-2 items-center">
                    <MdLocationPin className="text-sm text-gray-500" />
                    {item.location}
                  </p>
                  <p className=" fs-300 fw-600 text-primary">
                    {format_time(item.serviceRequestCreatedAt)}
                    {/*{est_day(item.createdAt)
                      .tz("America/New_York")
                      .format("hh:mma dddd DD, MMMM YYYY")}*/}
                  </p>
                </div>
                <div className="flex gap-x-3 ">
                  <Tooltip content="View Service Details">
                    <Button
                      className="m-0 p-0 shadow-none hover:shadow-none bg-transparent text-black"
                      onClick={() =>
                        navigate(`/provider/services/${item.serviceRequestId}`)
                      }
                    >
                      <TbListDetails className="text-3xl" />
                    </Button>
                  </Tooltip>
                </div>
              </div>
            );
          })}
        <div className="mt-6 flex justify-end">
          <div className="flex gap-x-4 items-center">
            <p className="fw-600">Page {page}</p>
            <div className="flex gap-x-2 items-center">
              <div
                onClick={handlePrev}
                className={`px-2 py-1 rounded ${
                  page === 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-primary text-white cursor-pointer"
                }`}
              >
                Prev
              </div>
              <div
                onClick={handleNext}
                className={`px-2 py-1 rounded ${
                  page * 10 >= count
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-primary text-white cursor-pointer"
                }`}
              >
                Next
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RenderedServices;
