import { useAuth } from "@/app/hooks/useAuth";
import { jobsService } from "@/app/services/jobs";
import { useQuery } from "@tanstack/react-query";

export type FormatType = 'atualizacoes' | 'midia-digital' | 'apresentacoes' | 'videos' | 'impresso';

const FORMAT_MAPPING = {
  atualizacoes: 'Atualizações',
  'midia-digital': 'Mídia Digital',
  apresentacoes: 'Apresentações',
  videos: 'Vídeos',
  impresso: 'Impresso',
} as const;

export function useCountJobsController(format: FormatType) {
  const { user } = useAuth();

  // Mapeamento direto do formato
  const formatMapping = {
    atualizacoes: user?.data.plan?.updates,
    'midia-digital': user?.data.plan?.digital_midia,
    apresentacoes: user?.data.plan?.presentations,
    videos: user?.data.plan?.videos,
    impresso: user?.data.plan?.printed,
  };

  const typeFormat = FORMAT_MAPPING[format];
  const planLimit = formatMapping[format];

  const { data: jobsCount = 0, isFetching: isLoadingJobsCount } = useQuery({
    queryKey: ['jobs-count', typeFormat],
    queryFn: () => jobsService.countByType(typeFormat),
    staleTime: 0,
    enabled: !!typeFormat,
  });

  // Cálculos diretos sem memoization
  const available = Number(planLimit) - Number(jobsCount);
  const isExceeded = Number(planLimit) !== -1 && jobsCount >= Number(planLimit);

  return {
    nJobsAvailable: available,
    isLoadingJobsCount,
    exceeded: isExceeded
  };
}
