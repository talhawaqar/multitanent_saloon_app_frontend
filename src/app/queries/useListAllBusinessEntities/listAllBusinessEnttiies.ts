import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { axiosInstance } from "@/lib/utils";
import { QueryKey } from "../../constants";
import { authAtom } from "../../atoms";

export function useListAllBusinessEntities({
  enabled = true,
  skipGlobalLoadingSpinner = false,
}: {
  enabled?: boolean;
  skipGlobalLoadingSpinner?: boolean;
}) {
  const [{ token }] = useAtom(authAtom);

  return useQuery({
    queryKey: [QueryKey.LIST_ALL_BUSINESS_ENTITIES],
    queryFn: async function listAllBusinessEnttiies(): Promise<any> {
      if (!token) {
        return Promise.reject("Invalid request");
      }

      const { data } = await axiosInstance.get(
        `business-entities/list-all-business-entities`,
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
