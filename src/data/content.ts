import { HeroContent, SocialLinksData } from '../types';

export const socialData: SocialLinksData = {
  github: 'https://github.com/denis-trtnr',
  linkedin: 'https://www.linkedin.com/in/denis-trautner',
  orcid: 'https://orcid.org/0009-0001-0059-2021',
  email: 'contact@denis-trautner.com',
};

export const heroContent: HeroContent = {
  name: 'Denis Trautner',
  title: 'Cloud Solution Architect · AI Researcher · Data Enthusiast',
  intro: [],
  portrait: {
    webpSrc: '/images/portrait/denis-trautner-portrait.webp',
    jpegSrc: '/images/portrait/denis-trautner-portrait.jpg',
    alt: 'Denis Trautner wearing a dark navy suit against a clean modern architectural backdrop',
  },
  social: socialData,
};
