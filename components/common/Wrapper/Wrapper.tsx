import React from "react";
import styles from "./Wrapper.module.css"


function Wrapper ({children, style}) {
    return (
        <header className={style}>
            {children}
        </header>
    )
}

export default Wrapper;

Wrapper.defaultProps = {
    style: `${styles.defaultWrapper}`
}
