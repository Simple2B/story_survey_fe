import React from "react";
import styles from './signin.module.css';
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Forms from "../../components/Forms/Forms";
import { IUserResponse } from "../../redux/types/userTypes";
import { useActions } from "../../redux/useActions";
// import { useActions } from "../../redux/useActions";

const SignIn = () => {
  const {setCurrentUser} = useActions();
  const { data: session, status } = useSession();
  const { push } = useRouter();


  if (status === 'loading') <div>Checking Authentication ...</div>;

  if (session){ 
    
    setTimeout(() => {
      push('/user_profile/survey/surveys_list');
    }, 1500);
    const userProfile: any  = session.profile
    console.log("SignIn: session", session);

    const currentUser: IUserResponse = {
      id: userProfile.id,
      created_at: userProfile.created_at,
      email: session.user.email,
      image: session.user.image,
      role: userProfile.role,
      username: session.user.name,
    }

    setCurrentUser(currentUser);

    return <h3 className={styles.centerContainer}>Signed in {session.user.email}</h3>
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
