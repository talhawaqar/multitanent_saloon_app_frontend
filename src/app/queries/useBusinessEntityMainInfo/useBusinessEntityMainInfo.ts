import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { axiosInstance } from "@/lib/utils";
import { QueryKey } from "../../constants";
import { authAtom } from "../../atoms";
import { BusinessEntityMainInfoType } from "@/app/types";

export function useBusinessEntityMainInfo({
  enabled = true,
  skipGlobalLoadingSpinner = false,
}: {
  enabled?: boolean;
  skipGlobalLoadingSpinner?: boolean;
}) {
  const [{ token }] = useAtom(authAtom);

  return useQuery({
    queryKey: [QueryKey.LIST_MAIN_BUSINESS_ENTITY_INFO],
    queryFn: async function getBusinessEntityMainInfo(): Promise<
      BusinessEntityMainInfoType[]
    > {
      if (!token) {
        return Promise.reject("Invalid request");
      }

      const { data } = await axiosInstance.get(
        `business-entities/get-business-entities-main-info`,
        {
          headers: {
            authorization: `Auth ${token}`,
          },
        }
      );
      console.log("data", data);
      return data;
    },
    enabled: enabled,
    meta: { skipGlobalLoadingSpinner },
  });
}
