import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const CartMessage = (props) => {
  const { open, handleModalClose } = props;

  return (
    <div>
      <Dialog open={open} onClose={handleModalClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>Cart is Empty!!!</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color='secondary' autoFocus>
            ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CartMessage;
