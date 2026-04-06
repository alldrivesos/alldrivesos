import { createColumnHelper } from "@tanstack/react-table";
import dayjs from "dayjs";
import { FC } from "react";
import { FormatStatus } from "../../../../utils";
import { DynamicTable } from "../../../ui/DynamicTable";
import PayoutActions from "./refundActions";
import { Link } from "react-router-dom";
import { RefundRequest } from "../approvedRequest";

interface RefundItem {
  createdAt: string;
  disapprovalReason: null;
  id: string;
  serviceRequestId: string;
  status: string;
  updatedAt: string;
  userId: string;
}
interface Props {
  isLoading: boolean;
  data: PaymentItem[];
  count: number;
  page: number;
  next: () => void;
  prev: () => void;
  refetch: () => void;
  status: string;
  action?: boolean;
}
const RefundTable: FC<Props> = ({
  data,
  count,
  page,
  next,
  prev,
  refetch,
  status,
  action = false,
}) => {
  // Table components
  const columnHelper = createColumnHelper<RefundRequest>();
  const columns = [
    columnHelper.accessor((row) => row.refId, {
      id: "Refund Id",
      cell: (info) =>
        // <Link to={`/admin/users/${info.getValue()}`} className="fw-600">
        info.getValue(),
        // </Link>
    }),
    // columnHelper.accessor((row) => row.isActive, {
    //   id: "Service Id",
    //   cell: (info) => (
    //     <Link to={`/admin/services/${info.getValue()}`} className="fw-600">
    //       {info.getValue()}
    //     </Link>
    //   ),
    // }),
    columnHelper.accessor((row) => row.createdAt, {
      id: "Date Requested",
      header: (info) => info.column.id,
      cell: (info) => (
        <p className="fw-600">
          {dayjs(info.getValue()).format("ddd DD, MMM YYYY")}
        </p>
      ),
    }),
    columnHelper.accessor((row) => row.status, {
      id: "Status",
      header: (info) => info.column.id,
      cell: (info) => (
        <span className="fw-600">
          {info.getValue()}
          {/*{FormatStatus[info.getValue() as keyof typeof FormatStatus]}*/}
        </span>
      ),
    }),
    columnHelper.accessor((row) => row.amount || "N/A", {
      id: "Amount",
      header: (info) => info.column.id,
      cell: (info) => (
        <span className="fw-600">
          {info.getValue()}
          {/*{FormatStatus[info.getValue() as keyof typeof FormatStatus]}*/}
        </span>
      ),
    }),
    ...(action
      ? [
          columnHelper.accessor((row) => row.id, {
            id: "Action",
            header: (info) => info.column.id,
            cell: (info) => (
              <>
                {(status === "pending" || status === "approved") && (
                  <PayoutActions
                    id={info.getValue()}
                    status={info.row.original.status}
                    refetch={refetch}
                    item={info.row.original}
                  />
                )}
              </>
            ),
            //   cell: (info) => (
            //     <button
            //       onClick={(e) => console.log(info.row.original)}
            //       className="btn btn-primary"
            //     >
            //       Action
            //     </button>
            //   ),
          }),
        ]
      : []),
  ];
  return (
    <>
      <div className="lg:p-4 w-full">
        <DynamicTable
          columns={columns}
          data={data}
          count={count}
          prev={prev}
          next={next}
          page={page}
        />
      </div>
    </>
  );
};

export default RefundTable;
