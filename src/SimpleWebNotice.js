import React from 'react';

/**
 * Extremely simple web-only notice component
 * This has no dependencies on any potentially problematic native modules
 */
const SimpleWebNotice = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '20px',
    backgroundColor: '#ffffff',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center'
  };

  const contentStyle = {
    maxWidth: '600px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
  };

  const titleStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#3498db', // Primary blue color
    marginBottom: '15px',
  };

  const messageStyle = {
    fontSize: '18px',
    color: '#333333',
    marginBottom: '30px',
    lineHeight: '1.5'
  };

  const qrContainerStyle = {
    marginBottom: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  const qrLabelStyle = {
    fontSize: '16px',
    color: '#666666',
    marginBottom: '15px'
  };

  const qrPlaceholderStyle = {
    width: '150px',
    height: '150px',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '8px'
  };

  const footerStyle = {
    fontSize: '14px',
    color: '#999999',
    fontStyle: 'italic'
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <h1 style={titleStyle}>Za najbolje iskustvo</h1>
        <p style={messageStyle}>
          Molimo preuzmite našu mobilnu aplikaciju za pristup svim funkcionalnostima. 
          Ova aplikacija je optimizirana za mobilne uređaje.
        </p>
        
        <div style={qrContainerStyle}>
          <p style={qrLabelStyle}>Skenirajte QR kod sa svojim telefonom</p>
          <div style={qrPlaceholderStyle}>
            <span>QR Code</span>
          </div>
        </div>
        
        <p style={footerStyle}>
          Puna funkcionalnost dostupna je samo u našoj mobilnoj aplikaciji.
        </p>
      </div>
    </div>
  );
};

export default SimpleWebNotice;