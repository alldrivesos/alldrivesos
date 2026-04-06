import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "../../ui/DataTable";
import ProfileAvatar from "../../ui/ProfileAvatar";
import dayjs from "dayjs";
import { FormatStatus } from "../../../utils";
import { GetInvitedItem, SendInviteInput } from "../../../types/company";
import { FC } from "react";
import Button from "../../ui/Button";
import { toast } from "react-toastify";
import { sendInvite } from "../../../services/api/companyApi";

interface Props {
  data: GetInvitedItem[];
}
const InviteList: FC<Props> = (data) => {
  // Table components
  const columnHelper = createColumnHelper<GetInvitedItem>();
  const columns = [
    columnHelper.accessor((row) => row.first_name, {
      id: "Name",
      cell: (info) => (
        <div className="flex gap-x-2 items-center">
          <ProfileAvatar
            name={`${info.getValue()} ${info.row.original.last_name}`}
            size={35}
            font={15}
          />
          <p className="fw-600 text-primary">{`${info.getValue()} ${info.row.original.last_name}`}</p>
        </div>
      ),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.email, {
      id: "Email",
      cell: (info) => <>{info.getValue()}</>,
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.createdAt, {
      id: "Joined On",
      cell: (info) => <>{dayjs(info.getValue()).format("DD  MMMM YYYY")}</>,
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.status, {
      id: "Status",
      cell: (info) => {
        return (
          <> {FormatStatus[info.getValue() as keyof typeof FormatStatus]}</>
        );
      },
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.status, {
      id: "Action",
      cell: (info) => {
        let value = info.renderValue();
        if (value == "pending") {
          let user = info.row.original;
          const input: SendInviteInput = {
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
          };
          return (
            <div className="flex gap-2">
              <button
                onClick={() => {
                  toast.promise(
                    async () => {
                      return await sendInvite(input);
                    },
                    {
                      pending: "Sending invite...",
                      success: "Invite resent!",
                      error: "Failed to send invite",
                    },
                  );
                }}
                className="bg-primary active:scale-95 p-4 text-white font-bold rounded-md shadow-sm py-2"
              >
                Reinvite
              </button>
            </div>
          );
        }
        return null;
      },
      header: (info) => info.column.id,
    }),
  ];
  return (
    <>
      <div>
        {!!data.data.length && <DataTable columns={columns} data={data.data} />}
      </div>
    </>
  );
};

export default InviteList;
