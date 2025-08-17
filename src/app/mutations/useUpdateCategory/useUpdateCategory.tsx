import { QueryKey } from "@/app/constants";
import { CategoryType } from "@/app/types";
import { axiosInstance } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (category: CategoryType) => {
      // if (!userProfileId || !businessEntityId || !remittance) {
      //   return Promise.reject('Invalid request');
      // }

      const {
        data: { updatedCategory },
      }: { data: { updatedCategory: CategoryType } } = await axiosInstance.put(
        "/categories/update",
        { category }
      );
      return updatedCategory;
    },
    onSuccess: async (updatedCategory: CategoryType) => {
      queryClient.setQueryData(
        [QueryKey.List_ALL_CATEGORIES, "userProfileId", "params"],
        (items: CategoryType[] = []) =>
          items.map((item: CategoryType) => {
            if (item.id === updatedCategory.id) {
              return updatedCategory;
            }
            return item;
          })
      );
    },
  });
}
