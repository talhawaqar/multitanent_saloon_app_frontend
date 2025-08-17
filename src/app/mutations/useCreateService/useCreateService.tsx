// import { QueryKey } from "@/app/constants";
import { QueryKey } from "@/app/constants";
import { ServiceType } from "@/app/types";
import { axiosInstance } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (service: ServiceType) => {
      // if (!userProfileId || !businessEntityId || !remittance) {
      //   return Promise.reject('Invalid request');
      // }

      const {
        data: { createdService },
      }: { data: { createdService: ServiceType } } = await axiosInstance.post(
        "/services/create",
        { service }
      );
      return createdService;
    },
    onSuccess: async (createdService: ServiceType) => {
      queryClient.setQueryData(
        [QueryKey.List_ALL_SERVICES, "userProfileId", "params"],
        (items: ServiceType[] = []) => [...items, createdService]
      );
    },
  });
}
