import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import { DropdownButton } from "react-bootstrap";
import styles from "./DashboardTable.module.css";
import TotalAmount from "./TotalAmount";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Assuming summaryData is an array of objects { id, category, amount, date, type }
const DashboardTable = ({ summaryData, type }) => {
  const [sortType, setSortType] = useState("date");
  const [filteredSortedData, setFilteredSortedData] = useState([]);

  useEffect(() => {
    let filteredData = summaryData.filter((item) => item.type === type);
    switch (sortType) {
      case "date":
        filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "category":
        filteredData.sort((a, b) => a.category.localeCompare(b.category));
        break;
      case "amount":
        filteredData.sort((a, b) => a.amount - b.amount);
        break;
      default:
        // No default sorting necessary
        break;
    }
    setFilteredSortedData(filteredData);
  }, [summaryData, type, sortType]);

  const handleSortSelection = (eventKey) => {
    setSortType(eventKey);
  };

  const totalAmount = filteredSortedData.reduce(
    (acc, item) => acc + item.amount,
    0
  );

  const tableTitleStyle =
    type === 'income'
      ? styles.tableTitleContainerIncome
      : styles.tableTitleContainerExpense;

  return (
    <>
      <Container className={tableTitleStyle}>
        <Row className="justify-content-md-center align-items-center">
          <Col>
            <h2 className={styles["table-header"]}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </h2>
          </Col>
          <Col>
            <DropdownButton
              className={styles.Dropdown}
              title={`Sort by ${
                sortType.charAt(0).toUpperCase() + sortType.slice(1)
              }`}
              onSelect={handleSortSelection}
            >
              <Dropdown.Item eventKey="date">Date</Dropdown.Item>
              <Dropdown.Item eventKey="category">Category</Dropdown.Item>
              <Dropdown.Item eventKey="amount">Amount</Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>
      </Container>

      <Table
        className={styles["table-container"]}
        bordered
        hover
        variant="dark"
      >
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredSortedData.map((item) => (
            <tr key={item.id}>
              <td>{item.category}</td>
              <td>{item.amount}</td>
              <td>{new Date(item.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <TotalAmount amount={totalAmount} expense_type={type} />
    </>
  );
};

export default DashboardTable;
