import { useQuery } from "@tanstack/react-query";
import InviteStaff from "../../lib/components/provider/staff/InviteStaff";
import useModal from "../../lib/hooks/useModal";
import { getInvite } from "../../lib/services/api/companyApi";
import CurveLoader from "../../lib/components/ui/loader/curveLoader/CurveLoader";
import InviteList from "../../lib/components/provider/staff/InviteList";
import EmptyState from "../../lib/components/ui/EmptyState";

const CompanyInvites = () => {
  const { Modal, setShowModal } = useModal();
  const { data, refetch, isLoading } = useQuery({
    queryFn: getInvite,
    queryKey: ["invites"],
  });
  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow min-h-[80vh]">
        <div className="flex justify-between">
          <p className="fw-600 text-lg lg:text-2xl">Invited Staff</p>
          <p
            className="btn-primary px-5 py-1 cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            Add New Staff
          </p>
        </div>
        <div className="mt-12">
          {isLoading && (
            <div className="py-12 flex justify-center items-center text-black">
              <div>
                <div className="place-center">
                  <CurveLoader />
                </div>
                <p className="text-center mt-5 fw-500">
                  Fetching Sent Invites...
                </p>
              </div>
            </div>
          )}
          {!isLoading && !data?.data.length && (
            <div>
              <EmptyState msg="You have sent out zero (0) invite(s)." />
            </div>
          )}
          {!isLoading && !!data?.data?.length && (
            <InviteList data={data.data} />
          )}
        </div>
      </div>
      <Modal title="Invite New Staff" size="md" type="withCancel">
        <InviteStaff close={() => setShowModal(false)} refetch={refetch} />
      </Modal>
    </>
  );
};

export default CompanyInvites;
