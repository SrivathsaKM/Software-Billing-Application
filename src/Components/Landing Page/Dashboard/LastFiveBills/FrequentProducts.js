import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  table: {
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(1),
    '& tbody tr:hover': {
      backgroundColor: '#fffbf2',
      cursor: 'pointer',
    },
  },
  tableHead: {
    backgroundColor: '#619196',
    '& .MuiTableCell-head': {
      color: 'whitesmoke',
      fontSize: '15px',
      fontWeight: 'bold',
      opacity: 1,
    },
  },
}));

const FrequentProducts = () => {
  const classes = useStyles();
  const [productsLists, setProductsList] = useState([]);
  const bills = useSelector((state) => {
    return state.bills;
  });

  const data = bills.map((ele) => {
    return ele.lineItems;
  });

  const products = useSelector((state) => {
    const result = [];
    data.flat().map((ele) => {
      const item = state.products.find((product) => product._id === ele.product);
      result.push({ ...item, ...ele });
    });
    return result;
  });

  useEffect(() => {
    const results = [];
    products.map((ele, idx) => {
      if (results.length === 0) {
        results.push({
          id: idx + 1,
          name: ele.name,
          orders: [{ quantity: ele.quantity }],
        });
      } else {
        const uniqueProduct = results.findIndex((element) => {
          return element.name === ele.name;
        });
        if (uniqueProduct >= 0) {
          //  let sum = ele.quantity;
          results[uniqueProduct].orders.push({
            quantity: ele.quantity,
          });
        } else {
          results.push({
            id: idx + 1,
            name: ele.name,
            orders: [{ quantity: ele.quantity }],
          });
        }
      }
    });
    setProductsList(results);
  }, []);

  //Reducing to single Array
  const graphData = [];
  productsLists.forEach((products) => {
    let sum = 0;
    products.orders.forEach((ele) => (sum += ele.quantity));
    graphData.push({ name: products.name, quantity: sum });
    return sum;
  });

  //console.log(graphData);

  const pages = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();

  /* Pagination Starts here */
  const handlePageChange = (e, newPage) => {
    //console.log('page', newPage);
    setPage(newPage);
  };

  const handleRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };
  /* Pagination Starts Ends here */

  /* Sorting Function starts here */
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function getComparator(order, orderBy) {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
  }
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const headCells = [
    { id: '#', text: '#', disableSorting: true },
    { id: 'name', text: 'Name' },
    { id: 'quantity', text: 'Total Quantity' },
  ];

  const handleSortRequest = (cellId) => {
    const isAsc = orderBy === cellId && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(cellId);
  };
  /* Sorting Function ends here*/

  const tablePagingAndSorting = () => {
    //return productsLists.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
    return stableSort(graphData, getComparator(order, orderBy)).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  return (
    <>
      <Grid container spacing={3} style={{ marginBottom: '1rem', marginLeft: '.5rem' }}>
        <Grid item xs={12} sm={10}>
          <Typography variant='h3' component='h2' style={{ color: '#48A7D4', fontFamily: 'Montserrat, sans-serif', textTransform: 'uppercase' }}>
            Frequently Ordered Products
          </Typography>
        </Grid>
      </Grid>
      <TableContainer component={Paper} className={classes.table}>
        <Table style={{ minWidth: '500px' }} aria-label='simple table'>
          <TableHead className={classes.tableHead}>
            <TableRow>
              {headCells.map((headCell) => {
                return (
                  <TableCell key={headCell.id} align='center' sortDirection={orderBy === headCell.id ? order : false}>
                    {headCell.disableSorting ? (
                      headCell.text
                    ) : (
                      <TableSortLabel active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : 'asc'} onClick={() => handleSortRequest(headCell.id)}>
                        {headCell.text}
                      </TableSortLabel>
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {productsLists.length > 0 &&
              tablePagingAndSorting().map((products, idx) => {
                return (
                  <TableRow key={idx}>
                    <TableCell component='th' scope='row' align='center'>
                      {idx + 1}
                    </TableCell>
                    <TableCell align='center'>{products.name}</TableCell>
                    <TableCell align='center'>{products.quantity}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <TablePagination component='div' page={page} rowsPerPageOptions={pages} rowsPerPage={rowsPerPage} count={productsLists.length} onChangePage={handlePageChange} onChangeRowsPerPage={handleRowsPerPage} />
      </TableContainer>
    </>
  );
};

export default FrequentProducts;
