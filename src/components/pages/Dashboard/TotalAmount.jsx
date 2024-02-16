import React from "react";

function TotalAmount({ amount }) {
  return (
    <div>
      <strong>Total Amount: €{amount.toFixed(2)}</strong>
    </div>
  );
}

export default TotalAmount;