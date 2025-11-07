// Skip Links Component - Accessibility
// Ermöglicht Keyboard-Usern, direkt zum Haupt-Content zu springen

'use client';

import React from 'react';

export const SkipLinks: React.FC = () => {
  return (
    <div className="skip-links">
      <a
        href="#main-content"
        className="skip-link"
      >
        Zum Hauptinhalt springen
      </a>
      <a
        href="#navigation"
        className="skip-link"
      >
        Zur Navigation springen
      </a>

      <style jsx>{`
        .skip-links {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 9999;
        }

        .skip-link {
          position: absolute;
          left: -9999px;
          top: 0;
          padding: 1rem;
          background: var(--color-temple-gold);
          color: white;
          text-decoration: none;
          font-weight: bold;
          border-radius: 0 0 0.5rem 0;
        }

        .skip-link:focus {
          left: 0;
          outline: 3px solid var(--color-temple-blue);
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
};

