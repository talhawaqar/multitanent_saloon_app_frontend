import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/utils";
import { QueryKey } from "../../constants";
import { CategoryType } from "@/app/types";

export function useListAllCategories({
  enabled = true,
  skipGlobalLoadingSpinner = false,
}: {
  enabled?: boolean;
  skipGlobalLoadingSpinner?: boolean;
}) {
  return useQuery({
    queryKey: [QueryKey.List_ALL_CATEGORIES, "userProfileId", "params"],
    queryFn: async function listAllCategories(): Promise<CategoryType[]> {
      const { data } = await axiosInstance.get(
        `categories/get-all-categories`,
        {
          params: {
            token: "token",
          },
        }
      );

      return data.categories;
    },
    enabled: enabled,
    meta: { skipGlobalLoadingSpinner },
  });
}
