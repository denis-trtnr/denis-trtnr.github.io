export interface ImageItem {
  webpSrc: string;
  jpegSrc: string;
  alt: string;
  caption?: string;
  aspectRatio?: 'landscape' | 'portrait' | 'square' | 'wide';
}

export interface VideoItem {
  src: string;
  posterSrc?: string; // optional static thumbnail
  caption?: string;
  label?: string;     // short label e.g. "Onboard Lap" shown before play
}

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
  anecdote?: {
    headline: string;
    text: string;
  };
  researchTopics?: {
    type: string;
    title: string;
  }[];
  images?: ImageItem[];
  videos?: VideoItem[];
  coverImage?: ImageItem;
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
