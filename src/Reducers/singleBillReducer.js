const initialStateValue = [];

const singleBillReducer = (state = initialStateValue, action) => {
  //console.log(action.payload);
  switch (action.type) {
    case 'GET_ONE_CUSTOMER_BILL':
      return [{ ...action.payload }];
    default:
      return [...state];
  }
};
export default singleBillReducer;
