import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getSingleService } from "../../lib/services/api/serviceApi";
import CurveLoader from "../../lib/components/ui/loader/curveLoader/CurveLoader";
import RequestDetailsIndex from "../../lib/components/provider/requests/details";

const RequestDetail = () => {
  const { id } = useParams();
  const { isLoading, data } = useQuery({
    queryKey: ["get-service-detail", `${id}`],
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
      {!isLoading && data && <RequestDetailsIndex data={data.data} />}
    </div>
  );
};

export default RequestDetail;
