import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import type { Moment } from '../types';
import '../styles/moments-carousel.css';

interface MomentsCarouselProps {
  moments: Moment[];
}

export const MomentsCarousel: React.FC<MomentsCarouselProps> = ({ moments }) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const maxScroll = el.scrollWidth - el.clientWidth;

    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < maxScroll - 10);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  const scrollBy = useCallback((direction: 'left' | 'right') => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = (el.firstChild as HTMLElement)?.offsetWidth ?? 320;
    const gap = 24;
    el.scrollBy({
      left: direction === 'right' ? cardWidth + gap : -(cardWidth + gap),
      behavior: 'smooth',
    });
  }, []);

  return (
    <section id="moments" className="carousel-section" aria-labelledby="moments-heading">
      <div className="container">
        {/* Header */}
        <div className="carousel-header">
          <h2 id="moments-heading" className="carousel-section-title">Selected Moments</h2>
          <p className="carousel-section-lead">
            A few experiences that shaped how I work, think, and build.
          </p>
        </div>

        {/* Track wrapper — arrows overlay on left & right */}
        <div
          className={`carousel-wrapper${canScrollLeft ? ' has-scroll-left' : ''}${
            canScrollRight ? ' has-scroll-right' : ''
          }`}
        >
          {/* Left arrow */}
          <button
            className={`carousel-arrow carousel-arrow-left ${canScrollLeft ? 'is-visible' : ''}`}
            onClick={() => scrollBy('left')}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
          >
            <ArrowLeft size={18} />
          </button>

          {/* Scrollable track */}
          <div
            ref={trackRef}
            className="carousel-track"
            role="list"
          >
            {moments.map((moment, i) => (
              <Link
                key={moment.id}
                to={`/moments/${moment.id}`}
                className="carousel-card"
                role="listitem"
                tabIndex={0}
              >
                {/* Cover image */}
                <div className="carousel-card-img-wrap">
                  {moment.coverImage ? (
                    <picture>
                      <source srcSet={moment.coverImage.webpSrc} type="image/webp" />
                      <img
                        src={moment.coverImage.jpegSrc}
                        alt={moment.coverImage.alt}
                        className="carousel-card-img"
                        loading={i === 0 ? 'eager' : 'lazy'}
                      />
                    </picture>
                  ) : (
                    <div className="carousel-card-img-placeholder" aria-hidden="true" />
                  )}
                  <div className="carousel-card-gradient" aria-hidden="true" />
                </div>

                {/* Card body */}
                <div className="carousel-card-body">
                  {moment.tags && moment.tags.length > 0 && (
                    <div className="carousel-card-tags">
                      {moment.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="carousel-card-tag">{tag}</span>
                      ))}
                    </div>
                  )}
                  <h3 className="carousel-card-title">{moment.title}</h3>
                  {moment.year && (
                    <p className="carousel-card-meta">
                      {moment.year}{moment.location && <> · {moment.location}</>}
                    </p>
                  )}
                  <p className="carousel-card-teaser">{moment.teaser}</p>
                  <span className="carousel-card-cta" aria-hidden="true">
                    Read more <ArrowUpRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Right arrow */}
          <button
            className={`carousel-arrow carousel-arrow-right ${canScrollRight ? 'is-visible' : ''}`}
            onClick={() => scrollBy('right')}
            disabled={!canScrollRight}
            aria-label="Scroll right"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};
