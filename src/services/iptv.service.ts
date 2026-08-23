import { apiClient } from "@/lib/axios";
import { Channel, Category } from "@/types";

export const iptvService = {
  async getChannels(): Promise<Channel[]> {
    try {
      const response = await apiClient.get<Channel[]>("/channels");
      return response.data;
    } catch {
      // Fallback mock data for demo/landing preview
      return [
        {
          id: "1",
          num: 1,
          name: "Canal+ Sport 4K",
          logo: "/logos/canal-sport.png",
          category: "Sport",
          quality: "4K",
          streamUrl: "https://example.com/stream/canal-sport.m3u8",
        },
        {
          id: "2",
          num: 2,
          name: "beIN Sports 1 HD",
          logo: "/logos/bein-1.png",
          category: "Sport",
          quality: "FHD",
          streamUrl: "https://example.com/stream/bein-1.m3u8",
        },
      ];
    }
  },

  async getCategories(): Promise<Category[]> {
    try {
      const response = await apiClient.get<Category[]>("/categories");
      return response.data;
    } catch {
      return [
        { id: "all", name: "Toutes les Chaînes", channelCount: 35000 },
        { id: "sport", name: "Sports & Directs", channelCount: 4200 },
        { id: "cinema", name: "Films & Séries 4K", channelCount: 12500 },
        { id: "news", name: "Actualités & Info", channelCount: 1800 },
        { id: "kids", name: "Jeunesse & Kids", channelCount: 2100 },
      ];
    }
  },
};
