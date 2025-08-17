import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/utils";
import { QueryKey } from "../../constants";
import { ServiceType } from "@/app/types";

export function useListAllServices({
  enabled = true,
  skipGlobalLoadingSpinner = false,
}: {
  enabled?: boolean;
  skipGlobalLoadingSpinner?: boolean;
}) {
  return useQuery({
    queryKey: [QueryKey.List_ALL_SERVICES, "userProfileId", "params"],
    queryFn: async function listAllCategories(): Promise<ServiceType[]> {
      const { data } = await axiosInstance.get(`services/get-all-services`, {
        params: {
          token: "token",
        },
      });
      console.log(data);
      return data;
    },
    enabled: enabled,
    meta: { skipGlobalLoadingSpinner },
  });
}
