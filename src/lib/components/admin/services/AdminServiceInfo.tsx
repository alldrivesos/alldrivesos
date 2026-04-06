import dayjs from "dayjs";
import { FaCar } from "react-icons/fa6";
import { MdLocationPin, MdOutlineStickyNote2 } from "react-icons/md";
// import ProfileAvatar from "../../../ui/ProfileAvatar";
import { IoMdTime } from "react-icons/io";
import { HiCurrencyDollar } from "react-icons/hi2";
import { GiAutoRepair } from "react-icons/gi";
import { FC } from "react";
import ProfileAvatar from "../../ui/ProfileAvatar";
import { format_time } from "../../../../utils/utils";
import { formatAsNgnMoney } from "../../../utils";
// import { formatAsNgnMoney } from "../../../../utils";
// import { format_time } from "../../../../../utils/utils";

interface Props {
  data: {
    id: string;
    ref: null | string;
    userId: string;
    userType: string;
    providerId: null | string;
    status: string;
    processStatus: null | string;
    serviceId: string;
    amount: null | number;
    vehicleMake: string;
    model: string;
    vehicleYear: string;
    color: string;
    location: string;
    zipcode: string;
    requestNote: string;
    createdAt: string;
    updatedAt: string;
    latitude: string;
    longitude: string;
    city: string;
    queryNote: null | string;
    userFcmToken: string;
    state: string;
    vehicleType: string;
    completionTime: null | string;
    serviceRequestId: string;
    quote: number;
    selected: number;
    paid: number;
    distance: string;
    timeTaken: string;
    fname: string;
    lname: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    isActive: number;
    isSuspended: number;
    token: null | string;
    street: null | string;
    referralId: null | string;
    level: number;
    hasActiveSubscription: null | boolean;
    isAvailableForService: null | boolean;
    expiredAt: null | string;
    planId: null | string;
    invitationId: string;
    verified: number;
    companyId: string;
    reviewsAvg: number;
    serviceCharge: null | number;
    fcmToken: string;
    pendingBal: string;
    address: string;
    deletedAt: null | string;
    photo: null | string;
    last_login: string;
    walletBal: string;
    referralSource: null | string;
    service_area: null | string;
    driverOverallPendingBal: string;
    driverOverallWalletBal: string;
    sms_opt_in: number;
    slug: string;
    icon: string;
    isPublished: number;
    questionNote: string;
    minimumQuote: null | number;
    serviceRequestStatus: string;
    serviceRequestCreatedAt: string;
    customerId: string;
    driverQuoteId: string;
    processingFee: null | number; // Added processingFee to the interface
    customer: {
      id: string;
      fname: string;
      lname: string;
      name: null | string;
      email: string;
      address: string;
      phone: string;
      sms_opt_in: boolean;
      password: string;
      isActive: boolean;
      isSuspended: boolean;
      photo: null | string;
      hasActiveSubscription: null | boolean;
      isAvailableForService: null | boolean;
      verified: boolean;
      expiredAt: null | string;
      planId: null | string;
      token: null | string;
      state: null | string;
      city: null | string;
      zipcode: null | string;
      street: null | string;
      userType: string;
      level: number;
      referralId: null | string;
      invitationId: null | string;
      companyId: null | string;
      reviewsAvg: number;
      serviceCharge: null | number;
      last_login: string;
      fcmToken: string;
      walletBal: null | number;
      pendingBal: null | number;
      referralSource: null | string;
      driverOverallPendingBal: null | number;
      driverOverallWalletBal: null | number;
      createdAt: string;
      updatedAt: string;
      deletedAt: null | string;
    };
    company: {
      id: string;
      fname: null | string;
      lname: null | string;
      name: string;
      email: string;
      address: null | string;
      phone: string;
      sms_opt_in: boolean;
      password: string;
      isActive: boolean;
      isSuspended: boolean;
      photo: null | string;
      hasActiveSubscription: null | boolean;
      isAvailableForService: null | boolean;
      verified: boolean;
      expiredAt: null | string;
      planId: null | string;
      token: null | string;
      state: null | string;
      city: null | string;
      zipcode: null | string;
      street: null | string;
      userType: string;
      level: null | number;
      referralId: string;
      invitationId: null | string;
      companyId: null | string;
      reviewsAvg: number;
      serviceCharge: number;
      last_login: string;
      fcmToken: string;
      walletBal: string;
      pendingBal: string;
      referralSource: null | string;
      driverOverallPendingBal: string;
      driverOverallWalletBal: string;
      createdAt: string;
      updatedAt: string;
      deletedAt: null | string;
    };
  };
}
const AdminServiceInfo: FC<Props> = ({ data }) => {
  const {
    fname,
    lname,
    address,
    email,
    phone,
    location,
    color,
    name,
    model,
    serviceRequestCreatedAt,
    requestNote,
    vehicleMake,
    vehicleYear,
    quote,
    customer,
    company,
    completionTime,
    timeTaken,
    processingFee, // Destructure processingFee
  } = data;

  const isCompanyAssigned = company && company.name;

  const renderDetailItem = (
    label: string,
    value: string | number | null | undefined,
    defaultValue: string = "N/A",
  ) => (
    <p className="text-sm">
      <span className="fw-500 text-gray-600">{label}:</span>{" "}
      <span className="fw-600 text-gray-800">{value || defaultValue}</span>
    </p>
  );

  return (
    <div className="bg-white shadow-lg mt-6 rounded-xl p-6 border border-gray-100">
      <div className="mb-6 border-b pb-4">
        <p className="fw-600 flex items-center gap-x-2 text-xl text-primary">
          <span className="block w-3 h-3 rounded-full bg-primary"></span>{" "}
          Service Request Details
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Customer Section */}
        <div className="lg:col-span-1 border-r pr-6">
          <div className="flex items-center gap-x-3 mb-4">
            <ProfileAvatar
              name={`${customer?.fname} ${customer?.lname}`}
              url={customer?.photo || null}
              size={64}
              font={18}
            />
            <div>
              <p className="fw-700 text-lg text-gray-900">{`${customer?.fname} ${customer?.lname}`}</p>
              <p className="fw-500 text-sm text-gray-500">Customer</p>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            {renderDetailItem("Email", customer?.email)}
            {renderDetailItem("Phone", customer?.phone)}
            {renderDetailItem("Address", customer?.address)}
          </div>
        </div>

        {/* Service Details Section */}
        <div className="lg:col-span-2 pl-6">
          <p className="fw-600 text-lg mb-4 text-gray-700">
            Request Information
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="flex items-start gap-x-2">
              <IoMdTime className="text-xl text-indigo-500 mt-1 flex-shrink-0" />
              <div>
                <p className="fw-500 text-sm text-gray-600">
                  Requested Service
                </p>
                <p className="fw-600 text-base">{name}</p>
              </div>
            </div>
            <div className="flex items-start gap-x-2">
              <IoMdTime className="text-xl text-indigo-500 mt-1 flex-shrink-0" />
              <div>
                <p className="fw-500 text-sm text-gray-600">Request Time</p>
                <p className="fw-600 text-base">
                  {format_time(serviceRequestCreatedAt)}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-x-2">
              <MdLocationPin className="text-xl text-indigo-500 mt-1 flex-shrink-0" />
              <div>
                <p className="fw-500 text-sm text-gray-600">Location</p>
                <p className="fw-600 text-base">{location}</p>
              </div>
            </div>
            <div className="flex items-start gap-x-2">
              <HiCurrencyDollar className="text-xl text-indigo-500 mt-1 flex-shrink-0" />
              <div>
                <p className="fw-500 text-sm text-gray-600">Quoted Fee</p>
                <p className="fw-600 text-base text-green-600">
                  {formatAsNgnMoney(quote)}
                </p>
              </div>
            </div>

            {completionTime && (
              <div className="flex items-start gap-x-2">
                <IoMdTime className="text-xl text-indigo-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="fw-500 text-sm text-gray-600">
                    Completion Time
                  </p>
                  <span className="fw-600 text-base">
                    {format_time(completionTime)}
                  </span>
                </div>
              </div>
            )}
            {processingFee && ( // Conditionally render processing fee
              <div className="flex items-start gap-x-2">
                <HiCurrencyDollar className="text-xl text-indigo-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="fw-500 text-sm text-gray-600">Processing Fee</p>
                  <p className="fw-600 text-base text-gray-800">
                    {formatAsNgnMoney(processingFee)}
                  </p>
                </div>
              </div>
            )}
            {data.completionTime && (
              <div className="flex items-start gap-x-2">
                <IoMdTime className="text-xl text-indigo-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="fw-500 text-sm text-gray-600">Response Time</p>
                  <span className="fw-600 text-base">
                    {format_time(completionTime)}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-start gap-x-2">
              <MdOutlineStickyNote2 className="text-xl text-indigo-500 mt-1 flex-shrink-0" />
              <div>
                <p className="fw-500 text-sm text-gray-600">Request Note</p>
                <p className="text-sm text-gray-800 italic">{requestNote}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Provider Section */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="fw-600 flex items-center gap-x-2 text-lg mb-4 text-gray-700">
          <GiAutoRepair className="text-xl text-indigo-500" />
          Service Provider
        </p>

        {!isCompanyAssigned ? (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 fw-500">
            Service Provider Assignment Pending
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Company Details */}
            <div className="p-4 border rounded-lg shadow-sm">
              <p className="fw-600 text-base mb-3 text-gray-700 border-b pb-2">
                Company Details
              </p>
              <div className="space-y-2">
                {renderDetailItem("Name", company?.name)}
                {renderDetailItem("Email", company?.email)}
                {renderDetailItem("Phone Number", company?.phone)}
              </div>
            </div>

            {/* Technician Details */}
            <div className="p-4 border rounded-lg shadow-sm">
              <p className="fw-600 text-base mb-3 text-gray-700 border-b pb-2">
                Technician Details
              </p>
              <div className="space-y-2">
                {renderDetailItem("Name", `${fname} ${lname}`)}
                {renderDetailItem("Email", email)}
                {renderDetailItem("Phone Number", phone)}
                {renderDetailItem("Address", address)}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Car Details Section */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="fw-600 flex items-center gap-x-2 text-lg mb-4 text-gray-700">
          <FaCar className="text-xl text-indigo-500" />
          Vehicle Details
        </p>
        <div className="grid gap-4 md:grid-cols-4 p-4 bg-gray-50 rounded-lg border">
          {renderDetailItem("Make", vehicleMake)}
          {renderDetailItem("Model", model)}
          {renderDetailItem("Year", vehicleYear)}
          {renderDetailItem("Color", color)}
        </div>
      </div>
    </div>
  );
};

export default AdminServiceInfo;
