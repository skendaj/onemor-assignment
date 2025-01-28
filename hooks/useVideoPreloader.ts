import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Routine } from '@/types/workout';

export function useVideoPreloader(routines: Routine[], currentIndex: number) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const nextIndex = (currentIndex + 1) % routines.length;
    const nextRoutine = routines[nextIndex];

    if (!nextRoutine) return;

    const prefetchVideo = async () => {
      try {
        const controller = new AbortController();
        const signal = controller.signal;

        queryClient.prefetchQuery({
          queryKey: ['video', nextRoutine.id],
          queryFn: async () => {
            const response = await fetch(nextRoutine.video.playlist_url, { signal });
            return response.blob();
          },
          staleTime: 5 * 60 * 1000,
          gcTime: 10 * 60 * 1000,
        });

        return () => controller.abort();
      } catch (error) {
        console.error('Error prefetching video:', error);
      }
    };

    prefetchVideo();
  }, [routines, currentIndex, queryClient]);
}
