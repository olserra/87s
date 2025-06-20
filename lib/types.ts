export interface User {
  id: string;
  name?: string | null;
  email: string;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Podcast {
  id: string;
  title: string;
  description?: string | null;
  script: string;
  audioUrl?: string | null;
  videoUrl?: string | null;
  avatarType: 'none' | 'male' | 'female' | 'custom';
  voiceType: 'default' | 'male' | 'female' | 'custom';
  status: 'draft' | 'processing' | 'completed' | 'failed';
  duration?: number | null;
  userId: string;
  episodes: Episode[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Episode {
  id: string;
  title: string;
  description?: string | null;
  script: string;
  audioUrl?: string | null;
  videoUrl?: string | null;
  order: number;
  duration?: number | null;
  status: 'draft' | 'processing' | 'completed' | 'failed';
  podcastId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Template {
  id: string;
  name: string;
  description?: string | null;
  category: string;
  script: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePodcastData {
  title: string;
  description?: string;
  script: string;
  avatarType: 'none' | 'male' | 'female' | 'custom';
  voiceType: 'default' | 'male' | 'female' | 'custom';
}

export interface PodcastStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  active: boolean;
}

export type VoiceSettings = {
  stability: number;
  similarityBoost: number;
  style: number;
  useSpeakerBoost: boolean;
};

export type AvatarSettings = {
  type: 'none' | 'male' | 'female' | 'custom';
  customUrl?: string;
  background: 'studio' | 'office' | 'home' | 'custom';
  customBackground?: string;
};