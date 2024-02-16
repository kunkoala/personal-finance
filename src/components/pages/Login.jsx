import React, { useState } from "react";
import { Form } from "react-bootstrap";
import ButtonCustom from "../common/Button";
import styles from "./Login.module.css";
import NavbarBrand from "../layout/NavbarBrand";

function Login() {
  // state of email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Submitted", { email, password });
    // login logic
  };

  return (
    <>
      <NavbarBrand />
      <div className={styles.loginContainer}>
        <Form onSubmit={handleSubmit} className={styles.loginForm}>
          <Form.Label>
            <h2 className={styles.formHeading}>Login</h2>
          </Form.Label>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className={styles.formLabel}>Email address</Form.Label>
            <Form.Control
              className={styles.formControl}
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className={styles.formText}>
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className={styles.formLabel}>Password</Form.Label>
            <Form.Control
              className={styles.formControl}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <ButtonCustom
            className={styles.submitButton}
            variant="primary"
            type="submit"
          >
            Submit
          </ButtonCustom>

          <Form.Text className={styles.formText}>
            Don't have an account? <a href="/register">Register</a>
          </Form.Text>
        </Form>
      </div>
    </>
  );
}

export default Login;
