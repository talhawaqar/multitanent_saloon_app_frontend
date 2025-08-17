import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/utils";

export function useListAllBusinessEntities({
  enabled = true,
  skipGlobalLoadingSpinner = false,
}: {
  enabled?: boolean;
  skipGlobalLoadingSpinner?: boolean;
}) {
  return useQuery({
    queryKey: ["Qu", "userProfileId", "params"],
    queryFn: async function listAllBusinessEnttiies(): Promise<any> {
      const { data } = await axiosInstance.get(
        `business-entities/list-all-business-entities`,
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
