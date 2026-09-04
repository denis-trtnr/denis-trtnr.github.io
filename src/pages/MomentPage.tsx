import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Layers, PlayCircle } from 'lucide-react';
import { getMomentById, getAllMoments } from '../moments';
import { Lightbox } from '../components/Lightbox';
import { Footer } from '../components/Footer';
import { socialData } from '../data/content';
import type { ImageItem } from '../types';
import '../styles/moment-page.css';

export const MomentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [lightboxImage, setLightboxImage] = useState<ImageItem | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const moment = id ? getMomentById(id) : undefined;

  // If the moment doesn't exist, redirect to the 404 / home
  if (!moment) {
    return <Navigate to="/" replace />;
  }

  const allMoments = getAllMoments();
  const currentIndex = allMoments.findIndex((m) => m.id === id);
  const prevMoment = currentIndex > 0 ? allMoments[currentIndex - 1] : null;
  const nextMoment = currentIndex < allMoments.length - 1 ? allMoments[currentIndex + 1] : null;

  const heroImage = moment.images?.[0];
  const restImages = moment.images?.slice(1) ?? [];

  return (
    <>
      <main id="main-content" className="moment-page">
        {/* Back navigation bar */}
        <div className="moment-back-bar">
          <div className="container">
            <Link
              to="/"
              state={{ scrollTo: 'moments' }}
              className="moment-back-btn"
              aria-label="Back to Selected Moments"
            >
              <ArrowLeft size={15} aria-hidden="true" />
              Selected Moments
            </Link>
          </div>
        </div>

        {/* Page header */}
        <div className="container">
          <header className="moment-hero">
            <div className="moment-meta-line">
              {(moment.year || moment.location) && (
                <span className="moment-year-location">
                  {moment.year}
                  {moment.year && moment.location && ' · '}
                  {moment.location}
                </span>
              )}
              {moment.tags && moment.tags.length > 0 && (
                <div className="moment-tags" aria-label="Tags">
                  {moment.tags.map((tag) => (
                    <span key={tag} className="moment-tag">{tag}</span>
                  ))}
                </div>
              )}
            </div>
            <h1 className="moment-title">{moment.title}</h1>
            {moment.subtitle && (
              <p className="moment-subtitle">{moment.subtitle}</p>
            )}
          </header>

          {/* Two-column body */}
          <div className="moment-body">
            {/* LEFT: Narrative */}
            <div className="moment-narrative">
              {/* Description paragraphs */}
              <div className="moment-description">
                {moment.description.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Anecdote pull-quote */}
              {moment.anecdote && (
                <blockquote className="moment-anecdote">
                  <span className="moment-anecdote-label">{moment.anecdote.headline}</span>
                  <span className="moment-anecdote-text">{moment.anecdote.text}</span>
                </blockquote>
              )}

              {/* Research topics */}
              {moment.researchTopics && moment.researchTopics.length > 0 && (
                <div className="moment-research">
                  <p className="moment-research-label">Academic Research</p>
                  {moment.researchTopics.map((topic, i) => (
                    <div key={i} className="moment-research-card">
                      <span className="moment-research-type">{topic.type}</span>
                      <span className="moment-research-title">{topic.title}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Videos — in narrative column on mobile, right col on desktop */}
              {moment.videos && moment.videos.length > 0 && (
                <div className="moment-videos">
                  <p className="moment-videos-label">
                    <PlayCircle size={13} aria-hidden="true" />
                    Videos
                  </p>
                  {moment.videos.map((video, i) => (
                    <div key={i} className="moment-video-item">
                      {video.label && (
                        <p className="moment-video-label">{video.label}</p>
                      )}
                      <video
                        controls
                        preload="metadata"
                        poster={video.posterSrc}
                        className="moment-video-player"
                        playsInline
                      >
                        <source src={`${video.src}#t=0.001`} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      {video.caption && (
                        <p className="moment-video-caption">{video.caption}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT: Photos */}
            {moment.images && moment.images.length > 0 && (
              <div className="moment-media">
                {/* Hero photo */}
                {heroImage && (
                  <div
                    className="moment-photo-hero"
                    onClick={() => setLightboxImage(heroImage)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setLightboxImage(heroImage)}
                    aria-label={`View full-size: ${heroImage.alt}`}
                  >
                    <picture>
                      <source srcSet={heroImage.webpSrc} type="image/webp" />
                      <img
                        src={heroImage.jpegSrc}
                        alt={heroImage.alt}
                        className="moment-photo-img is-hero-img"
                        loading="eager"
                      />
                    </picture>
                    <div className="moment-photo-overlay">
                      <span><ArrowUpRight size={15} /> Enlarge</span>
                    </div>
                    {heroImage.caption && (
                      <p className="moment-photo-caption">{heroImage.caption}</p>
                    )}
                  </div>
                )}

                {/* Remaining photos in 2-col grid */}
                {restImages.length > 0 && (
                  <div className="moment-photo-grid">
                    {restImages.map((img, i) => (
                      <div
                        key={i}
                        className="moment-photo-item"
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
                            className={`moment-photo-img ${img.aspectRatio === 'wide' ? 'is-wide' : ''}`}
                            loading="lazy"
                          />
                        </picture>
                        <div className="moment-photo-overlay">
                          <span><ArrowUpRight size={15} /> Enlarge</span>
                        </div>
                        {img.caption && (
                          <p className="moment-photo-caption">{img.caption}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {moment.images.length > 1 && (
                  <div className="moment-photo-count">
                    <Layers size={13} aria-hidden="true" />
                    <span>{moment.images.length} Photos</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Prev / Next navigation between moments */}
          {(prevMoment || nextMoment) && (
            <nav className="moment-sibling-nav" aria-label="Navigate between moments">
              <hr className="editorial-divider" aria-hidden="true" />
              <div className="moment-sibling-row">
                {prevMoment ? (
                  <Link to={`/moments/${prevMoment.id}`} className="moment-sibling-link is-prev">
                    <ArrowLeft size={15} aria-hidden="true" />
                    <div>
                      <span className="moment-sibling-label">Previous</span>
                      <span className="moment-sibling-title">{prevMoment.title}</span>
                    </div>
                  </Link>
                ) : <div />}

                {nextMoment ? (
                  <Link to={`/moments/${nextMoment.id}`} className="moment-sibling-link is-next">
                    <div>
                      <span className="moment-sibling-label">Next</span>
                      <span className="moment-sibling-title">{nextMoment.title}</span>
                    </div>
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </Link>
                ) : <div />}
              </div>
            </nav>
          )}
        </div>
      </main>

      <Footer social={socialData} />

      <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
    </>
  );
};
