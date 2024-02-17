import React from "react";
import styles from "./TotalAmount.module.css";

function TotalAmount({ amount, expense_type }) {
  return (
    <div className={styles.totalAmountContainer}>
      <strong>Total {expense_type}: €{amount.toFixed(2)}</strong>
    </div>
  );
}

export default TotalAmount;