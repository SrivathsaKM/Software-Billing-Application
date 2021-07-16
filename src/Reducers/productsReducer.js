const initialStateValue = [];

const productsReducer = (state = initialStateValue, action) => {
  switch (action.type) {
    case 'GET_ALL_PRODUCTS':
      return [...action.payload];
    case 'ADD_ONE_PRODUCT':
      return [...state, { ...action.payload }];
    case 'UPDATE_ONE_PRODUCT':
      return state.map((product) => {
        return product._id === action.payload._id ? { ...product, ...action.payload } : { ...product };
      });
    case 'DELETE_ONE_PRODUCT':
      return state.filter((product) => {
        return product._id !== action.payload._id;
      });
    default:
      return [...state];
  }
};

export default productsReducer;
