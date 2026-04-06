import { createColumnHelper } from "@tanstack/react-table";
import dayjs from "dayjs";
import { FC } from "react";
import { PayoutItem } from "../../../../types/payment";
import { FormatStatus, formatAsNgnMoney } from "../../../../utils";
import { DynamicTable } from "../../../ui/DynamicTable";
import PayoutActions from "./payoutActions";

interface Props {
  isLoading: boolean;
  data: PaymentItem[];
  count: number;
  page: number;
  next: () => void;
  prev: () => void;
  refetch: () => void;
  status: string;
}
const PayoutTable: FC<Props> = ({
  data,
  count,
  page,
  next,
  prev,
  refetch,
  status,
}) => {
  // Table components
  const columnHelper = createColumnHelper<PayoutItem>();
  const columns = [
    columnHelper.accessor((row) => row.name, {
      id: "Provider Name",
      cell: (info) => <p className="fw-600">{info.getValue()}</p>,
    }),
    columnHelper.accessor((row) => row.amount, {
      id: "Requested Amount",
      cell: (info) => (
        <p className="fw-600">{formatAsNgnMoney(info.getValue())}</p>
      ),
    }),
    columnHelper.accessor((row) => row.walletBal, {
      id: "Wallet Balance",
      cell: (info) => <p className="fw-500">{formatAsNgnMoney(info.getValue())}</p>,
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.payoutCreatedAt, {
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
        <>{FormatStatus[info.getValue() as keyof typeof FormatStatus]}</>
      ),
    }),
    columnHelper.accessor((row) => row.PayoutRequestId, {
      id: "Action",
      header: (info) => info.column.id,
      cell: (info) => (
        <>
          {status === "pending" || status === "approved" ? (
            <PayoutActions
              id={info.getValue()}
              status={info.row.original.status} 
              refetch={refetch}
            />
          ) : null}
        </>
      ),
    }),
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

export default PayoutTable;
