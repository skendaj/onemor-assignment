import { MotiView } from 'moti';
import { XStack, Text } from 'tamagui';
import { Clock } from '@tamagui/lucide-icons';
import { WorkoutPreview, Routine } from '@/types/workout';
import { formatDuration } from '@/utils/durationFormatter';
import { workoutLevelToString } from '@/types/workout';

interface WorkoutFooterProps {
  currentRoutine: Routine;
  item: WorkoutPreview;
}

export const WorkoutFooter = ({ currentRoutine, item }: WorkoutFooterProps) => {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 300 }}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        height: 55,
      }}
    >
      <XStack alignItems="center" gap="$4">
        <XStack alignItems="center" gap="$2">
          <Clock size={16} color="white" strokeWidth={2} />
          <Text color="white" fontWeight="bold">
            {formatDuration(item?.total_duration)}
          </Text>
        </XStack>

        <Text color="white" fontWeight="bold">
          {workoutLevelToString(item?.difficulty)}
        </Text>
      </XStack>
    </MotiView>
  );
};
