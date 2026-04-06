import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ProviderDetailsHeader from "../../lib/components/admin/providers/details/Header";
import CompanyDetails from "../../lib/components/admin/providers/details/CompanyDetails";
import ViewKyc from "../../lib/components/admin/providers/details/ViewKyc";
import CompanyProviders from "../../lib/components/admin/providers/details/CompanyProviders";
import Tabs from "../../lib/components/ui/Tabs";
import { getProvidersDetails } from "../../lib/services/api/usersApi";
import CurveLoader from "../../lib/components/ui/loader/curveLoader/CurveLoader";
import useModal from "../../lib/hooks/useModal";
import { useEffect } from "react";
import { AiOutlineEye } from "react-icons/ai";
import SuspensionLogs from "../provider/_components/SuspensionLogs";

const ProviderDetails = () => {
  const { id } = useParams();
  const { Modal, setShowModal } = useModal();
  // Removed useEffect to show modal on initial render, now it's toggled by icon
  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: ["getProviders"],
    queryFn: () => getProvidersDetails(`${id}`),
  });
  const tabs = [
    {
      title: <p>Company Details</p>,
      content: <CompanyDetails data={data?.data} />,
    },
    {
      title: <p>Company Drivers</p>,
      content: <CompanyProviders id={`${id}`} />,
    },
    {
      title: <p>Company KYC</p>,
      content: (
        <ViewKyc id={`${id}`} kyc={data?.data?.verified} refetch={refetch} />
      ),
    },
  ];

  return (
    <>
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
      {isError && <p>There was an issue fetching provider details</p>}
      {!isLoading && data && (
        <div>
          <div className="mb-24 lg:mb-16">
            <ProviderDetailsHeader
              picture={data?.data?.photo}
              name={data?.data?.name}
              status={data?.data?.isSuspended}
              id={`${id}`}
              email={data?.data?.email}
              refetch={refetch}
              pendingBal={data?.data?.pendingBal}
              walletBal={data?.data?.walletBal}
            />
          </div>
          {/*<div className="flex justify-end mb-4"></div>*/}
          <Tabs tabs={tabs} type="norm" />
        </div>
      )}
      <SuspensionLogs id={id} />
      <Modal title="Reason for Suspension/UnSuspension">
        <div className="p-6 bg-gray-50 rounded-lg shadow-inner">
          {data?.data?.reason_for_suspension && (
            <div className="mb-4 p-3 border border-red-300 bg-red-50 rounded-md">
              <h4 className="font-semibold text-red-700 mb-1">
                Suspension Reason:
              </h4>
              <p className="text-gray-800">
                {data?.data?.reason_for_suspension}
              </p>
            </div>
          )}
          {data?.data?.reason_for_unsuspension && (
            <div className="p-3 border border-green-300 bg-green-50 rounded-md">
              <h4 className="font-semibold text-green-700 mb-1">
                Unsuspension Reason:
              </h4>
              <p className="text-gray-800">
                {data?.data?.reason_for_unsuspension}
              </p>
            </div>
          )}
          {!data?.data?.reason_for_suspension &&
            !data?.data?.reason_for_unsuspension && (
              <p className="text-gray-600 italic">
                No suspension or unsuspension reason provided.
              </p>
            )}
        </div>
      </Modal>
    </>
  );
};

export default ProviderDetails;
