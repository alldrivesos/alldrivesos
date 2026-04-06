import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getStaffRequest } from "../../../../services/api/companyApi";
import EmptyState from "../../../ui/EmptyState";
import CurveLoader from "../../../ui/loader/curveLoader/CurveLoader";
import PayoutTable from "../components/payoutTable";

const StaffPayoutRequest = () => {
  const [params, setParams] = useState({
    page: 1,
    status: "pending",
  });
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["staff-payout-request", params],
    queryFn: () => getStaffRequest(params),
  });

  const datas = data?.data?.withdrawalRequests;
  const count = data?.data?.total;

  const handleNext = () => {
    if (count > params.page * 10) {
      setParams({ ...params, page: params.page + 1 });
    }
  };

  const handlePrev = () => {
    if (params.page > 1) {
      setParams({ ...params, page: params.page - 1 });
    }
  };
  return (
    <div>
      <div className="">
        {!isLoading && !datas?.length && (
          <div>
            <EmptyState msg="You currently do not have any payout request record on the system." />
          </div>
        )}
        {isLoading && (
          <div className="py-12 flex justify-center items-center text-black">
            <div>
              <div className="place-center">
                <CurveLoader />
              </div>
              <p className="text-center mt-5 fw-500">
                Fetching Payout Received...
              </p>
            </div>
          </div>
        )}
        {datas && !!datas?.length && (
          <>
            {" "}
            <PayoutTable
              isLoading={isLoading}
              data={datas || []}
              page={params.page}
              next={handleNext}
              prev={handlePrev}
              count={count || 0}
              refetch={refetch}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default StaffPayoutRequest;
