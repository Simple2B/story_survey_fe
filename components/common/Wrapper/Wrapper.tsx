import React, { ReactElement } from "react";
import styles from "./Wrapper.module.css"


const Wrapper = ({children, style}): ReactElement => {
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
