import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { getAllCustomers } from '../../Actions/customersActions';
import Loading from './../Loading';
import CustomersList from './CustomersList';
import { getAllProducts } from './../../Actions/productsAction';
import { getAllCustomersBills } from './../../Actions/billsAction';

const useStyle = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
}));

const Customers = (props) => {
  const classes = useStyle();

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCustomers(handleLoading));
    dispatch(getAllProducts(handleLoading));
    dispatch(getAllCustomersBills(handleLoading));
  }, [dispatch]);

  const handleLoading = () => {
    setLoading(false);
  };

  const customers = useSelector((state) => {
    return state.customers;
  });

  return (
    <div style={{ width: '100%' }}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Grid container className={classes.pageContent}>
            <Grid item xs={12}>
              <Typography variant='h3' component='h2' style={{ color: '#48A7D4', fontFamily: 'Montserrat, sans-serif', textTransform: 'uppercase' }}>
                Listing Customers - {customers.length}
              </Typography>
            </Grid>
          </Grid>

          <Paper className={classes.pageContent} elevation={3}>
            <CustomersList />
          </Paper>
        </>
      )}
    </div>
  );
};

export default Customers;
