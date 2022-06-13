import React from "react";
import styles from "./Forms.module.css"

function Forms() {
    return (

        <div className={styles.modalBody}>
            <div className={`${styles.loginContainer} ${styles.animated} ${styles.fadeInDown} ${styles.bootstrap} ${styles.snippets} ${styles.bootdeys}`}>
                <div className={`${styles.loginbox} ${styles.bgWhite}`}>
                    <div className={styles.loginboxTitle}>SIGN IN</div>
                    <div className={styles.loginboxSocial}>
                        <div className={styles.socialTitle}>Connect with Your Social Accounts</div>
                        <div className={styles.socialButtons}>
                            <a href="" className={styles.buttonFacebook}>
                                <i class="social-icon fa fa-facebook"></i>
                            </a>
                            <a href="" className={styles.buttonTwitter}>
                                <i class="social-icon fa fa-twitter"></i>
                            </a>
                            <a href="" className={styles.buttonGoogle}>
                                <i class="social-icon fa fa-google-plus"></i>
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
                    {/* <div className={styles.loginboxSignup}>
                        <a href="#register.html">Sign Up With Email</a>
                    </div> */}
                </div>
                {/* <div className={styles.logobox}>
                </div> */}
            </div>
        </div>

    )
}

export default Forms;