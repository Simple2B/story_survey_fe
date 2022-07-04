// const { useSession } from 'next-auth/client';
import { signIn, useSession } from "next-auth/react";
import React, {useState} from "react";
import { clientApi } from "../../pages/api/backend/userInstance";
import { authApi } from "../../pages/api/backend/authApi";
import { useActions } from "../../redux/useActions";
import styles from "./Forms.module.css";
import { useTypedSelector } from "../../redux/useTypeSelector";
import { useRouter } from "next/router";

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
    const { login } = useActions();
    const [form, setForm] = useState("SignIn");

    const [emailError, setEmailErr] = useState("");
    const [email, setEmail] = useState('');

    const [passError, setPassError] = useState("");
    const [password, setPassword] = useState('');
    
    const [userNameError, setUseNameError] = useState("");
    const [username, setUserName] = useState('');

    const [passwordError, setPasswordErr] = useState("");
    const [passwordCreate, setPasswordCreate] = useState('');

    const [error, setErr] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const isSubmitRegistration = emailError.length > 0 || userNameError.length > 0 || passwordError.length > 0 || error.length > 0;
    const isSubmitLogin = emailError.length > 0 || passError.length > 0;

    // const isLogin = useTypedSelector((state) => state.auth.loggedIn);
    // console.log("isLogin", isLogin)
    

    const handleOAuthSignIn = (provider) => () => {
        signIn(provider);  
    };

    const handleOnchange = (e, setFunc, setErr, passValue) => {
        setFunc(e.target.value);

        const value = e.target.value;

        let errMsg ="";

        if (value !== undefined) {
            errMsg=`${passValue} is empty`;
        }

        if ( value.length === 0){
            errMsg=`${passValue} is empty`;
        }  else {
            errMsg="";
        }

        if (errMsg.length === 0) {
            setErr("");
            setFunc(value);
        } else {
            setErr(errMsg);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Forms: handleSubmit => ", {
            'email': email,
        });

        if (email.length === 0) {
            setEmailErr("Email is empty")
        };

        signIn('email', {email, redirect: false});

        // login({username: email, password: password });

        // isLogin && push("/user_profile/survey/surveys_list")
        
        // const userLogin = async(email: string, password: string) => {
        //     const loginUser = await authApi.login(email, password)
        //     console.log("loginUser ", loginUser);
            
        // }
        // userLogin(email, password);
    };

    // const handleCreateUser = (): void => {
    //     if (email.length === 0) {
    //         setEmailErr("Email is empty")
    //     };

    //     if (username.length === 0) {
    //         setUseNameError("User name is empty")
    //     };

    //     if (passwordCreate.length === 0) {
    //         setPasswordErr("Password is empty")
    //     };

    //     if (passwordConfirm.length === 0) {
    //         setErr("Confirm password is empty")
    //     };

    //     const userData = {
    //         username: username,
    //         email: email,
    //         password: passwordCreate,
    //     };
    //     console.log("createUser: userData => " , userData);

    //     const createUser = async(createUser: IUserProvider) =>  {
    //         const user = await clientApi.createUserProvider(createUser);
    //         console.log("createUser: user => " , user); 
    //         setForm("SignIn");
    //         return user;
    //     }
        
    //     createUser(userData);
    // };

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
                            {emailError.length > 0 && <div className={styles.errorMessage}>{emailError}</div>}
                            <input type="text" 
                                   className={styles.formControl} 
                                   value={email} 
                                   placeholder="Email"
                                   onChange={(e) => handleOnchange(e, setEmail, setEmailErr, "Email")}
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
                                   disabled={isSubmitLogin}
                            />
                        </div>
                    </div>
                </div>
            }

            
        </div>
    )
}

export default Forms;
