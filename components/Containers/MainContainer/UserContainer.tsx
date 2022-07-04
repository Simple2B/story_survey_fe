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
import Link from "next/link";
import { stripeApi } from "../../../pages/api/backend/stripeInstance";

const SIGN_OUT = 'sing out';

interface IMenuIcon {
    image: StaticImageData;
    name: string;
    href?: string;
    classIcon: string;
    isIconActive?: boolean;
    // menuComponent?: undefined;
}

export const menuIcons = [
  {
    image: surveysIcon,
    name: 'Surveys list',
    href: '/user_profile/survey/surveys_list',
    classIcon: styles.active,
    isIconActive: true,
  },
  {
    image: surveysCreateIcon,
    name: 'Create survey',
    href: '/user_profile/survey/create_survey',
    classIcon: "",
    isIconActive: false,
  },
  {
    image: dashboardIcon,
    name: 'Dashboard',
    href: '/user_profile/survey/dashboard',
    classIcon: "",
    isIconActive: false,
  },
  {
    image: messageIcon,
    name: 'Messages',
    href: '/user_profile/survey/messages',
    classIcon: "",
    isIconActive: false,
  },
  {
    image: settingsIcon,
    name: 'Setting',
    href: '/user_profile/survey/setting',
    classIcon: "",
    isIconActive: false,
  },
  {
    image: singOutIcon,
    name: SIGN_OUT,
    classIcon: styles.singOutIcon,
  }
];


function UserContainer ({children, title, keywords, style, headerName}) {
    const [isActive, setActive] = useState(null);
    const [icons, setMenuIcons] = useState<IMenuIcon[]>(menuIcons);
    // const [headerName, setHeaderName] = useState("Surveys list");
    const { push, asPath } = useRouter();
    const { data: session} = useSession();

    useEffect(() => {
      setActive(false);
        if (session) {
          // const stripeSessionId: any = session.profile;
          // if (asPath.includes('success=true') || stripeSessionId.stripe_session_id) {
          //   setMenuIcons(icons.map((item, index) => {
          //     if (item.name === "Setting") {
          //       item.isIconActive = true
          //     } else {
          //       item.isIconActive = false
          //     }
          //     return item;
          //   }))
          // } 
        
        };
      }, [session])

    const handleSignOut = async () => {
        const data = await signOut({redirect: false, callbackUrl: '/'});
        push(data.url);
      };
    
    const getMainPage = () => {
        push("/");
    }

    const handleClick = () => {
        setActive(!isActive);
    };
    
    console.log("UserContainer: asPath ", asPath);
    

    const toggleClass = (href: string) => {
        setMenuIcons(icons.map((icon, i) => {
          // if (href === icon.href && icon.href === '/user_profile/survey/setting' ){ 
          //     push(`/user_profile/survey/setting?callbackUrl=${asPath}`)
          // }
          if (href === icon.href && icon.name === SIGN_OUT) {
            handleSignOut();
          }
          if ( href === icon.href && icon.classIcon.length === 0) {
            // setHeaderName(icon.name);
            icon.classIcon = styles.active;
            icon.isIconActive = true;
          } else {
            icon.classIcon = "";
            icon.isIconActive = false;
          };
          return icon;
        }))
      };

    return (
        <>
            <Head>
                <meta key={" " + keywords}></meta>
                <title>{title}</title>
                <link href='https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css' rel='stylesheet'></link>
            </Head>
            <div className={isActive ? `${styles.sidebar} ${styles.active}` : styles.sidebar }>
                <div className={styles.logoDetails} onClick={getMainPage}>
                    <i className="bx">SS</i>
                    <span className={styles.logoName}>Survey</span>
                </div>
                
                <ul className={styles.navLinks}>
                    {icons.map((menu, index) => {

                      // if (menu.href !== undefined && menu.href === '/user_profile/survey/setting') {
                      //   return (
                      //     <li onClick={() => toggleClass(menu.href)} key={index}>
                      //         <a className={menu.classIcon}>
                      //             <i><Image className={styles.icon} src={menu.image} height={30} width={30}/></i>
                      //             <span className={styles.linksName}>{ menu.name }</span>
                      //         </a>
                      //     </li>
                      //   )
                      // }
                     if  (menu.href !== undefined) {
                        return (
                            <Link href={menu.href} key={index} >
                                <li onClick={() => toggleClass(menu.href)}>
                                    <a className={menu.classIcon}>
                                        <i><Image className={styles.icon} src={menu.image} height={30} width={30}/></i>
                                        <span className={styles.linksName}>{ menu.name }</span>
                                    </a>
                                </li>
                            </Link>
                        )
                      } 
                      else {
                          return (
                            <li onClick={() => toggleClass(menu.href)} key={index}>
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
                </div>
            </section>
        </>
    )
}

export default UserContainer;
