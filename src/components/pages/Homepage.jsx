import React from "react";
import { Stack } from "react-bootstrap";
import styles from "./Homepage.module.css";

function Homepage() {
  return (
    <Stack>
      <div className={styles.home}>
        <div className={styles.homepage}>
          <h2>Welcome to Your Personal Finance Tracker</h2>
          <div>
            <p>
              Track your income and expenses to help you understand your
              spending habits.
            </p>
          </div>
          <div>
            <p>Get a quick overview of your finances at a glance.</p>
          </div>
          <div className={styles.login}>
            <div>Login Here</div>
          </div>
        </div>
      </div>
    </Stack>
  );
}

export default Homepage;
