import React, { useState } from "react";
import styles from "./Register.module.css";
import Form from "react-bootstrap/Form";
import { Icon } from "@iconify/react";
import ButtonCustom from "../common/Button";
import { InputGroup } from "react-bootstrap";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register Submitted", { email, password, passwordConfirm });
    // backend logic
  };

  return (
    <>
      <section className={styles.Container}>
        <Form className={styles.Form} name="register" onSubmit={handleSubmit}>
          <div className={styles.Heading}>
            <Form.Label>
              <h2>Register</h2>
            </Form.Label>
          </div>

          <section className={styles.formContent}>
            <Form.Group className="mb-3 text-left">
              <Form.Label>Email</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <Icon icon="bi:file-person-fill" /> {/* Email icon */}
                </InputGroup.Text>
                <Form.Control
                  className={styles.formControl}
                  type="email"
                  aria-placeholder=""
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <Icon icon="bi:lock" />
                </InputGroup.Text>
                <Form.Control
                  className={styles.formControl}
                  aria-placeholder="Enter your password"
                  placeholder="Enter your password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <Icon icon="bi:lock" />
                </InputGroup.Text>
                <Form.Control
                  className={styles.formControl}
                  type="password"
                  aria-placeholder="Confirm Password"
                  placeholder="Confirm Password"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>
          </section>
          <Form.Check type="checkbox" label="Agree to TOC"></Form.Check>
          <div className="text-center">
            <ButtonCustom
              variant="primary"
              type="submit"
              className={styles.submitButton}
            >
              Register
            </ButtonCustom>
          </div>
        </Form>
      </section>
    </>
  );
}

export default Register;
