import React, {useState} from "react";
import styles from "./Forms.module.css"

function Forms() {

    const [form, setForm] = useState("SignIn");

    const handleToggleForm = (e) => {
        setForm(e);
    }

    return (
        <div className={styles.modalBody}>
            {
                form === "SignIn" && <div className={`${styles.loginContainer} ${styles.animated} ${styles.fadeInDown} ${styles.bootstrap} ${styles.snippets} ${styles.bootdeys}`}>
                    <div className={`${styles.loginbox} ${styles.bgWhite}`}>
                        <div className={styles.loginboxTitle}>SIGN IN</div>
                        <div className={styles.loginboxSocial}>
                            <div className={styles.socialTitle}>Connect with Your Social Accounts</div>
                            <div className={styles.socialButtons}>
                                <a href="" className={styles.buttonFacebook}>
                                    <i className="social-icon fa fa-facebook"></i>
                                </a>
                                <a href="" className={styles.buttonTwitter}>
                                    <i className="social-icon fa fa-twitter"></i>
                                </a>
                                <a href="" className={styles.buttonGoogle}>
                                    <i className="social-icon fa fa-google-plus"></i>
                                </a>
                            </div>
                        </div>
                        <div className={styles.loginboxOr}>
                            <div className={styles.orLine}></div>
                            <div className={styles.or}>OR</div>
                        </div>
                        <div className={styles.loginboxTextbox}>
                            <input type="text" className={styles.formControl} placeholder="Email"/>
                        </div>
                        <div className={styles.loginboxTextbox}>
                            <input type="text" className={styles.formControl} placeholder="Password"/>
                        </div>
                        {/* <div className={styles.loginboxForgot}>
                            <a href="">Forgot Password?</a>
                        </div> */}
                        <div className={styles.loginboxSubmit}>
                            <input type="button" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnBlock}`} value="Login"/>
                        </div>
                        <div className={styles.loginboxSignup} onClick={() => handleToggleForm("SignUp")}>
                            <a href="#register.html">Sign Up With Email</a>
                        </div>
                    </div>
                    {/* <div className={styles.logobox}>
                    </div> */}
                </div>
            }

            {
                form === "SignUp" && <div className={`${styles.loginContainer} ${styles.animated} ${styles.fadeInDown} ${styles.bootstrap} ${styles.snippets} ${styles.bootdeys}`}>
                    <div className={`${styles.loginbox} ${styles.bgWhite} ${styles.signUpContainer}`}>
                        <div className={styles.loginboxTitle}>SIGN UP</div>

                        <div className={styles.hiddenSocialTitle}>Connect with Your Social Accounts</div>

                        <div className={styles.loginboxTextbox}>
                            <input type="text" className={styles.formControl} placeholder="First name"/>
                        </div>
                        <div className={styles.loginboxTextbox}>
                            <input type="text" className={styles.formControl} placeholder="Surname name"/>
                        </div>
                        <div className={styles.loginboxTextbox}>
                            <input type="text" className={styles.formControl} placeholder="Email"/>
                        </div>
                        <div className={styles.loginboxTextbox}>
                            <input type="text" className={styles.formControl} placeholder="Password"/>
                        </div>

                        <div className={styles.loginboxSubmit}>
                            <input type="button" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnBlock}`} value="Registration"/>
                        </div>
                        <div className={styles.loginboxSignup}  onClick={() => handleToggleForm("SignIn")}>
                            <a href="#register.html">Sign In</a>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Forms;