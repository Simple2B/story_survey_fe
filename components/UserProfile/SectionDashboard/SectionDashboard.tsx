import React, { useState } from "react";
import styles from "./SectionDashboard.module.css";


const SectionDashboard = () => {

  return  (
    <div className={styles.homeContent}>
        <div className={styles.overviewBoxes}>
            <div className={styles.box}>
                <div className={styles.rightSide}>
                    <div className={styles.boxTopic}>Total Order</div>
                    <div className={styles.number}>40,876</div>
                    <div className={styles.indicator}>
                        <i className={`${styles.bx} ${styles.bxUpArrowAlt}`}></i>
                        <span className={styles.text}>Up from yesterday</span>
                    </div>
                </div>
                <i className={`${styles.bx} ${styles.bxCartAlt} ${styles.cart}`}></i>
            </div>

            {/* <div className={styles.box}>
                <div className={styles.rightSide}>
                    <div className={styles.boxTopic}>Total Sales</div>
                    <div className={styles.number}>38,876</div>
                    <div className={styles.indicator}>
                        <i className={`${styles.bx} ${styles.bxUpArrowAlt}`}></i>
                        <span className={styles.text}>Up from yesterday</span>
                    </div>
                </div>
                <i className={`${styles.bx} ${styles.bxsCartAdd} ${styles.cart} ${styles.two}`} ></i>
            </div>
            <div className={styles.box}>
                <div className={styles.rightSide}>
                    <div className={styles.boxTopic}>Total Profit</div>
                    <div className={styles.number}>$12,876</div>
                    <div className={styles.indicator}>
                        <i className={`${styles.bx} ${styles.bxUpArrowAlt}`}></i>
                        <span className={styles.text}>Up from yesterday</span>
                    </div>
                </div>
                <i className={`${styles.bx} ${styles.bxCart} ${styles.cart} ${styles.three}`} ></i>
            </div>
            <div className={styles.box}>
                <div className={styles.rightSide}>
                    <div className={styles.boxTopic}>Total Return</div>
                    <div className={styles.number}>11,086</div>
                    <div className={styles.indicator}>
                        <i className={`${styles.bx} ${styles.bxDownArrowAlt} ${styles.down}`}></i>
                        <span className={styles.text}>Down From Today</span>
                    </div>
                </div>
                <i className={`${styles.bx} ${styles.bxsCartDownload} ${styles.cart} ${styles.four}`} ></i>
            </div> */}
        </div>

        <div className={styles.salesBoxes}>
            {/* <div className={`${styles.recentSales} ${styles.box}`}>
                <div className={styles.title}>Recent Sales</div>
                <div className={styles.salesDetails}>
                    <ul className={styles.details}>
                        <li className={styles.topic}>Date</li>
                        <li><a href="#">02 Jan 2021</a></li>
                    </ul>
                     className={styles.details}>
                        <li className={styles.topic}>Customer</li>
                        <li><a href="#">Alex Doe</a></li>
                    </ul>
                    <ul className={styles.details}>
                        <li className={styles.topic}>Sales</li>
                        <li><a href="#">Delivered</a></li>
                    </ul>
                     className={styles.details}>
                        <li className={styles.topic}>Total</li>
                        <li><a href="#">$204.98</a></li>
                    </ul>
                </div>
                <div className={styles.button}>
                <a href="#">See All</a>
                </div>
            </div>

            <div className={`${styles.topSales} ${styles.box}`}>
                <div className={styles.title}>Top Seling Product</div>

                <ul className={styles.topSalesDetails}>
                    <li>
                        <a href="#">
                            <span className={styles.product}>Vuitton Sunglasses</span>
                        </a>
                        <span className={styles.price}>$1107</span>
                    </li>
                </ul>
            </div> */}
        </div>

    </div>
  );
};

export default SectionDashboard;
