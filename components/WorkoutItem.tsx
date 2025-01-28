import { YStack, Stack } from 'tamagui';
import { WorkoutPreview } from '@/types/workout';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Pressable, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ProgressIndicators } from './ProgressIndicators';
import { WorkoutHeader } from './WorkoutHeader';
import { WorkoutFooter } from './WorkoutFooter';
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';
import { SwipeGestureHandler } from './SwipeGestureHandler';

interface WorkoutItemProps {
  item: WorkoutPreview;
  isActive: boolean;
}

export const WorkoutItem = ({ item, isActive }: WorkoutItemProps) => {
  const [currentRoutineIndex, setCurrentRoutineIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const currentRoutine = item.routines[currentRoutineIndex];
  const isMounted = useRef(true);
  const [isPressed, setIsPressed] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const player = useVideoPlayer(currentRoutine.video.playlist_url, (player) => {
    player.muted = true;
    player.timeUpdateEventInterval = 0.25;
    player.loop = false;
  });

  const handleVideoEnd = useCallback(() => {
    if (!isMounted.current) return;

    player.pause();
    setCurrentRoutineIndex((prev) => {
      const nextIndex = prev + 1;
      return nextIndex >= item.routines.length ? 0 : nextIndex;
    });
  }, [item.routines.length, player]);

  useEffect(() => {
    // @ts-expect-error
    const subscription = player.addListener('playbackStatusUpdate', (status) => {
      if (status.isPlaying && player.currentTime >= currentRoutine.duration - 0.1) {
        handleVideoEnd();
      }
    });

    return () => subscription.remove();
  }, [currentRoutine.duration, handleVideoEnd, player]);

  useEffect(() => {
    if (!isActive || !player || !currentRoutine.duration) return;

    const updateProgress = () => {
      const currentTime = player.currentTime;
      const newProgress = Math.min(currentTime / currentRoutine.duration, 1);
      setProgress(newProgress);

      if (newProgress >= 0.999) {
        handleVideoEnd();
      }
    };

    const interval = setInterval(updateProgress, 50);
    return () => clearInterval(interval);
  }, [isActive, player, currentRoutine.duration, handleVideoEnd]);

  useEffect(() => {
    if (!isActive) return;

    const initializePlayer = async () => {
      try {
        await player.seekBy(0);
        await player.play();

        setProgress(0);
      } catch (error) {
        console.log('Player error:', error);
      }
    };

    initializePlayer();
  }, [currentRoutineIndex, isActive, player]);

  const changeRoutine = useCallback(
    (direction: 'next' | 'prev') => {
      setProgress(0);
      setCurrentRoutineIndex((prev) => {
        let newIndex = direction === 'next' ? prev + 1 : prev - 1;

        if (newIndex >= item.routines.length) newIndex = 0;
        if (newIndex < 0) newIndex = item.routines.length - 1;

        return newIndex;
      });
    },
    [item.routines.length]
  );

  const goToPreviousRoutine = useCallback(() => changeRoutine('prev'), [changeRoutine]);
  const goToNextRoutine = useCallback(() => changeRoutine('next'), [changeRoutine]);

  const handlePressIn = () => setIsPressed(true);
  const handlePressOut = () => setIsPressed(false);

  return (
    <MotiView
      animate={{
        scale: isPressed ? 0.98 : 1,
      }}
      transition={{
        type: 'spring',
        damping: 20,
        mass: 0.5,
      }}
    >
      <SwipeGestureHandler onSwipeLeft={goToNextRoutine} onSwipeRight={goToPreviousRoutine}>
        <YStack flex={1} height={500} borderRadius="$4" overflow="hidden">
          {currentRoutine && (
            <MotiView
              key={`${currentRoutine.id}-${currentRoutineIndex}`}
              from={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                type: 'timing',
                duration: 400,
                easing: Easing.bezier(0.4, 0, 0.2, 1),
              }}
              style={{ flex: 1 }}
            >
              {!isVideoLoaded && item.video_cover?.thumbnail_url && (
                <Image
                  source={{ uri: item.video_cover.thumbnail_url }}
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                  }}
                />
              )}
              <Stack flex={1}>
                <VideoView
                  player={player}
                  style={{ flex: 1 }}
                  contentFit="cover"
                  nativeControls={false}
                />
                <LinearGradient
                  colors={['rgba(0,0,0,1)', 'rgba(0,0,0,0)']}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 100,
                  }}
                />
                <LinearGradient
                  colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.4)']}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 100,
                  }}
                />
                <Pressable
                  onPress={goToPreviousRoutine}
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '30%',
                  }}
                />
                <Pressable
                  onPress={goToNextRoutine}
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: '30%',
                  }}
                />
              </Stack>

              <ProgressIndicators
                routines={item.routines}
                currentRoutineIndex={currentRoutineIndex}
                progress={progress}
              />

              <WorkoutHeader
                item={item}
                currentRoutine={currentRoutine}
                currentRoutineIndex={currentRoutineIndex}
              />
              <WorkoutFooter currentRoutine={currentRoutine} item={item} />
            </MotiView>
          )}
        </YStack>
      </SwipeGestureHandler>
    </MotiView>
  );
};
