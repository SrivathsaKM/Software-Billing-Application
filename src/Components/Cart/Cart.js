import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import Button from '@material-ui/core/Button';

import CartItems from './CartItems';
import { addCartItemsList } from '../../Actions/cartItemsAction';
import MyCartList from './MyCartList';

const useStyle = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(3),
    padding: theme.spacing(3),
  },
  gridContainer: {
    margin: theme.spacing(3),
    padding: theme.spacing(3),
  },
}));

const Cart = () => {
  const classes = useStyle();

  const customers = useSelector((state) => state.customers);
  const products = useSelector((state) => state.products);
  // console.log(products);

  const dispatch = useDispatch();

  const [searchFn, setSearchFn] = useState('');
  const [customerName, setCustomerName] = useState();
  const [singleCustomerDetails, setSingleCustomerDetails] = useState({});
  const [quantity] = useState(1);

  const [open, setOpen] = useState(false);

  const handleModalOpen = () => {
    setOpen(!open);
  };

  const handleModalClose = () => {
    setOpen(!open);
  };

  const handleCustomerChange = (e, param) => {
    //console.log(param.name);
    if (param) {
      setCustomerName(param.name);
      setSingleCustomerDetails(param);
    } else {
      setCustomerName('');
    }
  };

  const handleSubmitCartItems = (product) => {
    //console.log(product);
    const cartItems = {
      date: new Date(),
      customerId: singleCustomerDetails._id,
      customerName: singleCustomerDetails.name,
      customerMobile: singleCustomerDetails.mobile,
      customerEmail: singleCustomerDetails.email,
      productId: product._id,
      productName: product.name,
      productPrice: product.price,
      quantity: quantity,
    };
    dispatch(addCartItemsList(cartItems));
    //console.log(cartItemsList);
  };

  const searchProduct = () => {
    const result = products.filter((product) => {
      return product.name.toLowerCase().includes(searchFn.toLowerCase()) || String(product.price).includes(searchFn);
    });
    return result;
  };

  return (
    <>
      <Grid container className={classes.gridContainer}>
        <Grid item xs={12} sm={12}>
          <Typography variant='h3' component='h2' style={{ color: '#48A7D4', fontFamily: 'Montserrat, sans-serif', textTransform: 'uppercase' }}>
            Shopping Section
          </Typography>
        </Grid>

        <Grid item xs={12} sm={7} style={{ marginTop: '2em', marginBottom: '2em' }}>
          <>
            {!customerName && (
              <Typography variant='body2' gutterBottom style={{ fontWeight: 'bold', color: 'red', marginBottom: '.5rem' }}>
                Please Select Customer Name to see the Products list
              </Typography>
            )}
            <form>
              <Autocomplete id='combo-box-demo' options={customers} onChange={handleCustomerChange} getOptionLabel={(options) => options.name} style={{ width: '80%' }} renderInput={(params) => <TextField {...params} label='Customer Name' variant='outlined' />} />
            </form>
          </>
        </Grid>

        {customerName && (
          <>
            <Grid item xs={12} sm={5} style={{ marginTop: '2em', marginBottom: '2em' }}>
              <Button variant='contained' color='primary' size='large' style={{ marginTop: '0.6rem' }} onClick={handleModalOpen}>
                my cart
              </Button>
              {open && <MyCartList open={open} handleModalClose={handleModalClose} />}
            </Grid>

            <Grid item xs={12} sm={7} style={{ marginTop: '2em', marginBottom: '2em' }}>
              <TextField
                style={{ width: '80%' }}
                variant='outlined'
                value={searchFn}
                label='Search'
                onChange={(e) => setSearchFn(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment>
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={5} style={{ marginTop: '2em', marginBottom: '2em' }}>
              <Button variant='contained' color='primary' size='large'>
                sort button
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Typography variant='h4' gutterBottom style={{ fontWeight: 'bold', color: 'green' }} align='center'>
                Customer Selected: {customerName}
              </Typography>
              <Typography variant='h4' gutterBottom style={{ fontWeight: 'bold' }} align='center'>
                Total Products - ({searchProduct().length})
              </Typography>
            </Grid>

            <Grid container justify='center' spacing={8}>
              {searchProduct().map((product, idx) => {
                //console.log(bill);
                return (
                  <Grid item xs={12} sm={8} md={4} key={idx}>
                    <CartItems product={product} handleSubmitCartItems={handleSubmitCartItems} />
                  </Grid>
                );
              })}
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default Cart;
