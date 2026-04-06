import { BsTelephone } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import ServiceCategory from "../../lib/components/provider/details/serviceCategory";
import ServiceBrands from "../../lib/components/provider/details/serviceBrands";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { getProvidersDetails } from "../../lib/services/api/usersApi";
import CurveLoader from "../../lib/components/ui/loader/curveLoader/CurveLoader";
import ProfileAvatar from "../../lib/components/ui/ProfileAvatar";
import { FormatStatus, formatAsNgnMoney } from "../../lib/utils";
import { formatPhoneNumber } from "react-phone-number-input";
import { Rating } from "@material-tailwind/react";
import useDialog from "../../lib/hooks/useDialog";
import ViewReviewsModal from "../../lib/components/admin/providers/staff/ViewReviewsModal";
// import AdminServiceRenderd from "./_components/AdminServiceRendered";
import { apiClient } from "../../lib/services/api/serviceApi";
import { approveDriverKyc, getDriverKyc } from "../../lib/services/api/kycApi";
import VehicleInfo from "../provider/_components/VehicleInfo";
import SuspensionLogs from "../provider/_components/SuspensionLogs";
// import GetKycAdmin from "./_components/StaffKycDetails";
import { useState } from "react";
import NewSuspensionLogs from "../admin/_components/NewSuspensionLogs";
import GetKycAdmin from "../admin/_components/StaffKycDetails";
import { getStaffDetail } from "../../lib/services/api/companyApi";
import AdminServiceRenderd from "../admin/_components/AdminServiceRendered";
import useModal from "../../lib/hooks/useModal";
import UserAction from "../../lib/components/provider/details/userAction";
import GetKycProvider from "./_components/GetKycProvider";
import { toast } from "react-toastify";
// import NewAdminserviceRendered from "./_components/NewAdminServiceRendered";

const StaffDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { Dialog, setShowModal } = useDialog();
  // const { data: kyc } = useQuery({
  //   queryKey: ["getStaffKyc"],
  //   queryFn: () => getDriverKyc(`${id}`),
  // })z
  const [searchParams, setSearhParam] = useSearchParams();
  const default_tab = searchParams.get("currTab") as (typeof tab_list)[number];
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["getProviders"],
    queryFn: () => getDriverKyc(`${id}`),
  });
  const tab_list = ["Info", "Logs", "KYC", "Requests"] as const;
  const [tab, setTab] = useState<(typeof tab_list)[number]>(
    default_tab || "Info",
  );
  const modal = useModal();
  const approveKyc = async () => {
    const payload = {
      approved: true,
      reason: "",
    };
    await approveDriverKyc(data?.data?.id, payload)
      .then((res) => {
        toast.success(res.message);
        setShowModal(false);
        refetch();
        // refetchKyc();
      })
      .catch((err: any) => {
        toast.error(err.response.data.message);
      });
  };
  return (
    <>
      <Dialog title="View Provider Reviews" size="lg">
        <ViewReviewsModal id={`${id}`} />
      </Dialog>
      {isLoading ? (
        <>
          {" "}
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
        </>
      ) : (
        <>
          <div className="flex mb-4">
            <div
              className="flex gap-x-2 items-center cursor-pointer text-gray-600 hover:text-gray-800 transition-colors"
              onClick={() => navigate(-1)}
            >
              <FaLongArrowAltLeft className="text-lg" />
              <p className="fw-500">Back to company</p>
            </div>
          </div>

          <div className="w-full h-[140px] bg-primary p-4 rounded-t-xl lg:px-8 flex justify-end items-center">
            <div className="text-white text-right space-y-1">
              <p className="text-sm opacity-80">
                Pending Balance:{" "}
                <span className="text-lg fw-600 ml-2">
                  {formatAsNgnMoney(data.data.pendingBal) || "$0"}
                </span>
              </p>
              <p className="text-sm opacity-80">
                Available Balance:{" "}
                <span className="text-lg fw-600 ml-2">
                  {formatAsNgnMoney(data.data.walletBal) || "$0"}
                </span>
              </p>
            </div>
          </div>
          <div className="lg:flex justify-between items-start -mt-16 mb-4">
            <div className="flex items-end">
              <div className="border-4 border-white w-[140px] h-[140px] rounded-full shadow-md">
                <ProfileAvatar
                  name={`${data?.data?.fname} ${data?.data?.lname}`}
                  url={data?.data?.photo}
                  size={130}
                  font={35}
                />
              </div>
              <div className="ml-4 pt-10 mt-8">
                <p className="fw-700 text-xl lg:text-2xl text-gray-800">{`${data?.data?.fname} ${data?.data?.lname}`}</p>
                <p className="text-sm text-gray-500 fw-500 ">
                  Service Provider
                </p>
                {/*<div className="mt-2">
                  {data?.data?.isSuspended
                    ? FormatStatus["inactive"]
                    : FormatStatus["active"]}
                </div>*/}
                <UserAction
                  isActive={data?.data?.isActive}
                  refetch={refetch}
                  id={data?.data.id}
                  companyId={data.data.companyId}
                  suspended={data?.data.isSuspended}
                />
              </div>
            </div>

            <div
              className="flex items-center gap-2 fw-600 text-blue-gray-300 pt-4 lg:pt-8 cursor-pointer hover:text-blue-gray-800 transition-colors"
              onClick={() => setShowModal(true)}
            >
              <span className="text-lg">
                {data?.data?.avgRating === null
                  ? "No Ratings Yet"
                  : `${data?.data?.avgRating}/5`}
              </span>
              {data?.data?.reviewsAvg && (
                <Rating
                  value={Number(data?.data?.avgRating) || 0}
                  ratedColor={"amber"}
                  className="scale-100"
                  readonly
                />
              )}
              <span className="text-sm underline hover:no-underline">
                View Reviews
              </span>
            </div>
          </div>
        </>
      )}

      {/*//tablist*/}
      <div className="py-4 px-2">
        <div className="flex gap-2 items-center border-b border-gray-200">
          {tab_list.map((item) => {
            const selectTab = () => {
              setTab(item);
              setSearhParam({ currTab: item });
            };
            const isActive = tab === item;
            return (
              <button
                type="button"
                key={"item" + item}
                onClick={selectTab}
                className={`px-4 py-2 text-sm font-medium rounded-t-md focus:outline-none transition-colors
                  ${
                    isActive
                      ? "bg-primary text-white shadow -mb-px border-b-2 border-primary"
                      : "bg-transparent text-gray-600 hover:text-primary"
                  }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>
      {tab == "Info" && <Page id={id} data={data} isLoading={isLoading} />}
      {tab == "Logs" && <NewSuspensionLogs id={id} />}
      {tab == "KYC" && <GetKycProvider id={id} />}
      {tab == "Requests" && (
        <AdminServiceRenderd
          serviceData={data?.data?.serviceRequests}
          id={id}
        />
      )}
    </>
  );
};

export default StaffDetail;

const Page = ({
  id,
  data,
  isLoading,
}: {
  id: string;
  data: any;
  isLoading: boolean;
}) => {
  return (
    <>
      <div>
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
        {!isLoading && data && (
          <div>
            <div className="bg-white rounded-xl shadow-lg min-h-[80vh] overflow-hidden">
              {!isLoading && data && (
                <div>
                  <div className="px-4 lg:px-8 mt-6 pb-6 border-b border-gray-200 grid lg:grid-cols-2 gap-6">
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="fw-600 text-sm text-gray-500 mb-3 uppercase tracking-wider">
                        Phone Contact
                      </p>
                      <div className="flex gap-x-3 items-center">
                        <div className="bg-blue-gray-700 w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0">
                          <BsTelephone className="text-lg" />
                        </div>
                        <p className="fw-600 text-gray-800">
                          {formatPhoneNumber(data?.data?.phone_number)}
                        </p>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="fw-600 text-sm text-gray-500 mb-3 uppercase tracking-wider">
                        Email Address
                      </p>
                      <div className="flex overflow-hidden gap-x-3 items-center">
                        <div className="bg-blue-gray-700 shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white">
                          <AiOutlineMail className="text-lg" />
                        </div>
                        <p className="fw-600 text-gray-800 truncate">
                          {data?.data?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 border-t border-gray-200 mt-6 bg-white">
                    <div className="border-r border-gray-200 p-6">
                      <p className="pb-3 border-b fw-600 text-gray-700 text-lg">
                        Service Category
                      </p>
                      <div className="pt-4">
                        <ServiceCategory cat={data?.data?.service_rendered} />
                      </div>
                    </div>
                    <div className="border-r border-gray-200 p-6">
                      {/*<p className="pb-3 border-b fw-600 text-gray-700 text-lg">
                      Service Brands
                    </p>
                    <div className="pt-4">
                      <ServiceBrands brands={data?.data?.brands} />
                    </div>*/}

                      <p className="p-3 border-b-2 fw-500 text-gray-600">
                        Vehicle Info
                      </p>
                      <div className="px-4 py-3 h-[245px] overflow-y-auto">
                        <VehicleInfo item={data.data} />
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 lg:px-8 px-4 pb-10">
                    <p className="fw-700 text-xl text-gray-800 border-b pb-2 mb-6">
                      Provider Extra Information
                    </p>
                    <div className="grid gap-4 lg:grid-cols-2">
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="w-5/12 text-gray-600 shrink-0 fw-500">
                          Service Area:
                        </p>
                        <p className="fw-600 text-gray-800">
                          {data?.data?.service_area}
                        </p>
                      </div>
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="w-5/12 shrink-0 text-gray-600 fw-500">
                          Account Name:
                        </p>
                        <p className="fw-600 text-gray-800">
                          {data?.data?.account_name}
                        </p>
                      </div>
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="w-5/12 shrink-0 text-gray-600 fw-500">
                          Account Number:
                        </p>
                        <p className="fw-600 text-gray-800">
                          {data?.data?.account_number}
                        </p>
                      </div>
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="w-5/12 shrink-0 text-gray-600 fw-500">
                          Bank Name:
                        </p>
                        <p className="fw-600 text-gray-800">
                          {data?.data?.bank_name}
                        </p>
                      </div>
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="w-5/12 shrink-0 text-gray-600 fw-500">
                          Routing Number:
                        </p>
                        <p className="fw-600 text-gray-800">
                          {data?.data?.routing_number}
                        </p>
                      </div>
                      {/* <div className="flex">
                      <p className="w-3/12 shrink-0 text-gray-600 ">
                        Service Fees:
                      </p>
                      <div className="fw-500 grid gap-2">
                        <p>E-Fuel - $45</p>
                        <p>Towing - $55</p>
                      </div>
                    </div> */}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {/*<div className="p-6">
          <p className="pb-3 border-b fw-600 text-gray-700 text-lg">
            Service Rendered
          </p>
          <div className="pt-4">
            <AdminServiceRenderd
              id={id}
              serviceData={data?.data.serviceRequests as any}
            />
          </div>
        </div>*/}
      </div>
    </>
  );
};
