const initialStateValue = [];

const customersReducer = (state = initialStateValue, action) => {
  switch (action.type) {
    case 'GET_ALL_CUSTOMERS_INFO':
      return [...action.payload];

    case 'ADD_CUSTOMER_INFO':
      return [{ ...action.payload }, ...state];

    case 'UPDATE_CUSTOMER_INFO':
      return state.map((customer) => {
        return customer._id === action.payload._id ? { ...customer, ...action.payload } : { ...customer };
      });

    case 'DELETE_CUSTOMER_INFO':
      return state.filter((customer) => customer._id !== action.payload._id);

    default:
      return [...state];
  }
};

export default customersReducer;
