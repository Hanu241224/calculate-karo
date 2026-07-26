import React from 'react';

type InfoPageProps = {
  title: string;
  content: string[];
};

const InfoPage: React.FC<InfoPageProps> = ({ title, content }) => {
  return (
    <div className="workspace-hero" style={{ padding: '60px 40px', maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
      <h1 className="workspace-hero__headline" style={{ marginBottom: '2rem' }}>{title}</h1>
      <div className="workspace-hero__subtitle" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: 'inherit' }}>
        {content.map((paragraph, index) => (
          <p key={index} style={{ fontSize: '1rem', lineHeight: '1.7' }}>
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default InfoPage;
