import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { ImageItem } from '../types';
import '../styles/lightbox.css';

interface LightboxProps {
  image: ImageItem | null;
  onClose: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ image, onClose }) => {
  useEffect(() => {
    if (!image) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [image, onClose]);

  if (!image) return null;

  return (
    <div
      className="lightbox-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
    >
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="lightbox-close-btn"
          onClick={onClose}
          aria-label="Close image preview"
        >
          <X size={18} />
        </button>

        <picture>
          <source srcSet={image.webpSrc} type="image/webp" />
          <img
            src={image.jpegSrc}
            alt={image.alt}
            className="lightbox-image"
          />
        </picture>

        {image.caption && <p className="lightbox-caption">{image.caption}</p>}
      </div>
    </div>
  );
};
