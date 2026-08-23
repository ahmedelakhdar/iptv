export type StreamQuality = "SD" | "HD" | "FHD" | "4K" | "8K";

export interface Channel {
  id: string;
  num: number;
  name: string;
  logo: string;
  category: string;
  quality: StreamQuality;
  streamUrl: string;
  epgChannelId?: string;
  isFavorite?: boolean;
}

export interface Category {
  id: string;
  name: string;
  channelCount: number;
  icon?: string;
}

export interface EPGProgram {
  id: string;
  channelId: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
}
