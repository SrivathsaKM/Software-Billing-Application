import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Loading from '../Loading';
import { getAllCustomersBills } from '../../Actions/billsAction';
import { getAllCustomers } from '../../Actions/customersActions';
import { getAllProducts } from '../../Actions/productsAction';
import BillsItems from './BillsItems';

const useStyles = makeStyles((theme) => ({
  conatiner: {
    width: '100%',
    backgroundColor: '#EFEFEF',
  },
  gridItem: {
    marginTop: '2rem',
    marginBottom: '2rem',
  },
  heading: {
    color: '#48A7D4',
    fontFamily: 'Montserrat, sans-serif',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: '3rem',
  },
  gridContainer: {
    margin: theme.spacing(3),
    padding: theme.spacing(3),
    //spacing: '1rem',
  },
}));

const Bills = () => {
  const classes = useStyles();

  const bills = useSelector((state) => state.bills);
  // console.log(bills);
  const customers = useSelector((state) => state.customers);
  const dispatch = useDispatch();

  const [searchData, setSearchData] = useState('');
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState(bills);

  useEffect(() => {
    dispatch(getAllCustomers(handleLoading));
    dispatch(getAllProducts(handleLoading));
    dispatch(getAllCustomersBills(handleLoading));
  }, [dispatch]);

  const handleLoading = () => {
    setLoading(false);
  };

  //Getting Customers Details
  useEffect(() => {
    let result = [];
    for (let i = 0; i < bills.length; i++) {
      for (let j = 0; j < customers.length; j++) {
        if (customers[j]._id === bills[i].customer) {
          result.push({ ...customers[j], ...bills[i] });
        }
      }
    }
    // console.log(result);
    //setFilteredData(result);
    //Search Options
    const finalResult = result.filter((ele) => ele.name.toLowerCase().includes(searchData.toLowerCase()) || ele.mobile.includes(searchData));
    if (finalResult) {
      //console.log(finalResult);
      setFilteredData(finalResult);
    } else {
      setFilteredData(bills);
    }
  }, [customers, searchData]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Grid container className={classes.gridContainer} justify='center'>
            <Grid item xs={12} sm={10} style={{ marginTop: '2em', marginBottom: '2em' }}>
              <Typography variant='h3' component='h2' style={{ color: '#48A7D4', fontFamily: 'Montserrat, sans-serif', textTransform: 'uppercase' }}>
                Listing Bills - {filteredData.length}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={2} style={{ marginTop: '2em', marginBottom: '2em' }}>
              <TextField id='outlined-basic' label='Search' variant='outlined' type='text' value={searchData} onChange={(e) => setSearchData(e.target.value)} style={{ backgroundColor: '#FFFFFF' }} />
            </Grid>

            {filteredData.length > 0 && (
              <>
                <Grid container justify='center' spacing={3}>
                  {filteredData.map((bill, idx) => {
                    //console.log(bill);
                    return (
                      <Grid item xs={12} sm={6} md={4} key={idx}>
                        <BillsItems {...bill} printName='PRINT' deleteBtn='DELETE' />
                      </Grid>
                    );
                  })}
                </Grid>
              </>
            )}
          </Grid>
        </>
      )}
    </>
  );
};

export default Bills;
