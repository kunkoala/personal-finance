import React from "react";
import Table from "react-bootstrap/Table";
import TotalAmount from "./TotalAmount"

// create dashboard table component with summarydata from props
function DashboardTable({ summaryData, type }) {
  const filteredItems = summaryData.filter((item) => item.type === type);
  console.log("filtered items:", filteredItems);
  const totalAmount = filteredItems.reduce((acc, item) => acc + item.amount, 0);
  return (
    <>
      <h2>{type}</h2>
      <Table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount (€)</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => (
            <tr key={item.id}>
              <td>{item.category}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <TotalAmount amount={totalAmount}/>
    </>
  );
}

export default DashboardTable;
