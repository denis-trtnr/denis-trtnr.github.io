import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, ChevronDown, Layers, PlayCircle } from 'lucide-react';
import { Moment, ImageItem } from '../types';
import { Lightbox } from './Lightbox';
import '../styles/moments-accordion.css';

interface MomentsAccordionProps {
  moments: Moment[];
}

export const MomentsAccordion: React.FC<MomentsAccordionProps> = ({ moments }) => {
  const [openId, setOpenId] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<ImageItem | null>(null);
  const panelRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenId(null);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <section id="moments" className="accordion-section" aria-labelledby="moments-heading">
        <div className="container">
          <div className="accordion-header">
            <h2 id="moments-heading" className="accordion-section-title">Selected Moments</h2>
            <p className="accordion-section-lead">
              A few experiences that shaped how I work, think, and build.
            </p>
          </div>

          <div className="accordion-list" role="list">
            {moments.map((moment) => {
              const isOpen = openId === moment.id;
              return (
                <div
                  key={moment.id}
                  className={`accordion-item ${isOpen ? 'is-open' : ''}`}
                  role="listitem"
                >
                  {/* Row Header – always visible */}
                  <button
                    className="accordion-row"
                    onClick={() => toggle(moment.id)}
                    aria-expanded={isOpen}
                    aria-controls={`panel-${moment.id}`}
                    id={`trigger-${moment.id}`}
                  >
                    <span className="accordion-index">{moment.index}</span>

                    <div className="accordion-row-main">
                      <span className="accordion-row-title">{moment.title}</span>
                      {moment.year && (
                        <span className="accordion-row-meta">
                          {moment.year}
                          {moment.location && <> · {moment.location}</>}
                        </span>
                      )}
                    </div>

                    {moment.tags && (
                      <div className="accordion-row-tags" aria-hidden="true">
                        {moment.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="accordion-tag">{tag}</span>
                        ))}
                      </div>
                    )}

                    <ChevronDown
                      size={18}
                      className="accordion-chevron"
                      aria-hidden="true"
                    />
                  </button>

                  {/* Expandable Panel */}
                  <div
                    id={`panel-${moment.id}`}
                    role="region"
                    aria-labelledby={`trigger-${moment.id}`}
                    className="accordion-panel"
                    ref={(el) => { panelRefs.current[moment.id] = el; }}
                  >
                    <div className="accordion-panel-inner">
                      {/* Two-column layout: narrative + visual */}
                      <div className="panel-grid">
                        {/* Left: Full Story */}
                        <div className="panel-narrative">
                          {moment.subtitle && (
                            <p className="panel-subtitle">{moment.subtitle}</p>
                          )}

                          <div className="panel-text">
                            {moment.description.map((para, i) => (
                              <p key={i}>{para}</p>
                            ))}
                          </div>

                          {/* Anecdote pull-quote */}
                          {moment.anecdote && (
                            <blockquote className="panel-anecdote">
                              <span className="panel-anecdote-label">{moment.anecdote.headline}</span>
                              <span className="panel-anecdote-text">{moment.anecdote.text}</span>
                            </blockquote>
                          )}

                          {/* Videos */}
                          {moment.videos && moment.videos.length > 0 && (
                            <div className="panel-videos">
                              <p className="panel-videos-label">
                                <PlayCircle size={13} aria-hidden="true" />
                                Videos
                              </p>
                              {moment.videos.map((video, i) => (
                                <div key={i} className="panel-video-item">
                                  {video.label && (
                                    <p className="panel-video-label">{video.label}</p>
                                  )}
                                  <video
                                    controls
                                    preload="none"
                                    className="panel-video-player"
                                    playsInline
                                  >
                                    <source src={video.src} type="video/mp4" />
                                    Your browser does not support the video tag.
                                  </video>
                                  {video.caption && (
                                    <p className="panel-video-caption">{video.caption}</p>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Research topics */}
                          {moment.researchTopics && moment.researchTopics.length > 0 && (
                            <div className="panel-research">
                              <p className="panel-research-label">Academic Research</p>
                              {moment.researchTopics.map((topic, i) => (
                                <div key={i} className="panel-research-card">
                                  <span className="panel-research-type">{topic.type}</span>
                                  <span className="panel-research-title">{topic.title}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Right: Photos or visual card */}
                        {moment.images && moment.images.length > 0 && (
                          <div className="panel-photos">
                            {/* Hero photo — first image full width */}
                            <div
                              className="panel-photo-item is-hero"
                              onClick={() => setLightboxImage(moment.images![0])}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => e.key === 'Enter' && setLightboxImage(moment.images![0])}
                              aria-label={`View full-size: ${moment.images[0].alt}`}
                            >
                              <picture>
                                <source srcSet={moment.images[0].webpSrc} type="image/webp" />
                                <img
                                  src={moment.images[0].jpegSrc}
                                  alt={moment.images[0].alt}
                                  className={`panel-photo-img ${moment.images[0].aspectRatio === 'wide' ? 'is-wide' : ''}`}
                                  loading="lazy"
                                />
                              </picture>
                              <div className="panel-photo-hover">
                                <span><ArrowUpRight size={15} /> Enlarge</span>
                              </div>
                              {moment.images[0].caption && (
                                <p className="panel-photo-caption">{moment.images[0].caption}</p>
                              )}
                            </div>

                            {/* Remaining photos in 2-col grid */}
                            {moment.images.length > 1 && (
                              <div className="panel-photo-grid">
                                {moment.images.slice(1).map((img, i) => (
                                  <div
                                    key={i}
                                    className="panel-photo-item"
                                    onClick={() => setLightboxImage(img)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => e.key === 'Enter' && setLightboxImage(img)}
                                    aria-label={`View full-size: ${img.alt}`}
                                  >
                                    <picture>
                                      <source srcSet={img.webpSrc} type="image/webp" />
                                      <img
                                        src={img.jpegSrc}
                                        alt={img.alt}
                                        className={`panel-photo-img ${img.aspectRatio === 'wide' ? 'is-wide' : ''}`}
                                        loading="lazy"
                                      />
                                    </picture>
                                    <div className="panel-photo-hover">
                                      <span><ArrowUpRight size={15} /> Enlarge</span>
                                    </div>
                                    {img.caption && (
                                      <p className="panel-photo-caption">{img.caption}</p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}

                            {moment.images.length > 1 && (
                              <div className="panel-photo-badge">
                                <Layers size={13} />
                                <span>{moment.images.length} Photos</span>
                              </div>
                            )}
                          </div>
                        )}

                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
    </>
  );
};
