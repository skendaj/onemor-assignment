import { useQuery } from '@tanstack/react-query';
import { Routine } from '@/types/workout';

export function useRoutine(routineId: string) {
  return useQuery({
    queryKey: ['routine', routineId],
    queryFn: async () => {
      // Simulate fetching a single routine
      // Replace this with your actual API call
      const response = await fetch(`/api/routines/${routineId}`);
      return response.json() as Promise<Routine>;
    },
    enabled: !!routineId,
  });
}
