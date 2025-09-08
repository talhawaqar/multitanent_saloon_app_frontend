import { axiosInstance } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";

export function useLoginUser() {
  return useMutation({
    mutationFn: async (loginData: { username: string; password: string }) => {
      const { data } = await axiosInstance.post("/auth/login", {
        username: loginData.username,
        password: loginData.password,
      });
      return data;
    },
  });
}
