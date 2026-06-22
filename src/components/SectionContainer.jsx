import React, { forwardRef } from 'react';

const SectionContainer = forwardRef(({ children }, ref) => {
  return (
    <div 
      ref={ref}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        willChange: 'transform, opacity',
        pointerEvents: 'auto',
      }}
    >
      <div style={{ width: '100%', maxWidth: '1200px', padding: '0 2rem' }}>
        {children}
      </div>
    </div>
  );
});

SectionContainer.displayName = 'SectionContainer';

export default SectionContainer;
