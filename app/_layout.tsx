import React from "react";
import { Stack } from "expo-router";
import { ThemeProvider } from "../app/context/ThemeContext";

export default function Layout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "News" }} />
        <Stack.Screen name="article" options={{ title: "Article" }} />
      </Stack>
    </ThemeProvider>
  );
}
