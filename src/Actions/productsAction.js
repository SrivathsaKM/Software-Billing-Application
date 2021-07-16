import axios from 'axios';
import Swal from 'sweetalert2';

//GET all Products List
export const getAllProducts = (handleLoading) => {
  return (dispatch) => {
    axios
      .get(`http://dct-billing-app.herokuapp.com/api/products`, {
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
            text: result.errors,
          });
        } else {
          dispatch(getProducts(result));
          handleLoading();
        }
      });
  };
};

export const getProducts = (result) => {
  return {
    type: 'GET_ALL_PRODUCTS',
    payload: result,
  };
};

//Add product
export const addOneProduct = (data) => {
  return (dispatch) => {
    axios
      .post(`http://dct-billing-app.herokuapp.com/api/products`, data, {
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
            position: 'center',
            icon: 'success',
            title: 'Product Added',
            showConfirmButton: false,
            timer: 1500,
          });
          dispatch(addOneProductDetails(result));
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

export const addOneProductDetails = (result) => {
  return {
    type: 'ADD_ONE_PRODUCT',
    payload: result,
  };
};
//update product
export const updateOneProduct = (data, id) => {
  return (dispatch) => {
    axios
      .put(`http://dct-billing-app.herokuapp.com/api/products/${id}`, data, {
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
            text: result.message,
          });
        } else {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Product Updated',
            showConfirmButton: false,
            timer: 1500,
          });
          dispatch(updateOneProductDetails(result));
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

export const updateOneProductDetails = (result) => {
  return {
    type: 'UPDATE_ONE_PRODUCT',
    payload: result,
  };
};

//Delete One

export const deleteOneProduct = (id) => {
  return (dispatch) => {
    axios
      .delete(`http://dct-billing-app.herokuapp.com/api/products/${id}`, {
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
            text: result.message,
          });
        } else {
          dispatch(deleteOneProductDetails(result));
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

const deleteOneProductDetails = (result) => {
  return {
    type: 'DELETE_ONE_PRODUCT',
    payload: result,
  };
};
