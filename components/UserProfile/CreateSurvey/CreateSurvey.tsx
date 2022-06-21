import React, { ReactElement, useState } from "react";
import Image from "next/image";
import styles from "./CreateSurvey.module.css";
import plusIcon from "../../../styles/icons/icons8-add-property-64.png";


const CreateSurvey = (): ReactElement => {
    const [isFormCreateOpen, setIsFormCreateOpen] = useState<boolean>(false);




    const createSurvey = () => {
        setIsFormCreateOpen(!isFormCreateOpen);
    }

    return  (
        <div className={styles.container}>
            <div className={styles.listSurveys}>

                {
                    !isFormCreateOpen && <div className={styles.item} onClick={createSurvey}>
                        <div className={styles.rightSide}>
                            {/* <div className={styles.boxTopic}>Total Order</div> */}
                            {/* <div className={styles.number}>40,876</div> */}
                            {/* <div className={styles.indicator}>
                                <i  className={`${styles.bx} ${styles.bxUpArrowAlt}`}><Image src={plusIcon} height={30} width={30}/></i>
                                <span className={styles.text}>Create survey</span>
                            </div> */}
                            <span className={styles.text}>Create survey</span>
                            <Image src={plusIcon} height={30} width={30}/>
                        </div>
                        <i className={`${styles.bx} ${styles.bxCartAlt} ${styles.cart}`}></i>
                    </div>
                }

            </div>
        </div>
    );
};

export default CreateSurvey;
