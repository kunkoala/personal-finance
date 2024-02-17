import React from "react";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>&copy; 2021 Personal Finance Tracker</p>
        <p>Contact Us: azharffrahadian@gmail.com</p>
      </div>
    </footer>
  );
}

export default Footer;
