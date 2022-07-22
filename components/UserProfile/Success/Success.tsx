import React, { ReactElement } from 'react';
import styles from "../../Home/Home.module.css";

const Success = ({survey, styles }): ReactElement => {

    return (
        <div className={styles}>
            {survey.successful_message.length === 0 && <div>answers added successfully</div>}
            {survey.successful_message.length > 0 && <div>{survey.successful_message}</div>}
        </div>

    )
}

export default Success;
