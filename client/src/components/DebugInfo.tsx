import React from 'react';

const DebugInfo: React.FC = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', margin: '20px' }}>
      <h2>Debug Information</h2>
      <p>Frontend is working!</p>
      <p>Environment: {process.env.NODE_ENV}</p>
      <p>API URL: {process.env.REACT_APP_API_URL}</p>
      <p>Timestamp: {new Date().toISOString()}</p>
    </div>
  );
};

export default DebugInfo;
