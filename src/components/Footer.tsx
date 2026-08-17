import React from 'react';
import { SocialLinksData } from '../types';
import { SocialLinks } from './SocialLinks';
import '../styles/footer.css';

interface FooterProps {
  social: SocialLinksData;
}

export const Footer: React.FC<FooterProps> = ({ social }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="site-footer" role="contentinfo">
      <div className="container footer-inner">
        <p className="footer-copyright">
          &copy; {currentYear} Denis Trautner
        </p>

        <div className="footer-social-wrap">
          <SocialLinks social={social} />
        </div>
      </div>
    </footer>
  );
};
