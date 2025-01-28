import { YStack, View } from 'tamagui';
import { FlatList, ViewToken, Image, RefreshControl } from 'react-native';
import { WorkoutItem, WorkoutItemSkeleton } from '@/components';
import { useWorkouts } from '@/hooks/useWorkouts';
import { useCallback, useRef, useState } from 'react';
import { LoadingMore } from '@/components/LoadingMore';

export const HomeScreen = () => {
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage, refetch, isRefetching } =
    useWorkouts();
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

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig,
      onViewableItemsChanged,
    },
  ]).current;

  const renderItem = useCallback(
    ({ item }: { item: any }) => {
      if (isLoading) {
        return <WorkoutItemSkeleton />;
      }
      if (!item?.id) return null;

      return <WorkoutItem key={item.id} item={item} isActive={item.id === activeWorkoutId} />;
    },
    [isLoading, activeWorkoutId]
  );

  const keyExtractor = useCallback((item: any) => item?.id || Math.random().toString(), []);

  const ListHeaderComponent = useCallback(
    () => (
      <Image
        source={require('../assets/images/onemor-text-logo.png')}
        style={{ width: 100, height: 50, alignSelf: 'flex-end' }}
        resizeMode="contain"
      />
    ),
    []
  );

  const ListFooterComponent = useCallback(
    () =>
      isFetchingNextPage ? (
        <View pt="$4">
          <LoadingMore />
        </View>
      ) : null,
    [isFetchingNextPage]
  );

  const ItemSeparatorComponent = useCallback(() => <View height="$2" />, []);

  const onEndReached = useCallback(() => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <YStack flex={1} padding="$4">
      <FlatList
        data={isLoading ? Array(3).fill({ id: undefined }) : workouts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.7}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        maxToRenderPerBatch={5}
        windowSize={5}
        initialNumToRender={3}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={onRefresh}
            tintColor="white"
            titleColor="white"
          />
        }
      />
    </YStack>
  );
};
