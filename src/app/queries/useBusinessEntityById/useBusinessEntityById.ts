import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { axiosInstance } from "@/lib/utils";
import { QueryKey } from "../../constants";
import { authAtom } from "../../atoms";
import { BusinessEntityMainInfoType } from "@/app/types";

export function useBusinessEntityById(id?: number) {
  const [{ token }] = useAtom(authAtom);

  return useQuery({
    queryKey: [QueryKey.BUSINESS_ENTITY_BY_ID],
    queryFn: async function getBusinessEntityById(): Promise<
      BusinessEntityMainInfoType[]
    > {
      if (!token) {
        return Promise.reject("Invalid request");
      }

      const { data } = await axiosInstance.get(`business-entities/find-by-id`, {
        headers: {
          authorization: `Auth ${token}`,
        },
        params: {
          id,
        },
      });
      console.log("data be", data);
      return data;
    },
    enabled: !!id && !!token,
  });
}
