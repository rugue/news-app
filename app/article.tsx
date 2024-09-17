import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useTheme } from "../app/context/ThemeContext";
import { NewsItem } from "../app/api/newsApi";

export default function Article() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { theme } = useTheme();
  // In a real app, you'd fetch the article data here based on the id
  // For this example, we'll use dummy data
  const article: NewsItem = {
    id,
    title: "Sample Article Title",
    description: "This is a sample article description.",
    url: "https://example.com",
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <Text style={[styles.title, { color: theme.textColor }]}>
        {article.title}
      </Text>
      <Text style={[styles.description, { color: theme.textColor }]}>
        {article.description}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
});
