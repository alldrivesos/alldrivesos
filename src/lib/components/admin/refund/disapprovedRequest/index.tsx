import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import EmptyState from "../../../ui/EmptyState";
import CurveLoader from "../../../ui/loader/curveLoader/CurveLoader";
import { getAdminRefunds } from "../../../../services/api/adminApi";
import RefundTable from "../components/refundTable";
import { RefundResponse } from "../approvedRequest";
import { apiClient } from "../../../../services/api/serviceApi";

const RefundDisapprovedRequest = () => {
  const [params, setParams] = useState({
    page: 1,
    status: "disapproved",
  });
  const { data, isLoading, refetch } = useQuery<RefundResponse>({
    queryKey: ["admin-refund-request", params],
    queryFn: async () => {
      let resp = await apiClient.get("/services-quote/fetch-refund-requests", {
        params: { ...params, status: "DISSAPPROVED" },
      });
      return resp.data;
    },
  });

  const datas = data?.data.refundRequests;
  const count = data?.data?.total || 10;

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
            <EmptyState msg="You currently do not have any refund record on the system." />
          </div>
        )}
        {isLoading && (
          <div className="py-12 flex justify-center items-center text-black">
            <div>
              <div className="place-center">
                <CurveLoader />
              </div>
              <p className="text-center mt-5 fw-500">
                Fetching Refund Requests...
              </p>
            </div>
          </div>
        )}
        {datas && !!datas?.length && (
          <RefundTable
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

export default RefundDisapprovedRequest;
