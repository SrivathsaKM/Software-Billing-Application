import React from 'react';
import { withRouter } from 'react-router';
import Swal from 'sweetalert2';
import Moment from 'react-moment';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { handleIncrement } from '../../Actions/cartItemsAction';
import { handleDecrement } from '../../Actions/cartItemsAction';
import { handleDelete } from '../../Actions/cartItemsAction';
import { removeCartItems } from '../../Actions/cartItemsAction';
import CartMessage from './CartMessage';
import { addCustomerBill } from '../../Actions/billsAction';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  maincolor: {
    color: '#ffffff',
  },
  table: {
    minWidth: 650,
  },
  tableHead: {
    backgroundColor: '#619196',
    '& .MuiTableCell-head': {
      color: 'whitesmoke',
      fontSize: '18px',
      fontWeight: 'bold',
      opacity: 1,
    },
  },
  button: {
    margin: theme.spacing(1),
  },

  tableButton: {
    backgroundColor: '#FF8484',
    color: '#FFFFFF',
    borderRadius: '15px',
  },

  carditem: {
    textAlign: 'center',
  },

  namephone: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerTable: {
    fontSize: '18px',
    color: '#fff',
    fontWeight: 'normal',
    //borderBottom: '2px solid #FAB164',
    fontFamily: 'Arial',
  },
}));
const MyCartList = (props) => {
  const { open, handleModalClose } = props;
  //console.log('billgen', props);

  const cartItems = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();
  //console.log(cartItems);

  const lineItemsList = () => {
    const items = cartItems.map((item) => {
      //console.log('quantity', item);
      return { product: item.productId, quantity: item.quantity };
    });
    return items;
  };

  const toatalQuantity = () => {
    let sum = 0;
    cartItems.forEach((item) => {
      sum += item.quantity;
    });
    return sum;
  };

  const totalAmount = () => {
    let sum = 0;
    cartItems.forEach((item) => {
      sum += item.productPrice * item.quantity;
    });
    return sum;
  };

  const handleChangeIncrement = (productId) => {
    dispatch(handleIncrement(productId));
  };

  const handleChangeDecrement = (productId) => {
    dispatch(handleDecrement(productId));
  };

  const handleChangeDelete = (productId) => {
    dispatch(handleDelete(productId));
  };

  //Generating customer Bill
  const handleBillGenerate = () => {
    const addBill = {
      date: cartItems[0].date,
      customer: cartItems[0].customerId,
      lineItems: lineItemsList(),
    };
    //console.log(addBill);
    dispatch(addCustomerBill(addBill));
    handleModalClose();
    setTimeout(() => {
      dispatch(removeCartItems()); //Remove All Cart items once submitted
      props.history.push('/bills');
    }, 1000);
  };

  const classes = useStyles();
  return (
    <>
      {cartItems.length > 0 ? (
        <Dialog onClose={handleModalClose} aria-labelledby='customized-dialog-title' open={open} fullWidth maxWidth='md' style={{ zIndex: 1, marginTop: '1rem' }}>
          <DialogTitle id='customized-dialog-title' onClose={handleModalClose} style={{ backgroundColor: '#48A7D4' }}>
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: '#FFFFFF' }}>Order Summary</span>

            <Grid container>
              <Grid item xs={12} className={classes.innerTable}>
                <span style={{ fontFamily: 'Montserrat, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', fontWeight: 'bold', color: '#FFFFFF', textDecoration: 'underline' }}>
                  Date: &nbsp; <Moment format='DD MMM YYYY  HH:mm:ss'>{cartItems[0].date}</Moment>
                </span>
              </Grid>
              <Grid item xs={12} sm={6} md={4} className={classes.innerTable}>
                <strong>Name: {cartItems[0].customerName}</strong>
              </Grid>
              <Grid item xs={12} sm={6} md={4} className={classes.innerTable}>
                <strong>Ph: {cartItems[0].customerMobile}</strong>
              </Grid>
              <Grid item xs={12} sm={6} md={4} className={classes.innerTable}>
                <strong>
                  Email : <span style={{ textTransform: 'lowercase' }}> {cartItems[0].customerEmail}</span>
                </strong>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} sm={6} md={4} className={classes.innerTable}>
                <strong>Total Items: {toatalQuantity()}</strong>
              </Grid>
              <Grid item xs={12} sm={6} md={4} className={classes.innerTable}>
                <strong>Order Count: {cartItems.length}</strong>
              </Grid>
              <Grid item xs={12} sm={6} md={4} className={classes.innerTable}>
                <strong>Total Amount (₹): {totalAmount()}</strong>
              </Grid>
            </Grid>
          </DialogTitle>

          <DialogContent dividers>
            <TableContainer component={Paper}>
              <Table style={{ minWidth: '500px' }} aria-label='simple table'>
                <TableHead className={classes.tableHead}>
                  <TableRow>
                    <TableCell align='center'>#</TableCell>
                    <TableCell align='center'>Product Name</TableCell>
                    <TableCell align='center'>Product Price (₹)</TableCell>
                    <TableCell align='center'>Quantity</TableCell>
                    <TableCell align='center'>Sub Total (₹)</TableCell>
                    <TableCell align='center'>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((cartItem, idx) => {
                    const { productName, productPrice, quantity, productId } = cartItem;
                    return (
                      <TableRow key={idx}>
                        <TableCell component='th' scope='row' align='center'>
                          {idx + 1}
                        </TableCell>
                        <TableCell align='center'>{productName}</TableCell>
                        <TableCell align='center'>{productPrice}</TableCell>

                        <TableCell align='center'>
                          <Button variant='contained' color='secondary' className={classes.button} startIcon={<ChevronLeftIcon style={{ paddingLeft: '2px' }} />} disabled={quantity === 1} size='small' onClick={() => handleChangeDecrement(productId)} style={{ maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }} />
                          {quantity}
                          <Button variant='contained' style={{ backgroundColor: '#28A745', color: 'white', maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }} className={classes.button} size='small' onClick={() => handleChangeIncrement(productId)} startIcon={<ChevronRightIcon style={{ paddingLeft: '2px' }} />} />
                        </TableCell>
                        <TableCell align='center'>{productPrice * quantity}</TableCell>
                        <TableCell align='center'>
                          <Button
                            variant='contained'
                            color='secondary'
                            size='small'
                            className={classes.button}
                            startIcon={<DeleteIcon />}
                            onClick={() => {
                              Swal.fire({
                                title: 'Are you sure?',
                                text: "You won't be able to revert this!",
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Yes, delete it!',
                                customClass: {
                                  container: 'my-swal',
                                },
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  handleChangeDelete(productId);
                                  Swal.fire('Deleted!', 'Customer info has been deleted.', 'success');
                                }
                              });
                            }}>
                            delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant='contained' onClick={handleBillGenerate} style={{ backgroundColor: '#E18D96', color: '#FFFFFF' }}>
              Check Out
            </Button>
            <Button variant='contained' onClick={handleModalClose} style={{ backgroundColor: '#48A7D4', color: '#FFFFFF' }}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <CartMessage open={open} handleModalClose={handleModalClose} />
      )}
    </>
  );
};

export default withRouter(MyCartList);
