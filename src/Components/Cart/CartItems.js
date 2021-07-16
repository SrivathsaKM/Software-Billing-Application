import React, { useState } from 'react';
import Swal from 'sweetalert2';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const CartItems = ({ product, handleSubmitCartItems }) => {
  const classes = useStyles();

  const [disable, setDisable] = useState(false);

  const handleCartItems = (product) => {
    handleSubmitCartItems(product);
    setDisable(!disable);

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'added to cart',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <>
      <Paper elevation={3} className={classes.root}>
        <Card variant='outlined'>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant='h5' component='h2' align='center'>
                {product.name}
              </Typography>
              <Typography gutterBottom variant='h6' component='h2' align='center'>
                ₹ {product.price}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size='small' color='primary' disabled={disable} style={{ margin: '0 auto', display: 'flex' }} onClick={() => handleCartItems(product)}>
              Add to Cart
            </Button>
          </CardActions>
        </Card>
      </Paper>
    </>
  );
};

export default CartItems;
