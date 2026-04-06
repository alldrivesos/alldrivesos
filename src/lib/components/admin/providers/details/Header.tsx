import { FC, useRef, useState } from "react";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import ProfileAvatar from "../../../ui/ProfileAvatar";
import { FormatStatus, formatAsNgnMoney } from "../../../../utils";
import useModal from "../../../../hooks/useModal";
import SuspendModal from "./SuspendModal";
import { useMutation } from "@tanstack/react-query";
import { unsuspendUser } from "../../../../services/api/usersApi";
import { toast } from "react-toastify";
import ReusableModal from "../../../ui/ReusableModal";
import UnSuspendModal from "./UnSuspendModal";

interface Props {
  id: string;
  name: string;
  picture: string;
  status: string;
  email: string;
  walletBal: string;
  pendingBal: string;
  refetch: () => void;
}
const ProviderDetailsHeader: FC<Props> = ({
  id,
  picture,
  status,
  name,
  walletBal,
  pendingBal,
  refetch,
}) => {
  const { Modal: Suspend, setShowModal: ShowSuspend } = useModal();
  const { Modal: Unsuspend, setShowModal: ShowUnsuspend } = useModal();
  const [isBusy, setIsBusy] = useState(false);
  const reason = useRef<string | null>("");
  const unsus = useMutation({
    mutationFn: unsuspendUser,
    mutationKey: ["unsuspend"],
  });
  const UnsuspendAction = () => {
    const payload = {
      userId: id,
      reason: reason.current,
    };
    unsus.mutate(payload, {
      onSuccess: (data) => {
        toast.success(data.message);
        setIsBusy(false);
        refetch();
        ShowUnsuspend(false);
      },
      onError: (error) => {
        toast.error(error.message);
        toast.error(JSON.stringify(error.response?.data.messsage));
        setIsBusy(false);
      },
    });
  };

  return (
    <>
      <div className="relative">
        <div className="bg-primary flex justify-end gap-x-3 pb-16 lg:pb-8 p-8 w-full rounded-lg">
          <div className="text-end">
            <div className="flex flex-row-reverse lg:gap-x-12 items-center gap-x-5">
              <div className="text-white">
                <p>
                  {" "}
                  {/*{JSON.stringify(status)}*/}
                  Pending Balance:{" "}
                  <span className="text-lg fw-600">
                    {formatAsNgnMoney(pendingBal) || "$0"}
                  </span>
                </p>
                <p>
                  {" "}
                  Available Balance:{" "}
                  <span className="text-lg fw-600">
                    {formatAsNgnMoney(walletBal) || "$0"}
                  </span>
                </p>
              </div>
              <Menu placement="bottom-end">
                <MenuHandler>
                  <Button className="bg-transparent px-0 mx-0 hover:shadow-none text-md flex items-center font-normal shadow-none capitalize">
                    <>
                      {status
                        ? FormatStatus["inactive"]
                        : FormatStatus["active"]}
                    </>
                  </Button>
                </MenuHandler>
                <MenuList className="">
                  {!status ? (
                    <MenuItem
                      className="my-1 fw-500 flex bg-red-600 text-white items-center gap-x-2 pt-2"
                      onClick={() => ShowSuspend(true)}
                    >
                      Suspend Provider
                    </MenuItem>
                  ) : (
                    <MenuItem
                      className="my-1 fw-500 flex  bg-green-600 text-white items-center gap-x-2 pt-2"
                      onClick={() => ShowUnsuspend(true)}
                    >
                      Unsuspend Provider
                    </MenuItem>
                  )}
                </MenuList>
              </Menu>
            </div>
          </div>
        </div>
        <div className="absolute top-28 lg:top-16 left-2 lg:left-6">
          <ProfileAvatar url={picture} name={name} size={130} font={35} />
        </div>
      </div>
      <Suspend title="Suspend Company" size="sm" type="withCancel">
        <SuspendModal
          id={id}
          close={() => ShowSuspend(false)}
          refetch={refetch}
        />
        {/*<div className="space-y-2 py-4">
          <label htmlFor="" className="font-bold">
            Reason
          </label>
          <input
            onChange={(e) => {
              reason.current = e.target.value;
            }}
            placeholder="reason"
            type="text"
            className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
          />
        </div>*/}
      </Suspend>
      <Unsuspend title="UnSuspend Company" size="sm">
        <UnSuspendModal
          id={id}
          close={() => ShowUnsuspend(false)}
          refetch={refetch}
        ></UnSuspendModal>
        {/*<ReusableModal
          title="Do you want to unsuspend this company/provider"
          action={UnsuspendAction}
          closeModal={() => ShowUnsuspend(true)}
          actionTitle="Unsuspend"
          cancelTitle="Close"
          isBusy={isBusy}
        >
          <div className="space-y-2 py-4">
            <label htmlFor="" className="font-bold">
              Reason
            </label>
            <input
              onChange={(e) => {
                reason.current = e.target.value;
              }}
              placeholder="reason"
              type="text"
              className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
            />
          </div>
        </ReusableModal>*/}
      </Unsuspend>
    </>
  );
};

export default ProviderDetailsHeader;
