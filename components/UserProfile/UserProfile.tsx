import React, { useEffect, useState } from "react";
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
import CreateSurvey from "./CreateSurvey/CreateSurvey";
import SurveyList from "./SurveyList/SurveyList";
import Setting from "./Setting/Setting";

const SIGN_OUT = 'sing out';

const menuIcons = [
  {
    image: surveysIcon,
    name: 'Surveys list',
    href: '#surveys_list',
    classIcon: styles.active,
    isIconActive: true,
    menuComponent: <SurveyList/>,
  },
  {
    image: surveysCreateIcon,
    name: 'Create survey',
    href: '#create_survey',
    classIcon: "",
    isIconActive: false,
    menuComponent: <CreateSurvey/>,
  },
  {
    image: dashboardIcon,
    name: 'Dashboard',
    href: '#dashboard',
    classIcon: "",
    isIconActive: false,
    menuComponent: <SectionDashboard/>,
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
    menuComponent: <Setting/>,
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
  const [headerName, setHeaderName] = useState("Surveys list");
  const { push, asPath } = useRouter();
  const { data: session} = useSession();

  // console.log(" asPath ", asPath.split('?')[1].split('&')[0] === 'success=true');

  useEffect(() => {
    if (asPath.includes('success=true')) {
      setMenuIcons(icons.map((item, index) => {
        if (item.href === "#setting") {
          item.isIconActive = true
        } else {
          item.isIconActive = false
        }
        return item;
      }))
    }

  }, [session])
 

  const handleClick = () => {
      setActive(!isActive);
  };

  const toggleClass = (index) => {
    setMenuIcons(icons.map((icon, i) => {
      if (index === i && icon.name === SIGN_OUT) {
        handleSignOut();
      }
      if ( index === i && icon.classIcon.length === 0) {
        setHeaderName(icon.name);
        // icon.classIcon = styles.active;
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
    push(data.url);
  };

  const getMainPage = () => {
    push("/");
  }

  return  (
      <>
        <div className={isActive ? `${styles.sidebar} ${styles.active}` : styles.sidebar }>
          <div className={styles.logoDetails} onClick={getMainPage}>
            <i className="bx">SS</i>
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
          <ProfileNavbar isActive={isActive} handleClick={handleClick} headerName={headerName}/>
          <div className={styles.mainContent}>
            {menuIcons.map((item, index) => item.isIconActive && <div key={index}>{item.menuComponent}</div> )}
          </div>
        </section>
      </>
  );
};

export default UserProfile;
