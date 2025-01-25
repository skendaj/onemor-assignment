import { YStack, Stack, XStack } from 'tamagui';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

export const WorkoutItemSkeleton = () => {
  const translateX = useSharedValue(-350);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(350, {
        duration: 1000,
        easing: Easing.ease,
      }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <YStack flex={1} height={500} borderRadius="$4" overflow="hidden">
      <Stack flex={1} backgroundColor="$gray200">
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1,
            },
            animatedStyle,
          ]}
        >
          <LinearGradient
            colors={['transparent', 'rgba(255, 255, 255, 0.1)', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              width: 350,
              height: '100%',
            }}
          />
        </Animated.View>

        <LinearGradient
          colors={['rgba(0,0,0,1)', 'rgba(0,0,0,0)']}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 150,
          }}
        />
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.4)']}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 110,
          }}
        />

        <Stack position="absolute" top={20} left={0} right={0} padding="$4">
          <XStack alignItems="center" gap="$3">
            <Stack width={50} height={50} borderRadius={8} backgroundColor="$secondary" />
            <Stack flex={1}>
              <Stack width={200} height={20} backgroundColor="$secondary" borderRadius="$2" />
              <Stack
                width={150}
                height={16}
                backgroundColor="$secondary"
                marginTop="$2"
                borderRadius="$2"
              />
            </Stack>
          </XStack>
        </Stack>

        <XStack position="absolute" top={0} left={0} right={0} padding="$4" gap="$2">
          {[1, 2, 3].map((_, index) => (
            <Stack key={index} flex={1} height={4} backgroundColor="$secondary" borderRadius="$4" />
          ))}
        </XStack>

        <XStack
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          padding="$4"
          height={55}
          alignItems="center"
          gap="$4"
        >
          <Stack width={80} height={16} backgroundColor="$secondary" borderRadius="$2" />
          <Stack width={60} height={16} backgroundColor="$secondary" borderRadius="$2" />
        </XStack>
      </Stack>
    </YStack>
  );
};
