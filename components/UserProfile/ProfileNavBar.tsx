import React, { useState } from "react";
import Image from "next/image";
import styles from "./UserProfile.module.css";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";


const ProfileNavbar = ({isActive, handleClick, headerName}) => {
  const { data: session } = useSession();
  const { push } = useRouter();

  const getProfile = () => {
    push(`/user_profile/user`);
  }

  return  (
    <nav>
        <div className={styles.sidebarButton} onClick={handleClick}>
          <i className={`bx ${isActive ? 'bx-menu-alt-right': 'bx-menu'} sidebarBtn`}></i>
          <span className={styles.dashboard}>{headerName}</span>
        </div>

        <div className={styles.searchBox}>
          <input type={styles.text} placeholder="Search..."/>
          <i className={`${styles.bx} ${styles.bxSearch} bx bx-search`}></i>
        </div>

        {session && (
          <div className={styles.btnContainer} onClick={getProfile}>  
                                          
              <div className={styles.signOutBtn}>{session.user.name}</div>
              <div className={styles.imageContainer}>
                  <img src={session.user.image} alt={session.user.name}  className={styles.image}/>
              </div>
          </div>
          )
        }
                                        
    </nav>
  );
};

export default ProfileNavbar;
