import { ReactNode } from 'react';
import { Dimensions } from 'react-native';
import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';

interface SwipeGestureHandlerProps {
  children: ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

const SWIPE_THRESHOLD = Dimensions.get('window').width * 0.2;

export const SwipeGestureHandler = ({
  children,
  onSwipeLeft,
  onSwipeRight,
}: SwipeGestureHandlerProps) => {
  const gesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .onFinalize((event) => {
      const { translationX } = event;

      if (Math.abs(translationX) > SWIPE_THRESHOLD) {
        if (translationX > 0) {
          onSwipeRight?.();
        } else {
          onSwipeLeft?.();
        }
      }
    });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={gesture}>{children}</GestureDetector>
    </GestureHandlerRootView>
  );
};
