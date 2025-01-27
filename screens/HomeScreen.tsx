import { View, YStack } from 'tamagui';
import { FlashList } from '@shopify/flash-list';
import { useWorkouts } from '@/hooks/useWorkouts';
import { useState, useRef, useCallback } from 'react';
import { WorkoutItem } from '@/components/WorkoutItem';
import { ViewToken } from 'react-native';
import { LoadingMore } from '@/components/LoadingMore';
import { WorkoutItemSkeleton } from '@/components';
import { Image } from 'expo-image';

export const HomeScreen = () => {
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useWorkouts();
  const workouts = data?.pages.flatMap((page) => page.data) ?? [];

  const [activeWorkoutId, setActiveWorkoutId] = useState<string | null>(() => {
    return workouts[0]?.id ?? null;
  });

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 90,
    minimumViewTime: 300,
  }).current;

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        const activeItem = viewableItems[0].item;
        setActiveWorkoutId(activeItem.id);
      } else {
        setActiveWorkoutId(null);
      }
    },
    []
  );

  // useEffect(() => {
  //   if (!isLoading && workouts.length > 0) {
  //     setActiveWorkoutId(workouts[0].id);
  //   }
  // }, [isLoading, workouts]);

  return (
    <YStack flex={1} padding="$4">
      <FlashList
        keyExtractor={(item) => item.id}
        data={isLoading ? Array(3).fill({}) : workouts}
        renderItem={({ item }) => {
          console.log('item.id - activeWorkoutId:', item.id, activeWorkoutId);
          return isLoading ? (
            <WorkoutItemSkeleton />
          ) : (
            <WorkoutItem key={item.id} item={item} isActive={item.id === activeWorkoutId} />
          );
        }}
        estimatedItemSize={100}
        onEndReachedThreshold={0.7}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        ItemSeparatorComponent={() => <View height="$2" />}
        ListHeaderComponent={() => (
          <Image
            source={require('../assets/images/onemor-text-logo.png')}
            style={{ width: 100, height: 50, alignSelf: 'flex-end' }}
            contentFit="contain"
          />
        )}
        onEndReached={() => {
          if (!isFetchingNextPage && hasNextPage) {
            fetchNextPage();
          }
        }}
        ListFooterComponent={
          isFetchingNextPage ? (
            <View pt="$4">
              <LoadingMore />
            </View>
          ) : null
        }
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
      />
    </YStack>
  );
};
