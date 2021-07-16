import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import BillsItems from './BillsItems';
import { getOneCustomerBill } from '../../Actions/singleBillAction';

import Loading from '../Loading';

const SingleBill = (props) => {
  const id = props.match.params.id;
  const [loading, setLoading] = useState(true);

  const singleBill = useSelector((state) => state.singleBill);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneCustomerBill(id, handleLoading));
  }, [dispatch, id]);

  const handleLoading = () => {
    setLoading(false);
  };

  return (
    <Grid container justify='center' style={{ marginTop: '2rem' }}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Grid item xs={12}>
            <Typography variant='h3' component='h2' align='center' style={{ color: '#48A7D4', fontFamily: 'Montserrat, sans-serif' }} gutterBottom>
              Invoice
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}></Grid>
          {singleBill.length > 0 &&
            singleBill.map((bill, idx) => {
              return (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <BillsItems {...bill} pdf='pdf' />
                </Grid>
              );
            })}
        </>
      )}
    </Grid>
  );
};

export default SingleBill;
