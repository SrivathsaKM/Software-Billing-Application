import React from 'react';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { userLoginIn } from '../Validations/Validations';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2),
  },
}));

const Login = (props) => {
  const { handleToggleUser } = props;
  const classes = useStyles();
  const paperStyle = { padding: 20, width: '30rem', margin: '5rem auto' };
  const avatarStyle = { backgroundColor: '#3f51b5', marginBottom: '1rem' };

  const submitLoginForm = (data) => {
    axios
      .post('http://dct-billing-app.herokuapp.com/api/users/login', data)
      .then((response) => {
        const result = response.data;
        // console.log(result);
        if (result) {
          Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Login Successfull',
            showConfirmButton: false,
            timer: 1500,
          });
          // console.log(result.token);
          localStorage.setItem('loginToken', JSON.stringify(result.token));
          props.history.push('/dashboard');
           window.location.reload();
          handleToggleUser();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
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
            <AccountCircleIcon />
          </Avatar>
          <Typography variant='h4' gutterBottom>
            <strong>Log in</strong>
          </Typography>
          <Typography variant='h6' gutterBottom>
            Please fill this form to log in !
          </Typography>
        </Grid>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={userLoginIn}
          onSubmit={(data) => submitLoginForm(data)}>
          {({ handleSubmit, handleChange, values }) => {
            return (
              <Form onSubmit={handleSubmit}>
                <Field as={TextField} fullWidth name='email' label='Email' placeholder='Enter your email' onChange={handleChange} values={values.email} helperText={<ErrorMessage name='email'>{(email) => <span style={{ color: 'red' }}>{email}</span>}</ErrorMessage>} />

                <Field as={TextField} fullWidth name='password' type='password' label='Password' onChange={handleChange} values={values.password} placeholder='Enter your password' helperText={<ErrorMessage name='password'>{(password) => <span style={{ color: 'red' }}>{password}</span>}</ErrorMessage>} />

                <Typography align='center' variant='subtitle1' gutterBottom style={{ marginTop: '1rem' }}>
                  Not a member? <Link to='/register'>Signup Now</Link>
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

export default Login;
