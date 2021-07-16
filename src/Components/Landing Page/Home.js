import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';
import Hero from './Hero';
import Banner from './Banner';

const Home = () => {
  return (
    <>
      <Hero style={{ zIndex: -1 }}>
        <Banner title='Invoice software that is easy and free' subtitle=" It's  simple and  free to use">
          <Link to='/login' className='btn-primary'>
            Start using for free
          </Link>
        </Banner>
      </Hero>
    </>
  );
};

export default Home;
