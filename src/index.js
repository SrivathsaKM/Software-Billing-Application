import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configStore from './Store/Store';
import App from './App';

import { userInfo } from './Actions/userAction';
import { getAllCustomers } from './Actions/customersActions';
import { getAllProducts } from './Actions/productsAction';
import { getAllCustomersBills } from './Actions/billsAction';
import { getOneCustomerBill } from './Actions/singleBillAction';

const store = configStore();

// store.subscribe(() => {
//   console.log(store.getState());
// });

const handleLoading = () => {};

const data = localStorage.getItem('loginToken');
if (JSON.parse(data)) {
  store.dispatch(userInfo(handleLoading));
  store.dispatch(getAllCustomers(handleLoading));
  store.dispatch(getAllProducts(handleLoading));
  store.dispatch(getAllCustomersBills(handleLoading));
  store.dispatch(getOneCustomerBill(handleLoading));
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
