import React from 'react';
import { useSelector } from 'react-redux';
import Moment from 'react-moment';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  table: {
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(1),
    '& tbody tr:hover': {
      backgroundColor: '#fffbf2',
      cursor: 'pointer',
    },
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
}));

const LastFiveBills = () => {
  const bills = useSelector((state) => {
    return state.bills.length < 5 ? state.bills.slice(0, state.bills.length).reverse() : state.bills.slice(-5).reverse();
  });

  const classes = useStyles();
  return (
    <>
      <Grid container spacing={3} style={{ marginLeft: '1rem', marginRight: '1rem', marginBottom: '1rem' }}>
        <Grid item xs={12} sm={9}>
          <Typography variant='h3' component='h2' style={{ color: '#48A7D4', fontFamily: 'Montserrat, sans-serif', textTransform: 'uppercase' }}>
            Last 5 Bills
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}></Grid>
      </Grid>
      <TableContainer component={Paper} className={classes.table}>
        <Table style={{ minWidth: '500px' }} aria-label='simple table'>
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell align='center'>#</TableCell>
              <TableCell align='center'>Date</TableCell>
              <TableCell align='center'>Total Amount (₹)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bills.slice(0, 5).map((bill, idx) => {
              const { date, total } = bill;
              return (
                <TableRow key={idx}>
                  <TableCell component='th' scope='row' align='center'>
                    {idx + 1}
                  </TableCell>
                  <TableCell align='center'>
                    <Moment format='DD MMM YYYY  HH:mm:ss'>{date}</Moment>
                  </TableCell>
                  <TableCell align='center'>{total}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default LastFiveBills;
