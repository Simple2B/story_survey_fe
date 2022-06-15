import { signIn } from "next-auth/react";
import React, {useState} from "react";
import styles from "./Forms.module.css";

const providers = [
    {
        name: 'twitter',
        style: `${styles.buttonTwitter}`,
        Icon: <i className="social-icon fa fa-twitter"/>,
    },
    {
        name: 'facebook',
        style: `${styles.buttonFacebook}`,
        Icon: <i className="social-icon fa fa-facebook"/>,
    },
    {
        name: 'google',
        style: `${styles.buttonGoogle}`,
        Icon: <i className="social-icon fa fa-google-plus"></i>,
    },
];

function Forms() {
    const [form, setForm] = useState("SignIn");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleToggleForm = (e) => {
        setForm(e);
    };

    const handleOAuthSignIn = (provider) => () => {
        console.log("handleOAuthSignIn => provider: ", provider);
        signIn(provider);
    };

    const handleOnchange = (e, setFunc) => {
        setFunc(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Forms: handleSubmit => ", {
            'email': email,
            'password': password,
        })
    };

    return (
        <div className={styles.modalBody}>
            {
                form === "SignIn" && <div className={`${styles.loginContainer} ${styles.animated} ${styles.fadeInDown} ${styles.bootstrap} ${styles.snippets} ${styles.bootdeys}`}>
                    <div className={`${styles.loginbox} ${styles.bgWhite}`}>
                        <div className={styles.loginboxTitle}>SIGN IN</div>
                        <div className={styles.loginboxSocial}>
                            <div className={styles.socialTitle}>Connect with Your Social Accounts</div>
                            <div className={styles.socialButtons}>
                                {providers.map(({name, Icon, style}) => {
                                    return (
                                        <div key={name} onClick={handleOAuthSignIn(name)} className={style}>{Icon}</div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className={styles.loginboxOr}>
                            <div className={styles.orLine}></div>
                            <div className={styles.or}>OR</div>
                        </div>
                        <div className={styles.loginboxTextbox}>
                            <input type="text" 
                                   className={styles.formControl} 
                                   value={email} 
                                   placeholder="Email"
                                   onChange={(e) => handleOnchange(e, setEmail)}
                            />
                        </div>
                        <div className={styles.loginboxTextbox}>
                            <input type="text"
                                   className={styles.formControl}
                                   value={password}
                                   placeholder="Password"
                                   onChange={(e) => handleOnchange(e, setPassword)}
                            />
                        </div>
                        {/* <div className={styles.loginboxForgot}>
                            <a href="">Forgot Password?</a>
                        </div> */}
                        <div className={styles.loginboxSubmit}>
                            <input type="submit" 
                                   className={`${styles.btn} ${styles.btnPrimary} ${styles.btnBlock}`} 
                                   value="Login"
                                   onClick={handleSubmit}
                            />
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
                            <a href="#login.html">Sign In</a>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Forms;