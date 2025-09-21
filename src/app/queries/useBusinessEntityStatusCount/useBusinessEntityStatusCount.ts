import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { axiosInstance } from "@/lib/utils";
import { QueryKey } from "../../constants";
import { authAtom } from "../../atoms";

export function useBusinessEntityStatusCount({
  enabled = true,
  skipGlobalLoadingSpinner = false,
}: {
  enabled?: boolean;
  skipGlobalLoadingSpinner?: boolean;
}) {
  const [{ token }] = useAtom(authAtom);

  return useQuery({
    queryKey: [QueryKey.BUSINESS_ENTITY_STATUS_COUNT],
    queryFn: async function getBusinessEntityStatusCount(): Promise<{ any }> {
      if (!token) {
        return Promise.reject("Invalid request");
      }

      const { data } = await axiosInstance.get(
        `business-entities/business-entities-statuses-count`,
        {
          headers: {
            authorization: `Auth ${token}`,
          },
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
