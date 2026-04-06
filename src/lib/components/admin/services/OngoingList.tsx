import { Button, Tooltip } from "@material-tailwind/react";
import { TbListDetails } from "react-icons/tb";
import { ServiceRequestItem2 } from "../../../types/service";
import dayjs from "dayjs";
import { MdLocationPin } from "react-icons/md";
import { useState } from "react";
import { toast } from "react-toastify";
import { fetchAdminRequests } from "../../../services/api/serviceApi";
import { useQuery } from "@tanstack/react-query";
import EmptyState from "../../ui/EmptyState";
import CurveLoader from "../../ui/loader/curveLoader/CurveLoader";
import { useNavigate } from "react-router-dom";
import { format_time } from "../../../../utils/utils";

const AdminOngoingService = () => {
  const navigate = useNavigate();
  const [params, setParams] = useState({
    status: "Ongoing",
    page: 1,
    payment: "Paid",
  });

  const { data, isLoading } = useQuery({
    queryKey: ["getServices", params],
    queryFn: () => fetchAdminRequests(params),
  });

  const colors: string[] = [
    "border-purple-500",
    "border-blue-500",
    "border-yellow-500",
    "border-pink-500",
    "border-orange-500",
  ];

  const count = data?.data?.total || 0;

  const handleNext = () => {
    if (params.page * 10 > count) {
      toast.info("This is the last page");
    } else {
      setParams({
        ...params,
        page: params.page + 1,
      });
    }
  };
  const handlePrev = () => {
    if (params.page === 1) {
      toast.info("This is the first page");
    } else {
      setParams({
        ...params,
        page: params.page - 1,
      });
    }
  };
  return (
    <>
      <div>
        {data && !data?.data?.serviceRequests?.length && (
          <div>
            <EmptyState msg="There's no ongoing request currently on the system." />
          </div>
        )}
        {isLoading && (
          <div className="py-12 flex justify-center items-center text-black">
            <div>
              <div className="place-center">
                <CurveLoader />
              </div>
              <p className="text-center mt-5 fw-500">
                Fetching Ongoing Service Requests...
              </p>
            </div>
          </div>
        )}
        {data &&
          !!data?.data.serviceRequests.length &&
          data?.data?.serviceRequests.map(
            (item: ServiceRequestItem2, index: number) => {
              const colorIndex = index % colors.length;
              const color = colors[colorIndex];
              return (
                <div
                  key={index}
                  className={`border-l-[8px] relative flex items-center justify-between ${color}  p-3 mb-5`}
                >
                  <div>
                    <p className="fw-600">{item.name}</p>
                    <p>{item.requestNote}</p>
                    <p className="my-1 fs-500 flex gap-x-2 items-center">
                      <MdLocationPin className="text-sm text-gray-500" />
                      {item.location}
                    </p>
                    <p className=" fs-300 fw-600 text-primary">
                      {format_time(item.serviceRequestCreatedAt)}

                      {/*{dayjs(item.createdAt).format(
                        "hh:mma dddd DD, MMMM YYYY"
                      )}*/}
                    </p>
                  </div>
                  <div className="flex gap-x-3 ">
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
                </div>
              );
            },
          )}
        <div className="mt-6 flex justify-end">
          <div className="flex gap-x-4 items-center">
            <p className="fw-600">Page {params.page}</p>
            <div className="flex gap-x-2 items-center">
              <div
                onClick={handlePrev}
                className={`px-2 py-1 rounded ${
                  params.page === 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-primary text-white cursor-pointer"
                }`}
              >
                Prev
              </div>
              <div
                onClick={handleNext}
                className={`px-2 py-1 rounded ${
                  params.page * 10 >= count
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

export default AdminOngoingService;
