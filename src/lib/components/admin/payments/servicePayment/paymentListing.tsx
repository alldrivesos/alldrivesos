import { createColumnHelper } from "@tanstack/react-table";
import { FormatStatus, formatAsNgnMoney } from "../../../../utils";
import dayjs from "dayjs";
import { FC } from "react";
import { DynamicTable } from "../../../ui/DynamicTable";

interface Props {
  isLoading: boolean;
  data: any[];
  count: number;
  page: number;
  next: () => void;
  prev: () => void;
}
const PaymentListing: FC<Props> = ({ data, count, page, prev, next }) => {
  // Table components
  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor((row) => row.paymentRef, {
      id: "Payment Reference",
      cell: (info) => <p className="fw-600">{info.getValue()}</p>,
    }),
    columnHelper.accessor((row) => row.paymentTotal, {
      id: "Amount",
      cell: (info) => <p className="">{formatAsNgnMoney(info.getValue())}</p>,
    }),
    columnHelper.accessor((row) => row.name, {
      id: "Customer",
      cell: (info) => <p className="">{info.row.original.name}</p>,
    }),
    columnHelper.accessor((row) => row.serviceName, {
      id: "Service Category",
      cell: (info) => <p className="">{info.getValue()}</p>,
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.location, {
      id: "Service Location",
      cell: (info) => <p className="capitalize">{info.getValue()}</p>,
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.paymentCreatedAt, {
      id: "Date Requested",
      header: (info) => info.column.id,
      cell: (info) => (
        <p className="">{dayjs(info.getValue()).format("ddd DD, MMM YYYY")}</p>
      ),
    }),
    columnHelper.accessor((row) => row.paymentStatus, {
      id: "Status",
      header: (info) => info.column.id,
      cell: (info) => (
        <div className="fw-600">
          {
            FormatStatus[
              info.getValue().toLowerCase() as keyof typeof FormatStatus
            ]
          }
        </div>
      ),
    }),
  ];
  return (
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
  );
};

export default PaymentListing;
