import React from 'react';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import { userRegister } from '../Validations/Validations';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2),
  },
}));

const Register = (props) => {
  const classes = useStyles();
  const paperStyle = { padding: 20, width: '30rem', margin: '5rem auto' };
  const avatarStyle = { backgroundColor: '#3f51b5', marginBottom: '1rem' };

  const submitRegistrationForm = (data) => {
    axios
      .post('http://dct-billing-app.herokuapp.com/api/users/register', data)
      .then((response) => {
        const result = response.data;
        if (result.name === 'MongoError') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Username or Email already taken',
          });
        } else {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Signup Successfull',
            showConfirmButton: false,
            timer: 1500,
          });
          props.history.push('/login');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Grid style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper style={paperStyle} elevation={3}>
        <Grid align='center' style={{ marginBottom: '1rem' }}>
          <Avatar style={avatarStyle}>
            <PersonAddIcon />
          </Avatar>
          <Typography variant='h4' gutterBottom>
            <strong>Sign Up</strong>
          </Typography>
          <Typography variant='h6' gutterBottom>
            Please fill this form to create an account !
          </Typography>
        </Grid>
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            businessName: '',
            address: '',
          }}
          validationSchema={userRegister}
          onSubmit={(data) => submitRegistrationForm(data)}>
          {({ handleSubmit, handleChange, values }) => {
            return (
              <Form onSubmit={handleSubmit}>
                <Field as={TextField} fullWidth name='username' label='Username' placeholder='Enter your username' value={values.username} onChange={handleChange} helperText={<ErrorMessage name='username'>{(username) => <span style={{ color: 'red' }}>{username}</span>}</ErrorMessage>} />

                <Field as={TextField} fullWidth name='email' label='Email' placeholder='Enter your email' onChange={handleChange} values={values.email} helperText={<ErrorMessage name='email'>{(email) => <span style={{ color: 'red' }}>{email}</span>}</ErrorMessage>} />

                <Field as={TextField} fullWidth name='password' type='password' label='Password' onChange={handleChange} values={values.password} placeholder='Enter your password' helperText={<ErrorMessage name='password'>{(password) => <span style={{ color: 'red' }}>{password}</span>}</ErrorMessage>} />

                <Field as={TextField} fullWidth name='confirmPassword' type='password' label='Confirm Password' onChange={handleChange} values={values.confirmPassword} placeholder='Confirm your password' helperText={<ErrorMessage name='confirmPassword'>{(confirmPassword) => <span style={{ color: 'red' }}>{confirmPassword}</span>}</ErrorMessage>} />

                <Field as={TextField} fullWidth name='businessName' type='businessName' label='Business Name' onChange={handleChange} values={values.businessName} placeholder='Enter your Business Name' helperText={<ErrorMessage name='businessName'>{(businessName) => <span style={{ color: 'red' }}>{businessName}</span>}</ErrorMessage>} />

                <Field as={TextField} fullWidth name='address' type='address' label='Address' onChange={handleChange} values={values.address} placeholder='Enter your Address' helperText={<ErrorMessage name='address'>{(address) => <span style={{ color: 'red' }}>{address}</span>}</ErrorMessage>} />

                <Typography align='center' variant='subtitle1' gutterBottom style={{ marginTop: '1rem' }}>
                  Already a member? <Link to='/login'>Log in</Link>
                </Typography>

                <Typography align='center'>
                  <Button type='submit' variant='contained' color='primary' className={classes.button} endIcon={<SendIcon />}>
                    Submit
                  </Button>
                </Typography>
              </Form>
            );
          }}
        </Formik>
      </Paper>
    </Grid>
  );
};

export default Register;
