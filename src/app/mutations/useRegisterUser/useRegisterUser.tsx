import { axiosInstance } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
export function useRegisterUser() {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await axiosInstance.post(`/auth/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return data;
    },
  });
}
