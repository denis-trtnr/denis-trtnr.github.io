import React, { useEffect } from 'react';
import { X, ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Moment, ImageItem } from '../types';
import '../styles/story-modal.css';

interface StoryModalProps {
  moment: Moment | null;
  onClose: () => void;
  onSelectMoment: (moment: Moment) => void;
  allMoments: Moment[];
  onOpenLightbox?: (image: ImageItem) => void;
}

export const StoryModal: React.FC<StoryModalProps> = ({
  moment,
  onClose,
  onSelectMoment,
  allMoments,
  onOpenLightbox,
}) => {
  useEffect(() => {
    if (!moment) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [moment, onClose]);

  if (!moment) return null;

  const currentIndex = allMoments.findIndex((m) => m.id === moment.id);
  const prevMoment = currentIndex > 0 ? allMoments[currentIndex - 1] : allMoments[allMoments.length - 1];
  const nextMoment = currentIndex < allMoments.length - 1 ? allMoments[currentIndex + 1] : allMoments[0];

  const goToPrev = () => onSelectMoment(prevMoment);
  const goToNext = () => onSelectMoment(nextMoment);

  return (
    <div
      className="story-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`story-modal-title-${moment.id}`}
    >
      <div
        className="story-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header */}
        <header className="story-modal-header">
          <div className="story-modal-meta">
            <span className="story-modal-index">{moment.index}</span>
            <span className="story-modal-divider">/</span>
            <span>{moment.year}</span>
            {moment.location && (
              <>
                <span className="story-modal-divider">·</span>
                <span>{moment.location}</span>
              </>
            )}
          </div>
          <button
            className="story-modal-close"
            onClick={onClose}
            aria-label="Close story drawer"
          >
            <X size={20} />
          </button>
        </header>

        {/* Story Body */}
        <div className="story-modal-body">
          <h2 id={`story-modal-title-${moment.id}`} className="story-modal-title">
            {moment.title}
          </h2>
          {moment.subtitle && (
            <p className="story-modal-subtitle">{moment.subtitle}</p>
          )}

          {/* Full Narrative */}
          <div className="story-modal-narrative">
            {moment.description.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* Anecdote Pull-Quote */}
          {moment.anecdote && (
            <div className="story-anecdote-card">
              <div className="anecdote-tag">{moment.anecdote.headline}</div>
              <blockquote className="anecdote-quote">
                "{moment.anecdote.text}"
              </blockquote>
            </div>
          )}

          {/* DFKI Research Deep-Dive */}
          {moment.researchTopics && moment.researchTopics.length > 0 && (
            <div className="story-research-section">
              <h4 className="research-section-heading">Academic Research Topics</h4>
              <div className="research-grid">
                {moment.researchTopics.map((topic, idx) => (
                  <div key={idx} className="research-card">
                    <span className="research-card-type">{topic.type}</span>
                    <h5 className="research-card-title">{topic.title}</h5>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Formula Student Photo Essay */}
          {moment.images && moment.images.length > 0 && (
            <div className="story-photos-section">
              <h4 className="story-photos-heading">Photographs &amp; Documentation</h4>
              <div className="story-photo-grid">
                {moment.images.slice(0, 2).map((img, idx) => (
                  <div
                    key={idx}
                    className="story-photo-card aspect-portrait"
                    onClick={() => onOpenLightbox && onOpenLightbox(img)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && onOpenLightbox && onOpenLightbox(img)}
                    aria-label={`View photo full size: ${img.alt}`}
                  >
                    <picture>
                      <source srcSet={img.webpSrc} type="image/webp" />
                      <img
                        src={img.jpegSrc}
                        alt={img.alt}
                        className="story-photo-img"
                        loading="lazy"
                      />
                    </picture>
                    <div className="story-photo-overlay">
                      <span className="expand-hint">Enlarge <ArrowUpRight size={14} /></span>
                    </div>
                    {img.caption && (
                      <p className="story-photo-caption">{img.caption}</p>
                    )}
                  </div>
                ))}

                {moment.images.length > 2 && (
                  <div className="story-photo-full">
                    <div
                      className="story-photo-card aspect-wide"
                      onClick={() => onOpenLightbox && onOpenLightbox(moment.images![2])}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && onOpenLightbox && onOpenLightbox(moment.images![2])}
                      aria-label={`View photo full size: ${moment.images[2].alt}`}
                    >
                      <picture>
                        <source srcSet={moment.images[2].webpSrc} type="image/webp" />
                        <img
                          src={moment.images[2].jpegSrc}
                          alt={moment.images[2].alt}
                          className="story-photo-img"
                          loading="lazy"
                        />
                      </picture>
                      <div className="story-photo-overlay">
                        <span className="expand-hint">Enlarge <ArrowUpRight size={14} /></span>
                      </div>
                    </div>
                    {moment.images[2].caption && (
                      <p className="story-photo-caption">{moment.images[2].caption}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tags */}
          {moment.tags && moment.tags.length > 0 && (
            <div className="story-modal-tags">
              {moment.tags.map((tag) => (
                <span key={tag} className="story-modal-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer: Story Pagination */}
        <footer className="story-modal-footer">
          <button
            className="story-nav-btn prev-btn"
            onClick={goToPrev}
            aria-label={`Go to previous story: ${prevMoment.title}`}
          >
            <ArrowLeft size={16} />
            <span>Prev: {prevMoment.title}</span>
          </button>
          <button
            className="story-nav-btn next-btn"
            onClick={goToNext}
            aria-label={`Go to next story: ${nextMoment.title}`}
          >
            <span>Next: {nextMoment.title}</span>
            <ArrowRight size={16} />
          </button>
        </footer>
      </div>
    </div>
  );
};
