import axios from 'axios';
import Swal from 'sweetalert2';

//Get Bills
export const getAllCustomersBills = (handleLoading) => {
  return (dispatch) => {
    axios
      .get(`http://dct-billing-app.herokuapp.com/api/bills`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('loginToken'))}`,
        },
      })
      .then((response) => {
        const result = response.data;
        if (Object.keys(result).includes('errors')) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: result.error,
          });
        } else {
          dispatch(getBills(result));
          handleLoading();
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        });
      });
  };
};

export const getBills = (result) => {
  return {
    type: 'GET_ALL_CUSTOMERS_BILL',
    payload: result,
  };
};

//Add Bills
export const addCustomerBill = (data) => {
  return (dispatch) => {
    axios
      .post('http://dct-billing-app.herokuapp.com/api/bills', data, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('loginToken'))}`,
        },
      })
      .then((response) => {
        const result = response.data;
        //console.log(result);
        if (Object.keys(result).includes('errors')) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: result.error,
          });
        } else {
          Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Successfully generated the bill',
            showConfirmButton: false,
            timer: 1500,
          });
          dispatch(addBill(result));
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        });
      });
  };
};

export const addBill = (result) => {
  return {
    type: 'ADD_CUSTOMER_BILL',
    payload: result,
  };
};

export const deleteOneCustomerBill = (id) => {
  return (dispatch) => {
    axios
      .delete(`http://dct-billing-app.herokuapp.com/api/bills/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('loginToken'))}`,
        },
      })
      .then((response) => {
        const result = response.data;
        //console.log(result);
        if (Object.keys(result).includes('errors')) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: result.error,
          });
        } else {
          dispatch(deleteBill(result));
        }
      });
  };
};

export const deleteBill = (result) => {
  return {
    type: 'DELETE_CUSTOMER_BILL',
    payload: result,
  };
};
