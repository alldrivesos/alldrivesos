import { useMutation, useQuery } from "@tanstack/react-query";
import { FC, useState } from "react";
import {
  getCompanyProviders,
  unsuspendUser,
} from "../../../../services/api/usersApi";
import StaffList from "./StaffList";
import EmptyState from "../../../ui/EmptyState";
import CurveLoader from "../../../ui/loader/curveLoader/CurveLoader";
import useModal from "../../../../hooks/useModal";
import SuspendModal from "./SuspendModal";
import ReusableModal from "../../../ui/ReusableModal";
import { toast } from "react-toastify";

interface Props {
  id: string;
}
const CompanyProviders: FC<Props> = ({ id }) => {
  const { data, isLoading, refetch } = useQuery({
    queryFn: () => getCompanyProviders(id),
    queryKey: ["companyProviders"],
  });

  const [isBusy, setIsBusy] = useState(false);
  const { Modal: Suspend, setShowModal: ShowSuspend } = useModal();
  const { Modal: Unsuspend, setShowModal: ShowUnsuspend } = useModal();
  const [dataId, setId] = useState("");

  const unsus = useMutation({
    mutationFn: unsuspendUser,
    mutationKey: ["unsuspend"],
  });

  const UnsuspendAction = () => {
    const payload = {
      userId: dataId,
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
        setIsBusy(false);
      },
    });
  };

  let getId = "";

  const handleSuspendModal = () => {
    ShowSuspend(true);
    getId = localStorage.getItem("providerId") || "";
    setId(getId);
  };

  const handleUnSuspendModal = () => {
    ShowUnsuspend(true);
    getId = localStorage.getItem("providerId") || "";
    setId(getId);
  };

  return (
    <>
      <div className="bg-white p-6 shadow rounded min-h-[350px]">
        {isLoading && (
          <div className="py-12 flex justify-center items-center text-black">
            <div>
              <div className="flex justify-center">
                <CurveLoader />
              </div>
              <p className="text-center mt-5 fw-500">
                Fetching Provider Details...
              </p>
            </div>
          </div>
        )}
        {data && !data?.data.length && (
          <div>
            <EmptyState msg="There are no providers currently in this company." />
          </div>
        )}
        {data && (
          <StaffList
            data={data?.data}
            setSuspend={() => handleSuspendModal()}
            setUnSuspend={() => handleUnSuspendModal()}
          />
        )}

        <Suspend title="Suspend Driver" size="sm" type="withCancel">
          <SuspendModal
            id={dataId}
            close={() => ShowSuspend(false)}
            refetch={refetch}
          />
        </Suspend>

        <Unsuspend title="" size="sm">
          <ReusableModal
            title="Do you want to unsuspend this driver"
            action={UnsuspendAction}
            closeModal={() => ShowUnsuspend(false)}
            actionTitle="Unsuspend"
            cancelTitle="Close"
            isBusy={isBusy}
          />
        </Unsuspend>
      </div>
    </>
  );
};

export default CompanyProviders;
