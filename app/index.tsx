import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import NewsItem from "../components/NewsItem";
import { fetchNews, NewsItem as NewsItemType } from "../app/api/newsApi";
import { connectWebSocket, disconnectWebSocket } from "../app/api/websocket";
import { useTheme } from "../app/context/ThemeContext";

export default function Home() {
  const [news, setNews] = useState<NewsItemType[]>([]);
  const { theme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    loadNews();
    connectWebSocket(handleNewArticle);

    return () => {
      disconnectWebSocket();
    };
  }, []);

  const loadNews = async () => {
    const newsData = await fetchNews();
    setNews(newsData);
  };

  const handleNewArticle = (newArticle: NewsItemType) => {
    setNews((prevNews) => [newArticle, ...prevNews]);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <FlatList
        data={news}
        renderItem={({ item }) => (
          <NewsItem
            item={item}
            onPress={() =>
              router.push({ pathname: "/article", params: { id: item.id } })
            }
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
