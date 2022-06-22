import Head from "next/head";
import React from "react";


function UserContainer ({children, title, keywords, style}) {
    return (
        <>
            <Head>
                <meta key={" " + keywords}></meta>
                <title>{title}</title>
                <link href='https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css' rel='stylesheet'></link>
            </Head>
            <div className={style}>
                {children}
            </div>
        </>
    )
}

export default UserContainer;

// MainContainer.defaultProps = {
//     style: `${styles.defaultWrapper}`
// }
