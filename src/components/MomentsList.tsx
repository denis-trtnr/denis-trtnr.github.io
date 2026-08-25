import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Moment } from '../types';
import '../styles/moments-list.css';

interface MomentsListProps {
  moments: Moment[];
}

export const MomentsList: React.FC<MomentsListProps> = ({ moments }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="moments" className="moments-section" aria-labelledby="moments-heading">
      <div className="container">
        <div className="moments-header">
          <h2 id="moments-heading" className="moments-section-title">Selected Moments</h2>
          <p className="moments-section-lead">
            A few experiences that shaped how I work, think, and build.
          </p>
        </div>

        <ul className="moments-list" role="list">
          {moments.map((moment) => {
            const isHovered = hoveredId === moment.id;
            return (
              <li key={moment.id} className="moments-list-item" role="listitem">
                <Link
                  to={`/moments/${moment.id}`}
                  className={`moments-row ${isHovered ? 'is-hovered' : ''}`}
                  onMouseEnter={() => setHoveredId(moment.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  aria-label={`Read more about: ${moment.title}`}
                >
                  {/* Index */}
                  <span className="moments-index" aria-hidden="true">{moment.index}</span>

                  {/* Main info */}
                  <div className="moments-row-main">
                    <span className="moments-row-title">{moment.title}</span>
                    {moment.year && (
                      <span className="moments-row-meta">
                        {moment.year}
                        {moment.location && <> · {moment.location}</>}
                      </span>
                    )}
                  </div>

                  {/* Tags */}
                  {moment.tags && (
                    <div className="moments-row-tags" aria-hidden="true">
                      {moment.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="moments-tag">{tag}</span>
                      ))}
                    </div>
                  )}

                  {/* Arrow */}
                  <ArrowUpRight
                    size={18}
                    className="moments-arrow"
                    aria-hidden="true"
                  />
                </Link>

                {/* Cover image preview on hover */}
                {moment.coverImage && (
                  <div
                    className={`moments-preview ${isHovered ? 'is-visible' : ''}`}
                    aria-hidden="true"
                  >
                    <picture>
                      <source srcSet={moment.coverImage.webpSrc} type="image/webp" />
                      <img
                        src={moment.coverImage.jpegSrc}
                        alt=""
                        className="moments-preview-img"
                        loading="lazy"
                      />
                    </picture>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
