import React from 'react';

const Hero = (props) => {
  const { hero, children } = props;
  return (
    <>
      <header className={hero}>{children}</header>
    </>
  );
};

Hero.defaultProps = {
  hero: 'hero',
};

export default Hero;
