import dayjs from "dayjs";
import { FaCar } from "react-icons/fa6";
import { MdLocationPin, MdOutlineStickyNote2 } from "react-icons/md";
import ProfileAvatar from "../../../ui/ProfileAvatar";
import { IoMdTime } from "react-icons/io";
import { HiCurrencyDollar } from "react-icons/hi2";
import { GiAutoRepair } from "react-icons/gi";
import { FC } from "react";
import { formatAsNgnMoney } from "../../../../utils";
import { format_time } from "../../../../../utils/utils";

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
const UserInfo: FC<Props> = ({ data }) => {
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
  } = data;
  // return <>{JSON.stringify(data)}</>;
  return (
    <div className="bg-white shadow mt-6 rounded-lg p-4">
      <div>
        <div className="flex justify-between">
          <p className="fw-500 flex items-center gap-x-1 text-lg">
            <span className="block w-4 h-4 circle bg-primary"></span> Service
            Information
          </p>
        </div>
      </div>
      <div className="mt-6 text-black">
        {/* Customer Details */}
        <div className="mb-6 p-4 border rounded-lg shadow-sm">
          <div className="flex items-center gap-x-3 mb-4">
            <ProfileAvatar
              name={`${customer.fname} ${customer.lname}`}
              url={""}
              size={60}
              font={18}
            />
            <div>
              <p className="fw-600 text-lg">{`${customer.fname} ${customer.lname}`}</p>
              <p className="fw-500 text-gray-600">Customer</p>
            </div>
          </div>
          <div className="space-y-2 text-gray-700">
            <p className="flex items-center gap-x-2">
              <MdLocationPin className="text-xl text-gray-500" />
              <span className="fw-500">{location}</span>
            </p>
            <p className="flex items-center gap-x-2">
              <MdOutlineStickyNote2 className="text-xl text-gray-500" />
              <span className="fw-500">{requestNote}</span>
            </p>
            <p className="flex items-center gap-x-2">
              <HiCurrencyDollar className="text-xl text-gray-500" />
              Quoted fee:{" "}
              <span className="fw-600">{formatAsNgnMoney(quote)}</span>
            </p>
            <p className="flex items-center gap-x-2">
              <IoMdTime className="text-xl text-gray-500" />
              Requested: <span className="fw-600">{name}</span> at{" "}
              {format_time(serviceRequestCreatedAt)}
            </p>
            {completionTime && (
              <p className="flex items-center gap-x-2">
                <IoMdTime className="text-xl text-gray-500" />
                Completion Time:{" "}
                <span className="fw-600">{format_time(completionTime)}</span>
              </p>
            )}
            {data.completionTime && (
              <p className="flex items-center gap-x-2">
                <IoMdTime className="text-xl text-gray-500" />
                Response Time:{" "}
                <span className="fw-600">{format_time(completionTime)}</span>
              </p>
            )}
          </div>
        </div>

        {/* Service Provider Details */}
        <div className="mb-6 p-4 border rounded-lg shadow-sm">
          <p className="fw-600 flex items-center gap-x-2 text-lg text-gray-800 mb-4">
            <GiAutoRepair className="text-2xl text-gray-600" />
            Service Provider
          </p>

          <div className="mb-4 pl-6 border-l-2 border-gray-200">
            <p className="fw-600 text-md text-gray-700 mb-2">Company Details</p>
            <div className="space-y-1 text-gray-700">
              <p>
                Name: <span className="fw-500">{company?.name}</span>
              </p>
              <p>
                Email: <span className="fw-500">{company?.email}</span>
              </p>
              <p>
                Phone: <span className="fw-500">{company?.phone}</span>
              </p>
            </div>
          </div>

          <div className="pl-6 border-l-2 border-gray-200">
            <p className="fw-600 text-md text-gray-700 mb-2">Technician</p>
            <div className="space-y-1 text-gray-700">
              <p>
                Name:{" "}
                <span className="fw-500">
                  {fname} {lname}
                </span>
              </p>
              <p>
                Email: <span className="fw-500">{email}</span>
              </p>
              <p>
                Phone: <span className="fw-500">{phone}</span>
              </p>
              <p>
                Address: <span className="fw-500">{address}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Car Details */}
        <div className="p-4 border rounded-lg shadow-sm">
          <p className="fw-600 flex items-center gap-x-2 text-lg text-gray-800 mb-4">
            <FaCar className="text-2xl text-gray-600" />
            Car Details
          </p>
          <div className="space-y-2 text-gray-700 pl-6">
            <p>
              Make: <span className="fw-500">{vehicleMake}</span>
            </p>
            <p>
              Model: <span className="fw-500">{model}</span>
            </p>
            <p>
              Year: <span className="fw-500">{vehicleYear}</span>
            </p>
            <p>
              Color: <span className="fw-500">{color}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
