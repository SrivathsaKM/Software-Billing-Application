import * as yup from 'yup';

export const userRegister = yup.object().shape({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid Email').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  confirmPassword: yup
    .string()
    .required('Password is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
  businessName: yup.string().required('Business Name is required'),
  address: yup.string().required('Address is required'),
});

export const userLoginIn = yup.object().shape({
  email: yup.string().email('Invalid Email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

export const customerForm = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid Email').required('Email is required'),
  mobile: yup.number().required('Mobile Number is required').min(10, 'should be 10 digits'),
});

export const productForm = yup.object().shape({
  name: yup.string().required('Name is required'),
  price: yup.number().required('Price is required'),
});
