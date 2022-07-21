import React, { ReactElement } from "react";
import styles from "./Loader.module.css";

const Loader = (): ReactElement => {
    return (
        <div className={styles.ldsRollerContainer}>
            <div className={styles.ldsRoller}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        
    )
}

export default Loader;
