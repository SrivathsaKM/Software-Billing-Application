const initialStateValue = [];

const billsReducer = (state = initialStateValue, action) => {
  //console.log(action.payload);
  switch (action.type) {
    case 'GET_ALL_CUSTOMERS_BILL':
      return [...action.payload];
    case 'ADD_CUSTOMER_BILL':
      return [...state, { ...action.payload }];
    case 'DELETE_CUSTOMER_BILL':
      return state.filter((bill) => bill._id !== action.payload._id);
    default:
      return [...state];
  }
};

export default billsReducer;
