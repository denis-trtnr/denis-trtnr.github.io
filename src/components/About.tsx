import React from 'react';
import '../styles/about.css';

export const About: React.FC = () => {
  return (
    <section id="about" className="about-section" aria-labelledby="about-heading">
      <div className="container">
        {/* Top Header */}
        <div className="about-header">
          <h2 id="about-heading" className="about-title">About Me</h2>
        </div>

        {/* Editorial Body */}
        <div className="about-body">
          <div className="about-prose">
            <p>
              I work as a Solution Architect at{' '}
              <a
                href="https://corporate.stihl.com/en"
                target="_blank"
                rel="noopener noreferrer"
                className="about-link"
              >
                STIHL
              </a>
              , responsible for the Product Data domain within our global B2X ecosystem — encompassing PIM, DAM, Product Data Syndication, and interfaces to consumer applications and retail. My work combines architecture with hands-on development, including prototypes, backend services, and applied AI solutions such as RAG assistants and product recommendation models.
            </p>
            <p>
              Previously, I was a Tech Lead for the STIHL Service Communication, guiding the development and operations of our central aftersales portal powered by 30+ microservices.
            </p>
            <p>
              Alongside my industry work, I am a Guest Researcher at the DFKI{' '}
              <a
                href="https://www.dfki.de/web/forschung/forschungsbereiche/speech-and-language-technology/"
                target="_blank"
                rel="noopener noreferrer"
                className="about-link"
              >
                Speech and Language Technology Lab
              </a>{' '}
              , with research interests in Information Extraction, Information Retrieval, and Graph Learning. In October 2026, my first research paper will be published at WNUT 2026 during the Conference on Empirical Methods in Natural Language Processing (EMNLP) in Budapest.
            </p>
            <p>
              Off my keyboard, I enjoy playing handball, skiing in winter, and going for a run.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
