import React, {useState} from "react";
import styles from "./Navbar.module.css"
// import logo from "../images/logo.svg";
import {FaAlignRight, FaTimes} from "react-icons/fa";
import { CustomLink } from "../common/CustomLink";
import Forms from "../Forms/Forms";

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenForm, setIsOpenForm] = useState(false);

    const handleToggle = () => setIsOpen(!isOpen);

    const openForms = () => setIsOpenForm(!isOpenForm);

    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.navCenter}>
                    <div className={styles.navHeader}>
                        <CustomLink text={"StorySurvey"}  href="/" style={"navHeaderLogo"}/>
                        <button type="button" className={styles.navBtn} onClick={handleToggle}>
                            {   !isOpen
                                ? <FaAlignRight className={styles.navIcon}/>
                                : <FaTimes className={styles.navIcon}/>
                            }
                        </button>
                    </div>
                    <ul className={isOpen ? `{${styles.navLinks} ${styles.showNav}}` : `${styles.navLinks}`}>
                        <li>
                            <CustomLink text={"About"}  href="/about" style={""}/>
                        </li>
                        <li>
                            <CustomLink text={"Surveys"}  href="/surveys" style={""}/>
                        </li>
                        <li>
                            <CustomLink text={"Contact"}  href="/contact" style={""}/>
                        </li>
                        <li>
                            <div style={styles.signBtn} onClick={openForms}>Sign in</div>
                        </li>
                    </ul>
                </div>
            </nav>
            {isOpenForm && 
            <div className={styles.containerForms}>
                <div className={styles.modal}>
                    <button type="button" className={styles.close} onClick={openForms}>&times;</button>
                    <Forms/>
                    {/* <button type="button" className={`${styles.btn} ${styles.btnDefault}`} data-dismiss="modal">Close</button> */}
                </div>
            </div>}
        </>
        
    )
}
export default Navbar;
