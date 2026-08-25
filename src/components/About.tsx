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
              , responsible for the Product Data domain within our global B2X ecosystem — encompassing PIM, DAM, Product Data Syndication, and interfaces to consumer applications and retail. While I shape target architectures and contribute to the STIHL Cloud Core Team, I stay deeply hands-on, actively building prototypes, backend services, and applied AI systems like RAG assistants and product recommendation models.
            </p>
            <p>
              Previously, I was Tech Lead for STIHL Service Communication, guiding the architecture and operations of our central aftersales portal powered by 30+ microservices.
            </p>
            <p>
              Off my keyboard, I enjoy playing handball, skiing in the winter, and like to go running.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
