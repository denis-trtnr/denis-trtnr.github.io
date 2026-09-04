import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react';
import type { Moment } from '../types';
import '../styles/moments.css';

interface MomentsSectionProps {
  moments: Moment[];
  initialLimit?: number;
}

export const MomentsSection: React.FC<MomentsSectionProps> = ({
  moments,
  initialLimit = 3,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasMore = moments.length > initialLimit;
  const visibleMoments = isExpanded ? moments : moments.slice(0, initialLimit);

  return (
    <section id="moments" className="moments-section" aria-labelledby="moments-heading">
      <div className="container">
        {/* Section Header */}
        <div className="moments-header">
          <h2 id="moments-heading" className="moments-section-title">
            Selected Moments
          </h2>
          <p className="moments-section-lead">
            A few experiences that shaped how I work, think, and build.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="moments-grid" role="list">
          {visibleMoments.map((moment, i) => (
            <Link
              key={moment.id}
              to={`/moments/${moment.id}`}
              className="moment-card"
              role="listitem"
              tabIndex={0}
            >
              {/* Cover image */}
              <div className="moment-card-img-wrap">
                {moment.coverImage ? (
                  <picture>
                    <source srcSet={moment.coverImage.webpSrc} type="image/webp" />
                    <img
                      src={moment.coverImage.jpegSrc}
                      alt={moment.coverImage.alt}
                      className="moment-card-img"
                      loading={i === 0 ? 'eager' : 'lazy'}
                    />
                  </picture>
                ) : (
                  <div className="moment-card-img-placeholder" aria-hidden="true" />
                )}
                <div className="moment-card-gradient" aria-hidden="true" />
              </div>

              {/* Card body */}
              <div className="moment-card-body">
                {moment.tags && moment.tags.length > 0 && (
                  <div className="moment-card-tags">
                    {moment.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="moment-card-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <h3 className="moment-card-title">{moment.title}</h3>
                {moment.year && (
                  <p className="moment-card-meta">
                    {moment.year}
                    {moment.location && <> · {moment.location}</>}
                  </p>
                )}
                <p className="moment-card-teaser">{moment.teaser}</p>
                <span className="moment-card-cta" aria-hidden="true">
                  Read more <ArrowUpRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Expand / Collapse Button if more than initial limit */}
        {hasMore && (
          <div className="moments-toggle-wrap">
            <button
              type="button"
              className="moments-toggle-btn"
              onClick={() => setIsExpanded((prev) => !prev)}
              aria-expanded={isExpanded}
            >
              <span>
                {isExpanded
                  ? 'Show less'
                  : `Show all experiences (${moments.length})`}
              </span>
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
