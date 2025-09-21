"use client";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/utils";
import { QueryKey } from "../../constants";
import { CategoryType } from "@/app/types";
import { useAtom } from "jotai";
import { authAtom } from "../../atoms";
export function useListAllCategories({
  enabled = true,
  skipGlobalLoadingSpinner = false,
}: {
  enabled?: boolean;
  skipGlobalLoadingSpinner?: boolean;
}) {
  const [{ token }] = useAtom(authAtom);
  return useQuery({
    queryKey: [QueryKey.List_ALL_CATEGORIES, "params"],
    queryFn: async function listAllCategories(): Promise<CategoryType[]> {
      if (!token) {
        return Promise.reject("Invalid request");
      }

      const { data } = await axiosInstance.get(
        `categories/get-all-categories`,
        {
          headers: {
            authorization: `Auth ${token}`,
          },
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
