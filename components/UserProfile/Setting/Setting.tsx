import React, { ReactElement, useState } from "react";
import StripeSubscription from "./StripeSubscription/StripeSubscription";
import styles from "./Setting.module.css";


const Setting = (): ReactElement => {


    return  (
        <div className={styles.container}>
            <StripeSubscription/>
        </div>
    );
};

export default Setting;
