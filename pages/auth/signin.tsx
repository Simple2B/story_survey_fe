import React from "react";
import styles from './signin.module.css';
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Forms from "../../components/Forms/Forms";
import { useActions } from "../../redux/useActions";


const SignIn = () => {
  const { data: session, status } = useSession();
  const { push } = useRouter();

  if (status === 'loading') <div>Checking Authentication ...</div>;
  const { createUser } = useActions();

  if (session){ 
    setTimeout(() => {
      push('/user_profile/user');
    }, 1500);

    const userProvide = {
      email: session.user.email,
      image: session.user.image,
      username: session.user.name,
      password: session.user.email,
    }

    createUser(userProvide);

    return <h3 className={styles.centerContainer}>Signed in as {session.user.email}</h3>
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
