import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import '../styles/navigation.css';

export const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Only activate dark theme if explicitly saved by the user in localStorage
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme === 'dark') {
      setTheme('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      setTheme('light');
      document.documentElement.removeAttribute('data-theme');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  };

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

        <div className="nav-right-group">
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

          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={
              theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
            }
            title={
              theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
            }
          >
            {theme === 'dark' ? (
              <Sun size={17} className="theme-toggle-icon" />
            ) : (
              <Moon size={17} className="theme-toggle-icon" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
