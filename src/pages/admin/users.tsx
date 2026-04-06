import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../lib/services/api/usersApi";
import UsersList from "../../lib/components/admin/users/UsersList";
import CurveLoader from "../../lib/components/ui/loader/curveLoader/CurveLoader";
import EmptyState from "../../lib/components/ui/EmptyState";
import { useDebounce } from "use-debounce";
import { apiClient } from "../../lib/services/api/serviceApi";
import React, { useState } from "react";

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const { isLoading, isError, data } = useQuery({
    queryKey: ["getUsers", debouncedSearchTerm],
    queryFn: async () => {
      let resp = await apiClient.get("all/users", {
        params: { search: debouncedSearchTerm },
      });
      return resp.data;
    },
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow min-h-[80vh]">
        <div className="flex justify-between items-center">
          <p className="fw-600 text-xl">User Management</p>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mt-5 lg:mt-10">
          {isLoading && (
            <div className="py-12 flex justify-center items-center text-black">
              <div>
                <CurveLoader />
                <p className="text-center mt-5 fw-500">Fetching Users...</p>
              </div>
            </div>
          )}
          {data && !data?.data.length && searchTerm === "" && (
            <div>
              <EmptyState msg="There's no users currently on the system." />
            </div>
          )}
          {data && !data?.data.length && searchTerm !== "" && (
            <div>
              <EmptyState msg={`No users found matching "${searchTerm}".`} />
            </div>
          )}
          {isError && <p>Error Occured</p>}
          {data && !!data?.data.length && <UsersList users={data?.data} />}
        </div>
      </div>
    </>
  );
};

export default AdminUsers;
