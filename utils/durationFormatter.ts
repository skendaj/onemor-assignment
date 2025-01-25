export const formatDuration = (seconds: number | undefined | null) => {
  if (!seconds || isNaN(seconds)) return '0:00';

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const paddedSeconds = remainingSeconds.toString().padStart(2, '0');

  return `${minutes}:${paddedSeconds}`;
};
