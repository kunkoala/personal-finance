import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ButtonCustom from "../../common/Button";
import Alert from "react-bootstrap/Alert"; // For showing alert messages

function UpdateForm({ onFormSubmit, onRequestClose, summary, setSummary }) {
  const [category, setCategory] = useState("");
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [type, setType] = useState("income");
  const [value, setValue] = useState(0);
  const [typeChanged, setTypeChanged] = useState(false); // New state to track type changes
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Set default date to today
  const [error, setError] = useState(""); // State to manage error messages

  const categoryOptions = Array.from(
    new Set(summary.map((item) => item.category))
  );

  const filteredCategories = summary
    .filter((item) => item.type === type)
    .map((item) => item.category);

  useEffect(() => {
    if (typeChanged) {
      setCategory(filteredCategories[0] || "");
      setIsNewCategory(false);
      setNewCategory("");
      setTypeChanged(false);
    }
  }, [typeChanged]);

  const handleTypeChange = (e) => {
    setType(e.target.value);
    setTypeChanged(true); // Set flag to true to trigger category reset in useEffect
  };

  //   const handleNewCategoryButton = (e) => {
  //     e.stopPropagation();
  //     setIsNewCategory(!isNewCategory);
  //     setNewCategory(""); // reset new category input when toggling
  //   };

  const handleAddNewCategory = () => {
    if (!newCategory.trim()) {
      setError("Category name cannot be empty.");
      return;
    }
    if (categoryOptions.includes(newCategory)) {
      setError("Category already exists.");
      return;
    }
    // Add the new category to the summary (or a separate state if managing categories separately)
    setSummary((prev) => [
      ...prev,
      { id: prev.length, category: newCategory, type, amount: 0, date },
    ]);
    setCategory(newCategory); // Select the newly added category
    setIsNewCategory(false); // Close the new category input
    setNewCategory(""); // Reset the new category input field
    setError(""); // Clear any errors
  };

  const handleCancelNewCategory = () => {
    setIsNewCategory(false);
    setNewCategory("");
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if new category, use newCategory, else use existing category
    const selectedCategory = isNewCategory ? newCategory : category;
    if (!selectedCategory) {
      setError("Category cannot be empty.");
      return;
    } // if no category selected, do nothing
    if (value <= 0) {
      setError("Amount must be greater than 0.");
      return;
    }

    setError(""); // Clear error message
    onFormSubmit(selectedCategory, parseFloat(value), type, date);
    onRequestClose();
    // reset form
    e.target.reset();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Type</Form.Label>
        <Form.Select
          value={type}
          required
          onChange={handleTypeChange}
          aria-label="Type"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        {!isNewCategory ? (
          <InputGroup>
            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {categoryOptions.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </Form.Select>
            <ButtonCustom
              variant="outline-secondary"
              onClick={() => setIsNewCategory(true)}
            >
              Add New
            </ButtonCustom>
          </InputGroup>
        ) : (
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Enter new category name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <ButtonCustom variant="outline-success" onClick={handleAddNewCategory}>
              Add
            </ButtonCustom>
            <ButtonCustom variant="outline-danger" onClick={handleCancelNewCategory}>
              Cancel
            </ButtonCustom>
          </InputGroup>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Enter Amount</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text>€</InputGroup.Text>
          <Form.Control
            placeholder="Enter amount"
            aria-label="Amount (to the nearest dollar)"
            aria-describedby="basic-addon2"
            type="number"
            value={value}
            required
            onChange={(e) => setValue(e.target.value)}
            min="0"
            step="0.01"
          />
        </InputGroup>
      </Form.Group>

      {error && <Alert variant="danger">{error}</Alert>}

      <ButtonCustom variant="primary" type="submit">
        {type === "income" ? "Add Income" : "Add Expense"}
      </ButtonCustom>
    </Form>
  );
}

export default UpdateForm;
