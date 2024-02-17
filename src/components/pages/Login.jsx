import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import ButtonCustom from "../common/Button";
import styles from "./Login.module.css";
import { Icon } from "@iconify/react";

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
      <section className={styles.loginContainer}>
        <Form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.formHeading}>
            <Form.Label>
              <h2>Login</h2>
            </Form.Label>
          </div>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className={styles.formLabel}>Email address</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <Icon icon="bi:lock" />
              </InputGroup.Text>
              <Form.Control
                className={styles.formControl}
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
            <Form.Text className={styles.formText}>
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className={styles.formLabel}>Password</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <Icon icon="bi:lock" />
              </InputGroup.Text>
              <Form.Control
                className={styles.formControl}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <div className={styles.submitDiv}>
            <ButtonCustom
              className={styles.submitButton}
              variant="primary"
              type="submit"
            >
              Login
            </ButtonCustom>
          </div>

          <Form.Text className={styles.formText}>
            Don't have an account? <a href="/register">Register</a>
          </Form.Text>
        </Form>
      </section>
    </>
  );
}

export default Login;
