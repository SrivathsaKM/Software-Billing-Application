import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';

import MyCartList from './MyCartList';

const useStyles = makeStyles((theme) => ({}));

const CartForm = () => {
  const classes = useStyles();

  const [searchFn, setSearchFn] = useState('');
  const [open, setOpen] = useState(false);

  const handleModalOpen = () => {
    setOpen(!open);
  };

  const handleModalClose = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={4}></Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Button variant='contained' color='primary' size='large' style={{ marginTop: '0.6rem' }}>
            Sort Products
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Button variant='contained' color='primary' size='large' style={{ marginTop: '0.6rem' }} onClick={handleModalOpen}>
            my cart
          </Button>
        </Grid>
      </Grid>
      {open && <MyCartList open={open} handleModalClose={handleModalClose} />}
    </div>
  );
};

export default CartForm;
