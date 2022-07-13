import Head from "next/head";
import React, { ReactElement } from "react";
import Navbar from "../../NavBar/NavBar";


const ClientContainer = ({children, title, keywords, style}): ReactElement => {
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

export default ClientContainer;
