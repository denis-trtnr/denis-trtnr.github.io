import React from 'react';
import '../styles/navigation.css';

export const Navigation: React.FC = () => {
  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="site-nav" role="banner">
      <div className="container site-nav-inner">
        <a href="#top" className="nav-brand" onClick={scrollTo('top')} aria-label="Denis Trautner homepage">
          Denis Trautner
        </a>
        <nav aria-label="Main Navigation">
          <ul className="nav-links">
            <li>
              <a href="#moments" className="nav-link" onClick={scrollTo('moments')}>
                Selected Moments
              </a>
            </li>
            <li>
              <a href="#currently" className="nav-link" onClick={scrollTo('currently')}>
                Currently
              </a>
            </li>
            <li>
              <a href="#contact" className="nav-link" onClick={scrollTo('contact')}>
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
