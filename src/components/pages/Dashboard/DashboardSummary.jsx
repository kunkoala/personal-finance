import React, { useState } from "react";
import DialogModal from "../../common/Modal";
import UpdateForm from "./UpdateForm";
import ButtonCustom from "../../common/Button";
import DashboardTable from "./DashboardTable";
import styles from "./DashboardSummary.module.css";

function DashboardSummary() {
  // Placeholder data
  // const summary = {
  //   totalIncome: 1000,
  //   totalExpense: 700,
  //   balance: 300,
  // };

  const [showModal, setShowModal] = useState(false);
  const [summary, setSummary] = useState([
    {
      id: 0,
      category: "Wage",
      type: "income",
      amount: 0,
      date: new Date().toISOString().split("T")[0],
    },
    {
      id: 1,
      category: "Monthly Shopping",
      type: "expense",
      amount: 0,
      date: new Date().toISOString().split("T")[0],
    },
    {
      id: 2,
      category: "Rent",
      type: "expense",
      amount: 200,
      date: new Date().toISOString().split("T")[0],
    },
    {
      id: 3,
      category: "Business",
      type: "income",
      amount: 0,
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
        />
      </DialogModal>

      <div>
        <DashboardTable
          classname={styles.table}
          summaryData={summary}
          type="income"
        />
        <DashboardTable
          classname={styles.table}
          summaryData={summary}
          type="expense"
        />
      </div>

      <ButtonCustom onClick={() => setShowModal(true)}>
        Update Summary
      </ButtonCustom>
    </div>
  );
}

export default DashboardSummary;
