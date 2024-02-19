import React, { useState } from "react";
import DialogModal from "../../common/Modal";
import UpdateForm from "./UpdateForm";
import ButtonCustom from "../../common/Button";
import DashboardTable from "./DashboardTable";
import styles from "./DashboardSummary.module.css";
import { Container, Row, Col } from "react-bootstrap";
import IncomeExpenseChart from "./visualization/IncomeExpenseChart";

/**
 * Renders the Dashboard Summary component.
 *
 * @component
 * @returns {JSX.Element} The JSX element representing the Dashboard Summary component.
 */
function DashboardSummary() {
  const [showModal, setShowModal] = useState(false);
  const [summary, setSummary] = useState([
    {
      id: 0,
      category: "Wage",
      type: "income",
      amount: 500,
      date: new Date().toISOString().split("T")[0],
    },
    {
      id: 1,
      category: "Monthly Shopping",
      type: "expense",
      amount: 200,
      date: new Date().toISOString().split("T")[0],
    },
    {
      id: 2,
      category: "Rent",
      type: "expense",
      amount: 450,
      date: new Date().toISOString().split("T")[0],
    },
    {
      id: 3,
      category: "Business",
      type: "income",
      amount: 1025.99,
      date: new Date().toISOString().split("T")[0],
    },
  ]);

  const updateSummary = (category, amount, type, date) => {
    setSummary((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.category === category && item.type === type
      );
      if (existingItemIndex >= 0) {
        // if category exists, update amount
        return prevItems.map((item) =>
          item.category === category && item.type === type
            ? { ...item, amount: item.amount + amount, date }
            : item
        );
      } else {
        // add new category
        return [
          ...prevItems,
          { id: prevItems.length + 1, category, type, amount, date },
        ];
      }
    });
  };

  // const existingCategoryNames = summary.map((item) => item.category);

  return (
    <div className={styles.dashboard}>
      <h2 className={styles["dashboard-h2"]}>Dashboard Summary</h2>

      <DialogModal
        modalTitle="Update Summary"
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      >
        <UpdateForm
          onFormSubmit={updateSummary}
          summary={summary}
          onRequestClose={() => setShowModal(false)}
          setSummary={setSummary}
        />
      </DialogModal>

      <IncomeExpenseChart dataToPlot={summary} />

      <Container>
        <Row>
          <Col>
            <DashboardTable
              classname={styles.table}
              summaryData={summary}
              type="income"
            />
          </Col>
          <Col>
            <DashboardTable
              classname={styles.table}
              summaryData={summary}
              type="expense"
            />
          </Col>
        </Row>
      </Container>

      <div className={styles.updateDashboard}>
        <ButtonCustom onClick={() => setShowModal(true)}>
          Add Transaction
        </ButtonCustom>
      </div>
    </div>
  );
}

export default DashboardSummary;
