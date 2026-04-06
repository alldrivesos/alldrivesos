import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { FC, useRef, useCallback } from "react";
import { BsArrowsExpand, BsThreeDotsVertical } from "react-icons/bs";
import { toast } from "react-toastify";
import useModal from "../../../hooks/useModal";
import { useMutation } from "@tanstack/react-query";
import ReusableModal from "../../ui/ReusableModal";
import { FormatStatus } from "../../../utils";
import { apiClient } from "../../../services/api/serviceApi";

interface SuspendModalContentProps {
  id: string;
  companyId: string;
  refetch: () => void;
  closeModal: () => void;
  reasonRef: React.MutableRefObject<string | null>;
}

const SuspendModalContent: FC<SuspendModalContentProps> = ({
  id,
  companyId,
  refetch,
  closeModal,
  reasonRef,
}) => {
  const sus = useMutation({
    mutationFn: async (driverId: string) => {
      let resp = await apiClient.post("/company/suspend-driver", {
        driverId: driverId,
        companyId: companyId,
        reason: reasonRef.current || "",
        unsuspend: false,
        unsuspendedBy: "company",
      });
      return resp.data;
    },
    mutationKey: ["suspend"],
  });

  const suspendAction = () => {
    if (reasonRef.current === null) {
      toast.error("Please enter a reason");
      return;
    }
    if (reasonRef.current.length < 3) {
      toast.error("Reason must be at least 5 characters");
      return;
    }
    sus.mutate(id || "", {
      onSuccess: (data) => {
        toast.success(data.message);
        refetch();
        closeModal();
        reasonRef.current = null;
      },
      onError: (error: any) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <ReusableModal
      title="Do you want to suspend this driver/provider"
      action={suspendAction}
      closeModal={closeModal}
      actionTitle="Suspend"
      cancelTitle="Close"
      isBusy={sus.isPending}
    >
      <div className="space-y-2 py-4">
        <label htmlFor="" className="font-bold">
          Reason
        </label>
        <input
          onChange={(e) => {
            reasonRef.current = e.target.value;
          }}
          placeholder="reason"
          type="text"
          className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
        />
      </div>
    </ReusableModal>
  );
};

interface UnsuspendModalContentProps {
  id: string;
  companyId: string;
  refetch: () => void;
  closeModal: () => void;
  reasonRef: React.MutableRefObject<string | null>;
}

const UnsuspendModalContent: FC<UnsuspendModalContentProps> = ({
  id,
  companyId,
  refetch,
  closeModal,
  reasonRef,
}) => {
  const unsus = useMutation({
    mutationFn: async (driverId: string) => {
      let resp = await apiClient.post("/users/unsuspend-driver/" + driverId, {
        driverId: driverId,
        companyId: companyId,
        reason: reasonRef.current || "",
        unsuspendedBy: "company",
        unsuspend: true,
      });
      return resp.data;
    },
    mutationKey: ["unsuspend"],
  });

  const UnsuspendAction = () => {
    unsus.mutate(id || "", {
      onSuccess: (data) => {
        toast.success(data.message);
        refetch();
        closeModal();
      },
      onError: (error: any) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <ReusableModal
      title="Do you want to unsuspend this driver/provider"
      action={UnsuspendAction}
      closeModal={closeModal}
      actionTitle="Unsuspend"
      cancelTitle="Close"
      isBusy={unsus.isPending}
    >
      <div className="space-y-2 py-4">
        <label htmlFor="" className="font-bold">
          Reason
        </label>
        <input
          onChange={(e) => {
            reasonRef.current = e.target.value;
          }}
          placeholder="reason"
          type="text"
          className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
        />
      </div>
    </ReusableModal>
  );
};
interface Props {
  id: string;
  refetch: () => void;
  suspended: boolean;
  companyId: string;
  isActive?: boolean;
}

const UserAction: FC<Props> = ({
  id,
  refetch,
  suspended,
  companyId,
  isActive,
}) => {
  const { Modal: SuspendModal, setShowModal: setShowSuspendModal } = useModal();
  const { Modal: UnsuspendModal, setShowModal: setShowUnsuspendModal } =
    useModal();
  const reasonRef = useRef<string | null>(null);

  const handleSuspendClick = useCallback(() => {
    setShowSuspendModal(true);
  }, [setShowSuspendModal]);

  const handleUnsuspendClick = useCallback(() => {
    setShowUnsuspendModal(true);
  }, [setShowUnsuspendModal]);

  const closeSuspendModal = useCallback(() => {
    setShowSuspendModal(false);
  }, [setShowSuspendModal]);

  const closeUnsuspendModal = useCallback(() => {
    setShowUnsuspendModal(false);
  }, [setShowUnsuspendModal]);

  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-x-2 text-sm">
          <span className="font-semibold text-gray-700">Status:</span>
          <span
            className={`px-2 py-1 rounded-full  font-bold text-sm  ${
              isActive
                ? "bg-green-100 text-green-500"
                : "bg-red-100 text-red-800"
            }`}
          >
            {isActive ? FormatStatus["active"] : FormatStatus["inactive"]}
          </span>
        </div>
        <div className="flex items-center gap-x-2 text-sm">
          <span className="font-semibold text-gray-700">Suspended:</span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              suspended
                ? "bg-orange-100 text-orange-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {suspended ? "Suspended" : "Not Suspended"}
            {/*{!suspended ? FormatStatus["inactive"] : FormatStatus["active"]}*/}
          </span>
        </div>
      </div>
      <Menu placement="bottom-end">
        <MenuHandler>
          <Button
            variant="text"
            className="p-0 m-0 hover:shadow-none text-md flex items-center font-normal shadow-none capitalize text-gray-600 hover:text-gray-900"
          >
            <BsThreeDotsVertical className="text-xl" />
          </Button>
        </MenuHandler>
        <MenuList className="z-50 min-w-[150px] p-1 border border-gray-200 rounded-md shadow-lg">
          {!suspended && (
            <MenuItem
              className="flex items-center gap-x-2 py-2 px-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors duration-200"
              onClick={handleSuspendClick}
            >
              <BsArrowsExpand className="text-base" /> Suspend User
            </MenuItem>
          )}
          {suspended && (
            <MenuItem
              className="flex items-center gap-x-2 py-2 px-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-md transition-colors duration-200"
              onClick={handleUnsuspendClick}
            >
              <BsArrowsExpand className="text-base" /> Unsuspend User
            </MenuItem>
          )}
        </MenuList>
      </Menu>
      <SuspendModal title="" size="sm">
        <SuspendModalContent
          id={id}
          companyId={companyId}
          refetch={refetch}
          closeModal={closeSuspendModal}
          reasonRef={reasonRef}
        />
      </SuspendModal>
      <UnsuspendModal title="" size="sm">
        <UnsuspendModalContent
          id={id}
          companyId={companyId}
          refetch={refetch}
          closeModal={closeUnsuspendModal}
          reasonRef={reasonRef}
        />
      </UnsuspendModal>
    </div>
  );
};

export default UserAction;
