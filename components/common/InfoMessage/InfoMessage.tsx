import React, { ReactElement } from "react";
import styles from "./InfoMessage.module.css"


const InfoMessage = ({children, infoStyle}): ReactElement => {
    return (
        <div className={infoStyle}>
            {children}
        </div>
    )
}

export default InfoMessage;
