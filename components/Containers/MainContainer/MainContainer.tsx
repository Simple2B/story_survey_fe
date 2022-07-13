import Head from "next/head";
import React from "react";
import Navbar from "../../NavBar/NavBar";


function MainContainer ({children, title, keywords, style}) {
    return (
        <>
            <Head>
                <meta key={" " + keywords}></meta>
                <title>{title}</title>
                <link 
                    rel="stylesheet" 
                    href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" 
                    integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" 
                    crossOrigin="anonymous"
                >
                </link>
            </Head>
            <Navbar/>
            <div className={style}>
                {children}
            </div>
        </>
    )
}

export default MainContainer;
