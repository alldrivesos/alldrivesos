import { useParams } from "react-router-dom";
import ProfileAvatar from "../../lib/components/ui/ProfileAvatar";
import { Rating } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { getOneService } from "../../lib/services/api/clientApi";
import CurveLoader from "../../lib/components/ui/loader/curveLoader/CurveLoader";
import dayjs from "dayjs";
import { formatAsNgnMoney } from "../../lib/utils";
import TrackingBtn from "../../lib/components/user/requestDetails/TrackingBtn";
import ServiceProgress from "../../lib/components/user/requestDetails/ServiceProgress";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { format_time } from "../../utils/utils";
import {
  Car,
  Clock,
  DollarSign,
  MapPin,
  User,
  Building,
  Tag,
  Info,
  Calendar,
  CheckCircle,
  Hourglass,
  Palette,
  Gauge,
  ClipboardList,
} from "lucide-react";

const ServiceDetails = () => {
  const { id } = useParams();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["userServiceData", `${id}`],
    queryFn: () => getOneService(`${id}`),
  });
  const payment = data?.data?.serviceRequest?.payment;
  const isPaid = payment && (payment?.status).toLowerCase() === "paid";
  const getTotal = () => {
    const totalPay =
      Number(payment?.amount) + Number(payment?.charge) + Number(payment?.tax);
    return totalPay;
  };
  // return <></>;
  useEffect(() => {
    // console.log(data.data.s);
    // if (data?.data) {
    //   if (data?.data?.status == "fulfilled" || data?.data?.status == "Paid") {
    //     console.log("data");
    //     toast("complete order by clicking action button");
    //   }
    // }
  }, [data]);
  return (
    <div className="pb-24">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 p-6 bg-white shadow-md rounded-lg">
        <div className="mb-4 lg:mb-0">
          <p className="text-sm text-gray-500 flex items-center gap-2">
            <Tag size={18} className="text-primary" /> Service ID:{" "}
            <span className="uppercase font-semibold text-gray-800 tracking-wide">
              {id}
            </span>
          </p>
          <h1 className="font-bold mt-2 text-2xl lg:text-4xl text-gray-900 leading-tight">
            {data?.data?.serviceRequest?.service?.name}
          </h1>
        </div>
        {isPaid && (
          <div className="w-full lg:w-auto">
            <TrackingBtn
              id={`${id}`}
              lat={data?.data?.serviceRequest?.latitude}
              lng={data?.data?.serviceRequest?.longitude}
              driverLat={data?.data?.driverQuote?.latitude}
              driverLng={data?.data?.driverQuote?.longitude}
              miles={data?.data?.driverQuote?.distance}
              time={data?.data?.driverQuote?.timeTaken}
            />
          </div>
        )}
      </div>
      {isLoading && (
        <div className="py-12 flex flex-col justify-center items-center text-black bg-white shadow-md rounded-lg mt-6">
          <div className="flex place-center">
            <CurveLoader />
          </div>
          <p className="text-center mt-5 font-medium text-lg">
            Fetching Service Details...
          </p>
        </div>
      )}
      {data && !isLoading && (
        <div>
          {isPaid && (
            <div>
              <div className="mt-6">
                <ServiceProgress
                  id={`${id}`}
                  status={data?.data?.serviceRequest?.status}
                  query={data?.data?.serviceRequest?.queryNote}
                  refetch={refetch}
                />
              </div>
              <div className="bg-white shadow mt-6 rounded-lg p-6">
                <div className="flex items-center gap-x-2 text-xl font-semibold text-gray-800 border-b pb-3 mb-6">
                  <User className="text-primary" size={24} /> Provider Details
                </div>
                <div className="flex items-center gap-x-4 mb-6">
                  <ProfileAvatar
                    url={""}
                    name={`${data?.data?.driver?.fname} ${data?.data?.driver?.lname}`}
                    size={80}
                    font={24}
                  />
                  <div>
                    <p className="font-semibold mb-1 text-xl text-gray-900">{`${data?.data?.driver?.fname} ${data?.data?.driver?.lname}`}</p>
                    <div className="flex items-center gap-2 font-bold text-blue-gray-500">
                      {data?.data?.driver?.reviewsAvg ? (
                        <>
                          {data?.data?.driver?.reviewsAvg}.0
                          <Rating
                            value={Number(data?.data?.driver?.reviewsAvg)}
                            readonly
                          />
                        </>
                      ) : (
                        <span className="text-gray-500 text-sm">
                          No ratings yet
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="flex flex-col gap-1 p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center gap-x-2 text-gray-700">
                      <Building size={20} className="text-gray-500" />
                      <p className="text-gray-600 font-medium">Company:</p>
                    </div>
                    <p className="font-semibold text-gray-900 ml-7">
                      {data?.data?.driverCompany?.name || "N/A"}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center gap-x-2 text-gray-700">
                      <Car size={20} className="text-gray-500" />
                      <p className="text-gray-600 font-medium">
                        Car Description:
                      </p>
                    </div>
                    <p className="font-semibold text-gray-900 ml-7">
                      {data?.data?.driverMoreInfo?.car_description || "N/A"}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center gap-x-2 text-gray-700">
                      <Gauge size={20} className="text-gray-500" />
                      <p className="text-gray-600 font-medium">Plate Number:</p>
                    </div>
                    <p className="font-semibold text-gray-900 ml-7">
                      {data?.data?.driverMoreInfo?.plate_number || "N/A"}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center gap-x-2 text-gray-700">
                      <DollarSign size={20} className="text-gray-500" />
                      <p className="text-gray-600 font-medium">Service Cost:</p>
                    </div>
                    <p className="font-semibold text-gray-900 ml-7">
                      {formatAsNgnMoney(getTotal())}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center gap-x-2 text-gray-700">
                      <Info size={20} className="text-gray-500" />
                      <p className="text-gray-600 font-medium">
                        Additional Info:
                      </p>
                    </div>
                    <p className="font-semibold text-gray-900 ml-7">N/A</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="bg-white shadow mt-6 rounded-lg p-6">
            <div className="flex items-center gap-x-2 text-xl font-semibold text-gray-800 border-b pb-3 mb-6">
              <ClipboardList className="text-primary" size={24} /> Service
              Details
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex flex-col gap-1 p-3 bg-gray-50 rounded-md">
                <div className="flex items-center gap-x-2 text-gray-700">
                  <Car size={20} className="text-gray-500" />
                  <p className="text-gray-600 font-medium">Vehicle Make:</p>
                </div>
                <p className="font-semibold text-gray-900 ml-7">
                  {data?.data?.serviceRequest?.vehicleMake || "N/A"}
                </p>
              </div>
              <div className="flex flex-col gap-1 p-3 bg-gray-50 rounded-md">
                <div className="flex items-center gap-x-2 text-gray-700">
                  <Car size={20} className="text-gray-500" />
                  <p className="text-gray-600 font-medium">Vehicle Model:</p>
                </div>
                <p className="font-semibold text-gray-900 ml-7">
                  {data?.data?.serviceRequest?.model || "N/A"}
                </p>
              </div>
              <div className="flex flex-col gap-1 p-3 bg-gray-50 rounded-md">
                <div className="flex items-center gap-x-2 text-gray-700">
                  <Calendar size={20} className="text-gray-500" />
                  <p className="text-gray-600 font-medium">Car Year:</p>
                </div>
                <p className="font-semibold text-gray-900 ml-7">
                  {data?.data?.serviceRequest?.vehicleYear || "N/A"}
                </p>
              </div>
              <div className="flex flex-col gap-1 p-3 bg-gray-50 rounded-md">
                <div className="flex items-center gap-x-2 text-gray-700">
                  <Palette size={20} className="text-gray-500" />
                  <p className="text-gray-600 font-medium">Car Color:</p>
                </div>
                <p className="font-semibold text-gray-900 ml-7">
                  {data?.data?.serviceRequest?.color || "N/A"}
                </p>
              </div>
              <div className="flex flex-col gap-1 p-3 bg-gray-50 rounded-md">
                <div className="flex items-center gap-x-2 text-gray-700">
                  <MapPin size={20} className="text-gray-500" />
                  <p className="text-gray-600 font-medium">Service Location:</p>
                </div>
                <p className="font-semibold text-gray-900 ml-7">
                  {data?.data?.serviceRequest?.location || "N/A"}
                </p>
              </div>
              <div className="flex flex-col gap-1 p-3 bg-gray-50 rounded-md">
                <div className="flex items-center gap-x-2 text-gray-700">
                  <Info size={20} className="text-gray-500" />
                  <p className="text-gray-600 font-medium">Service Info:</p>
                </div>
                <p className="font-semibold text-gray-900 ml-7">
                  {data?.data?.serviceRequest?.requestNote || "N/A"}
                </p>
              </div>
              <div className="flex flex-col gap-1 p-3 bg-gray-50 rounded-md">
                <div className="flex items-center gap-x-2 text-gray-700">
                  <Clock size={20} className="text-gray-500" />
                  <p className="text-gray-600 font-medium">Request Time:</p>
                </div>
                <p className="font-semibold text-gray-900 ml-7">
                  {format_time(data?.data?.serviceRequest?.createdAt)}
                </p>
              </div>
              <div className="flex flex-col gap-1 p-3 bg-gray-50 rounded-md">
                <div className="flex items-center gap-x-2 text-gray-700">
                  <Clock size={20} className="text-gray-500" />
                  <p className="text-gray-600 font-medium">Response Time:</p>
                </div>
                <p className="font-semibold text-gray-900 ml-7">
                  {format_time(data?.data?.serviceRequest?.updatedAt)}
                </p>
              </div>
              <div className="flex flex-col gap-1 p-3 bg-gray-50 rounded-md">
                <div className="flex items-center gap-x-2 text-gray-700">
                  {data?.data?.serviceRequest?.completionTime ? (
                    <CheckCircle size={20} className="text-green-500" />
                  ) : (
                    <Hourglass size={20} className="text-yellow-500" />
                  )}
                  <p className="text-gray-600 font-medium">Completion Time:</p>
                </div>
                <p className="font-semibold text-gray-900 ml-7">
                  {data?.data?.serviceRequest?.completionTime
                    ? format_time(data?.data?.serviceRequest?.completionTime)
                    : "Not Completed"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;
