import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { FaShoppingCart, FaRupeeSign, FaUserFriends, FaFileInvoiceDollar } from 'react-icons/fa';

import { getAllProducts } from './../../../Actions/productsAction';
import { getAllCustomers } from './../../../Actions/customersActions';
import { getAllCustomersBills } from './../../../Actions/billsAction';
import Loading from './../../Loading';
import UserTable from './UserTable';
import UserTableGraph from './UserTableGraph';
import LastFiveBills from './LastFiveBills/LastFiveFills';
import LastFiveProducts from './LastFiveBills/LastFiveProducts';
import FrequentProducts from './LastFiveBills/FrequentProducts';
import FreqUentProductGraph from './LastFiveBills/FreqUentProductGraph';

const useStyles = makeStyles(() => ({
  maincolor: {
    color: '#ffffff',
  },
  carditem: {
    textAlign: 'center',
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers);
  const products = useSelector((state) => state.products);
  const bills = useSelector((state) => state.bills);

  //console.log(customers, products, bills);

  const [loading, setLoading] = useState(true);
  const [cus, setCus] = useState([]);

  const handleLoading = () => {
    setLoading(false);
  };

  const totalAmount = () => {
    let sum = 0;
    bills.forEach((amtArr) => {
      sum += amtArr.total;
    });
    return Math.round(sum + sum * 0.18);
  };
  useEffect(() => {
    dispatch(getAllCustomers(handleLoading));
    dispatch(getAllProducts(handleLoading));
    dispatch(getAllCustomersBills(handleLoading));
  }, [dispatch]);

  useEffect(() => {
    let result = [];
    if (bills.length > 1) {
      for (let i = 0; i < bills.length; i++) {
        for (let j = 0; j < customers.length; j++) {
          if (bills[i].customer === customers[j]._id) {
            result.push({ ...customers[j], ...bills[i] });
          }
        }
      }
    }

    localStorage.setItem('customerData', JSON.stringify(result));
    if (result) {
      const uniqueCustomers = [];
      result.map((customer, idx) => {
        if (uniqueCustomers.length === 0) {
          uniqueCustomers.push({
            id: idx + 1,
            name: customer.name,
            email: customer.email,
            mobile: customer.mobile,
            orders: [
              {
                totalAmount: customer.total,
                date: customer.date,
                orderList: customer.lineItems,
              },
            ],
          });
        } else {
          const getCustomerIndex = uniqueCustomers.findIndex((user) => {
            return user.name === customer.name;
          });
          if (getCustomerIndex >= 0) {
            uniqueCustomers[getCustomerIndex].orders.push({
              totalAmount: customer.total,
              date: customer.date,
              orderList: customer.lineItems,
            });
          } else {
            uniqueCustomers.push({
              id: idx + 1,
              name: customer.name,
              email: customer.email,
              mobile: customer.mobile,
              orders: [
                {
                  totalAmount: customer.total,
                  date: customer.date,
                  orderList: customer.lineItems,
                },
              ],
            });
          }
        }
      });
      setCus(uniqueCustomers);
    }
  }, [bills]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Grid container spacing={4} style={{ margin: '1rem' }}>
          <Grid item xs={12} sm={3}>
            <Link to='/products'>
              <Card style={{ display: 'flex', backgroundColor: '#4285F4' }}>
                <Grid item xs={12}>
                  <FaShoppingCart style={{ fontSize: '84px', color: 'white', marginLeft: '0.3em', marginTop: '0.2em' }} />
                </Grid>
                <Grid item xs={12}>
                  <CardContent className={classes.carditem}>
                    <Typography variant='h3' component='h2' className={classes.maincolor}>
                      {products.length}
                    </Typography>
                    <Typography color='textSecondary' gutterBottom className={classes.maincolor}>
                      Products
                    </Typography>
                  </CardContent>
                </Grid>
              </Card>
            </Link>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Link to='/customers'>
              <Card style={{ display: 'flex', backgroundColor: '#DB4437' }}>
                <Grid item xs={12}>
                  <FaUserFriends style={{ fontSize: '84px', color: 'white', marginLeft: '0.3em', marginTop: '0.2em' }} />
                </Grid>
                <Grid item xs={12}>
                  <CardContent className={classes.carditem}>
                    <Typography variant='h3' component='h2' className={classes.maincolor}>
                      {customers.length}
                    </Typography>
                    <Typography color='textSecondary' gutterBottom className={classes.maincolor}>
                      Customers
                    </Typography>
                  </CardContent>
                </Grid>
              </Card>
            </Link>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Link to='/bills'>
              <Card style={{ display: 'flex', backgroundColor: '#F4B400' }}>
                <Grid item xs={12}>
                  <FaFileInvoiceDollar style={{ fontSize: '84px', color: 'white', marginLeft: '0.3em', marginTop: '0.2em' }} />
                </Grid>
                <Grid item xs={12}>
                  <CardContent className={classes.carditem}>
                    <Typography variant='h3' component='h2' className={classes.maincolor}>
                      {bills.length}
                    </Typography>
                    <Typography color='textSecondary' gutterBottom className={classes.maincolor}>
                      Bills
                    </Typography>
                  </CardContent>
                </Grid>
              </Card>
            </Link>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Link to='/bills'>
              <Card style={{ display: 'flex', backgroundColor: '#0F9D58' }}>
                <Grid item xs={12}>
                  <FaRupeeSign style={{ fontSize: '84px', color: 'white', marginLeft: '0.3em', marginTop: '0.2em' }} />
                </Grid>
                <Grid item xs={12}>
                  <CardContent className={classes.carditem}>
                    <Typography variant='h3' component='h2' className={classes.maincolor}>
                      {totalAmount()}
                    </Typography>
                    <Typography color='textSecondary' gutterBottom className={classes.maincolor}>
                      Total Amount
                    </Typography>
                  </CardContent>
                </Grid>
              </Card>
            </Link>
          </Grid>
          <Grid item xs={12} sm={7}>
            <UserTable singleCustomer={cus} />
          </Grid>
          <Grid item xs={12} sm={5}>
            <UserTableGraph singleCustomer={cus} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LastFiveBills />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LastFiveProducts />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FrequentProducts />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FreqUentProductGraph />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Dashboard;
