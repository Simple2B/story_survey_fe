import React, { Component, ReactElement } from "react";
import PropTypes from "prop-types";
import styles from "./ToggleSwitch.module.css";


// const ToggleSwitch = ({ id, name, checked, onChange, optionLabels, small, disabled }) => {

//     return (
//       <div className={"toggle-switch" + (small ? " small-switch" : "")}>
//         <input
//           type="checkbox"
//           name={name}
//           className={styles.toggleSwitch}
//           id={id}
//           checked={checked}
//           onChange={e => onChange(e.target.checked)}
//           disabled={disabled}
//           />
//           {id ? (
//             <label className={styles.toggleSwitchLabel} htmlFor={id}>
//               <span
//                 className={
//                   disabled
//                   ? `${styles.toggleSwitchInner} ${styles.toggleSwitchDisabled}`
//                   : `${styles.toggleSwitchInner}`
//                 }
//                 data-yes={optionLabels[0]}
//                 data-no={optionLabels[1]}
//               />
//               <span
//                 className={
//                 disabled
//                   ? `${styles.toggleSwitchInner} ${styles.toggleSwitchDisabled}`
//                   : `${styles.toggleSwitchInner}`
//                 }
//               />
//             </label>
//           ) : null}
//         </div>
//       );
//   }
  
// ToggleSwitch.defaultProps = {
//     optionLabels: ["Yes", "No"],
// };

// ToggleSwitch.propTypes = {
//     id: PropTypes.string.isRequired,
//     checked: PropTypes.bool.isRequired,
//     onChange: PropTypes.func.isRequired,
//     name: PropTypes.string,
//     optionLabels: PropTypes.array,
//     small: PropTypes.bool,
//     disabled: PropTypes.bool
// };
  
// export default ToggleSwitch;

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
                    onChange={e => onChange(e.target.checked)}
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