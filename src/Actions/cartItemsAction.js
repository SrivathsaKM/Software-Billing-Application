export const addCartItemsList = (data) => {
  //console.log(data);
  return {
    type: 'ADD_CART_ITEM',
    payload: data,
  };
};

export const handleIncrement = (data) => {
  //console.log(data);
  return {
    type: 'INCREMENT_CART_ITEM',
    payload: data,
  };
};

export const handleDecrement = (data) => {
  //console.log(data);
  return {
    type: 'DECREMENT_CART_ITEM',
    payload: data,
  };
};

export const handleDelete = (data) => {
  //console.log(data);
  return {
    type: 'DELETE_CART_ITEM',
    payload: data,
  };
};

export const removeCartItems = () => {
  return {
    type: 'DELETE_ALL_CART_ITEMS',
  };
};
