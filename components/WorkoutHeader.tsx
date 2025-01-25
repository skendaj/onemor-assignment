import { Stack, XStack, Text, Image, YStack } from 'tamagui';
import { WorkoutPreview, Routine } from '@/types/workout';
import { Image as ExpoImage } from 'expo-image';
import env from '@/config/env';

interface WorkoutHeaderProps {
  item: WorkoutPreview;
  currentRoutine: Routine;
  currentRoutineIndex: number;
}

const cacheConfig = {
  cachePolicy: 'memory-disk',
  placeholderContentFit: 'cover',
};

export const WorkoutHeader = ({
  item,
  currentRoutine,
  currentRoutineIndex,
}: WorkoutHeaderProps) => (
  <Stack position="absolute" top={20} left={0} right={0} padding="$4">
    <XStack alignItems="center" gap="$3">
      {/* @ts-expect-error */}
      <ExpoImage
        source={{
          uri: item.user.profile_photo_url,
          headers: {
            Authorization: `Bearer ${env.AUTH_TOKEN}`,
          },
        }}
        style={{ width: 50, height: 50, borderRadius: 8 }}
        contentFit="cover"
        {...cacheConfig}
        transition={200}
        onError={(error) => {
          console.error('Image loading error:', error);
        }}
      />
      <YStack flex={1}>
        <Text color="white" fontSize={14} fontWeight="bold">
          {item.name.toUpperCase()}
        </Text>
        <Text color="white" fontSize={13} opacity={0.8} fontWeight="600">
          {item.routines[currentRoutineIndex].name}
        </Text>
      </YStack>
    </XStack>
  </Stack>
);
