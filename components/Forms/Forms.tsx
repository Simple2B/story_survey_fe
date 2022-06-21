import { signIn } from "next-auth/react";
import React, {useState} from "react";
import { useStore } from "react-redux";
import styles from "./Forms.module.css";

const providers = [
    // {
    //     name: 'twitter',
    //     style: `${styles.buttonTwitter}`,
    //     Icon: <i className="social-icon fa fa-twitter"/>,
    // },
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

    const [passwordError, setPasswordErr] = useState("");

    const [username, setUserName] = useState('');

    const [passwordCreate, setPasswordCreate] = useState('');
    const [error, setErr] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState('');


    const handleToggleForm = (e) => {
        setForm(e);
    };

    // console.log(" Form => user ", useStore().getState())

    const handleOAuthSignIn = (provider) => () => {
        // console.log("handleOAuthSignIn => provider: ", provider);
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
        });

        // if (!email) return false;

        // signIn('email', {email, redirect: false});
    };

    const handleNewPassword = (e: {
        target: { value: string };
      }) => {
        setPasswordCreate(e.target.value);
    
        const newOwnerPassword = e.target.value;

        const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
        const minLengthRegExp   = /.{8,}/;
        const passwordLength = newOwnerPassword.length;
          
        const specialCharPassword = specialCharRegExp.test(newOwnerPassword);
        const minLengthPassword = minLengthRegExp.test(newOwnerPassword);
        let errMsg ="";
        if (newOwnerPassword !== undefined) {
            errMsg="Password is empty";
        }
        if (passwordLength===0){
            errMsg="Password is empty";
        } else if (!specialCharPassword){
            errMsg="At least one Special Characters";
        } else if (!minLengthPassword){
            errMsg="At least minimum 8 characters";
        } else {
            errMsg="";
        }
        
        console.log("errMsg ", errMsg)
          
        if (errMsg.length === 0) {
            setPasswordErr("");
            setPasswordCreate(newOwnerPassword);
        } else {
            setPasswordErr(errMsg);
        }
      };

    const handlePasswordConfirm = (e: {
        target: { value: string };
      }) => {
        console.log("handlePasswordConfirm ", e.target.value);
        console.log("passwordCreate ", passwordCreate);
        
        setPasswordConfirm(e.target.value);

        const confirmPass = e.target.value;
        let errMessage = "";

        if (passwordCreate !== undefined) {
            errMessage="Password is empty";
        }

        if (confirmPass !== undefined) {
            errMessage="Confirm password is empty";
        }

        if (confirmPass.length === 0) {
            errMessage="Please enter Confirm Password."
            setErr("Please enter Confirm Password.");
          } else if (passwordCreate.length > 0 && confirmPass !== passwordCreate) {
            errMessage="Password and Confirm Password does not match."
          } else {
            errMessage="";
          }

          if (errMessage.length === 0) {
            setErr("");
            setPasswordConfirm(confirmPass);
          } else {
            setErr(errMessage);
          }
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

                        {/* <div className={styles.loginboxTextbox}>
                            <input type="text" className={styles.formControl} placeholder="First name"/>
                        </div> */}
                        <div className={styles.loginboxTextbox}>
                            <input type="text" className={styles.formControl} value={username} onChange={(e) => handleOnchange(e, setUserName)} placeholder="User name"/>
                        </div>
                        <div className={styles.loginboxTextbox}>
                            <input type="text" className={styles.formControl} value={email} onChange={(e) => handleOnchange(e, setEmail)} placeholder="Email"/>
                        </div>
                        <div className={styles.loginboxTextbox}>
                            {passwordError.length > 0 && <div className={styles.errorMessage}>{passwordError}</div>}
                            <input type="text" className={passwordError.length > 0 ? `${styles.formControl} ${styles.errorSaleInput}` : `${styles.formControl}`}  value={passwordCreate} onChange={handleNewPassword} placeholder="Password"/>
                        </div>

                        <div className={styles.loginboxTextbox}>
                            {error.length > 0 && <div className={styles.errorMsg}>{error}</div>}
                            <input type="text" className={error.length > 0 ? `${styles.formControl} ${styles.errorSaleInput}` : `${styles.formControl}`} value={passwordConfirm} onChange={handlePasswordConfirm} placeholder="Confirm password"/>
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