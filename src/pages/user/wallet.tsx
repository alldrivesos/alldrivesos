import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../lib/services/api/serviceApi";

export default function UserWallet() {
  const query = useQuery({
    queryKey: ["userWallet"],
    queryFn: async () => {
      const response = await apiClient.get("/user/wallet");
      return response.data;
    },
  });
  return <div>wallets: {JSON.stringify(query.data)}</div>;
}
