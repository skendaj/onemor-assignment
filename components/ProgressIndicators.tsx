import { View, XStack } from 'tamagui';
import { Routine } from '@/types/workout';
import { useEffect, useState } from 'react';
import { Animated } from 'react-native';

interface ProgressIndicatorsProps {
  routines: Routine[];
  currentRoutineIndex: number;
  progress: number;
}

export const ProgressIndicators = ({
  routines,
  currentRoutineIndex,
  progress,
}: ProgressIndicatorsProps) => {
  const animatedWidth = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: progress * 100,
      duration: 50,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  return (
    <XStack position="absolute" top="$4" left="$4" right="$4" gap="$2" zIndex={2}>
      {routines.map((routine, index) => (
        <View key={`${routine.id}-${index}`} flex={1} height={2} overflow="hidden">
          <View
            backgroundColor="rgba(255,255,255,0.3)"
            height="100%"
            width="100%"
            position="absolute"
          />
          {index === currentRoutineIndex && (
            <Animated.View
              style={{
                backgroundColor: 'white',
                height: '100%',
                width: animatedWidth.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%'],
                }),
                position: 'absolute',
              }}
            />
          )}
          {index < currentRoutineIndex && (
            <View backgroundColor="white" height="100%" width="100%" position="absolute" />
          )}
        </View>
      ))}
    </XStack>
  );
};
