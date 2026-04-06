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

interface TaxRateDetails {
  state: string;
  country: string;
  tax_type: string;
  rate_type: string;
  flat_amount: null;
  percentage_decimal: string;
}

interface TaxBreakdown {
  amount: number;
  inclusive: boolean;
  taxable_amount: number;
  tax_rate_details: TaxRateDetails;
  taxability_reason: string;
}

interface ServiceRequest {
  id: string;
  ref: null;
  userId: string;
  userType: string;
  providerId: null;
  status: string;
  processStatus: null;
  serviceId: string;
  amount: number;
  vehicleMake: string;
  model: string;
  vehicleYear: string;
  color: string;
  location: string;
  zipcode: null;
  requestNote: string;
  createdAt: string;
  updatedAt: string;
  latitude: string;
  longitude: string;
  city: null;
  queryNote: null;
  userFcmToken: string | null;
  state: null;
  vehicleType: string;
  completionTime: null;
  serviceRequestId: string;
  driverQuoteId: string;
  companyCharge: number;
  charge: number;
  tax: number;
  paymentRef: string;
  clientSecret: string;
  driverChargeForAdmin: number;
  remitted: null;
  tax_breakdown: TaxBreakdown[] | null;
  name: null;
  slug: string;
  icon: string;
  isPublished: number;
  questionNote: string;
  minimumQuote: null;
  fname: string;
  lname: string;
  email: string;
  phone: string;
  password: string;
  isActive: number;
  isSuspended: number;
  token: null;
  street: null;
  referralId: null;
  level: number;
  hasActiveSubscription: null;
  isAvailableForService: null;
  expiredAt: null;
  planId: null;
  invitationId: null;
  verified: number;
  companyId: null;
  reviewsAvg: number;
  serviceCharge: null;
  fcmToken: string;
  pendingBal: string | null;
  address: string;
  deletedAt: null;
  photo: string;
  last_login: string;
  walletBal: string | null;
  referralSource: null;
  service_area: null;
  driverOverallPendingBal: string | null;
  driverOverallWalletBal: string | null;
  sms_opt_in: number;
  reason_for_suspension: string | null;
  reason_for_unsuspension: string | null;
  serviceRequestStatus: string;
  paymentStatus: string;
  serviceRequestCreatedAt: string;
  serviceName: string;
}

interface Item {
  id: string;
  user_id: string;
  brands: string[];
  service_rendered: ServiceRendered[];
  account_name: string;
  account_number: string;
  bank_name: string;
  routing_number: string;
  fees: null;
  isVerified: number;
  reason: string;
  createdAt: string;
  updatedAt: string;
  car_description: string;
  plate_number: string;
  longitude: string;
  latitude: string;
  zipcode: string;
  city: string;
  stripeAccountId: string;
  identityBack: string;
  identityFront: string;
  cityOfResidence: string;
  dob: string;
  ssn_last_4: string;
  device_ip: string;
  state: string;
  identityFrontId: string;
  identityBackId: string;
  phone_number: string;
  service_area: null;
  location: Location;
  location_status: string;
  location_last_updated: string;
  fname: string;
  lname: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  isActive: number;
  isSuspended: number;
  token: null;
  street: null;
  referralId: null;
  userType: string;
  level: number;
  hasActiveSubscription: null;
  isAvailableForService: null;
  expiredAt: null;
  planId: null;
  invitationId: string;
  verified: number;
  companyId: string;
  reviewsAvg: number;
  serviceCharge: null;
  fcmToken: string;
  pendingBal: string;
  address: string;
  deletedAt: null;
  photo: string;
  last_login: string;
  walletBal: string;
  referralSource: null;
  driverOverallPendingBal: string;
  driverOverallWalletBal: string;
  sms_opt_in: number;
  reason_for_suspension: string;
  reason_for_unsuspension: string;
  avgRating: number;
  serviceRequests: ServiceRequest[];
}
export default function VehicleInfo({ item }: { item: Item }) {
  return (
    <div className="font-bold">
      <div className="border-t border-gray-200 ">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm  text-gray-700 ">Car Description</dt>
            <dd className="mt-1 text-sm text-black sm:mt-0 sm:col-span-2">
              {/*{JSON.stringify(item)}*/}
              {item.car_description}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm  text-gray-700">Plate Number</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {item.plate_number}
            </dd>
          </div>
          {/*<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Brands</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {item.brands && item.brands.length > 0
                ? item.brands.join(", ")
                : "N/A"}
            </dd>
          </div>*/}
        </dl>
      </div>
    </div>
  );
}
