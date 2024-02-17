import React from "react";
import NavScrollExample from "../layout/NavbarScroll";
import DashboardSummary from "./Dashboard/DashboardSummary";
import { Stack } from "react-bootstrap";
import styles from "./Homepage.module.css";
import Footer from "../layout/Footer";

function Homepage() {
  return (
    <div className={styles.home}>
      <NavScrollExample />
      <Stack>
        <div className={styles.homepage}>
          <header className={styles["homepage-header"]}>
            <h2>Welcome to Your Personal Finance Tracker</h2>
            <p>Get a quick overview of your finances at a glance.</p>
          </header>
        </div>
        <DashboardSummary />
      </Stack>
      <Footer />
    </div>
  );
}

export default Homepage;
