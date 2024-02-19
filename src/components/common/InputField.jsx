import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Icon } from "@iconify/react";

function InputField({ id, label, type, placeholder, value, onChange, icon }) {
  return (
    <Form.Group className="mb-3" controlId={id}>
      <Form.Label>{label}</Form.Label>
      <InputGroup>
        {icon && (
          <InputGroup.Text>
            <Icon icon={icon} />
          </InputGroup.Text>
        )}
        <Form.Control
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </InputGroup>
    </Form.Group>
  );
}

export default InputField;
