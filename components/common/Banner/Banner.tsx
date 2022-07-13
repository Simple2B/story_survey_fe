import React, { ReactElement } from "react";
import styles from "./Banner.module.css";

const Banner = ({children, title, subtitle}): ReactElement => {
    return (
        <div className={styles.banner}>
            <h1>{title}</h1>
            <div/>
            <p>{subtitle}</p>
            {children}
        </div>
    )
}

export default Banner;
