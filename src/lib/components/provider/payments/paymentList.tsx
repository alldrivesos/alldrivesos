import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getProviderPayment } from "../../../services/api/clientApi";
import EmptyState from "../../ui/EmptyState";
import CurveLoader from "../../ui/loader/curveLoader/CurveLoader";
import PaymentTable from "./paymentTable";

const PaymentList = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery({
    queryKey: ["userPayment", page],
    queryFn: () => getProviderPayment(page),
  });

  const datas = data?.data?.payments;
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
      <div className="">
        {!isLoading && !datas.length && (
          <div>
            <EmptyState msg="You currently do not have any payment record on the system." />
          </div>
        )}
        {isLoading && (
          <div className="py-12 flex justify-center items-center text-black">
            <div>
              <div className="place-center">
                <CurveLoader />
              </div>
              <p className="text-center mt-5 fw-500">
                Fetching Payments Received...
              </p>
            </div>
          </div>
        )}
        {datas && !!datas.length && (
          <PaymentTable
            isLoading={isLoading}
            data={datas || []}
            page={page}
            next={handleNext}
            prev={handlePrev}
            count={count || 0}
          />
        )}
      </div>
    </div>
  );
};

export default PaymentList;
