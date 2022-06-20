import { useSession } from "next-auth/react";
import Head from "next/head";
import React from "react";
import Navbar from "../../NavBar/NavBar";


function MainContainer ({children, title, keywords, style}) {
    const {data: session } = useSession()
    return (
        <>
            <Head>
                <meta key={" " + keywords}></meta>
                <title>{title}</title>
                <link href='https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css' rel='stylesheet'></link>
            </Head>
            <Navbar/>
            <div className={style}>
                {children}
            </div>
        </>
    )
}

export default MainContainer;

// MainContainer.defaultProps = {
//     style: `${styles.defaultWrapper}`
// }
