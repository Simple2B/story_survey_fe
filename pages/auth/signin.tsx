import React from "react";
import styles from './signin.module.css';
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Forms from "../../components/Forms/Forms";


const SignIn = () => {
  const { data: session, status } = useSession();
  const { push, asPath } = useRouter();

  if (status === 'loading') <div>Checking Authentication ...</div>;

  if (session){ 
    setTimeout(() => {
        push('/')
    }, 3000);

    return <h1 className={styles.centerContainer}>You are already sign in</h1>
  };

  const handleBack = () => push('/');

  return (
    <>
        {
            <div className={styles.containerForms}>
                <div className={styles.modal}>
                    <button type="button" className={styles.close} onClick={() => handleBack()}>&times;</button>
                    <Forms/>
                    {/* <button type="button" className={`${styles.btn} ${styles.btnDefault}`} data-dismiss="modal">Close</button> */}
                </div>
            </div>
        }
    </>
  )
}

export default SignIn;