const initialStateValue = {};

const userReducer = (state = initialStateValue, action) => {
  switch (action.type) {
    case 'GET_USER':
      return { ...action.payload };
    case 'CLEAR_STORE':
      return initialStateValue;
    default:
      return state;
  }
};

export default userReducer;
