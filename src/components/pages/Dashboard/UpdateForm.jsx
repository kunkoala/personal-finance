import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ButtonCustom from "../../common/Button";

function UpdateForm({ onFormSubmit, onRequestClose, summary }) {
  const [category, setCategory] = useState("");
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [type, setType] = useState("income");
  const [value, setValue] = useState(0);
  const [typeChanged, setTypeChanged] = useState(false); // New state to track type changes

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     onFormSubmit(type, parseFloat(value));
  //     onRequestClose();
  //   };

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
    onFormSubmit(selectedCategory, parseFloat(value), type);
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
        <Form.Select value={type} onChange={handleTypeChange} aria-label="Type">
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </Form.Select>
      </Form.Group>
      {!isNewCategory ? (
        <Form.Group className="mb-3">
          <Form.Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
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
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </Form.Group>
      )}

      <ButtonCustom onClick={handleNewCategoryButton} type="button">
        {isNewCategory ? "Select Existing Category" : "Add New Category"}
      </ButtonCustom>

      <InputGroup className="mb-3">
        <InputGroup.Text>$</InputGroup.Text>
        <Form.Control
          placeholder="Enter amount"
          aria-label="Amount (to the nearest dollar)"
          aria-describedby="basic-addon2"
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          min="0"
          step="0.01"
        />
      </InputGroup>

      <ButtonCustom variant="primary" type="submit">
        Submit
      </ButtonCustom>
    </Form>
  );
}

export default UpdateForm;
