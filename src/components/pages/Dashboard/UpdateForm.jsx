import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ButtonCustom from "../../common/Button";
import Alert from "react-bootstrap/Alert"; // For showing alert messages

function UpdateForm({ onFormSubmit, onRequestClose, summary }) {
  const [category, setCategory] = useState("");
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [type, setType] = useState("income");
  const [value, setValue] = useState(0);
  const [typeChanged, setTypeChanged] = useState(false); // New state to track type changes
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Set default date to today
  const [error, setError] = useState(""); // State to manage error messages

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // if new category, use newCategory, else use existing category
    const selectedCategory = isNewCategory ? newCategory : category;
    if (!selectedCategory) {
        setError("Category cannot be empty.");
        return
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

  const handleNewCategoryButton = (e) => {
    e.stopPropagation();
    setIsNewCategory(!isNewCategory);
    setNewCategory(""); // reset new category input when toggling
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
      {!isNewCategory ? (
        <Form.Group className="mb-3">
          <Form.Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))
            ) : (
              <option value="">No categories</option>
            )}
          </Form.Select>
        </Form.Group>
      ) : (
        <Form.Group className="mb-3">
          <Form.Label>New Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter new category name"
            value={newCategory}
            required
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </Form.Group>
      )}

      <ButtonCustom onClick={handleNewCategoryButton} type="button">
        {isNewCategory ? "Select Existing Category" : "Add New Category"}
      </ButtonCustom>

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

      {error && <Alert variant="danger">{error}</Alert>}

      <ButtonCustom variant="primary" type="submit">
        Submit
      </ButtonCustom>
    </Form>
  );
}

export default UpdateForm;
