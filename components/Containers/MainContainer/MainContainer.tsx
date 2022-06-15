import Head from "next/head";
import React from "react";
import Navbar from "../../NavBar/NavBar";


function MainContainer ({children, title, keywords, style}) {
    return (
        <>
            <Head>
                <meta key={" " + keywords}></meta>
                <title>{title}</title>
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
