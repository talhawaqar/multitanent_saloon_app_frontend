import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/utils";
import { QueryKey } from "../../constants";
import { ServiceType } from "@/app/types";

export function useListAllActiveServices({
  enabled = true,
  skipGlobalLoadingSpinner = false,
}: {
  enabled?: boolean;
  skipGlobalLoadingSpinner?: boolean;
}) {
  return useQuery({
    queryKey: [QueryKey.LIST_ALL_ACTIVE_SERVICES],
    queryFn: async function listAllActiveServices(): Promise<ServiceType[]> {
      const { data } = await axiosInstance.get(`services/get-active-services`, {
        params: {
          token: "token",
        },
      });
      return data;
    },
    enabled: enabled,
    meta: { skipGlobalLoadingSpinner },
  });
}
