import { FC } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "../../ui/DataTable";
import ProfileAvatar from "../../ui/ProfileAvatar";
import dayjs from "dayjs";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { BsArrowsExpand, BsThreeDotsVertical } from "react-icons/bs";
import { UserItemType } from "../../../types/auth";
import { FormatStatus, formatPhoneNumber } from "../../../utils";
import { useNavigate } from "react-router-dom";

interface Props {
  users: any;
}
const UsersList: FC<Props> = ({ users }) => {
  const navigate = useNavigate()
    const gotoDetails = (id:string) => {
        navigate(`/admin/users/${id}`)
    }
  // Table components
  const columnHelper = createColumnHelper<UserItemType>();
  const columns = [
    columnHelper.accessor((row) => row.fname, {
      id: "Name",
      cell: (info) => (
        <div className="flex gap-x-2 items-center">
          <ProfileAvatar
            name={`${info.getValue()} ${info.row.original.lname}`}
            url={info.row.original.photo}
            size={50}
            font={17}
          />
          <p className="fw-600 text-primary">{`${info.getValue()} ${info.row.original.lname}`}</p>
        </div>
      ),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.email, {
      id: "Email",
      cell: (info) => <>{info.getValue()}</>,
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.phone, {
      id: "Phone",
      cell: (info) => <>{formatPhoneNumber(info.getValue())}</>,
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.createdAt, {
      id: "Joined On",
      cell: (info) => <>{dayjs(info.getValue()).format("DD  MMMM YYYY")}</>,
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.isActive, {
      id: "Status",
      cell: (info) => <>{info.getValue()? FormatStatus['active'] : FormatStatus['inactive']}</>,
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.id, {
      id: "Action",
      header: (info) => info.column.id,
      cell: (info) => (
        <>
          <Menu placement="bottom-end">
            <MenuHandler>
              <Button className="bg-transparent px-0 mx-0 hover:shadow-none text-md flex items-center font-normal shadow-none capitalize">
                <BsThreeDotsVertical className="text-xl text-black" />
              </Button>
            </MenuHandler>
            <MenuList className="">
              <MenuItem
                className="my-1 fw-500 flex items-center gap-x-2 pt-1"
                onClick={() => gotoDetails(info.getValue())}
              >
                <BsArrowsExpand/> View User Detail
              </MenuItem>
            </MenuList>
          </Menu>
        </>
      ),
    }),
  ];
  return (
    <>
      <div>
        <DataTable
          columns={columns}
          data={users}
        />
      </div>
    </>
  );
};

export default UsersList;
