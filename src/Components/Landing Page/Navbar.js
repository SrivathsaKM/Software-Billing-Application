import React, { useState, useEffect } from 'react';
import { Link, withRouter, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import DehazeIcon from '@material-ui/icons/Dehaze';
import logo from '../../assests/logo.png';
import './Navbar.css';

import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { FaProductHunt } from 'react-icons/fa';
import { FaFileInvoiceDollar } from 'react-icons/fa';
import { GoDashboard } from 'react-icons/go';

import useStyles from './Styles';
import useTheme from './Styles';

import Dashboard from './Dashboard/Dashboard';
import Account from '../Account';
import Products from '../Products/Products';
import Customers from '../Customers/Customers';
import Cart from '../Cart/Cart';
import Bills from '../Bills/Bills';
import SingleBill from './../Bills/SingleBill';
import { clearUser } from '../../Actions/userAction';

const Navbar = (props) => {
  // console.log(props);
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const { isLoggedIn, handleToggleUser } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogoutToggle = () => {
    localStorage.removeItem('loginToken');
    localStorage.removeItem('customerData');
    alert('logged out successfully');
    handleToggleUser();
    dispatch(clearUser());
  };

  useEffect(() => {
    const data = localStorage.getItem('loginToken');
    if (data) {
      handleToggleUser();
    } else {
      props.history.push('/');
    }
  }, []);

  const sideMenuItemList = [
    { text: 'Dashboard', icon: <GoDashboard className={classes.drawerIcons} />, route: 'dashboard' },
    { text: 'Account', icon: <AccountCircleIcon className={classes.drawerIcons} />, route: 'account' },
    { text: 'Customers', icon: <SupervisorAccountIcon className={classes.drawerIcons} />, route: 'customers' },
    { text: 'Products', icon: <FaProductHunt className={classes.drawerIcons} />, route: 'products' },
    { text: 'Cart', icon: <ShoppingCartIcon className={classes.drawerIcons} />, route: 'cart' },
    { text: 'Bills', icon: <FaFileInvoiceDollar className={classes.drawerIcons} />, route: 'bills' },
  ];

  return (
    <>
      {isLoggedIn ? (
        <>
          <div className={classes.root}>
            <CssBaseline />
            <AppBar
              position='fixed'
              className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
              })}>
              <Toolbar style={{ minHeight: '78px' }}>
                <IconButton
                  color='inherit'
                  aria-label='open drawer'
                  onClick={handleDrawerOpen}
                  edge='start'
                  className={clsx(classes.menuButton, {
                    [classes.hide]: open,
                  })}>
                  <MenuIcon />
                </IconButton>

                <Typography variant='h6' style={{ display: 'flex', marginLeft: 'auto' }}>
                  <Link to='/' color='inherit' onClick={handleLogoutToggle} style={{ textDecoration: 'none', color: '#ffffff' }}>
                    Logout
                  </Link>
                </Typography>
              </Toolbar>
            </AppBar>
            <Drawer
              variant='permanent'
              className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
              })}
              classes={{
                paper: clsx({
                  [classes.drawerOpen]: open,
                  [classes.drawerClose]: !open,
                }),
              }}>
              <div className={classes.toolbar} style={{ minHeight: '78px' }}>
                <IconButton onClick={handleDrawerClose}>{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}</IconButton>
              </div>
              <Divider />
              <List>
                {sideMenuItemList.map((item, index) => {
                  const { text, icon, route } = item;
                  return (
                    <ListItem button key={text} component={Link} to={'/' + route}>
                      {icon && <ListItemIcon>{icon}</ListItemIcon>}
                      <ListItemText primary={text} />
                    </ListItem>
                  );
                })}
              </List>
            </Drawer>

            <Route exact={true} path='/dashboard' component={Dashboard} />

            <Route
              exact={true}
              path='/account'
              render={() => {
                return <Account {...props} />;
              }}
              component={Account}
            />
            <Route exact={true} path='/products' component={Products} />
            <Route exact={true} path='/customers' component={Customers} />
            <Route exact={true} path='/cart' component={Cart} />
            <Route exact={true} path='/bills' component={Bills} />
            <Route exact={true} path='/bills/:id' component={SingleBill} />
          </div>
        </>
      ) : (
        <>
          <nav className='navbar'>
            <div className='nav-center'>
              <div className='nav-header'>
                <img src={logo} alt='logo' />
                <button type='button' className='nav-btn' onClick={handleToggle}>
                  <DehazeIcon className='nav-icon' />
                </button>
              </div>
              <ul className={isOpen ? 'nav-links show-nav' : 'nav-links'}>
                <li>
                  <Link to='/'>Home</Link>
                </li>
                <li>
                  <Link to='/login'>Login</Link>
                </li>
                <li>
                  <Link to='/register'>Register</Link>
                </li>
              </ul>
            </div>
          </nav>
        </>
      )}
    </>
  );
};

export default withRouter(Navbar);
