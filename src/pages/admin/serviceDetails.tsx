import { useParams } from "react-router-dom";
import AdminServiceDetailsIndex from "../../lib/components/admin/services/details";
import CurveLoader from "../../lib/components/ui/loader/curveLoader/CurveLoader";
import { useQuery } from "@tanstack/react-query";
import { getSingleService } from "../../lib/services/api/serviceApi";

const AdminServiceDetails = () => {
  const { id } = useParams();
  const { isLoading, data } = useQuery({
    queryKey: ["get-admin-service-detail", `${id}`],
    queryFn: () => getSingleService(`${id}`),
  });

  return (
    <div>
      {isLoading && (
        <div className="py-12 flex justify-center items-center text-black">
          <div>
            <div className="place-center">
              <CurveLoader />
            </div>
            <p className="text-center mt-5 fw-500">
              Fetching Rendered Service...
            </p>
          </div>
        </div>
      )}
      {!isLoading && data && <AdminServiceDetailsIndex data={data.data} />}
    </div>
  );
};

export default AdminServiceDetails;
