import React from 'react';

const DevModeBanner: React.FC = () => {
  const mode = process.env.NODE_ENV;

  let bannerText = '';
  let bannerColor = '';

  if (mode === 'development') {
    bannerText = '⚠️ DEVELOPMENT MODE – Running Locally';
    bannerColor = '#facc15'; // Yellow
  } else if (mode === 'production') {
    bannerText = '🟢 PRODUCTION MODE – Live on Payload Cloud';
    bannerColor = '#3b82f6'; // Blue
  } else {
    return null; // If NODE_ENV is undefined or something unexpected
  }

  return (
    <div
      style={{
        backgroundColor: bannerColor,
        color: '#000',
        textAlign: 'center',
        padding: '0.5rem',
        fontWeight: 'bold',
        fontSize: '0.9rem',
      }}
    >
      {bannerText}
    </div>
  );
};

export default DevModeBanner;
