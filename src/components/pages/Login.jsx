// Adjust the import paths as necessary
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import ButtonCustom from "../common/Button";
import InputField from "../common/InputField"; // Import the newly created InputField component
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

// auth
import { signIn } from "../../firebase/firebase-auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear error message
    try {
      // Call the signIn function from firebase-auth.js
      await signIn(email, password);
      console.log("Login Submitted", { email, password });
      // redirect
      // Replace "/dashboard" with the actual path to your dashboard component
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
      console.error("Login Error: ", error);
    }
  };

  return (
    <section className={styles.loginContainer}>
      <Form onSubmit={handleSubmit} className={styles.loginForm}>
        <div className={styles.formHeading}>
          <Form.Label>
            <h2>Login</h2>
          </Form.Label>
        </div>
        <InputField
          id="formBasicEmail"
          label="Email address"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon="bi:envelope-fill"
        />
        <InputField
          id="formBasicPassword"
          label="Password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon="bi:lock-fill"
        />
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.submitDiv}>
          <ButtonCustom
            variant="primary"
            type="submit"
            className={styles.submitButton}
          >
            Login
          </ButtonCustom>
        </div>
        <Form.Text className={styles.formText}>
          Don't have an account? <a href="/register">Register</a>
        </Form.Text>
      </Form>
    </section>
  );
}

export default Login;
