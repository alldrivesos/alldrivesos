import { useState } from "react";
import PaymentListing from "./paymentListing";
import EmptyState from "../../../ui/EmptyState";
import CurveLoader from "../../../ui/loader/curveLoader/CurveLoader";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { getAdminPayments } from "../../../../services/api/adminApi";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { apiClient } from "../../../../services/api/serviceApi";

const AdminServicePayment = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const [params, setParams] = useState({
    page: 1,
    status: "",
    // search: debouncedSearchTerm,
  });
  const { data, isLoading } = useQuery({
    queryKey: ["adminPayment", params, debouncedSearchTerm],
    queryFn: async () => {
      let resp = await apiClient.get(
        "service-request/fetch-payments?page=1&status=",
        {
          params: { search: debouncedSearchTerm, ...params },
        },
      );
      return resp.data;
    },
  });
  const datas = data?.data?.payments;
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
          <div className="flex justify-between py-2">
            {" "}
            <p className="text-lg lg:p-2 lg:text-2xl fw-600">
              Service Payments
            </p>
            <input
              type="text"
              placeholder="Search payments..."
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Menu placement="bottom-end">
                <MenuHandler>
                  <Button className="bg-transparent px-3 py-2 bg-gray-50 mx-0 text-black hover:shadow-none text-md flex items-center font-normal shadow-none capitalize">
                    {params.status === "pending" ? (
                      <div className="flex items-center gap-x-2">
                        <span className="w-3 h-3 circle block bg-orange-600"></span>
                        <p className="fw-600 syne text-orange-600">
                          Pending Payments
                        </p>
                      </div>
                    ) : params.status === "Paid" ? (
                      <div className="flex items-center gap-x-2">
                        <span className="w-3 h-3 circle block bg-green-600"></span>
                        <p className="fw-600 syne text-green-600">
                          Successful Payments
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center gap-x-2">
                        <span className="w-3 h-3 circle block bg-black"></span>
                        <p className="fw-500 fw-600 syne">All Payments</p>
                      </div>
                    )}
                  </Button>
                </MenuHandler>
                <MenuList className="">
                  <MenuItem
                    className="my-1 fw-500 flex items-center gap-x-2 pt-1"
                    onClick={() =>
                      setParams({
                        ...params,
                        status: "",
                      })
                    }
                  >
                    All Payments
                  </MenuItem>
                  <MenuItem
                    className="my-1 fw-500 flex items-center gap-x-2 pt-1"
                    onClick={() =>
                      setParams({
                        ...params,
                        status: "Paid",
                      })
                    }
                  >
                    Successful Payments
                  </MenuItem>
                  <MenuItem
                    className="my-1 fw-500 flex items-center gap-x-2 pt-1"
                    onClick={() =>
                      setParams({
                        ...params,
                        status: "pending",
                      })
                    }
                  >
                    Pending Payments
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
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

export default AdminServicePayment;
