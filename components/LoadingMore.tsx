import { XStack, Text, YStack } from 'tamagui';
import { ActivityIndicator } from 'react-native';
import { WorkoutItemSkeleton } from './WorkoutItemSkeleton';

export const LoadingMore = () => {
  return (
    <YStack gap="$2">
      <WorkoutItemSkeleton />
      <XStack gap="$3" padding="$4" alignItems="center" justifyContent="center">
        <ActivityIndicator size="small" />
        <Text fontSize="$3.5" color="white">
          Loading more...
        </Text>
      </XStack>
    </YStack>
  );
};
