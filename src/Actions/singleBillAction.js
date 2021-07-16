import axios from 'axios';

export const getOneCustomerBill = (id, handleLoading) => {
  return (dispatch) => {
    axios
      .get(` http://dct-billing-app.herokuapp.com/api/bills/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('loginToken'))}`,
        },
      })
      .then((response) => {
        const result = response.data;
        dispatch(oneCustomerBill(result));
        handleLoading();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
};

export const oneCustomerBill = (result) => {
  return {
    type: 'GET_ONE_CUSTOMER_BILL',
    payload: result,
  };
};
