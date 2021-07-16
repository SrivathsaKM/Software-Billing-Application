import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import Loading from '../Loading';
import { getAllProducts } from '../../Actions/productsAction';
import ProductsList from './ProductsList';
import { getAllCustomersBills } from './../../Actions/billsAction';
import { getAllCustomers } from './../../Actions/customersActions';

const useStyle = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
}));

const Products = (props) => {
  const classes = useStyle();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const products = useSelector((state) => {
    return state.products;
  });

  useEffect(() => {
    dispatch(getAllProducts(handleLoading));
    dispatch(getAllCustomersBills(handleLoading));
    dispatch(getAllCustomers(handleLoading));
  }, [dispatch]);

  const handleLoading = () => {
    setLoading(false);
  };

  return (
    <div style={{ width: '100%', margin: '1rem' }}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Grid container className={classes.pageContent}>
            <Grid item xs={12}>
              <Typography variant='h3' component='h2' style={{ color: '#48A7D4', fontFamily: 'Montserrat, sans-serif', textTransform: 'uppercase' }}>
                Listing Products - {products.length}
              </Typography>
            </Grid>
          </Grid>
          <Paper className={classes.pageContent} elevation={3}>
            <ProductsList />
          </Paper>
        </>
      )}
    </div>
  );
};

export default Products;
