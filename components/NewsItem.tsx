import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useTheme } from "../app/context/ThemeContext";
import { NewsItem as NewsItemType } from "../app/api/newsApi";

interface NewsItemProps {
  item: NewsItemType;
  onPress: () => void;
}

const NewsItem: React.FC<NewsItemProps> = ({ item, onPress }) => {
  const { theme } = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        style={[
          styles.container,
          {
            backgroundColor: theme.cardBackground,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Text style={[styles.title, { color: theme.textColor }]}>
          {item.title}
        </Text>
        <Text style={[styles.description, { color: theme.textColor }]}>
          {item.description}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
  },
});

export default NewsItem;
