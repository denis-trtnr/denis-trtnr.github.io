import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Layers, MapPin } from 'lucide-react';
import { Moment } from '../types';
import '../styles/carousel.css';

interface MomentsCarouselProps {
  moments: Moment[];
  onOpenStory: (moment: Moment) => void;
}

export const MomentsCarousel: React.FC<MomentsCarouselProps> = ({
  moments,
  onOpenStory,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const activeMoment = moments[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : moments.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < moments.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="moments-carousel-wrapper">
      {/* Top Header & Carousel Controls */}
      <div className="carousel-top-bar">
        <div>
          <h2 id="moments-heading" className="moments-section-title">
            Selected Moments
          </h2>
          <p className="moments-section-lead">
            A few experiences that shaped how I work, think and build.
          </p>
        </div>

        <div className="carousel-controls" aria-label="Story carousel navigation">
          <span className="carousel-counter">
            <strong className="active-num">{activeMoment.index}</strong>
            <span className="counter-sep">/</span>
            <span>0{moments.length}</span>
          </span>

          <div className="carousel-nav-arrows">
            <button
              className="carousel-arrow-btn"
              onClick={handlePrev}
              aria-label="Previous story"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              className="carousel-arrow-btn"
              onClick={handleNext}
              aria-label="Next story"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Active Story Showcase Card */}
      <div
        className="carousel-showcase-card"
        onClick={() => onOpenStory(activeMoment)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onOpenStory(activeMoment)}
        aria-label={`Open story: ${activeMoment.title}`}
      >
        <div className="showcase-grid">
          {/* Left Column: Story Content */}
          <div className="showcase-content">
            <div className="showcase-meta-row">
              <span className="showcase-index-badge">{activeMoment.index}</span>
              <div className="showcase-meta-details">
                {activeMoment.year && <span>{activeMoment.year}</span>}
                {activeMoment.year && activeMoment.location && (
                  <span className="meta-dot">·</span>
                )}
                {activeMoment.location && <span>{activeMoment.location}</span>}
              </div>
            </div>

            <h3 className="showcase-title">{activeMoment.title}</h3>
            {activeMoment.subtitle && (
              <p className="showcase-subtitle">{activeMoment.subtitle}</p>
            )}

            <p className="showcase-teaser">{activeMoment.teaser}</p>

            {activeMoment.tags && (
              <div className="showcase-tags">
                {activeMoment.tags.map((tag) => (
                  <span key={tag} className="showcase-tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="showcase-action">
              <span className="explore-story-btn">
                <span>Explore Story &amp; Details</span>
                <ArrowUpRight size={16} className="action-arrow" />
              </span>
            </div>
          </div>

          {/* Right Column: Visual Teaser Element */}
          <div className="showcase-visual">
            {activeMoment.id === 'formula-student' && activeMoment.coverImage && (
              <div className="visual-image-box">
                <picture>
                  <source srcSet={activeMoment.coverImage.webpSrc} type="image/webp" />
                  <img
                    src={activeMoment.coverImage.jpegSrc}
                    alt={activeMoment.coverImage.alt}
                    className="visual-img"
                    loading="lazy"
                  />
                </picture>
                <div className="visual-badge">
                  <Layers size={13} />
                  <span>3 Photos Inside</span>
                </div>
              </div>
            )}

            {activeMoment.id === 'dfki-research' && (
              <div className="visual-editorial-box research-theme">
                <div className="visual-card-header">
                  <BookOpen size={20} className="visual-icon" />
                  <span className="visual-kicker">DFKI Berlin &amp; STIHL</span>
                </div>
                <div className="visual-card-body">
                  <div className="visual-highlight-label">Key Research Theme</div>
                  <div className="visual-highlight-quote">
                    "Quantitative Analysis of Data Quality &amp; NER Model Robustness"
                  </div>
                </div>
                <div className="visual-badge research-badge">
                  <span>Research Deep-Dive Inside</span>
                </div>
              </div>
            )}

            {activeMoment.id === 'texas-exchange' && (
              <div className="visual-editorial-box exchange-theme">
                <div className="visual-card-header">
                  <MapPin size={20} className="visual-icon" />
                  <span className="visual-kicker">Texas · High School Exchange</span>
                </div>
                <div className="visual-card-body">
                  <div className="visual-highlight-label">Early Perspective</div>
                  <div className="visual-highlight-quote">
                    "Navigating unfamiliar environments early on became a lasting lesson in adaptability."
                  </div>
                </div>
                <div className="visual-badge exchange-badge">
                  <span>Personal Reflection</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Story Navigation Tabs */}
      <div className="carousel-tabs-track" role="tablist" aria-label="Stories">
        {moments.map((moment, idx) => (
          <button
            key={moment.id}
            role="tab"
            aria-selected={currentIndex === idx}
            className={`carousel-tab ${currentIndex === idx ? 'active' : ''}`}
            onClick={() => setCurrentIndex(idx)}
          >
            <span className="tab-num">{moment.index}</span>
            <span className="tab-label">{moment.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
