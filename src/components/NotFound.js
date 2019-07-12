import React from 'react';

const NotFound = () => {
  return (
    <div
      className="uk-align-center"
      style={{ maxHeight: '25vh', maxWidth: '25vw' }}
    >
      <div className="uk-inline">
        <img src="/img/not-found.jpg" alt="not-found image" />
        <div
          className="uk-overlay uk-overlay-primary uk-position-bottom"
          style={{ textAlign: 'center' }}
        >
          <h1>404</h1>
          <h1>Page Not Found</h1>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
