import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import TotalAmount from "./TotalAmount";
import styles from "./DashboardTable.module.css";
import Dropdown from "react-bootstrap/Dropdown";
import { DropdownButton } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// create dashboard table component with summarydata from props
function DashboardTable({ summaryData, type }) {
  const [sortType, setSortType] = useState("date");
  const [data, setData] = useState([]);

  useEffect(() => {
    // initially sort data or re-sort when data changes
    const filteredItems = summaryData.filter((item) => item.type === type);
    handleSort(sortType, filteredItems);
  }, [summaryData, type, sortType]);

  // Sort by date
  const sortByDate = (data) => {
    return [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  // Sort by category alphabetically
  const sortByCategory = (data) => {
    return [...data].sort((a, b) => a.category.localeCompare(b.category));
  };

  // Sort by amount (ascending order)
  const sortByAmount = (data) => {
    return [...data].sort((a, b) => a.amount - b.amount);
  };

  const handleSort = (type, items) => {
    setSortType(type);
    let sortedData;
    switch (type) {
      case "date":
        sortedData = sortByDate(items);
        break;
      case "category":
        sortedData = sortByCategory(items);
        break;
      case "amount":
        sortedData = sortByAmount(items);
        break;
      default:
        sortedData = [...items];
    }
    setData(sortedData);
  };
  const totalAmount = data.reduce((acc, item) => acc + item.amount, 0);
  return (
    <>
      <Container>
        <Row className="justify-content-md-center align-items-center">
          <Col md={{ span: 4, offset: 4 }}>
            <h2 className={styles["table-header"]}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </h2>
          </Col>
          <Col>
            <DropdownButton
              className={styles.Dropdown}
              id="dropdown-basic-button"
              title={`Sort by ${
                sortType
                  ? sortType.charAt(0).toUpperCase() + sortType.slice(1)
                  : "Date"
              }`}
              onSelect={(eventKey) =>
                handleSort(
                  eventKey,
                  summaryData.filter((item) => item.type === type)
                )
              }
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
            <th>Amount (€)</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
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
