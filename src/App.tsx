import React from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { MomentsAccordion } from './components/MomentsAccordion';
import { Currently } from './components/Currently';
import { Footer } from './components/Footer';
import { heroContent, momentsData, currentlyStatements, socialData } from './data/content';

export const App: React.FC = () => {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <Hero content={heroContent} />
        <div className="container">
          <hr className="editorial-divider" aria-hidden="true" />
        </div>
        <MomentsAccordion moments={momentsData} />
        <div className="container">
          <hr className="editorial-divider" aria-hidden="true" />
        </div>
        <Currently items={currentlyStatements} />
      </main>
      <Footer social={socialData} />
    </>
  );
};

export default App;
