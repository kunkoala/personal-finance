import React from "react";
import Table from "react-bootstrap/Table";
import TotalAmount from "./TotalAmount";
import styles from "./DashboardTable.module.css";

// create dashboard table component with summarydata from props
function DashboardTable({ summaryData, type }) {
  const filteredItems = summaryData.filter((item) => item.type === type);
  console.log("filtered items:", filteredItems);
  const totalAmount = filteredItems.reduce((acc, item) => acc + item.amount, 0);
  return (
    <>
      <h2 className={styles["table-header"]}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </h2>
      <Table
        className={styles["table-container"]}
        bordered
        hover
        variant="dark"
      >
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount (€)</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => (
            <tr key={item.id}>
              <td>{item.category}</td>
              <td>{item.amount}</td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <TotalAmount amount={totalAmount} expense_type={type} />
    </>
  );
}

export default DashboardTable;
