import { useState } from "react";
import { getAdminTransactions } from "../../../../services/api/adminApi";
import { useQuery } from "@tanstack/react-query";
import PaymentListing from "./paymentListing";
import CurveLoader from "../../../ui/loader/curveLoader/CurveLoader";
import EmptyState from "../../../ui/EmptyState";
import { useDebounce } from "use-debounce";
import { apiClient } from "../../../../services/api/serviceApi";

const AdminServicePayout = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const [params, setParams] = useState({
    page: 1,
    status: "",
  });
  const { data, isLoading } = useQuery({
    queryKey: ["admin-transactions", params, debouncedSearchTerm],
    queryFn: async () => {
      let resp = await apiClient.get("transactions", {
        params: { search: debouncedSearchTerm, ...params },
      });
      return resp.data;
    },
  });
  const datas = data?.data?.trx;
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
    <>
      <div>
        <div className="">
          <div className="flex items-center justify-between">
            <p className="text-lg lg:p-2 lg:text-2xl fw-600">
              Payout Transactions
            </p>
            <input
              type="text"
              placeholder="Search payments..."
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div>
            {!isLoading && !datas.length && (
              <div>
                <EmptyState msg="There currently is no payment record on the system." />
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
            {!!datas?.length && (
              <PaymentListing
                isLoading={isLoading}
                data={datas || []}
                count={count || 0}
                page={params.page}
                next={handleNext}
                prev={handlePrev}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminServicePayout;
