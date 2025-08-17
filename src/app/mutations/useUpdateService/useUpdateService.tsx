import { QueryKey } from "@/app/constants";
import { ServiceType } from "@/app/types";
import { axiosInstance } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (service: ServiceType) => {
      // if (!userProfileId || !businessEntityId || !remittance) {
      //   return Promise.reject('Invalid request');
      // }

      const {
        data: { updatedService },
      }: { data: { updatedService: ServiceType } } = await axiosInstance.put(
        "/services/update",
        { service }
      );

      return updatedService;
    },
    onSuccess: async (updatedService: ServiceType) => {
      queryClient.setQueryData(
        [QueryKey.List_ALL_SERVICES, "userProfileId", "params"],
        (items: ServiceType[] = []) =>
          items.map((item: ServiceType) => {
            if (item.id === updatedService.id) {
              return updatedService;
            }
            return item;
          })
      );
    },
  });
}
