import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ProfileNavbar from "../../UserProfile/ProfileNavBar";
import styles from "../../UserProfile/UserProfile.module.css";
import settingsIcon from "../../../styles/icons/icons8-settings-64.png";
import surveysIcon from "../../../styles/icons/icons8-overview-64.png";
import dashboardIcon from "../../../styles/icons/icons8-combo-chart-64.png";
import surveysCreateIcon from "../../../styles/icons/icons8-create-document-64.png";
import messageIcon from "../../../styles/icons/icons8-messages-64.png";
import singOutIcon from "../../../styles/icons/icons8-logout-64.png";
import usersListIcon from "../../../styles/icons/icons8-conference-64.png";
import Link from "next/link";
import { ADMIN, CLIENT, IUserResponse } from "../../../redux/types/userTypes";
import { clientApi } from "../../../pages/api/backend/userInstance";

const SIGN_OUT = 'sing out';

interface IMenuIcon {
    image: StaticImageData;
    name: string;
    href?: string;
    classIcon: string;
    isIconActive?: boolean;
    isAdmin?: boolean;
}

export const menuIcons = [
  {
    image: surveysIcon,
    name: 'Surveys list',
    href: '/user_profile/survey/surveys_list',
    classIcon: styles.active,
    isIconActive: true,
    isAdmin: false,
  },
  {
    image: surveysCreateIcon,
    name: 'Create survey',
    href: '/user_profile/survey/create_survey',
    classIcon: "",
    isIconActive: false,
    isAdmin: false,
  },
  {
    image: usersListIcon,
    name: 'Create survey',
    href: '/user_profile/survey/users/users_list',
    classIcon: "",
    isIconActive: false,
    isAdmin: true,
  },
  {
    image: dashboardIcon,
    name: 'Dashboard',
    href: '/user_profile/survey/dashboard',
    classIcon: "",
    isIconActive: false,
    isAdmin: false,
  },
  {
    image: messageIcon,
    name: 'Messages',
    href: '/user_profile/survey/messages',
    classIcon: "",
    isIconActive: false,
    isAdmin: false,
  },
  {
    image: settingsIcon,
    name: 'Setting',
    href: '/user_profile/survey/setting',
    classIcon: "",
    isIconActive: false,
    isAdmin: false,
  },
  {
    image: singOutIcon,
    name: SIGN_OUT,
    classIcon: styles.singOutIcon,
  }
];

function UserContainer ({children, title, keywords, style, headerName, isActive, setActive}) {
    const [icons, setMenuIcons] = useState<IMenuIcon[]>(menuIcons);
    const { push, asPath } = useRouter();
    const { data: session} = useSession();

    const handleSignOut = async () => {
      const data = await signOut({redirect: false, callbackUrl: '/'});
      push(data.url);
    };

    useEffect(() => {
      setActive(false);
        if (session) {

          const getUser = async() => {
            const userFromDB = await clientApi.getUser(session.user.email);
            console.log("userFromDB ", userFromDB);
            // setUser(userFromDB);
          };

          getUser();
          
          const user: IUserResponse = session.profile;
          
          setMenuIcons(icons.map((icon, i) => {

            // if ( icon['href'] === '/user_profile/survey/users/users_list' && user && user.role === CLIENT) {
            //   icons['classIcon'] = styles.hideForClient;
            // };

            if (asPath === icon.href && icon.name === SIGN_OUT) {
              handleSignOut();
            };
          
            if ( user && asPath === icon.href && icon.href === '/user_profile/survey/users/users_list' ) { 
              console.log("user.role", user.role);
              if ( user.role === ADMIN){ 
                push('/user_profile/survey/users/users_list');
              }
              if ( user.role === CLIENT) {
                push('/user_profile/survey/surveys_list');
              }
            };

            if ( asPath.includes(icon.href) && icon.classIcon.length === 0) {
                  icon.classIcon = styles.active;
                  icon.isIconActive = true;
            } else {
                  icon.classIcon = "";
                  icon.isIconActive = false;
            };
            return icon;
          }))
        };

      }, [session])
  
    const getMainPage = () => {
        push("/");
    };

    const handleClick = () => {
        setActive(!isActive);
    };
    

    return (
        <>
            <Head>
                <meta key={" " + keywords}></meta>
                <title>{title}</title>
                <link href='https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css' rel='stylesheet'></link>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"></link>
            </Head>
            <div className={isActive ? `${styles.sidebar} ${styles.active}` : styles.sidebar }>
                <div className={styles.logoDetails} onClick={getMainPage}>
                    <i className="bx">SS</i>
                    <span className={styles.logoName}>Survey</span>
                </div>
                
                <ul className={styles.navLinks}>
                    {icons.map((menu, index) => {
                      const user: IUserResponse = session ? session.profile : null;

                    //   if (menu.href !== undefined && menu.href === '/user_profile/survey/users/users_list' && user && user.role === ADMIN) {
                    //     return (
                    //       <li  key={index} className={style.hideForClient}>
                    //           <a className={menu.classIcon} href={menu.href}>
                    //               <i><Image className={styles.icon} src={menu.image} height={30} width={30}/></i>
                    //               <span className={styles.linksName}>{ menu.name }</span>
                    //           </a>
                    //       </li>
                    //     )
                    //   }
                    //  else 
                     if  (menu.href !== undefined ) {
                        const isClient = user && user.role === CLIENT;
                        const isAdmin = user && user.role === ADMIN;
                        return (
                          <>
                            { 
                              isClient && !menu.isAdmin && 
                              <Link href={menu.href}  >
                                <li key={index}>
                                    <a className={menu.classIcon}>
                                        <i><Image className={styles.icon} src={menu.image} height={30} width={30}/></i>
                                        <span className={styles.linksName}>{ menu.name }</span>
                                    </a>
                                </li>
                              </Link>
                            }
                            { 
                              isAdmin && 
                              <Link href={menu.href}  >
                                <li key={index}>
                                    <a className={menu.classIcon}>
                                        <i><Image className={styles.icon} src={menu.image} height={30} width={30}/></i>
                                        <span className={styles.linksName}>{ menu.name }</span>
                                    </a>
                                </li>
                              </Link>
                            }
                          </>
                        )
                      } 
                      else {
                          return (
                            <li  key={index} onClick={handleSignOut}>
                                <a className={menu.classIcon} href={menu.href}>
                                    <i><Image className={styles.icon} src={menu.image} height={30} width={30}/></i>
                                    <span className={styles.linksName}>{ menu.name }</span>
                                </a>
                            </li>
                          )
                      }
                    })
                    }
                </ul>
            </div>

            <section className={styles.homeSection}>
                <ProfileNavbar isActive={isActive} handleClick={handleClick} headerName={headerName}/>
                <div className={styles.mainContent}>
                    {menuIcons.map((item, index) => item.isIconActive && <div key={index}>{children}</div> )}
                    {asPath.includes("users/user/") && children}
                </div>
            </section>
        </>
    )
}

export default UserContainer;
