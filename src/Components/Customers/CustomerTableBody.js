/* eslint-disable */
/*  eslint-disable-next-line */
import React, { useState } from 'react';
import Moment from 'react-moment';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import { makeStyles } from '@material-ui/core/styles';
import { TableRow, TableCell, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import CustomersForm from './CustomersForm';
import { deleteOneCustomerDetails } from '../../Actions/customersActions';

const useStyle = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    '& tbody td': {
      fontWeight: 300,
    },
    '& tbody tr:hover': {
      backgroundColor: '#fffbf2',
      cursor: 'pointer',
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const CustomerTableBody = (props) => {
  const { name, mobile, email, createdAt, updatedAt, idx, _id } = props;

  const classes = useStyle();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleModalOpen = () => {
    setOpen(!open);
  };

  const handleModalClose = () => {
    setOpen(!open);
  };

  const handleDelete = (id) => {
    dispatch(deleteOneCustomerDetails(id));
  };

  return (
    <>
      <TableRow key={idx}>
        <TableCell component='th' scope='row' align='center'>
          {idx + 1}
        </TableCell>
        <TableCell align='center'>{name}</TableCell>
        <TableCell align='center'>{mobile}</TableCell>
        <TableCell align='center'>{email}</TableCell>
        <TableCell align='center'>
          <Moment format='DD MMM YYYY  HH:mm:ss'>{createdAt}</Moment>
        </TableCell>
        <TableCell align='center'>
          <Moment format='DD MMM YYYY  HH:mm:ss'>{updatedAt}</Moment>
        </TableCell>
        <TableCell align='center'>
          <Button variant='contained' onClick={handleModalOpen} className={classes.button} startIcon={<EditIcon />} style={{ cursor: 'pointer', backgroundColor: '#54BCDC', color: 'white' }}>
            Edit
          </Button>
          <Button
            variant='contained'
            color='secondary'
            className={classes.button}
            startIcon={<DeleteIcon />}
            onClick={() => {
              Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
              }).then((result) => {
                if (result.isConfirmed) {
                  handleDelete(_id);
                  Swal.fire('Deleted!', 'Customer info has been deleted.', 'success');
                }
              });
            }}>
            Delete
          </Button>
        </TableCell>
      </TableRow>
      {open && <CustomersForm handleModalClose={handleModalClose} open={open} customerId={_id} customerName={name} customerEmail={email} customerMobile={mobile} />}
    </>
  );
};

export default CustomerTableBody;
