import { fetchWorkouts } from '@/api/workouts.api';
import { useInfiniteQuery } from '@tanstack/react-query';

export function useWorkouts() {
  return useInfiniteQuery({
    queryKey: ['workouts'],
    queryFn: fetchWorkouts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.meta.current_page + 1,
    getPreviousPageParam: (firstPage) => firstPage.meta.current_page - 1,
  });
}
