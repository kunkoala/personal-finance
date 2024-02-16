import React, { useState } from "react";
import DialogModal from "../../common/Modal";
import UpdateForm from "./UpdateForm";
import ButtonCustom from "../../common/Button";
import DashboardTable from "./DashboardTable";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

function DashboardSummary() {
  // Placeholder data
  // const summary = {
  //   totalIncome: 1000,
  //   totalExpense: 700,
  //   balance: 300,
  // };

  const [showModal, setShowModal] = useState(false);
  const [summary, setSummary] = useState([
    { id: 0, category: "Wage", type: "income", amount: 0 },
    { id: 1, category: "Monthly Shopping", type: "expense", amount: 0 },
    { id: 2, category: "Rent", type: "expense", amount: 200 },
    { id: 3, category: "Business", type: "income", amount: 0 },
  ]);

  const updateSummary = (category, amount, type) => {
    setSummary((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.category === category && item.type === type
      );
      if (existingItemIndex >= 0) {
        // if category exists, update amount
        return prevItems.map((item) =>
          item.category === category && item.type === type
            ? { ...item, amount: item.amount + amount }
            : item
        );
      } else {
        // add new category
        return [
          ...prevItems,
          { id: prevItems.length + 1, category, type, amount },
        ];
      }
    });
  };

  // const existingCategoryNames = summary.map((item) => item.category);

  return (
    <div>
      <h2>Dashboard Summary</h2>

      <DialogModal
        modalTitle="Update Summary"
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      >
        <h2>Update Balance</h2>
        <UpdateForm
          onFormSubmit={updateSummary}
          summary={summary}
          onRequestClose={() => setShowModal(false)}
        />
      </DialogModal>

      <Tabs>
        <Tab eventKey="Income" title="Income">
          <DashboardTable summaryData={summary} type="income" />
        </Tab>
        <Tab eventKey="Expense" title="Expenses">
          <DashboardTable summaryData={summary} type="expense" />
        </Tab>
      </Tabs>

      <ButtonCustom onClick={() => setShowModal(true)}>
        Update Summary
      </ButtonCustom>
    </div>
  );
}

export default DashboardSummary;
