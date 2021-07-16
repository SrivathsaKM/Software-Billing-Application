import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { Grid, TableContainer, Table, TableBody, TableRow, TextField, InputAdornment, IconButton } from '@material-ui/core';
import { TableSortLabel, TableCell, Button, TableHead, TablePagination } from '@material-ui/core';

import CustomerTableBody from './CustomerTableBody';
import CustomersForm from './CustomersForm';

const useStyle = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    '& thead th': {
      fontWeight: 'bold',
      color: theme.palette.primary.main,
      backgroundColor: '#c2c1de',
      fontSize: '18px',
    },
    '& tbody td': {
      fontWeight: 300,
    },
    '& tbody tr:hover': {
      backgroundColor: '#fffbf2',
      cursor: 'pointer',
    },
  },
}));

const CustomersList = (props) => {
  const classes = useStyle();

  const customers = useSelector((state) => {
    return state.customers;
  });

  const pages = [5, 10, 25];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPages] = useState(pages[page]);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();
  const [searchFn, setSearchFn] = useState('');
  const [filteredData, setFilteredData] = useState(customers);

  const [open, setOpen] = useState(false);

  /* Pagination Starts here */
  const handlePageChange = (e, newPage) => {
    console.log('page', newPage);
    setPage(newPage);
  };

  const handleRowsPerPage = (e) => {
    setRowsPerPages(parseInt(e.target.value, 10));
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
    { id: 'mobile', text: 'Phone' },
    { id: 'email', text: 'Email' },
    { id: 'createdAt', text: 'Created At', disableSorting: true },
    { id: 'updatedAt', text: 'Updated At', disableSorting: true },
    { id: 'action', text: 'Action', disableSorting: true },
  ];

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
    const data = customers.filter((ele) => ele.name.toLowerCase().includes(searchFn) || ele.mobile.includes(searchFn));
    if (data) {
      setFilteredData(data);
    } else {
      setFilteredData(customers);
    }
  }, [searchFn, customers]);
  /* Search Functionality ends here*/

  // Main Function which will work here
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
      <Grid container spacing={3}>
        <Grid item xs={12} sm={9}>
          <TextField
            variant='outlined'
            value={searchFn}
            label='Search'
            onChange={handleSearchChange}
            style={{ width: '50%' }}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button variant='contained' color='primary' onClick={handleModalOpen} size='large' style={{ marginTop: '0.6rem' }}>
            Add Customer
          </Button>
          {open && <CustomersForm handleModalClose={handleModalClose} open={open} />}
        </Grid>
      </Grid>
      <TableContainer>
        <Table aria-label='simple table' className={classes.table}>
          <TableHead>
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
          <>
            <TableBody>
              {tablePagingAndSorting().map((customer, idx) => {
                return <CustomerTableBody key={customer._id} {...customer} idx={idx} />;
              })}
            </TableBody>
          </>
        </Table>
        <TablePagination component='div' page={page} rowsPerPageOptions={pages} rowsPerPage={rowsPerPage} count={customers.length} onChangePage={handlePageChange} onChangeRowsPerPage={handleRowsPerPage} />
      </TableContainer>
    </>
  );
};
export default CustomersList;
