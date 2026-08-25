import React from 'react';
import { HeroContent } from '../types';
import { SocialLinks } from './SocialLinks';
import '../styles/hero.css';

interface HeroProps {
  content: HeroContent;
}

export const Hero: React.FC<HeroProps> = ({ content }) => {
  return (
    <section id="top" className="hero-section" aria-labelledby="hero-name">
      <div className="container hero-grid">
        {/* Left Column: Substantial Portrait */}
        <div className="hero-image-wrapper">
          <picture>
            <source srcSet={content.portrait.webpSrc} type="image/webp" />
            <img
              src={content.portrait.jpegSrc}
              alt={content.portrait.alt}
              className="hero-image"
              width={900}
              height={600}
              loading="eager"
              decoding="async"
            />
          </picture>
        </div>

        {/* Right Column: Editorial Typography & Intro */}
        <div className="hero-content">
          <h1 id="hero-name" className="hero-name">
            {content.name}
          </h1>
          <p className="hero-title">{content.title}</p>
          {content.intro && content.intro.length > 0 && (
            <div className="hero-intro">
              {content.intro.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          )}

          <div className="hero-social-wrap">
            <SocialLinks social={content.social} />
          </div>
        </div>
      </div>
    </section>
  );
};
