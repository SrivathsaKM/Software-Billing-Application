import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import { FaEye } from 'react-icons/fa';

import UserOrderDetails from './UserOrderDetails';

const useStyle = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    '& tbody td': {
      fontWeight: 300,
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const UserItems = (props) => {
  const { name, email, mobile, orders, idx } = props;
  const classes = useStyle();

  const [open, setOpen] = useState(false);

  const handleModalOpen = () => {
    setOpen(!open);
  };

  const handleModalClose = () => {
    setOpen(!open);
  };

  return (
    <>
      <TableRow key={idx} style={{ height: 50 }}>
        <TableCell component='th' scope='row' align='center' style={{ padding: '8px' }}>
          {idx + 1}
        </TableCell>
        <TableCell align='center' style={{ padding: '8px' }}>
          {name}
        </TableCell>
        <TableCell align='center'>{orders && orders.length}</TableCell>

        <TableCell align='center' style={{ padding: '8px' }}>
          <Button variant='contained' onClick={handleModalOpen} className={classes.button} startIcon={<FaEye />} style={{ cursor: 'pointer', backgroundColor: '#54BCDC', color: 'white' }}>
            view
          </Button>
        </TableCell>
      </TableRow>
      {open && <UserOrderDetails handleModalClose={handleModalClose} open={open} name={name} email={email} mobile={mobile} orders={orders} />}
    </>
  );
};

export default UserItems;
