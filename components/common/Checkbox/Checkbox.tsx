import { useState } from "react";
import styles from  "./Checkbox.module.css";

const Checkbox = ({children, value, id, isChecked, handleOnChange}) => {

  console.log("isChecked ", isChecked);
  

  return (
    <label className={styles.container}>
        <div className={styles.containerTitle}>{children}</div>
        <div>
            <input 
                type="checkbox"
                value={value}
                className={styles.checkbox}
                id={id}
                name={id}
                checked={isChecked}
                onChange={handleOnChange}
            />
            <span className={styles.checkmark}></span>
        </div>
    </label>
  );
}

export default Checkbox;
