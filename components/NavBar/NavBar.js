import React from "react";
// import logo from "../images/logo.svg";
// import logo from "../images/hyatt-hotels-1.svg";
import {FaAlignRight, FaTimes} from "react-icons/fa";
import Link from "next/link";
import { CustomLink } from "../common/CustomLink";
import styles from "./Navbar.module.css"

class Navbar extends React.Component {
    state = {
        isOpen: false
    }
    handleToggle = () => {
        this.setState({isOpen: !this.state.isOpen})
    }

    render() {
        return (
            <nav className={styles.navbar}>
                <div className={styles.navCenter}>
                    <div className={styles.navHeader}>
                        <CustomLink text={"StorySurvey"}  href="/" style={"navHeaderLogo"}/>
                        <button type="button" className={styles.navBtn} onClick={this.handleToggle}>
                            {   !this.state.isOpen
                                ? <FaAlignRight className={styles.navIcon}/>
                                : <FaTimes className={styles.navIcon}/>
                            }
                        </button>
                    </div>
                    <ul className={this.state.isOpen ? `{${styles.navLinks} ${styles.showNav}}` : `${styles.navLinks}`}>
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
                            <CustomLink text={"Sign in"}  href="/signin" style={"signBtn"}/>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
export default Navbar