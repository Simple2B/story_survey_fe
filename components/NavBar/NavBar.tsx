import React, {useState} from "react";
import styles from "./Navbar.module.css";
import { useRouter } from "next/router";
import {FaAlignRight, FaTimes} from "react-icons/fa";
import { CustomLink } from "../common/CustomLink";
import Forms from "../Forms/Forms";
import { useSession, signOut } from "next-auth/react";


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenForm, setIsOpenForm] = useState(false);

    const handleToggle = () => setIsOpen(!isOpen);

    const openForms = () => setIsOpenForm(!isOpenForm);

    const { push, asPath } = useRouter();
    const { data: session } = useSession();

    const handleSignOut = async () => {
        const data = await signOut({redirect: false, callbackUrl: '/'});
        console.log("NavBar: handleSignOut data => ", data);
        push(data.url);
    };


    const handleSignIn = () => {
        push(`/auth/signin?callbackUrl=${asPath}`);
    };

    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.navCenter}>
                    <div className={styles.navHeader}>
                        <CustomLink text={"StorySurvey"}  href="/" style={"navHeaderLogo"}/>
                        <button type="button" className={styles.navBtn} onClick={handleToggle}>
                            {   !isOpen
                                ? <FaAlignRight size={"1.5rem"} color={"rgb(176, 24, 66, .7)"}/>
                                : <FaTimes size={"1.5rem"} color={"rgb(176, 24, 66, .7)"}/>
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
                            {
                            session ? 
                                (<div className={styles.signBtn} onClick={handleSignOut}>Sign out</div>)
                                :
                                (<div className={styles.signBtn} onClick={handleSignIn}>Sign in</div>)
                            }
                            
                        </li>
                    </ul>
                </div>
            </nav>
            {/* {isOpenForm && 
            <div className={styles.containerForms}>
                <div className={styles.modal}>
                    <button type="button" className={styles.close} onClick={openForms}>&times;</button>
                        <Forms/>
                    <button type="button" className={`${styles.btn} ${styles.btnDefault}`} data-dismiss="modal">Close</button>
                </div>
            </div>} */}
        </>
        
    )
}
export default Navbar;
