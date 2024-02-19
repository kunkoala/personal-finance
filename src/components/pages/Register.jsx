import React, { useState } from "react";
import styles from "./Register.module.css";
import Form from "react-bootstrap/Form";
import ButtonCustom from "../common/Button";
import InputField from "../common/InputField"; // Assuming InputField is in the common directory

// register
import { registerUser } from "../../firebase/firebase-auth";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear error message

    if (password !== passwordConfirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await registerUser(email, password);
      console.log("Registration Submitted", { email, password });
    } catch (error) {
      setError(error.message);
      console.error("Registration Error", error);
    }
    // Add your backend logic for registration here
  };

  return (
    <>
      <section className={styles.Container}>
        <Form className={styles.Form} name="register" onSubmit={handleSubmit}>
          <div className={styles.Heading}>
            <h2>Register</h2>
          </div>

          <section className={styles.formContent}>
            <InputField
              id="formBasicEmail"
              label="Email"
              type="email"
              placeholder="Enter your email address"
              icon="bi:envelope-fill"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <InputField
              id="formBasicPassword"
              label="Password"
              type="password"
              placeholder="Enter your password"
              icon="bi:lock-fill"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <InputField
              id="formBasicPasswordConfirm"
              label="Confirm Password"
              type="password"
              placeholder="Confirm Password"
              icon="bi:lock-fill"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </section>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Agree to terms and conditions"
              required
              checked={hasAgreedToTerms}
              onChange={(e) => setHasAgreedToTerms(e.target.checked)}
            />
          </Form.Group>
          {error && <p className={styles.error}>{error}</p>}

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
