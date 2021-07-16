import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import userReducer from '../Reducers/userReducer';
import customersReducer from '../Reducers/customersReducer';
import productsReducer from '../Reducers/productsReducer';
import cartItemsReducer from '../Reducers/cartItemsReducer';
import billsReducer from '../Reducers/billsReducer';
import singleBillReducer from '../Reducers/singleBillReducer';

const configStore = () => {
  const rootReducer = combineReducers({
    user: userReducer,
    customers: customersReducer,
    products: productsReducer,
    cartItems: cartItemsReducer,
    bills: billsReducer,
    singleBill: singleBillReducer,
  });
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
  return store;
};
export default configStore;
