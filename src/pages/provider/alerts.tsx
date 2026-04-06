import PendingService from "../../lib/components/provider/requests/RequestList";

const ServiceAlerts = () => {
  return (
    <div className="bg-white p-5 rounded-lg shadow min-h-[80vh]">
      <div className="">
        <div className="">
          <p className="fw-600 text-lg lg:text-2xl">Service Alerts</p>
          <p className="mt-2 text-gray-600">
            Review all incoming service requests on the AllDrive Platform to
            strategize for your next service rendering location.
          </p>
        </div>
        <div className="mt-4">
          <PendingService />
        </div>
      </div>
    </div>
  );
};

export default ServiceAlerts;
