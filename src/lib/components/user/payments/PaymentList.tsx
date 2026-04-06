import { createColumnHelper } from "@tanstack/react-table";
import { FormatStatus, formatAsNgnMoney } from "../../../utils";
import CurveLoader from "../../ui/loader/curveLoader/CurveLoader";
import dayjs from "dayjs";
import { FC } from "react";
import { PaymentItem } from "../../../types/routine";
import { DynamicTable } from "../../ui/DynamicTable";

interface Props {
  isLoading: boolean;
  data: PaymentItem[];
  count: number;
  page: number;
  next: () => void;
  prev: () => void;
}
const PaymentList: FC<Props> = ({
  isLoading,
  data,
  count,
  page,
  next,
  prev,
}) => {
  // Table components
  const columnHelper = createColumnHelper<PaymentItem>();
  const columns = [
    columnHelper.accessor((row) => row.paymentRef, {
      id: "Payment Reference",
      cell: (info) => <p className="fw-600">{info.getValue()}</p>,
    }),
    columnHelper.accessor((row) => row.paymentTotal, {
      id: "Payment Amount",
      cell: (info) => (
        <p className="fw-600">{formatAsNgnMoney(info.getValue())}</p>
      ),
    }),
    //@ts-ignore
    // columnHelper.accessor((row) => row?.tax_breakdown[0].amount, {
    //   id: "Service Amount",
    //   cell: (info) => <p className="">{JSON.stringify(info.getValue())}</p>,
    //   header: (info) => info.column.id,
    // }),
    columnHelper.accessor((row) => row.city, {
      id: "Service Location",
      cell: (info) => <p className="">{info.getValue()}</p>,
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.createdAt, {
      id: "Date Requested",
      header: (info) => info.column.id,
      cell: (info) => (
        <p className="fw-600">
          {dayjs(info.getValue()).format("ddd DD, MMM YYYY")}
        </p>
      ),
    }),
    columnHelper.accessor((row) => row.paymentStatus, {
      id: "Status",
      header: (info) => info.column.id,
      cell: (info) => (
        <div className="fw-600">
          {
            FormatStatus[
              info.getValue()?.toLowerCase() as keyof typeof FormatStatus
            ]
          }
        </div>
      ),
    }),
  ];
  return (
    <div className="lg:p-4 w-full">
      {isLoading && (
        <div className="py-12 flex justify-center items-center text-black">
          <div>
            <div className="place-center">
              <CurveLoader />
            </div>
            <p className="text-center mt-5 fw-500">Fetching payments...</p>
          </div>
        </div>
      )}
      {!isLoading && data && (
        <DynamicTable
          columns={columns}
          data={data}
          count={count}
          prev={prev}
          next={next}
          page={page}
        />
      )}
    </div>
  );
};

export default PaymentList;
