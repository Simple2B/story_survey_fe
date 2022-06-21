import React, { useState } from "react";
import Image from "next/image";
import styles from "./UserProfile.module.css";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";


const ProfileNavbar = ({isActive, handleClick, headerName}) => {

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
    </nav>
  );
};

export default ProfileNavbar;
