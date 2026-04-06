import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { apiClient } from "../../services/api/serviceApi";

export default function GeneralNotificationPage() {
  const { id } = useParams();
  const query = useQuery({
    queryKey: [""],
    queryFn: async () => {
      let resp = await apiClient.get("/users/view/notification", {
        params: {
          id: id,
        },
      });
      return resp.data;
    },
  });

  if (query.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading notification...</p>
        </div>
      </div>
    );
  }

  if (query.error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">Unable to load the notification</p>
          <button
            onClick={() => query.refetch()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <div className="text-blue-500 text-6xl mb-4">🔔</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Notification Details
            </h1>
            <p className="text-gray-600">Viewing notification #{id}</p>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Raw Data:
            </h3>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
              {JSON.stringify(query.data, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
