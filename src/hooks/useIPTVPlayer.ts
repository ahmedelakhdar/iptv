"use client";

import { useIPTVStore } from "@/store/useIPTVStore";
import { Channel } from "@/types";

export function useIPTVPlayer() {
  const {
    activeChannel,
    isPlaying,
    isMuted,
    volume,
    setActiveChannel,
    setIsPlaying,
    setIsMuted,
    setVolume,
  } = useIPTVStore();

  const playChannel = (channel: Channel) => {
    setActiveChannel(channel);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return {
    activeChannel,
    isPlaying,
    isMuted,
    volume,
    playChannel,
    togglePlay,
    toggleMute,
    setVolume,
  };
}
