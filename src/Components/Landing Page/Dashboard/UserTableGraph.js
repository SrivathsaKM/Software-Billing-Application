import React from 'react';
import { Chart } from 'react-google-charts';

const UserTableGraph = ({ singleCustomer }) => {
  let data = [['Customer Name', 'Orders']];
  singleCustomer.forEach((ele) => data.push([ele.name, ele.orders.length]));

  return (
    <Chart
      width={'580px'}
      height={'500px'}
      chartType='PieChart'
      loader={<div>Loading Chart</div>}
      data={data}
      options={{
        title: 'Distribution Graph',
        backgroundColor: 'transparent',
        pieSliceTextStyle: { fontSize: 16 },
        legend: { textStyle: { fontSize: 16 } },
        titleTextStyle: { fontSize: 30, color: 'rgb(72, 167, 212)', fontWeight: 'bold' },
        is3D: true,
      }}
      rootProps={{ 'data-testid': '2' }}
    />
  );
};

export default UserTableGraph;
