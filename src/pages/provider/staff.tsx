import { useQuery } from "@tanstack/react-query";
import InviteStaff from "../../lib/components/provider/staff/InviteStaff";
import StaffList from "../../lib/components/provider/staff/StaffList";
import useModal from "../../lib/hooks/useModal";
import { getDrivers } from "../../lib/services/api/companyApi";
import CurveLoader from "../../lib/components/ui/loader/curveLoader/CurveLoader";
import EmptyState from "../../lib/components/ui/EmptyState";

const CompanyStaffs = () => {
  const { Modal, setShowModal } = useModal();
  const { data, refetch, isLoading } = useQuery({
    queryFn: getDrivers,
    queryKey: ["Drivers"],
  });
  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow min-h-[80vh]">
        <div className="flex justify-between">
          <p className="fw-600 text-lg lg:text-2xl">Registered Staff</p>
        </div>
        <div className="mt-12">
          {isLoading && (
            <div className="py-12 flex justify-center items-center text-black">
              <div>
                <div className="place-center">
                  <CurveLoader />
                </div>
                <p className="text-center mt-5 fw-500">
                  Fetching Rendered Services...
                </p>
              </div>
            </div>
          )}
          {data && !data?.data.length && (
            <div>
              <EmptyState msg="You currently do not have a staff on the system." />
            </div>
          )}
          {!isLoading && !!data?.data?.length && <StaffList data={data.data} />}
        </div>
      </div>
      <Modal title="Invite New Staff" size="md" type="withCancel">
        <InviteStaff close={() => setShowModal(false)} refetch={refetch} />
      </Modal>
    </>
  );
};

export default CompanyStaffs;
