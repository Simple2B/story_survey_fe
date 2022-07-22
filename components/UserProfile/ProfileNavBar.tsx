import React from "react";
import styles from "./UserProfile.module.css";
import { useRouter } from "next/router";
import {  useSession } from "next-auth/react";
import { ADMIN, IUserResponse } from "../../redux/types/userTypes";


const ProfileNavbar = ({isActive, handleClick, headerName}) => {
    const { data: session } = useSession();
    const { push } = useRouter();
    const getProfile = () => {
        push(`/user_profile/survey/surveys_list`);
    };
    let isAdmin: boolean;
    if (session) {
        const user: IUserResponse = session.profile;
        isAdmin = user && user.role === ADMIN;
    };

  return  (
      <nav>
          <div className={styles.sidebarButton} onClick={handleClick}>
              <i className={`bx ${isActive ? 'bx-menu-alt-right': 'bx-menu'} sidebarBtn`}/>
              <span className={styles.dashboard}>{headerName}</span>
          </div>
          {session && (
            <div className={styles.btnContainer} onClick={getProfile}>
                <div className={styles.signOutBtn}>{session.user.name}</div>
                <div className={styles.imageContainer}>
                    <img src={session.user.image} alt={session.user.name} className={styles.image}/>
                </div>
                {isAdmin && <div className={styles.adminIcon}>admin</div>}
            </div>
          )}
      </nav>
  );
};

export default ProfileNavbar;
