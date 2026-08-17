import React, { useState } from 'react';
import { Mail, Check, Copy } from 'lucide-react';
import { SocialLinksData } from '../types';
import '../styles/social-links.css';

interface SocialLinksProps {
  social: SocialLinksData;
  className?: string;
}

const GithubIcon: React.FC<{ size?: number; className?: string }> = ({ size = 16, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon: React.FC<{ size?: number; className?: string }> = ({ size = 16, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const OrcidIcon: React.FC<{ size?: number; className?: string }> = ({ size = 16, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.516.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.016-5.325 5.016h-3.919V7.416zm1.444 1.303v7.434h2.247c2.634 0 3.834-1.744 3.834-3.719 0-2.091-1.331-3.715-3.816-3.715h-2.265z" />
  </svg>
);

export const SocialLinks: React.FC<SocialLinksProps> = ({ social, className = '' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(social.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`social-links-container ${className}`} role="list" aria-label="Social and Contact Profiles">
      {/* GitHub */}
      <a
        href={social.github}
        className="social-badge-link"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Denis Trautner on GitHub"
        role="listitem"
      >
        <GithubIcon size={16} className="social-icon" />
        <span className="social-label">GitHub</span>
      </a>

      {/* LinkedIn */}
      <a
        href={social.linkedin}
        className="social-badge-link"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Denis Trautner on LinkedIn"
        role="listitem"
      >
        <LinkedinIcon size={16} className="social-icon" />
        <span className="social-label">LinkedIn</span>
      </a>

      {/* ORCID */}
      <a
        href={social.orcid}
        className="social-badge-link"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Denis Trautner on ORCID"
        role="listitem"
      >
        <OrcidIcon size={16} className="social-icon" />
        <span className="social-label">ORCID</span>
      </a>

      {/* Email Written Out Directly */}
      <div className="email-badge-group" role="listitem">
        <a
          href={`mailto:${social.email}`}
          className="social-badge-link email-badge-link"
          aria-label={`Send email to ${social.email}`}
        >
          <Mail size={16} className="social-icon" />
          <span className="email-address">{social.email}</span>
        </a>
        <button
          onClick={handleCopyEmail}
          className="email-copy-btn"
          aria-label="Copy email address to clipboard"
          title="Copy email to clipboard"
        >
          {copied ? <Check size={13} className="copied-icon" /> : <Copy size={13} />}
          <span className="sr-only">{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
    </div>
  );
};
