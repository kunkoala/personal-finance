import React from "react";
import Button from "react-bootstrap/Button";
import styles from "./Button.module.css";

function ButtonCustom({ children, variant, type, onClick, className }) {
  const buttonClassName = className ? className : styles.Button;
  return (
    <Button
      className={buttonClassName}
      variant={variant}
      type={type}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export default ButtonCustom;
