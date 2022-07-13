import React, { ReactElement } from "react";
import styles from "./SectionDashboard.module.css";


const SectionDashboard = (): ReactElement => {

  return  (
    <div className={styles.homeContent}>
        <div className={styles.overviewBoxes}>
            Dashboards
        </div>
    </div>
  );
};

export default SectionDashboard;
