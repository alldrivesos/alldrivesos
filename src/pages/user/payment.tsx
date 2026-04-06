import { useQuery } from "@tanstack/react-query";
import PaymentList from "../../lib/components/user/payments/PaymentList";
import { getMyPayment } from "../../lib/services/api/clientApi";
import { useState } from "react";

const UserPayments = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery({
    queryKey: ["userPayment", page],
    queryFn: () => getMyPayment(page),
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
    <>
      <div>
        <div className="bg-white p-6 rounded-lg shadow min-h-[80vh]">
          <p className="text-lg lg:p-2 lg:text-2xl fw-600">Service Payments</p>
          <div>
            {datas && !!datas.length && (
              <PaymentList
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
      </div>
    </>
  );
};

export default UserPayments;
