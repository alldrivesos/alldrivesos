import { useState } from "react";
import EmptyState from "../../ui/EmptyState";
import { useQuery } from "@tanstack/react-query";
import { getProviderPayouts } from "../../../services/api/clientApi";
import CurveLoader from "../../ui/loader/curveLoader/CurveLoader";
import PayoutTable from "./payoutTable";

const WithdrawalList = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["provider-payout-requests", page],
    queryFn: () => getProviderPayouts(page),
  });

  const datas = data?.data?.withdrawalRequests;
  const count = data?.data?.total;

  const handleNext = () => {
    if (count > page * 10) {
      setPage(page + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  return (
    <div>
       {!isLoading && !datas?.length && (
          <div>
            <EmptyState msg="You currently do not have any payout record on the system." />
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
            page={page}
            next={handleNext}
            prev={handlePrev}
            count={count || 0}
            refetch={refetch}
          />
        )}
    </div>
  );
};

export default WithdrawalList;
