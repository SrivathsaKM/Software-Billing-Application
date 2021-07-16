import axios from 'axios';
import Swal from 'sweetalert2';

export const getAllCustomers = (handleLoading) => {
  return (dispatch) => {
    axios
      .get('http://dct-billing-app.herokuapp.com/api/customers', {
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
          dispatch(getCustomers(result));
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

export const getCustomers = (result) => {
  return {
    type: 'GET_ALL_CUSTOMERS_INFO',
    payload: result,
  };
};

export const submitOneCustomerDetails = (data) => {
  return (dispatch) => {
    axios
      .post('http://dct-billing-app.herokuapp.com/api/customers', data, {
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
          Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: ' Customer Details Added',
            showConfirmButton: false,
            timer: 1500,
          });
          dispatch(addCustomerDetails(result));
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

export const addCustomerDetails = (result) => {
  return {
    type: 'ADD_CUSTOMER_INFO',
    payload: result,
  };
};

export const updateOneCustomerDetails = (formData, id) => {
  return (dispatch) => {
    axios
      .put(`http://dct-billing-app.herokuapp.com/api/customers/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('loginToken'))}`,
        },
      })
      .then((response) => {
        //console.log(response);
        const result = response.data;
        if (Object.keys(result).includes('errors')) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: result.errors,
          });
        } else {
          Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Customer Details Updated',
            showConfirmButton: false,
            timer: 1500,
          });
        }
        dispatch(updateCustomerDetails(result));
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

export const updateCustomerDetails = (result) => {
  return {
    type: 'UPDATE_CUSTOMER_INFO',
    payload: result,
  };
};

//Delete Customer

export const deleteOneCustomerDetails = (id) => {
  return (dispatch) => {
    axios
      .delete(`http://dct-billing-app.herokuapp.com/api/customers/${id}`, {
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
            text: result.errors,
          });
        } else {
          dispatch(deleteCustomerDetails(result));
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

export const deleteCustomerDetails = (result) => {
  return {
    type: 'DELETE_CUSTOMER_INFO',
    payload: result,
  };
};
