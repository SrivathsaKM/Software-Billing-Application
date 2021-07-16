import React from 'react';
import Moment from 'react-moment';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { getOneCustomerBill } from '../../Actions/singleBillAction';
import { deleteOneCustomerBill } from '../../Actions/billsAction';

const useStyles = makeStyles((theme) => ({
  table: {
    '& tbody td': {
      fontWeight: 300,
    },
    '& tbody tr:hover': {
      backgroundColor: '#fffbf2',
      cursor: 'pointer',
    },
  },
  text: {
    padding: theme.spacing(0.5),
  },
  root: {
    height: '100%',
    display: 'flex',
    justiyContent: 'space-around',
    flexDirection: 'column',
  },
}));

const BillsItems = ({ _id, name, mobile, email, total, date, customer, lineItems, printName, deleteBtn, pdf }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  //since i got customers details for SEARCH option im avoiding it
  const customers = useSelector((state) => {
    return state.customers.find((cust) => cust._id === customer);
  });

  //getting products bills and lienItems list // In Bills page i have used typical for loop instaed of array methods
  const products = useSelector((state) => {
    let result = [];
    lineItems.map((item) => {
      const data = state.products.find((ele) => ele._id === item.product);
      result.push({ ...data, ...item });
    });
    return result;
  });

  const totalQuantity = () => {
    let sum = 0;
    lineItems.forEach((item) => {
      sum += item.quantity;
    });
    return sum;
  };

  // since i got customers details for search option im avoiding it
  // const subTotal = () => {
  //   let sum = 0;
  //   lineItems.forEach((item) => {
  //     sum += item.subTotal;
  //   });
  //   return sum;
  // };

  const handleOneCustomerBill = (id) => {
    dispatch(getOneCustomerBill(id));
  };

  const handleDeleteOneCustomerBill = (id) => {
    //alert(id);
    //console.log(id);
    dispatch(deleteOneCustomerBill(id));
  };

  const handleDownloadPdf = () => {
    const unit = 'pt';
    const size = 'A4'; // Use A1, A2, A3 or A4
    const orientation = 'portrait'; // portrait or landscape

    const marginLeft = 40;
    const marginLeft2 = 430;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(14);

    // const titles = 'Order Distribution';
    const id = `Invoice Id: ${_id}`;
    const name = `Name: ${customers.name}`;
    const mobile = `Mobile: ${customers.mobile}`;
    const email = `Email: ${customers.email}`;
    const totalItems = `Total Items: ${totalQuantity()}`;
    const uniqueItems = `Unique Items: ${products.length}`;
    const totalPrice = `Total Price: Rs.${total}`;
    const gst = `GST (18%): Rs.${Math.round(total * 0.18)}`;
    const grandTotal = `Grand Total: Rs.${total + Math.round(total * 0.18)}`;

    const headers = [['#', 'Porduct Name', 'Quantity', 'Price', 'Sub Total']];

    const data = products.map((product, idx) => [idx + 1, product.name, product.quantity, product.price, product.subTotal]);

    let content = {
      startY: 160,
      head: headers,
      body: data,
    };
    //
    doc.text('Invoice Generation', 220, 40);
    doc.text(id, marginLeft, 80);
    doc.autoTable(content);
    doc.text(name, marginLeft, 100);
    doc.text(mobile, marginLeft, 120);
    doc.text(email, marginLeft, 140);
    let finalY = doc.lastAutoTable.finalY; // The y position on the page
    doc.text(totalItems, marginLeft2, finalY + 20);
    doc.text(uniqueItems, marginLeft2, finalY + 40);
    doc.text(totalPrice, marginLeft2, finalY + 60);
    doc.text(gst, marginLeft2, finalY + 80);
    doc.text(grandTotal, marginLeft2, finalY + 100);
    doc.save('invoice.pdf');
  };

  return (
    <>
      <Paper elevation={3} className={classes.root} id='customers'>
        <Card variant='outlined'>
          <CardActionArea>
            <CardContent>
              <Grid container>
                <Grid item xs={12} sm={12} className={classes.text}>
                  <strong>Invoice Id: </strong> {_id}
                </Grid>
                <Grid item xs={12} sm={12} className={classes.text}>
                  <strong>Date: </strong>
                  <Moment format='DD MMM YYYY  HH:mm:ss'>{date}</Moment>
                </Grid>
                <Grid item xs={12} sm={12} className={classes.text}>
                  <strong>Name: </strong> {name ? name : customers.name}
                </Grid>
                <Grid item xs={12} sm={5} className={classes.text}>
                  <strong>Mobile: </strong> {mobile ? mobile : customers.mobile}
                </Grid>

                <Grid item xs={12} sm={7} className={classes.text}>
                  <strong>Email: </strong> {email ? email : customers.email}
                </Grid>
              </Grid>

              <Divider style={{ marginTop: '1rem', marginBottom: '1rem' }} />
              <Grid container>
                <Grid item xs={12} sm={12} className={classes.text}>
                  <TableContainer>
                    <Table border={2}>
                      <TableHead>
                        <TableRow>
                          <TableCell>Product Name</TableCell>
                          <TableCell>Quantity</TableCell>
                          <TableCell>Price</TableCell>
                          <TableCell>Sub Total</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {products.map((product) => {
                          return (
                            <TableRow key={product._id}>
                              <TableCell>{product.name}</TableCell>
                              <TableCell>{product.quantity}</TableCell>
                              <TableCell>{product.price}</TableCell>
                              <TableCell>{product.subTotal}</TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
              <Divider style={{ marginTop: '1rem', marginBottom: '1rem' }} />
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant='body2' gutterBottom align='right' color='inherit'>
                    <strong>Total Items: </strong> {totalQuantity()}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='body2' gutterBottom align='right' color='inherit'>
                    <strong>Unique Items: </strong> {products.length}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='body2' gutterBottom align='right' color='inherit'>
                    <strong>Total Price: </strong> ₹{total}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='body2' gutterBottom align='right' color='inherit'>
                    <strong>GST (18%): </strong> ₹{Math.round(total * 0.18)}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='body2' gutterBottom align='right' color='inherit'>
                    <strong>Grand Total {totalQuantity() === 1 ? `(${totalQuantity()} item)` : `(${totalQuantity()} items)`}: </strong> ₹{total + Math.round(total * 0.18)}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
          <Divider style={{ marginTop: '1rem', marginBottom: '1rem' }} />

          {deleteBtn && (
            <CardActions style={{ verticalAlign: 'bottom' }}>
              <Link to={`/bills/${_id}`}>
                <Button size='small' color='primary' onClick={() => handleOneCustomerBill(_id)}>
                  {printName}
                </Button>
              </Link>
              <Button
                size='small'
                color='primary'
                style={{ display: 'flex', marginLeft: 'auto' }}
                onClick={() => {
                  Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!',
                  }).then((result) => {
                    if (result.isConfirmed) {
                      handleDeleteOneCustomerBill(_id);
                      Swal.fire('Deleted!', 'Customer info has been deleted.', 'success');
                    }
                  });
                }}>
                {deleteBtn}
              </Button>
            </CardActions>
          )}
          {pdf && (
            <CardActions>
              <Link to={`/bills`}>
                <Button size='small' color='primary'>
                  back to bills Page
                </Button>
              </Link>
              <Button
                size='small'
                color='primary'
                style={{ display: 'flex', marginLeft: 'auto' }}
                onClick={() => {
                  handleDownloadPdf();
                }}>
                download as pdf
              </Button>
            </CardActions>
          )}
        </Card>
      </Paper>
    </>
  );
};

export default BillsItems;
