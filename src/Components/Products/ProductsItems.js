/* eslint-disable */
/*  eslint-disable-next-line */
import React, { useState } from 'react';
import Moment from 'react-moment';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import { makeStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import ProductsForm from './ProductsForm';
import { deleteOneProduct } from '../../Actions/productsAction';

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

const ProductsItems = (props) => {
  const { name, price, createdAt, updatedAt, idx, _id } = props;

  // const products = useSelector((state) => {
  //   return state.products;
  // });

  const classes = useStyle();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  // const [softDelete, setSoftDelete] = useState(false);

  const handleModalOpen = () => {
    setOpen(!open);
  };

  const handleModalClose = () => {
    setOpen(!open);
  };

  const handleDelete = (id) => {
    // const result = products.filter((product) => {
    //   return product._id !== id;
    // });
    // if (result) {
    //   setSoftDelete(!softDelete);
    // }
    dispatch(deleteOneProduct(id));
  };

  return (
    <>
      <TableRow key={idx}>
        <TableCell component='th' scope='row' align='center'>
          {idx + 1}
        </TableCell>
        <TableCell align='center'>
          {/* <Button variant='text' disabled={softDelete}> */}
          {name}
          {/* </Button> */}
        </TableCell>
        <TableCell align='center'>{price}</TableCell>
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
            }}
            color='secondary'
            className={classes.button}
            startIcon={<DeleteIcon />}>
            Delete
          </Button>
        </TableCell>
      </TableRow>
      {open && <ProductsForm productId={_id} productName={name} productPrice={price} handleModalClose={handleModalClose} open={open} />}
    </>
  );
};

export default ProductsItems;
