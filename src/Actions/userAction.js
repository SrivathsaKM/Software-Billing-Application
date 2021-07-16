import axios from 'axios';

//const data = JSON.parse(localStorage.getItem('loginToken'));
export const userInfo = (handleLoading) => {
  return (dispatch) => {
    axios
      .get('http://dct-billing-app.herokuapp.com/api/users/account', {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('loginToken'))}`,
        },
      })
      .then((response) => {
        const result = response.data;
        if (result) {
          handleLoading();
          dispatch(userAcctInfo(result));
        }
        //console.log('userAction', result);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
};

export const userAcctInfo = (result) => {
  return {
    type: 'GET_USER',
    payload: result,
  };
};

export const clearUser = () => {
  return {
    type: 'CLEAR_STORE',
  };
};
