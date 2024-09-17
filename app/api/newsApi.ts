import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_KEY = "398b80eb952943ef8f7eec87a311de27";
const API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  url: string;
}

export const fetchNews = async (): Promise<NewsItem[]> => {
  try {
    const cachedNews = await AsyncStorage.getItem("cachedNews");
    if (cachedNews) {
      return JSON.parse(cachedNews);
    }

    const response = await axios.get(API_URL);
    const newsItems: NewsItem[] = response.data.articles.map(
      (article: any, index: number) => ({
        id: index.toString(),
        title: article.title,
        description: article.description,
        url: article.url,
      })
    );

    await AsyncStorage.setItem("cachedNews", JSON.stringify(newsItems));
    return newsItems;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};
