import { useQuery } from "@tanstack/react-query";
import { admingetPayoutRequest } from "../../../../services/api/adminApi";
import EmptyState from "../../../ui/EmptyState";
import CurveLoader from "../../../ui/loader/curveLoader/CurveLoader";
import PayoutTable from "../components/payoutTable";
import { useState } from "react";
import { apiClient } from "../../../../services/api/serviceApi";

const ApprovedRequests = () => {
  const [params, setParams] = useState({
    page: 1,
    status: "approved",
    user_type: "professional",
  });
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["admin-payout-request", params],
    queryFn: async () => {
      let resp = await apiClient.get("/service-request/fetch-withdrawals", {
        params: params,
      });
      return resp.data;
    },
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
      setParams({ ...params, page: params.page + 1 });
    }
  };
  return (
    <div>
      <div className="">
        {!isLoading && !datas?.length && (
          <div>
            <EmptyState msg="You currently do not have any approved payout record on the system." />
          </div>
        )}
        {isLoading && (
          <div className="py-12 flex justify-center items-center text-black">
            <div>
              <div className="place-center">
                <CurveLoader />
              </div>
              <p className="text-center mt-5 fw-500">
                Fetching Approved Payouts...
              </p>
            </div>
          </div>
        )}
        {datas && !!datas?.length && (
          <PayoutTable
            isLoading={isLoading}
            data={datas || []}
            page={params.page}
            next={handleNext}
            prev={handlePrev}
            count={count || 0}
            refetch={refetch}
            status={params.status}
          />
        )}
      </div>
    </div>
  );
};

export default ApprovedRequests;
