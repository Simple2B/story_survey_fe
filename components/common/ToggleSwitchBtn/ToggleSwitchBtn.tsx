import React, { ReactElement } from "react";
import styles from "./ToggleSwitch.module.css";


const ToggleSwitch = ({id, checked, onChange}): ReactElement => {
 
    return (
        <div className={styles.toggleSwitchContainer}>
            <div className={styles.toggleSwitch}>
                <input
                    type="checkbox"
                    className={styles.toggleSwitchCheckbox}
                    name={id}
                    id={id}
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                />
                <label className={styles.toggleSwitchLabel} htmlFor={id}>
                <span className={styles.toggleSwitchInner} />
                <span className={styles.toggleSwitchSwitch} />
                </label>
            </div>
        </div>
    );
  
}

export default ToggleSwitch;