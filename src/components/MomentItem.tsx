import React from 'react';
import { Moment, ImageItem } from '../types';

interface MomentItemProps {
  moment: Moment;
  onImageClick?: (image: ImageItem) => void;
}

export const MomentItem: React.FC<MomentItemProps> = ({ moment, onImageClick }) => {
  return (
    <article className="moment-item" aria-labelledby={`moment-title-${moment.id}`}>
      {/* Metadata */}
      <div className="moment-meta">
        {moment.year && <span>{moment.year}</span>}
        {moment.year && moment.location && <span className="moment-meta-bullet">/</span>}
        {moment.location && <span>{moment.location}</span>}
      </div>

      {/* Header */}
      <h3 id={`moment-title-${moment.id}`} className="moment-title">
        {moment.title}
      </h3>
      {moment.subtitle && <p className="moment-subtitle">{moment.subtitle}</p>}

      {/* Narrative */}
      <div className="moment-narrative">
        {moment.description.map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </div>

      {/* Special Feature Layouts per Moment */}
      {moment.id === 'dfki-research' && (
        <div className="research-highlight-box">
          <div className="research-theme-item">
            <div className="research-theme-label">Master's Thesis</div>
            <div className="research-theme-title">
              Quantitative Analysis of the Impact of Data Quality Issues on the Robustness of Different NER Model Architectures
            </div>
          </div>
          <div className="research-theme-item">
            <div className="research-theme-label">Study Project</div>
            <div className="research-theme-title">
              Evaluation of Approaches for Optimizing Cross-Corpus Named Entity Recognition
            </div>
          </div>
        </div>
      )}

      {/* Photo Essay for Formula Student */}
      {moment.images && moment.images.length > 0 && (
        <div className="fs-photo-grid">
          {moment.images.slice(0, 2).map((img, idx) => (
            <div
              key={idx}
              className="photo-card photo-aspect-portrait"
              onClick={() => onImageClick && onImageClick(img)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onImageClick && onImageClick(img)}
              aria-label={`View photo: ${img.alt}`}
            >
              <picture>
                <source srcSet={img.webpSrc} type="image/webp" />
                <img
                  src={img.jpegSrc}
                  alt={img.alt}
                  className="photo-card-img"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              {img.caption && <p className="photo-caption">{img.caption}</p>}
            </div>
          ))}

          {moment.images.length > 2 && (
            <div className="fs-photo-full">
              <div
                className="photo-card photo-aspect-wide"
                onClick={() => onImageClick && onImageClick(moment.images![2])}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onImageClick && onImageClick(moment.images![2])}
                aria-label={`View photo: ${moment.images[2].alt}`}
              >
                <picture>
                  <source srcSet={moment.images[2].webpSrc} type="image/webp" />
                  <img
                    src={moment.images[2].jpegSrc}
                    alt={moment.images[2].alt}
                    className="photo-card-img"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              </div>
              {moment.images[2].caption && (
                <p className="photo-caption">{moment.images[2].caption}</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Tags */}
      {moment.tags && moment.tags.length > 0 && (
        <div className="moment-tags" aria-label="Keywords">
          {moment.tags.map((tag) => (
            <span key={tag} className="moment-tag">
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
};
