import { Stack } from "expo-router";
import { DataProvider } from "./DataContext";

export default function RootLayout() {
  return (
    <DataProvider>
    <Stack>
      <Stack.Screen name="index" options={{title:"index"}}></Stack.Screen>
      <Stack.Screen name="details" options={{title:"details"}}></Stack.Screen>

    </Stack>
    </DataProvider>
    );
    
}
