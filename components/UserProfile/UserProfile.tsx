import React, { useState } from "react";
import Image from "next/image";
import styles from "./UserProfile.module.css";
import settingsIcon from "../../styles/icons/icons8-settings-64.png";
import surveysIcon from "../../styles/icons/icons8-overview-64.png";
import dashboardIcon from "../../styles/icons/icons8-combo-chart-64.png";
import surveysCreateIcon from "../../styles/icons/icons8-create-document-64.png";
import messageIcon from "../../styles/icons/icons8-messages-64.png";
import singOutIcon from "../../styles/icons/icons8-logout-64.png";
import SectionDashboard from "./SectionDashboard/SectionDashboard";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import ProfileNavbar from "./ProfileNavBar";

const SIGN_OUT = 'sing out';

const menuIcons = [
  {
    image: dashboardIcon,
    name: 'Dashboard',
    href: '#dashboard',
    classIcon: styles.active,
    isIconActive: true,
    menuComponent: <SectionDashboard/>,
  },
  {
    image: surveysIcon,
    name: 'Surveys list',
    href: '#surveys_list',
    classIcon: "",
    isIconActive: false,
    menuComponent: <div className={styles.containerCentered}>Surveys list</div>,
  },
  {
    image: surveysCreateIcon,
    name: 'Create survey',
    href: '#create_survey',
    classIcon: "",
    isIconActive: false,
    menuComponent: <div className={styles.containerCentered}>Create survey</div>,
  },
  {
    image: messageIcon,
    name: 'Messages',
    href: '#messages',
    classIcon: "",
    isIconActive: false,
    menuComponent: <div className={styles.containerCentered}>Messages</div>,
  },
  {
    image: settingsIcon,
    name: 'Setting',
    href: '#setting',
    classIcon: "",
    isIconActive: false,
    menuComponent: <div className={styles.containerCentered}>Setting</div>,
  },
  {
    image: singOutIcon,
    name: SIGN_OUT,
    classIcon: styles.singOutIcon,
  }
];

const UserProfile = () => {

  const [isActive, setActive] = useState(false);
  const [icons, setMenuIcons] = useState(menuIcons);
  const { push, asPath } = useRouter();
  const { data: session } = useSession();
 

  const handleClick = () => {
      setActive(!isActive);
  };

  const toggleClass = (index) => {
    setMenuIcons(icons.map((icon, i) => {
      if (index === i && icon.name === SIGN_OUT) {
        handleSignOut();
      }
      if ( index === i && icon.classIcon.length === 0) {
        icon.classIcon = styles.active;
        icon.isIconActive = true;
      } else {
        icon.classIcon = "";
        icon.isIconActive = false;
      };
      return icon;
    }))
  };

  const handleSignOut = async () => {
    const data = await signOut({redirect: false, callbackUrl: '/'});
    console.log("NavBar: handleSignOut data => ", data);
    push(data.url);
  };

  return  (
      <>
        <div className={isActive ? `${styles.sidebar} ${styles.active}` : styles.sidebar }>
          <div className={styles.logoDetails}>
            <i className={`${styles.bx} ${styles.bxlPlusPlus}`}/>
            <span className={styles.logoName}>Survey</span>
          </div>
          
          <ul className={styles.navLinks}>
            {icons.map((menu, index) => {
              return (
                <li key={index} onClick={() => toggleClass(index)}>
                  <a href={menu.href} className={menu.classIcon}>
                    <i><Image className={styles.icon} src={menu.image} height={30} width={30}/></i>
                    <span className={styles.linksName}>{menu.name}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        <section className={styles.homeSection}>
          <ProfileNavbar isActive={isActive} handleClick={handleClick}/>

          <div>
            {menuIcons.map((item) => item.isIconActive && item.menuComponent)}
          </div> 
        </section>
      </>
  );
};

export default UserProfile;
