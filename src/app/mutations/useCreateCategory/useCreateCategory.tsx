import { QueryKey } from "@/app/constants";
import { CategoryType } from "@/app/types";
import { axiosInstance } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (category: CategoryType) => {
      // if (!userProfileId || !businessEntityId || !remittance) {
      //   return Promise.reject('Invalid request');
      // }

      const {
        data: { createdCategory },
      }: { data: { createdCategory: CategoryType } } = await axiosInstance.post(
        "/categories/create",
        { category }
      );
      return createdCategory;
    },
    onSuccess: async (createdCategory: CategoryType) => {
      queryClient.setQueryData(
        [QueryKey.List_ALL_CATEGORIES, "userProfileId", "params"],
        (items: CategoryType[] = []) => [...items, createdCategory]
      );
    },
  });
}
