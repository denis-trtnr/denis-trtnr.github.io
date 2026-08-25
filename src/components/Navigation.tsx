import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/navigation.css';

export const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleBrandClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
    } else {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="site-nav" role="banner">
      <div className="container site-nav-inner">
        <a
          href="/"
          className="nav-brand"
          onClick={handleBrandClick}
          aria-label="Denis Trautner homepage - back to top"
        >
          Denis Trautner
        </a>
        <nav aria-label="Main Navigation">
          <ul className="nav-links">
            <li>
              <a
                href="#about"
                className="nav-link"
                onClick={handleNavClick('about')}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#moments"
                className="nav-link"
                onClick={handleNavClick('moments')}
              >
                <span className="nav-link-full">Selected Moments</span>
                <span className="nav-link-short">Moments</span>
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="nav-link"
                onClick={handleNavClick('contact')}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
