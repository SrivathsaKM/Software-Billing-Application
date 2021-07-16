import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, ErrorMessage } from 'formik';

import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SendIcon from '@material-ui/icons/Send';
import CancelIcon from '@material-ui/icons/Cancel';

import { productForm } from '../Validations/Validations';
import { addOneProduct } from '../../Actions/productsAction';
import { updateOneProduct } from '../../Actions/productsAction';

const useStyle = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const ProductsForm = (props) => {
  //console.log(props);
  const { open, handleModalClose, productId, productName, productPrice } = props;

  const classes = useStyle();

  const initialStateValue = {
    name: productName ? productName : '',
    price: productPrice ? productPrice : '',
  };

  const dispatch = useDispatch();

  const submitProductForm = (data) => {
    if (productId) {
      dispatch(updateOneProduct(data, productId));
      handleModalClose();
    } else {
      dispatch(addOneProduct(data));
      handleModalClose();
    }
  };

  return (
    <>
      <Dialog aria-labelledby='customized-dialog-title' open={open} maxWidth='md'>
        <DialogTitle id='customized-dialog-title' onClose={handleModalClose}>
          <Typography variant='body1' gutterBottom style={{ fontWeight: 'bold' }}>
            {productId ? 'Edit product' : 'Add New product'}
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Formik initialValues={initialStateValue} validationSchema={productForm} onSubmit={(data, { resetForm }) => submitProductForm(data, resetForm)}>
            {({ handleSubmit, handleChange, values }) => {
              return (
                <Form onSubmit={handleSubmit} className={classes.root}>
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <TextField style={{ width: '15rem' }} name='name' label='Name' variant='outlined' value={values.name} onChange={handleChange} helperText={<ErrorMessage name='name'>{(name) => <span style={{ color: 'red' }}>{name}</span>}</ErrorMessage>} />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField style={{ width: '15rem' }} name='price' label='Price' variant='outlined' value={values.price} onChange={handleChange} helperText={<ErrorMessage name='price'>{(price) => <span style={{ color: 'red' }}>{price}</span>}</ErrorMessage>} />
                    </Grid>
                    <Grid item xs={3}>
                      <Button type='submit' variant='contained' color='primary' size='large' className={classes.button} endIcon={<SendIcon />} align='center'>
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        </DialogContent>
        <Button variant='contained' onClick={handleModalClose} color='secondary' size='large' className={classes.button} endIcon={<CancelIcon />} align='center'>
          Cancel
        </Button>
      </Dialog>
    </>
  );
};
export default ProductsForm;
