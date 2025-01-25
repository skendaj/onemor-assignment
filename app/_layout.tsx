import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { TamaguiProvider } from 'tamagui';
import config from '../tamagui.config';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TanStackProvider } from '@/providers/TanStackProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TanStackProvider>
        <TamaguiProvider config={config}>
          <SafeAreaProvider>
            <Stack
              screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#19181D' } }}
            >
              <Stack.Screen name="index" />
            </Stack>
            <StatusBar style="light" />
          </SafeAreaProvider>
        </TamaguiProvider>
      </TanStackProvider>
    </GestureHandlerRootView>
  );
}
