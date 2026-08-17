import React from 'react';
import { CurrentlyItem } from '../types';
import '../styles/currently.css';

interface CurrentlyProps {
  items: CurrentlyItem[];
}

export const Currently: React.FC<CurrentlyProps> = ({ items }) => {
  return (
    <section id="currently" className="currently-section" aria-labelledby="currently-heading">
      <div className="container">
        <header className="currently-header">
          <div className="currently-kicker">Current Focus</div>
          <h2 id="currently-heading" className="currently-title">
            Currently
          </h2>
        </header>

        <ul className="currently-list">
          {items.map((item) => (
            <li key={item.id} className="currently-item-card">
              <div className="currently-indicator">
                <span className="indicator-dot" />
              </div>
              <div className="currently-body">
                {item.category && (
                  <span className="currently-category">{item.category}</span>
                )}
                <p className="currently-text">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
