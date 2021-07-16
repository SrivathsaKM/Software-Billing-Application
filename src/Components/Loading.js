import React from 'react';

import './Loading.css';

const Loading = () => {
  // return <img src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif' alt='spinner' style={{ }} />;
  return (
    <div className='loading'>
      <div className='loader'>
        <img src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif' alt='spinner' />
      </div>
    </div>
  );
};

export default Loading;
