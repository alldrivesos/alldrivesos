import { useQuery } from "@tanstack/react-query";
import { format_time } from "../../../utils/utils";
import useModal from "../../../lib/hooks/useModal";
import {
  approveDriverKyc,
  getDriverKyc,
} from "../../../lib/services/api/kycApi";
import ReusableModal from "../../../lib/components/ui/ReusableModal";
import DisapproveDriverKyc from "../../../lib/components/provider/details/disapproveKyc";
import { toast } from "react-toastify";

interface ServiceRendered {
  id: string;
  fee: number;
  name: string;
  slug: string;
  icon: string;
  isPublished: number;
  questionNote: string;
  createdAt: string;
  updatedAt: string;
}

interface Location {
  type: string;
  coordinates: number[];
}

interface GetKycAdminResponse {
  id: string;
  fname: string;
  lname: string;
  name: null;
  email: string;
  address: string;
  phone: string;
  sms_opt_in: boolean;
  password: string;
  isActive: boolean;
  isSuspended: boolean;
  reason_for_suspension: null;
  reason_for_unsuspension: null;
  photo: null;
  hasActiveSubscription: null;
  isAvailableForService: null;
  verified: boolean;
  expiredAt: null;
  planId: null;
  token: null;
  state: string;
  city: string;
  zipcode: string;
  street: null;
  userType: string;
  level: number;
  referralId: null;
  invitationId: string;
  companyId: string;
  reviewsAvg: number;
  serviceCharge: null;
  last_login: string;
  fcmToken: string;
  walletBal: string;
  pendingBal: string;
  referralSource: null;
  driverOverallPendingBal: string;
  driverOverallWalletBal: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  user_id: string;
  brands: string[];
  service_rendered: ServiceRendered[];
  account_name: string;
  account_number: string;
  bank_name: string;
  routing_number: string;
  service_area: string;
  fees: null;
  isVerified: boolean;
  reason: string;
  car_description: string;
  plate_number: string;
  longitude: string;
  latitude: string;
  stripeAccountId: string;
  identityFront: string;
  identityBack: string;
  identityFrontId: string;
  identityBackId: string;
  cityOfResidence: string;
  dob: string;
  ssn_last_4: string;
  device_ip: string;
  phone_number: string;
  location_status: string;
  location: Location;
  location_last_updated: null;
  avgRating: null;
  serviceRequests: any[];
}
export default function GetKycProvider({ id }: { id: string }) {
  const {
    data,
    isLoading,
    isError,
    refetch: refetchKyc,
  } = useQuery<{
    success: boolean;
    data: GetKycAdminResponse;
  }>({
    queryKey: ["staffKycDetails-provider", id],
    queryFn: async () => {
      return getDriverKyc(`${id}`);
    },
  });

  const { Modal, setShowModal } = useModal();
  const { Modal: DisApproval, setShowModal: SetDisApproval } = useModal();

  const approveKyc = async () => {
    const payload = {
      approved: true,
      reason: "",
    };
    await approveDriverKyc(data?.data?.id, payload)
      .then((res) => {
        toast.success(res.message);
        setShowModal(false);
        refetchKyc();
      })
      .catch((err: any) => {
        toast.error(err.response.data.message);
      });
  };

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-shadow flex flex-col min-h-[300px] justify-center items-center">
        <h2 className="text-xl font-bold">Loading KYC Details...</h2>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white p-6 rounded-shadow flex flex-col min-h-[300px] justify-center items-center">
        <h2 className="text-xl font-bold text-red-500">
          Error loading KYC details.
        </h2>
      </div>
    );
  }

  const kycData = data?.data;

  if (!kycData) {
    return (
      <div className="bg-white p-6 rounded-shadow flex flex-col min-h-[300px] justify-center items-center">
        <h2 className="text-xl font-bold">No KYC details found.</h2>
      </div>
    );
  }

  const renderDetail = (
    label: string,
    value: string | number | boolean | null | undefined,
  ) => (
    <div className="flex justify-between py-2 border-b border-gray-200">
      <span className="font-medium text-gray-700">{label}:</span>
      <span className="text-gray-900">
        {value !== null && value !== undefined ? String(value) : "N/A"}
      </span>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        KYC Details for {kycData.fname} {kycData.lname}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Personal Information
          </h3>
          {renderDetail("Full Name", `${kycData.fname} ${kycData.lname}`)}
          {renderDetail("Email", kycData.email)}
          {renderDetail("Phone", kycData.phone)}
          {renderDetail("Address", kycData.address)}
          {renderDetail("City", kycData.city)}
          {renderDetail("State", kycData.state)}
          {renderDetail("Zipcode", kycData.zipcode)}
          {renderDetail("Date of Birth", kycData.dob)}
          {/*{renderDetail("SSN Last 4", kycData.ssn_last_4)}*/}
          {renderDetail("Verified", kycData.verified ? "Yes" : "No")}
          {renderDetail("Active", kycData.isActive ? "Yes" : "No")}
          {renderDetail("Suspended", kycData.isSuspended ? "Yes" : "No")}
          {kycData.isSuspended &&
            renderDetail(
              "Reason for Suspension",
              kycData.reason_for_suspension,
            )}
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Banking Information
          </h3>
          {renderDetail("Account Name", kycData.account_name)}
          {renderDetail("Account Number", kycData.account_number)}
          {renderDetail("Bank Name", kycData.bank_name)}
          {renderDetail("Routing Number", kycData.routing_number)}
          {renderDetail("Stripe Account ID", kycData.stripeAccountId)}

          <h3 className="text-xl font-semibold mt-6 mb-4 text-gray-700">
            Vehicle Information
          </h3>
          {renderDetail("Car Description", kycData.car_description)}
          {renderDetail("Plate Number", kycData.plate_number)}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Service Information
        </h3>
        {renderDetail("User Type", kycData.userType)}
        {renderDetail("Service Area", kycData.service_area)}
        {renderDetail(
          "Is Verified (Service)",
          kycData.isVerified ? "Yes" : "No",
        )}
        {kycData.reason && renderDetail("Verification Reason", kycData.reason)}
        {kycData.service_rendered && kycData.service_rendered.length > 0 && (
          <div className="mt-4">
            <p className="font-medium text-gray-700 mb-2">Services Rendered:</p>
            <ul className="list-disc list-inside ml-4 text-gray-800">
              {kycData.service_rendered.map((service) => (
                <li key={service.id}>
                  {service.name} (Fee: ${service.fee})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          ID Card Images
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {kycData.identityFront ? (
            <div className="border border-gray-300 rounded-lg overflow-hidden shadow-sm">
              <p className="p-3 bg-gray-100 font-medium text-gray-700">
                Identity Front
              </p>
              <ImageView title="Identity Front" src={kycData.identityFront} />
            </div>
          ) : (
            <div className="border border-gray-300 rounded-lg p-6 flex items-center justify-center text-gray-500 min-h-[200px]">
              No Front ID Image
            </div>
          )}

          {kycData.identityBack ? (
            <div className="border border-gray-300 rounded-lg overflow-hidden shadow-sm">
              <p className="p-3 bg-gray-100 font-medium text-gray-700">
                Identity Back
              </p>
              <ImageView title="Identity Back" src={kycData.identityBack} />
            </div>
          ) : (
            <div className="border border-gray-300 rounded-lg p-6 flex items-center justify-center text-gray-500 min-h-[200px]">
              No Back ID Image
            </div>
          )}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Other Details
        </h3>
        {renderDetail("Device IP", kycData.device_ip)}
        {renderDetail("Location Status", kycData.location_status)}
        {kycData.location?.coordinates && (
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="font-medium text-gray-700">
              Location Coordinates:
            </span>
            <span className="text-gray-900">
              {kycData.location.coordinates.join(", ")}
            </span>
          </div>
        )}
        {renderDetail(
          "Last Login",
          kycData.last_login ? format_time(kycData.last_login) : "N/A",
        )}
        {renderDetail(
          "Created At",
          kycData.createdAt ? format_time(kycData.createdAt) : "N/A",
        )}
        {renderDetail(
          "Updated At",
          kycData.updatedAt ? format_time(kycData.updatedAt) : "N/A",
        )}
      </div>

      {!kycData.verified && (
        <div className="flex gap-x-3 mt-4">
          <button
            className="bg-primary text-white px-4 py-2 rounded-md text-sm fw-500 hover:bg-blue-700 transition-colors"
            onClick={() => setShowModal(true)}
          >
            Approve KYC
          </button>
          <button
            className="border border-gray-400 text-gray-700 px-4 py-2 rounded-md text-sm fw-500 hover:bg-gray-100 transition-colors"
            onClick={() => SetDisApproval(true)}
          >
            Disapprove KYC
          </button>
        </div>
      )}

      <Modal title="" size="sm">
        <ReusableModal
          title="Are you sure you want to approve this KYC request?"
          action={() => approveKyc()}
          actionTitle="Approve"
          cancelTitle="Close"
          closeModal={() => setShowModal(false)}
          isBusy={isLoading} // Assuming isLoading from the query can be used here
        />
      </Modal>
      <DisApproval title="Disapprove Driver Kyc" size="sm">
        <DisapproveDriverKyc
          id={kycData?.id}
          close={() => SetDisApproval(false)}
          refetch={refetchKyc}
        />
      </DisApproval>
    </div>
  );
}

const ImageView = ({ src, title }: { src: string; title: string }) => {
  const { Modal, setShowModal } = useModal();

  return (
    <>
      <Modal title={title}>
        <img src={src} alt="" />
      </Modal>
      <div className="w-full h-auto" onClick={() => setShowModal(true)}>
        <img src={src} alt="" className="w-full h-auto object-cover max-h-80" />
      </div>
    </>
  );
};
