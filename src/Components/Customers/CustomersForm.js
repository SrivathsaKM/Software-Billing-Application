import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, ErrorMessage } from 'formik';

import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogTitle, DialogContent, Button, TextField } from '@material-ui/core';
import { Grid, Typography } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import CancelIcon from '@material-ui/icons/Cancel';

import { customerForm } from '../Validations/Validations';
import { submitOneCustomerDetails } from '../../Actions/customersActions';
import { updateOneCustomerDetails } from '../../Actions/customersActions';

const useStyle = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const CustomersForm = (props) => {
  //console.log(props);
  const { handleModalClose, open, customerId, customerName, customerEmail, customerMobile } = props;

  const classes = useStyle();

  const initialStateValue = {
    name: customerName ? customerName : '',
    email: customerEmail ? customerEmail : '',
    mobile: customerMobile ? customerMobile : '',
  };

  const dispatch = useDispatch();

  const submitCustomerForm = (data) => {
    if (customerId) {
      dispatch(updateOneCustomerDetails(data, customerId));
      handleModalClose();
      //console.log(customerId);
    } else {
      dispatch(submitOneCustomerDetails(data));
      handleModalClose();
    }
  };

  return (
    <>
      <Dialog aria-labelledby='customized-dialog-title' open={open} maxWidth='md'>
        <DialogTitle id='customized-dialog-title' onClose={handleModalClose}>
          <Typography variant='body1' gutterBottom style={{ fontWeight: 'bold' }}>
            {customerId ? 'Edit Customer' : 'Add New Customer'}
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Formik initialValues={initialStateValue} validationSchema={customerForm} onSubmit={(data, { resetForm }) => submitCustomerForm(data, resetForm)}>
            {({ handleSubmit, handleChange, values }) => {
              return (
                <Form onSubmit={handleSubmit} className={classes.root}>
                  <Grid container>
                    <Grid item xs={4}>
                      <TextField id='outlined-basic 1' name='name' label='Name' variant='outlined' value={values.name} onChange={handleChange} helperText={<ErrorMessage name='name'>{(name) => <span style={{ color: 'red' }}>{name}</span>}</ErrorMessage>} />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField id='outlined-basic 2' name='email' label='Email' variant='outlined' value={values.email} onChange={handleChange} helperText={<ErrorMessage name='email'>{(email) => <span style={{ color: 'red' }}>{email}</span>}</ErrorMessage>} />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField id='outlined-basic 3' name='mobile' label='Mobile' variant='outlined' value={values.mobile} onChange={handleChange} helperText={<ErrorMessage name='mobile'>{(mobile) => <span style={{ color: 'red' }}>{mobile}</span>}</ErrorMessage>} />
                    </Grid>
                    <Grid item xs={2} style={{ margin: '.5rem' }}>
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
        {/* <Button autoFocus color='primary'>
          Cancel
        </Button> */}
        <Button variant='contained' onClick={handleModalClose} color='secondary' size='large' className={classes.button} endIcon={<CancelIcon />} align='center'>
          Cancel
        </Button>
      </Dialog>
    </>
  );
};
export default CustomersForm;
