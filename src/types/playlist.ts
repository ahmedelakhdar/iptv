export interface M3UPlaylist {
  id: string;
  name: string;
  url: string;
  channelCount: number;
  lastUpdated: string;
  isActive: boolean;
}

export interface XtreamCredentials {
  serverUrl: string;
  username: string;
  password?: string;
}

export type PlaylistType = "m3u" | "xtream" | "portal";
