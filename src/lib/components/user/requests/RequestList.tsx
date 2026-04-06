import { FC, useEffect, useState } from "react";
import { DataTable } from "../../ui/DataTable";
import { createColumnHelper } from "@tanstack/react-table";
import { formatAsNgnMoney, FormatStatus } from "../../../utils";
import { ServiceRequestItem2 } from "../../../types/service";
import CurveLoader from "../../ui/loader/curveLoader/CurveLoader";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMyServices } from "../../../services/api/serviceApi";

interface Props {
  status: string;
  paymentStatus: string;
  action?: (item: any) => any;
}
const RequestList: FC<Props> = ({ status, paymentStatus, action }) => {
  const [params, setParams] = useState({
    page: 1,
    status: status,
    paymentStatus: paymentStatus,
  });

  useEffect(() => {
    setParams({
      ...params,
      status: status,
      paymentStatus: paymentStatus,
    });
  }, [status, paymentStatus]);

  const { data, isLoading } = useQuery({
    queryKey: ["getMyService", params],
    queryFn: () => getMyServices(params),
  });

  const navigate = useNavigate();
  // Table components
  const columnHelper = createColumnHelper<ServiceRequestItem2>();
  const columns = [
    columnHelper.accessor((row) => row.name, {
      id: "Service Category",
      cell: (info) => <p className="fw-600">{info.getValue()}</p>,
      header: (info) => info.column.id,
    }),
    //@ts-ignore
    columnHelper.accessor((row) => row?.amount, {
      id: "Service Amount",
      cell: (info) => (
        <p className="font-bold">{formatAsNgnMoney(info.getValue())}</p>
      ),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.location, {
      id: "Service Location",
      cell: (info) => <p className="fw-500">{info.getValue()}</p>,
    }),
    columnHelper.accessor((row) => row.serviceRequestCreatedAt, {
      id: "Date Requested",
      header: (info) => info.column.id,
      cell: (info) => (
        <p className="fw-600">
          {dayjs(info.getValue()).format("ddd DD, MMM YYYY")}
        </p>
      ),
    }),
    columnHelper.accessor((row) => row.status, {
      id: "Payment Status",
      header: (info) => info.column.id,
      cell: (info) => {
        return (
          <>
            {" "}
            <div className="fw-600">
              {
                FormatStatus[
                  info.getValue()?.toLowerCase() as keyof typeof FormatStatus
                ]
              }
            </div>
          </>
        );
      },
    }),
    columnHelper.accessor((row) => row.serviceRequestStatus, {
      id: "Status",
      header: (info) => info.column.id,
      cell: (info) => {
        return (
          <>
            <span className="fw-600">
              {FormatStatus[info.getValue() as keyof typeof FormatStatus]}
            </span>
          </>
        );
      },
    }),
    columnHelper.accessor((row) => row.serviceRequestId, {
      id: "Action",
      cell: (info) => {
        if (action) return action(info.getValue());

        return (
          <>
            <p
              className="fw-600 cursor-pointer underline text-primary"
              onClick={() => navigate(`/user/requests/${info.getValue()}`)}
            >
              View Details
            </p>
          </>
        );
      },
    }),
  ];

  // return <></>;
  return (
    <div className="lg:p-4 w-full">
      {isLoading && (
        <div className="py-12 flex justify-center items-center text-black">
          <div>
            <div className="place-center">
              <CurveLoader />
            </div>
            <p className="text-center mt-5 fw-500">
              Fetching {status} requests...
            </p>
          </div>
        </div>
      )}
      {!isLoading && data && (
        <DataTable columns={columns} data={data?.data?.serviceRequests} />
      )}
    </div>
  );
};

export default RequestList;
