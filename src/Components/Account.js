import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { userInfo } from '../Actions/userAction';
import Loading from './Loading';
import './Account.css';

const Account = (props) => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userInfo(handleLoading));
  }, [dispatch]);

  const handleLoading = () => {
    setLoading(false);
  };

  const user = useSelector((state) => {
    return state.user;
  });

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <main>
          <section className='container'>
            <div className='title'>
              <h2>User Profile</h2>
              <div className='underline'></div>
            </div>

            <article className='review'>
              <div className='img-container'>
                <img src={`https://images.unsplash.com/photo-1613679074971-91fc27180061?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1868&q=80`} id='person-img' alt='' />
              </div>
              <h3>Name: {user.username}</h3>
              <p>Email: {user.email}</p>
              <h4>Buissness Name: {user.businessName}</h4>
              <p>Address: {user.address}</p>
            </article>
          </section>
        </main>
      )}
    </>
  );
};

export default Account;
