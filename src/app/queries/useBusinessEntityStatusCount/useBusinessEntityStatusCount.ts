import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/utils";

export function useBusinessEntityStatusCount({
  enabled = true,
  skipGlobalLoadingSpinner = false,
}: {
  enabled?: boolean;
  skipGlobalLoadingSpinner?: boolean;
}) {
  return useQuery({
    queryKey: ["Qu", "userProfileId", "params"],
    queryFn: async function getBusinessEntityStatusCount(): Promise<any> {
      const { data } = await axiosInstance.get(
        `business-entities/business-entities-statuses-count`,
        {
          params: {
            token: "token",
          },
        }
      );

      return data;
    },
    enabled: enabled,
    meta: { skipGlobalLoadingSpinner },
  });
}
