import React, { useState } from 'react';
import { Moment, ImageItem } from '../types';
import { MomentsCarousel } from './MomentsCarousel';
import { StoryModal } from './StoryModal';
import { Lightbox } from './Lightbox';
import '../styles/moments.css';

interface SelectedMomentsProps {
  moments: Moment[];
}

export const SelectedMoments: React.FC<SelectedMomentsProps> = ({ moments }) => {
  const [selectedStory, setSelectedStory] = useState<Moment | null>(null);
  const [activeLightboxImage, setActiveLightboxImage] = useState<ImageItem | null>(null);

  return (
    <section id="moments" className="moments-section" aria-labelledby="moments-heading">
      <div className="container">
        <MomentsCarousel
          moments={moments}
          onOpenStory={(moment) => setSelectedStory(moment)}
        />
      </div>

      {/* Expanded Story Drawer / Modal */}
      <StoryModal
        moment={selectedStory}
        allMoments={moments}
        onClose={() => setSelectedStory(null)}
        onSelectMoment={(moment) => setSelectedStory(moment)}
        onOpenLightbox={(img) => setActiveLightboxImage(img)}
      />

      {/* Full-Screen Image Lightbox */}
      <Lightbox
        image={activeLightboxImage}
        onClose={() => setActiveLightboxImage(null)}
      />
    </section>
  );
};
