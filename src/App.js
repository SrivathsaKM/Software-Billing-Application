import React, { useState } from 'react';

import Router from './Router';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleToggleUser = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <>
      <Router isLoggedIn={isLoggedIn} handleToggleUser={handleToggleUser} />
    </>
  );
};

export default App;
