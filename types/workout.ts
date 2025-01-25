export type WorkoutLevelValue = 0 | 1 | 2;

export const workoutLevelToString = (level: WorkoutLevelValue): string => {
  const levels = {
    0: 'Beginner',
    1: 'Intermediate',
    2: 'Advanced',
  } as const;

  return levels[level];
};

export interface Routine {
  id: string;
  name: string;
  repetitions: number;
  duration: number;
  rest: number;
  video: {
    thumbnail_url: string;
    playlist_url: string;
  };
}

export interface WorkoutPreview {
  id: string;
  name: string;
  description: string;
  difficulty: WorkoutLevelValue;
  total_duration: number;
  user: {
    name: string;
    profile_photo_url: string;
  };
  video_cover: {
    thumbnail_url: string;
    playlist_url: string;
  };
  routines: Routine[];
}

export interface WorkoutCardProps {
  workout: WorkoutPreview;
  onPress?: () => void;
}
