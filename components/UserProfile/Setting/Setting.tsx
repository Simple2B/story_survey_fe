import { useSession } from "next-auth/react";
import React, { ReactElement, useEffect, useState } from "react";
import { clientApi } from "../../../pages/api/backend/userInstance";
import styles from "./Setting.module.css";
import StripeSubscription from "./StripeSubscription/StripeSubscription";

const Setting = (): ReactElement => {
    const {data: session} = useSession();
    console.log("Setting: session => ", session);
    
    return  (
        <div className={styles.container}>
            <StripeSubscription/>
        </div>
    );
};

export default Setting;
