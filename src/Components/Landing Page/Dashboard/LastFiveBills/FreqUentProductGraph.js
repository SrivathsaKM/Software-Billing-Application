import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Chart } from 'react-google-charts';

const FreqUentProductGraph = (props) => {
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

  const graphData = [['Customer Name', 'Orders']];
  productsLists.forEach((products, idx) => {
    let sum = 0;
    // graphData.push({ name: products.name, quantity: products.orders.forEach((ele) => (sum += ele.quantity)) });
    products.orders.forEach((ele) => (sum += ele.quantity));
    graphData.push([products.name, sum]);
    return sum;
  });
  //console.log(graphData);

  return (
    <div>
      <Chart
        width={'580px'}
        height={'500px'}
        chartType='PieChart'
        loader={<div>Loading Chart</div>}
        data={graphData}
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
    </div>
  );
};

export default FreqUentProductGraph;
