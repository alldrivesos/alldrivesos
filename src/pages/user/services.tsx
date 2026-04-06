import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../lib/services/api/serviceApi";
import { FaArrowRightLong } from "react-icons/fa6";
import { ServiceCatItem } from "../../lib/types/service";

const UserServices = () => {
  const { data: service, isLoading } = useQuery({
    queryKey: ["getCat"],
    queryFn: getCategories,
  });
  const navigate = useNavigate();
  return (
    <div>
      <div className="bg-white p-2 lg:p-5 ">
        <div className="mb-6">
          <p className="text-2xl fw-600">AllDrive Services</p>
          <p className="fs-400 mt-1 lg:w-8/12">
            Choose from the variety of services we render on this platform.
            Request a service and get a service professional in minutes.
          </p>
        </div>
        {!isLoading && service && !!service.data.length && (
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {service.data
              .filter((where: ServiceCatItem) => where.isPublished)
              .map((item: ServiceCatItem) => (
                <div
                  onClick={() => navigate(`/user/new-request/${item.id}`)}
                  className="new-shade text-center h-[180px] rounded-[13px] bg-white w-full place-center hover:scale-105 duration-100 cursor-pointer"
                >
                  <div>
                    <img src={item.icon} alt="icon" className="w-12 mx-auto" />
                    <p className="mt-4 fw-500">{item.name}</p>
                  </div>
                </div>
              ))}
            <div
              onClick={() => navigate("/request")}
              className="bg-[#172748] relative new-shade p-3 h-[180px] rounded-[13px] w-full place-center hover:scale-105 duration-100 cursor-pointer"
            >
              <div className="text-white lg:text-xl mb-3">
                <p className="fw-600 fs-400"></p>
                <p className="mt-4 fs-300 2xl:blockBecome a Service Provider">
                  Join our nationwide network of service providers and start
                  earning with ALLDRIVE SOS!
                </p>
              </div>
              <FaArrowRightLong className="absolute top-[140px] right-10 cursor-pointer text-white text-xl" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserServices;
