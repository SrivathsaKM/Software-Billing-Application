import React from 'react';

import Moment from 'react-moment';

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
      fontSize: '15px',
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
const UserOrderDetails = (props) => {
  const { open, handleModalClose, name, email, mobile, orders } = props;

  const classes = useStyles();
  return (
    <>
      <Dialog onClose={handleModalClose} aria-labelledby='customized-dialog-title' open={open} fullWidth maxWidth='sm' style={{ zIndex: 1, marginTop: '1rem' }}>
        <DialogTitle id='customized-dialog-title' onClose={handleModalClose} style={{ backgroundColor: '#48A7D4' }}>
          <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: '#FFFFFF' }}>Order Summary</span>

          <Grid container>
            <Grid item xs={12} className={classes.innerTable}>
              <strong>Name : {name}</strong>
            </Grid>
            <Grid item xs={12} className={classes.innerTable}>
              <strong>Ph : {mobile} </strong>
            </Grid>
            <Grid item xs={12} className={classes.innerTable}>
              <strong>
                Email : <span style={{ textTransform: 'lowerCase' }}>{email}</span>
              </strong>
            </Grid>
            <Grid item xs={12} className={classes.innerTable}>
              <strong>Order Count : {orders.length}</strong>
            </Grid>
          </Grid>
        </DialogTitle>

        <DialogContent dividers>
          <TableContainer component={Paper}>
            <Table style={{ minWidth: '500px' }} aria-label='simple table'>
              <TableHead className={classes.tableHead}>
                <TableRow>
                  <TableCell align='center'>#</TableCell>
                  <TableCell align='center'>Date</TableCell>
                  <TableCell align='center'>Total Amount (₹)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((cartItem, idx) => {
                  const { date, totalAmount } = cartItem;
                  return (
                    <TableRow key={idx}>
                      <TableCell component='th' scope='row' align='center'>
                        {idx + 1}
                      </TableCell>
                      <TableCell align='center'>
                        <Moment format='DD MMM YYYY  HH:mm:ss'>{date}</Moment>
                      </TableCell>
                      <TableCell align='center'>{totalAmount}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={handleModalClose} style={{ backgroundColor: '#48A7D4', color: '#FFFFFF' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserOrderDetails;
