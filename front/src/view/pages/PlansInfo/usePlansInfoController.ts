import { plansService } from "@/app/services/plansService";
import { useQuery } from "@tanstack/react-query";

export function usePlansInfoController() {
  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['plans'],
    staleTime: 0,
    queryFn: async () => {
      const response = await plansService.getAll();

      return response;
    },
  });

  return {
    plans: data?.data,
    isFetching,
    isLoading
  };
}
