import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../lib/services/api/serviceApi";
import { useState } from "react";
import { Eye, EyeOff, RefreshCcw, UserX, UserCheck } from "lucide-react";

interface SuspensionLog {
  id: string;
  userId: string;
  reason: string;
  suspendedBy: string | null;
  unsuspendedBy: string | null;
  actionDate: string;
  suspensionStatus: string;
  createdAt: string;
  updatedAt: string;
}

interface SuspensionLogsResponse {
  success: boolean;
  data: SuspensionLog[];
  pagination: {
    nextPage: string | null;
    prevPage: string | null;
    limit: number;
  };
}

export default function SuspensionLogs({ id }: { id: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const { data, isLoading, isError, error, refetch, isRefetching } =
    useQuery<SuspensionLogsResponse>({
      queryKey: ["suspensionLogs", id],
      queryFn: async () => {
        const response = await apiClient.get(`/users/suspension-logs/${id}`, {
          params: { limit: 20 },
        });
        return response.data;
      },
      enabled: isExpanded, // Only fetch data when expanded
    });

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="container mx-auto p-4 ring mt-4 ring-gray-300 rounded-md bg-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-800">Suspension Logs</h2>
        <div className="flex space-x-2">
          {isExpanded && (
            <button
              onClick={() => refetch()}
              disabled={isLoading || isRefetching}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-colors duration-200 flex items-center space-x-2"
            >
              <RefreshCcw
                className={`w-4 h-4 ${isRefetching ? "animate-spin" : ""}`}
              />
              <span>{isRefetching ? "Refreshing..." : "Refresh"}</span>
            </button>
          )}
          <button
            onClick={toggleExpansion}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 flex items-center space-x-2"
          >
            {isExpanded ? (
              <>
                <EyeOff className="w-4 h-4" />
                <span>Hide Logs</span>
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                <span>Show Logs</span>
              </>
            )}
          </button>
        </div>
      </div>

      {isExpanded && (
        <>
          {isLoading && (
            <div className="text-center p-4">Loading suspension logs...</div>
          )}

          {isError && (
            <div className="text-center p-4 text-red-600">
              Error: {error?.message || "Failed to fetch suspension logs"}
            </div>
          )}

          {!isLoading && !isError && (!data || data.data.length === 0) && (
            <div className="text-center p-4 text-gray-500">
              No suspension logs found for this user.
            </div>
          )}

          {!isLoading && !isError && data && data.data.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.data.map((log) => (
                <div
                  key={log.id}
                  className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1 ${
                        log.suspensionStatus === "suspended"
                          ? "bg-red-100 text-red-800"
                          : log.suspensionStatus === "unsuspended"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {log.suspensionStatus === "suspended" && (
                        <UserX className="w-4 h-4" />
                      )}
                      {log.suspensionStatus === "unsuspended" && (
                        <UserCheck className="w-4 h-4" />
                      )}
                      <span>
                        {log.suspensionStatus.charAt(0).toUpperCase() +
                          log.suspensionStatus.slice(1)}
                      </span>
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(log.actionDate).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 mb-2">
                    {log.reason}
                  </p>
                  <div className="text-sm text-gray-600 space-y-1">
                    {log.suspendedBy && (
                      <p>
                        <strong>Suspended By:</strong> {log.suspendedBy}
                      </p>
                    )}
                    {log.unsuspendedBy && (
                      <p>
                        <strong>Unsuspended By:</strong> {log.unsuspendedBy}
                      </p>
                    )}
                    <p>
                      <strong>Created At:</strong>{" "}
                      {new Date(log.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
