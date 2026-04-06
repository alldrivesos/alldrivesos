import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../lib/services/api/serviceApi";
import LandingLayout from "../../lib/components/layout/landing";
import type { ServiceCatItem } from "../../types/service";
import { useNavigate } from "react-router-dom";

export default function AllServices() {
  const navigate = useNavigate();
  const { data: service, isLoading } = useQuery({
    queryKey: ["getCat"],
    queryFn: getCategories,
  });

  return (
    <LandingLayout>
      <div className=" bg-primary">
        <div className=" bg-primary box py-20 text-white">
          <h1 className="text-2xl lg:text-4xl fw-700">All Services</h1>
          <p className="mt-2 fs-400 fw-500">
            Explore our full range of roadside assistance services.
          </p>
        </div>
      </div>
      <div className="min-h-screen section bg-[#F8F8F8]">
        <div className="box">
          {isLoading ? (
            <p>Loading services...</p>
          ) : (
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
              {service?.data?.map((item: ServiceCatItem) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/all-services/${item.id}`)}
                  className="new-shade text-center h-[250px] rounded-[13px] bg-white w-full place-center hover:scale-105 duration-100 cursor-pointer"
                >
                  <div>
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="w-16 mx-auto"
                    />
                    <p className="mt-4 fw-600">{item.name}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </LandingLayout>
  );
}
