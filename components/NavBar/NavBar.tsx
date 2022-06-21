import React, {useState} from "react";
import styles from "./Navbar.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import {FaAlignRight, FaTimes} from "react-icons/fa";
import { CustomLink } from "../common/CustomLink";
import { useSession, signOut } from "next-auth/react";
import singOutIcon from "../../styles/icons/icons8-logout-64 (1).png";


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleToggle = () => setIsOpen(!isOpen);

    const { push, asPath } = useRouter();
    const { data: session } = useSession();

    const handleSignIn = () => {
        push(`/auth/signin?callbackUrl=${asPath}`);
    };

    const getProfile = () => {
        push(`/user_profile/user`);
    };

    const handleSignOut = async () => {
        const data = await signOut({redirect: false, callbackUrl: '/'});
        push(data.url);
    };

    return (
        <>
            <nav className={ session? styles.navbarProfile : styles.navbar }>
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
                                (session && <>
                                
                                    <div className={styles.btnContainer} onClick={getProfile}>  
                                            
                                        <div className={styles.signOutBtn}>{session.user.name}</div>
                                        <div className={styles.imageContainer}>
                                            <img src={session.user.image} alt={session.user.name}  className={styles.image}/>
                                        </div>
                                        
                                    </div>
                                    <i onClick={handleSignOut}><Image src={singOutIcon} height={25} width={25} className={styles.icon}/></i>
                                </>
                                    
                                )
                                :
                                (<div className={styles.signBtn} onClick={handleSignIn}>Sign in</div>)
                            }
                            
                        </li>
                    </ul>
                </div>
            </nav>
        </>
        
    )
}
export default Navbar;
