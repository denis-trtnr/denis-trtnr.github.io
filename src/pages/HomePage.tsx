import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { MomentsCarousel } from '../components/MomentsCarousel';
import { Footer } from '../components/Footer';
import { heroContent, socialData } from '../data/content';
import { getAllMoments } from '../moments';

export const HomePage: React.FC = () => {
  const location = useLocation();
  const moments = getAllMoments();

  useEffect(() => {
    const targetId = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (targetId) {
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    }
  }, [location.state]);

  return (
    <>
      <main id="main-content">
        <Hero content={heroContent} />
        <div className="container">
          <hr className="editorial-divider" aria-hidden="true" />
        </div>
        <About />
        <div className="container">
          <hr className="editorial-divider" aria-hidden="true" />
        </div>
        <MomentsCarousel moments={moments} />
      </main>
      <Footer social={socialData} />
    </>
  );
};
