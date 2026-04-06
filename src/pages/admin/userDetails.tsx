import CurveLoader from "../../lib/components/ui/loader/curveLoader/CurveLoader";
import { useParams } from "react-router-dom";
import UserDetailsIndex from "../../lib/components/admin/users/UserDetails";
import { useQuery } from "@tanstack/react-query";
import { adminGetUserDetails } from "../../lib/services/api/adminApi";

const AdminUserDetails = () => {
  const { id } = useParams();
  const { isLoading, data } = useQuery({
    queryKey: ["get-user-detail", `${id}`],
    queryFn: () => adminGetUserDetails(`${id}`),
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
      {!isLoading && data && <UserDetailsIndex data={data.data} />}
    </div>
  );
};

export default AdminUserDetails;
