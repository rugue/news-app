import { NewsItem } from "./newsApi";

let ws: WebSocket | null = null;

export const connectWebSocket = (onMessage: (data: NewsItem) => void) => {
  ws = new WebSocket("wss://your-websocket-url.com");

  ws.onopen = () => {
    console.log("WebSocket connected");
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };

  ws.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  ws.onclose = () => {
    console.log("WebSocket disconnected");
  };
};

export const disconnectWebSocket = () => {
  if (ws) {
    ws.close();
  }
};
