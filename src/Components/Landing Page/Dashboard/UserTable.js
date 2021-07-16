import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';

import UserItems from './UserItems';

const useStyle = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
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

const UserTable = ({ singleCustomer }) => {
  //const singleCustomer = useSelector((state) => state.singleCustomer);

  const pages = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPages] = useState(pages[page]);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();
  const [searchFn, setSearchFn] = useState('');
  const [filteredData, setFilteredData] = useState([singleCustomer]);
  const [open, setOpen] = useState(false);

  const classes = useStyle();

  /* Pagination Starts here */
  const handlePageChange = (e, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPage = (e) => {
    setRowsPerPages(parseInt(e.target.value, 10));
    setPage(0);
  };
  /* Pagination Starts Ends here */

  /* Sorting Function starts here */
  const headCells = [
    { id: '#', text: '#', disableSorting: true },
    { id: 'name', text: 'Name' },
    { id: 'orders', text: 'Count of Orders' },
    { id: 'Actions', text: 'Actions', disableSorting: true },
  ];

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

  const handleSortRequest = (cellId) => {
    const isAsc = orderBy === cellId && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(cellId);
  };
  /* Sorting Function ends here*/

  /* Search Functionality start here*/
  const handleSearchChange = (e) => {
    setSearchFn(e.target.value);
  };

  useEffect(() => {
    const data = singleCustomer.filter((ele) => ele.name.toLowerCase().includes(searchFn));
    if (data) {
      setFilteredData(data);
    } else {
      setFilteredData(singleCustomer);
    }
  }, [searchFn, singleCustomer]);
  /* Search Functionality ends here*/

  // Main Function which will work for sorting,paging and filtering
  const tablePagingAndSorting = () => {
    return stableSort(filteredData, getComparator(order, orderBy)).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  const handleModalOpen = () => {
    setOpen(!open);
  };

  const handleModalClose = () => {
    setOpen(!open);
  };

  return (
    <>
      <Grid container spacing={3} style={{ marginLeft: '1rem', marginRight: '1rem', marginTop: '1rem' }}>
        <Grid item xs={12} sm={9}>
          <Typography variant='h3' component='h2' style={{ color: '#48A7D4', fontFamily: 'Montserrat, sans-serif', textTransform: 'uppercase' }}>
            Order Distribution
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            variant='outlined'
            value={searchFn}
            label='Search'
            onChange={handleSearchChange}
            style={{ width: '90%' }}
            InputProps={{
              startAdornment: (
                <InputAdornment>
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
      <TableContainer style={{ marginLeft: '1rem', marginRight: '1rem' }} component={Paper} className={classes.table}>
        <Table aria-label='simple table Striped rows'>
          <TableHead className={classes.tableHead}>
            <TableRow style={{ fontWeight: 'bold' }}>
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
          <TableBody style={{ maxHeight: 150 }}>
            {tablePagingAndSorting().map((customer, idx) => {
              //console.log('order', customer.orders);
              return <UserItems key={idx} {...customer} idx={idx} order={customer.orders} handleModalOpen={handleModalOpen} open={open} handleModalClose={handleModalClose} />;
            })}
          </TableBody>
        </Table>
        <TablePagination component='div' page={page} rowsPerPageOptions={pages} rowsPerPage={rowsPerPage} count={singleCustomer.length} onChangePage={handlePageChange} onChangeRowsPerPage={handleRowsPerPage} />
      </TableContainer>
    </>
  );
};

export default UserTable;
