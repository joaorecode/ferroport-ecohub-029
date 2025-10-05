import { Stack } from 'expo-router';
import { COLORS } from '@/constants/colors';

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.background },
      }}
    >
      <Stack.Screen name="home" />
      <Stack.Screen name="approved-requests" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="request-material" />
    </Stack>
  );
}
