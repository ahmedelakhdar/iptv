import { create } from "zustand";
import { Channel, Category } from "@/types";

interface IPTVStore {
  activeChannel: Channel | null;
  channels: Channel[];
  categories: Category[];
  selectedCategory: string;
  searchQuery: string;
  favorites: string[];
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;

  setActiveChannel: (channel: Channel | null) => void;
  setChannels: (channels: Channel[]) => void;
  setCategories: (categories: Category[]) => void;
  setSelectedCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  toggleFavorite: (channelId: string) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setIsMuted: (isMuted: boolean) => void;
  setVolume: (volume: number) => void;
}

export const useIPTVStore = create<IPTVStore>((set) => ({
  activeChannel: null,
  channels: [],
  categories: [],
  selectedCategory: "all",
  searchQuery: "",
  favorites: [],
  isPlaying: false,
  isMuted: false,
  volume: 80,

  setActiveChannel: (channel) => set({ activeChannel: channel, isPlaying: !!channel }),
  setChannels: (channels) => set({ channels }),
  setCategories: (categories) => set({ categories }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  toggleFavorite: (channelId) =>
    set((state) => ({
      favorites: state.favorites.includes(channelId)
        ? state.favorites.filter((id) => id !== channelId)
        : [...state.favorites, channelId],
    })),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setIsMuted: (isMuted) => set({ isMuted }),
  setVolume: (volume) => set({ volume }),
}));
