import React from "react";
import NavScrollExample from "../layout/NavbarScroll";
import DashboardSummary from "./Dashboard/DashboardSummary";
import { Stack } from "react-bootstrap";
import styles from "./Homepage.module.css";

function Homepage() {
  return (
    <div className={styles.home}>
      <NavScrollExample />
      <Stack gap={4}>
        <div className={styles.homepage}>
          <header className={styles["homepage-header"]}>
            <h2>Welcome to Your Personal Finance Tracker</h2>
            <p>Get a quick overview of your finances at a glance.</p>
          </header>
        </div>
        <DashboardSummary />
        <div className="p-2">
          <h2>Your only needed personal finance tracker.</h2>
          <p>Personalized Project</p>
        </div>
      </Stack>
    </div>
  );
}

export default Homepage;
