import React, { ReactElement } from "react";
import styles from "./Loader.module.css";

const Loader = ({style}): ReactElement => {
    return (
        <div className={style}>
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

Loader.defaultProps = {
    style: `${styles.ldsRollerContainer}`
}


export default Loader;
