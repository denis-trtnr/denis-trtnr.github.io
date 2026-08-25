export interface ImageItem {
  webpSrc: string;
  jpegSrc: string;
  alt: string;
  caption?: string;
  aspectRatio?: 'landscape' | 'portrait' | 'square' | 'wide';
}

export interface VideoItem {
  src: string;
  posterSrc?: string;
  caption?: string;
  label?: string;
}

export interface ResearchTopic {
  type: string;
  title: string;
}

export interface Anecdote {
  headline: string;
  text: string;
}

// Moment — mirrors the JSON schema in src/moments/*.json
// All moments are auto-discovered at build time via import.meta.glob
export interface Moment {
  id: string;
  index: string;
  year?: string;
  location?: string;
  title: string;
  subtitle?: string;
  teaser: string;
  tags?: string[];
  description: string[];
  anecdote?: Anecdote | null;
  researchTopics?: ResearchTopic[];
  coverImage?: ImageItem;
  images?: ImageItem[];
  videos?: VideoItem[];
}

export interface SocialLinksData {
  github: string;
  linkedin: string;
  orcid: string;
  email: string;
}

export interface HeroContent {
  name: string;
  title: string;
  intro: string[];
  portrait: {
    webpSrc: string;
    jpegSrc: string;
    alt: string;
  };
  social: SocialLinksData;
}

export interface CurrentlyItem {
  id: string;
  text: string;
  category?: string;
}
