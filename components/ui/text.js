import React from "react";
import PropTypes from "prop-types";
import styles from "./text.module.css";

export default function Text({variant = "plain", marginBottom, children, ...props}) {
  return (
    <div className={`${styles.text} ${styles[variant]}`} {...props} style={{marginBottom}}>
      {children}
    </div>
  );
}

Text.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.any
};
